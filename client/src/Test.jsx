import { Button } from '@/components/atoms/Button.jsx';
import { P } from '@/components/atoms/P.jsx';
import { Div } from '@/components/atoms/Div.jsx';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/atoms/Tabs';
import { Progress } from '@/components/atoms/progress';
import { Toggle } from '@/components/atoms/toggle';

import ToggleSupply from '@/components/modules/ToggleSupply';
import ToggleCheck from '@/components/modules/ToggleCheck';
import { NewspaperIcon } from 'lucide-react';

import { useState } from 'react';
import { useQuery, useQueries } from '@tanstack/react-query';
import { getXXX, get2XXX } from '@/apis/api/apiTemplate';

import { useSelector, useDispatch } from 'react-redux';
import { testActions } from '@/stores/testStore';

import { useCallback } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const getItems = (count) =>
    Array.from({ length: count }, (v, k) => k).map((k) => ({
        id: `item-${k}`,
        content: `item ${k}`,
    }));

const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
};

const grid = 8;
const getItemStyle = (draggableStyle, isDragging) => ({
    userSelect: 'none',
    padding: grid * 2,
    marginBottom: grid,
    background: isDragging ? 'lightgreen' : 'grey',
    ...draggableStyle,
});
const getListStyle = (isDraggingOver) => ({
    background: isDraggingOver ? 'lightblue' : 'lightgrey',
    padding: grid,
    // width: 250,
});

function Test() {
    const [items, setItems] = useState(getItems(10));

    const onDragEnd = useCallback(
        (result) => {
            if (!result.destination) {
                return;
            }
            const reorderedItems = reorder(items, result.source.index, result.destination.index);
            setItems(reorderedItems);
        },
        [items]
    );

    const dispatch = useDispatch();
    // let testword = useSelector((state) => state.word);
    // console.log('1', testword);
    // const helloHandler = () => {
    //     dispatch(testActions.hello);
    // };
    // const hiHandler = () => {
    //     dispatch(testActions.hi);
    // };

    // 1개만 사용할 경우
    // const { data } = useQuery({
    //     queryKey: ['test'],
    //     queryFn: get2XXX,
    // });
    // const [testword, setTestword] = useState('a');

    // const results = useQueries({
    //     queries: [
    //         { queryKey: ['hello', 1], queryFn: getXXX },
    //         { queryKey: ['hi', 2], queryFn: get2XXX },
    //     ],
    // });

    // results 배열에서 각 쿼리의 결과를 추출
    //const [resultXXX, resultYYY] = results;

    // console.log(useSelector((state) => (state.word = testword)));
    // const aaa = useSelector((state) => (state.word = testword));
    // console.log('aaa', aaa);
    // setTestword(resultXXX.data);
    // console.log('aaa2', aaa);
    //console.log(useSelector((state) => state.test.word));
    //dispatch(testActions.changeReducer(resultXXX.data));
    //console.log(useSelector((state) => state.test.word));

    //console.log(useSelector((state) => (state.word = 'hello 이자식아')));
    // dispatch(testActions.hello);
    //testword = 'bbb';

    return (
        <>
            <div>
                <Button onClick={() => console.log('click')}>Click me</Button>
                <Button variant="error">Error</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="destructive">Destructive</Button>
                <P variant="mainHeader">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex, animi!</P>
                <P variant="sectionHeader">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex, animi!</P>
                <P variant="subHeader">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusantium, ipsam!</P>
                <P variant="content">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Maiores, quibusdam.</P>
                <P variant="default">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex, animi!</P>

                <Div borderColor="success" textColor="success" size="sm">
                    기내 수화물 가능
                </Div>
                <Div borderColor="success" textColor="success" size="default">
                    기내 수화물 가능
                </Div>
                <Div className="font-pretendardBold" borderColor="success" textColor="success" size="lg">
                    기내 수화물 가능
                </Div>

                <ToggleSupply selected={true} supply="텍스트1"></ToggleSupply>
                <ToggleSupply selected={false} supply="텍스트2"></ToggleSupply>
                <ToggleCheck
                    iconLeft={<NewspaperIcon />}
                    title="title입니다"
                    content="content입니다"
                    iconRight={<NewspaperIcon />}
                    footerQuote="인용입니까?"
                />
            </div>
            {/* {resultXXX.data}
            <br />
            {resultYYY.data}
        <br /> */}
            <p>====================================================================================================</p>
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="xxx">
                    {(provided, snapshot) => (
                        <div ref={provided.innerRef} style={getListStyle(snapshot.isDraggingOver)}>
                            {items.map((item, index) => (
                                <Draggable key={item.id} draggableId={item.id} index={index}>
                                    {(provided, snapshot) => (
                                        <div {...provided.draggableProps}>
                                            <div
                                                ref={provided.innerRef}
                                                style={getItemStyle(provided.draggableStyle, snapshot.isDragging)}
                                                {...provided.dragHandleProps}
                                            >
                                                {item.content}
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
        </>
    );
}

export default Test;
