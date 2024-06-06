import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/atoms/Button.jsx';
import { P } from '@/components/atoms/P.jsx';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/atoms/Tabs';
import { Progress } from '@/components/atoms/progress';
import { Input } from '@/components/atoms/input';
import IconAndP from '@/components/modules/IconAndP';
import PAndButton from '@/components/modules/PAndButton';
import ToggleSupply from '@/components/modules/ToggleSupply';
import ToggleCheck from '@/components/modules/ToggleCheck';

import { useCallback } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import { useQuery } from '@tanstack/react-query';
import { useSelector, useDispatch } from 'react-redux';

import pointerIcon from '@/assets/icons/pointer.svg';
import alertTriangleIcon from '@/assets/icons/alert-triangle.svg';
import checkCircleIcon from '@/assets/icons/check-circle.svg';
import { NewspaperIcon, BaggageClaimIcon, DollarSignIcon, WifiIcon, CircleIcon, CircleCheckIcon } from 'lucide-react';

import { getItemList, createItemList } from '@/apis/api/itemList';
import { getTaskList, checkTaskList } from '@/apis/api/taskList';

import { itemActions } from '@/stores/itemStore';
import { taskActions } from '@/stores/taskStore';

const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
};

// 변경해야 할 사안!!
// 1을 나중에 해당 여정의 전역값?으로 바꿔주어야 함

function CheckListPage() {
    const dispatch = useDispatch();
    const itemList = useSelector((state) => state.item);
    const taskList = useSelector((state) => state.task);

    const [divs, setDivs] = useState([]); // div들을 관리할 배열 상태 변수
    const [activeTab, setActiveTab] = useState('checks');

    const inputRef = useRef(null);

    // const itemListApis = useQueries({
    //     queries: [
    //         { queryKey: ['item', 1], queryFn: async () => getItemList(1), enabled: true },
    //         { queryKey: ['item', 2], queryFn: async () => createItemList(1, inputRef.current.value.trim()) },
    //     ],
    // });
    // itemListApis 배열에서 각 쿼리의 결과를 추출
    //const [resultXXX, resultYYY] = itemListApis;

    const { data: itemListData, refetch: refetchItemListData } = useQuery({
        queryKey: ['item'],
        queryFn: async () => getItemList(localStorage.getItem('selectedJourneyId')),
        enabled: true, // useQuery가 즉시 실행되도록 설정
    });

    const { data: taskListData } = useQuery({
        queryKey: ['task'],
        queryFn: async () => getTaskList(localStorage.getItem('selectedJourneyId')),
        enabled: true,
    });
    //console.log(useSelector((state) => state.task));
    const [checkPassport, setCheckPassport] = useState(false);
    const [checkCheckIn, setCheckCheckIn] = useState(false);
    const [checkExchange, setCheckExchange] = useState(false);
    const [checkRoaming, setCheckRoaming] = useState(false);

    const [progressItem, setProgressItem] = useState(0);
    const [progressTask, setProgressTask] = useState(0);
    const [checkAllItem, setCheckAllItem] = useState(false);

    useEffect(() => {
        if (itemListData) {
            //console.log(itemListData.data);
            dispatch(itemActions.setItem(itemListData.data)); // 전역 상태에 저장
            const initialDivs = itemListData.data.map((item, index) => (
                <ToggleSupply
                    key={index}
                    selected={item.itemDone}
                    supply={item.itemName}
                    onRemove={handleRemoveDiv}
                    onToggle={handleToggleDiv}
                />
            ));
            setDivs(initialDivs);
        }
    }, [itemListData, activeTab, setDivs, progressItem]);
    //console.log(divs);
    //console.log(useSelector((state) => state.item[0]));

    useEffect(() => {
        if (taskListData) {
            // console.log(taskListData.data);
            dispatch(taskActions.setTask(taskListData.data)); // 전역 상태에 저장
        }
    }, [taskListData]);

    useEffect(() => {
        taskList.map((task) => {
            const taskName = task.taskName.slice(0, 2);
            if (taskName === '여권') {
                setCheckPassport(task.taskDone);
            } else if (taskName === '탑승') {
                setCheckCheckIn(task.taskDone);
            } else if (taskName === '환전') {
                setCheckExchange(task.taskDone);
            } else if (taskName === '로밍') {
                setCheckRoaming(task.taskDone);
            }
        });
    }, [taskList]);

    // 준비물 리스트 progress bar
    useEffect(() => {
        if (itemListData) {
            //console.log(divs);
            //console.log(divs.length);
            //console.log(itemList);
            //console.log(itemList.map((item) => item.itemDone));
            const oneStep = 100 / divs.length;
            //console.log(oneStep);

            itemListData.data.map((item) => {
                if (item.itemDone === false) {
                    //console.log(item, item.itemDone);
                    setCheckAllItem(false);
                }
            });

            let progressCount = 0;
            itemListData.data.map((item) => {
                if (item.itemDone === true) {
                    progressCount++;
                }
            });

            const timer = setTimeout(() => setProgressItem(oneStep * progressCount), 500);
            return () => clearTimeout(timer);
        }
    }, [divs.length, itemListData, checkAllItem]);

    useEffect(() => {
        const timer = setTimeout(
            () =>
                setProgressTask(
                    (checkPassport ? 25 : 0) +
                        (checkCheckIn ? 25 : 0) +
                        (checkExchange ? 25 : 0) +
                        (checkRoaming ? 25 : 0)
                ),
            500
        );
        return () => clearTimeout(timer);
    }, [checkPassport, checkCheckIn, checkExchange, checkRoaming]);

    const handleDivClick = (event) => {
        //console.log('클릭', event.target.innerText.slice(0, 2));
        //console.log(taskListData.data.map((task) => task.taskName.slice(0, 2)));
        if (taskListData) {
            taskListData.data.map((task) => {
                const taskNameDB = task.taskName.slice(0, 2);
                const taskNameEvent = event.target.innerText.slice(0, 2);
                if (taskNameDB === taskNameEvent) {
                    if (taskNameEvent === '여권') {
                        checkTaskList(localStorage.getItem('selectedJourneyId'), task.taskId);
                        setCheckPassport(!checkPassport);
                    } else if (taskNameEvent === '탑승') {
                        checkTaskList(localStorage.getItem('selectedJourneyId'), task.taskId);
                        setCheckCheckIn(!checkCheckIn);
                    } else if (taskNameEvent === '환전') {
                        checkTaskList(localStorage.getItem('selectedJourneyId'), task.taskId);
                        setCheckExchange(!checkExchange);
                    } else if (taskNameEvent === '로밍') {
                        checkTaskList(localStorage.getItem('selectedJourneyId'), task.taskId);
                        setCheckRoaming(!checkRoaming);
                    }
                }
            });
        }
    };

    const handleAddDiv = useCallback(() => {
        const inputValue = inputRef.current.value.trim();
        if (inputValue !== '') {
            // 입력 값이 비어있지 않을 경우에만 실행
            const newDivs = [...divs]; // 기존 div 배열 복사
            createItemList(localStorage.getItem('selectedJourneyId'), {
                journeyId: `${localStorage.getItem('selectedJourneyId')}`,
                itemName: inputValue,
            });
            newDivs.push(
                <ToggleSupply
                    selected={false}
                    supply={inputValue}
                    onRemove={handleRemoveDiv}
                    onToggle={handleToggleDiv}
                />
            ); // 새로운 div 추가
            setDivs(newDivs); // div 배열 업데이트
            inputRef.current.value = ''; // 입력 값 초기화
        }
    }, [divs]);

    const handleRemoveDiv = useCallback(async (itemId, itemName) => {
        //deleteItemList(1, itemId);
        console.log('Enter handleRemoveDiv');
        if (refetchItemListData.length == 0) {
            setDivs([<></>]);
        }
        setDivs((prevDivs) => prevDivs.filter((div) => div.supply !== itemName));
        dispatch(itemActions.deleteItem(itemId));
        await refetchItemListData();
    }, []);

    const handleToggleDiv = useCallback(async () => {
        console.log('Enter handleToggleDiv');
        await refetchItemListData();
        setDivs((prevDivs) => prevDivs);
        await refetchItemListData();
    }, []);

    const countUnCheckItems = () => {
        let answer = 0;
        for (let i = 0; i < divs.length; i++) {
            if (divs[i].props.selected === false) {
                answer++;
            }
        }
        if (answer == 0) {
            setCheckAllItem(true);
        }
        //console.log(answer);
        return answer;
    };

    useEffect(() => {
        refetchItemListData();
        console.log(itemListData);
    }, [itemListData, refetchItemListData, handleAddDiv, handleRemoveDiv, handleToggleDiv]);

    const onDragEnd = useCallback(
        (result) => {
            if (!result.destination) {
                return;
            }
            const reorderedItems = reorder(divs, result.source.index, result.destination.index);
            setDivs(reorderedItems);
        },
        [divs]
    );

    return (
        <>
            <Tabs defaultValue="checks" className="mt-4 text-center" value={activeTab} onValueChange={setActiveTab}>
                <TabsList>
                    <TabsTrigger value="supplies">준비물 리스트</TabsTrigger>
                    <TabsTrigger value="checks">점검 리스트</TabsTrigger>
                </TabsList>

                <TabsContent value="supplies" forceMount={true} hidden={'supplies' !== activeTab} className="mt-4">
                    <div className="my-2">
                        <P className="my-1" variant="mainHeader">
                            여정 준비물 리스트
                        </P>
                        <P className="my-1 text-neutral-400" variant="content">
                            여정에 필요한 준비물을 꼼꼼하게 검토해 보세요
                        </P>
                    </div>
                    <div className="my-4">
                        <Link to="/info/baggage">
                            <IconAndP
                                className="flex flex-row justify-center mb-4"
                                svg={pointerIcon}
                                text="기내 반입 제한물품에 대해 알아보기"
                            />
                        </Link>
                    </div>

                    <Progress className="my-4" value={progressItem} />
                    <div className="py-2">
                        <div className="flex flex-row justify-between gap-3 my-4">
                            <Input ref={inputRef} className="w-full ml-1" type="input" placeholder="준비물 입력" />
                            <Button variant="brand" onClick={handleAddDiv}>
                                입력
                            </Button>
                        </div>

                        <DragDropContext onDragEnd={onDragEnd}>
                            <Droppable droppableId="droppable">
                                {(provided) => (
                                    <div ref={provided.innerRef}>
                                        {divs.map((value, index) => (
                                            // <div key={index}>{value}</div>
                                            <Draggable key={index} draggableId={index.toString()} index={index}>
                                                {(provided) => (
                                                    <div {...provided.draggableProps}>
                                                        <div ref={provided.innerRef} {...provided.dragHandleProps}>
                                                            {value}
                                                        </div>
                                                        {provided.placeholder}
                                                    </div>
                                                )}
                                            </Draggable>
                                        ))}
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        </DragDropContext>
                    </div>
                    <div className="my-6 ">
                        {checkAllItem ? (
                            <PAndButton
                                tabsContentValue="supplies"
                                firstContent="준비물을 다 챙기셨군요!"
                                secondContent="여정을 위한 다음 점검 리스트를 확인하러 가요"
                                buttonContent="점검 리스트로 이동"
                                isReady={true}
                            />
                        ) : (
                            <>
                                <PAndButton
                                    tabsContentValue="supplies"
                                    firstContent="아직 준비물을 다 챙기지 않았어요"
                                    secondContent="빼먹은 준비물이 없는지 리스트를 다시 확인해주세요"
                                    buttonContent="점검 리스트로 이동"
                                    isReady={false}
                                />
                            </>
                        )}
                    </div>
                    {/* </div> */}
                </TabsContent>

                <TabsContent value="checks" forceMount={true} hidden={'checks' !== activeTab}>
                    <div className="">
                        <P className="mb-2" variant="mainHeader">
                            탑승 전 점검 리스트
                        </P>
                        <P className="mb-2 text-neutral-400" variant="content">
                            공항에 도착했을 때 해야 할 일들을 점검해 보세요
                        </P>
                        <Progress className="mb-4" value={progressTask} />
                    </div>
                    <div className="my-2 ">
                        {checkAllItem ? (
                            <>
                                <TabsList className="bg-white">
                                    <TabsTrigger value="supplies">
                                        <IconAndP
                                            className="flex flex-row justify-center px-2 py-1 mb-4 hover:bg-success-300/40 hover:rounded-lg"
                                            svg={checkCircleIcon}
                                            text="모든 준비물을 챙겼어요"
                                            color="success"
                                        />
                                    </TabsTrigger>
                                </TabsList>
                            </>
                        ) : (
                            <>
                                <TabsList className="bg-white">
                                    <TabsTrigger value="supplies">
                                        <IconAndP
                                            className="flex flex-row justify-center mb-4 hover:bg-error-300/50 hover:rounded"
                                            svg={alertTriangleIcon}
                                            text={`챙기지 않은 준비물이 ${countUnCheckItems()}개 있어요!`}
                                            color="error"
                                        />
                                    </TabsTrigger>
                                </TabsList>
                            </>
                        )}
                    </div>
                    <div className="my-2 ">
                        <ToggleCheck
                            iconLeft={<NewspaperIcon />}
                            title="여권을 챙겼는지 확인했나요?"
                            content="여권 미지참 시 출국이 불가해요."
                            iconRight={checkPassport ? <CircleCheckIcon className="text-brand-500" /> : <CircleIcon />}
                            footerQuote="여권이 없다면?"
                            check={checkPassport}
                            linkPage="/info/passport"
                            onHandleDivClick={handleDivClick}
                        />
                        <ToggleCheck
                            iconLeft={<BaggageClaimIcon />}
                            title="탑승수속을 완료했나요?"
                            content="수속/수화물 위탁은 출발 50분 전에 마감해요."
                            iconRight={checkCheckIn ? <CircleCheckIcon className="text-brand-500" /> : <CircleIcon />}
                            footerQuote="내 체크인 카운터는?"
                            check={checkCheckIn}
                            linkPage="/checkincounterinfo"
                            onHandleDivClick={handleDivClick}
                        />
                        <ToggleCheck
                            iconLeft={<DollarSignIcon />}
                            title="환전을 완료했나요?"
                            content="카드가 있더라도 현금이 없다면 불편할 수 있어요."
                            iconRight={checkExchange ? <CircleCheckIcon className="text-brand-500" /> : <CircleIcon />}
                            footerQuote="환전할 곳을 찾는다면?"
                            check={checkExchange}
                            linkPage="/info/exchange"
                            onHandleDivClick={handleDivClick}
                        />
                        <ToggleCheck
                            iconLeft={<WifiIcon />}
                            title="로밍 서비스를 신청했나요?"
                            content="외국에서 인터넷을 위해 로밍 서비스는 필수에요."
                            iconRight={checkRoaming ? <CircleCheckIcon className="text-brand-500" /> : <CircleIcon />}
                            footerQuote="로밍을 해줄 곳을 찾는다면?"
                            check={checkRoaming}
                            linkPage="/info/roaming"
                            onHandleDivClick={handleDivClick}
                        />
                    </div>
                    <div className="pt-2 ">
                        {checkPassport && checkCheckIn && checkExchange && checkRoaming ? (
                            <PAndButton
                                tabsContentValue="checks"
                                firstContent="출국을 위한 모든 점검이 끝났어요"
                                secondContent="이제 비행기를 타러 갈 일만 남았군요!"
                                buttonContent="출국 준비 완료"
                                isReady={true}
                            />
                        ) : (
                            <PAndButton
                                tabsContentValue="checks"
                                firstContent="모든 점검이 완료되지 않았어요!"
                                secondContent="빠진 것은 없는지 다시 한 번 확인해 주세요"
                                buttonContent="출국 준비 완료"
                                isReady={false}
                            />
                        )}
                    </div>
                </TabsContent>
            </Tabs>
        </>
    );
}

export default CheckListPage;
