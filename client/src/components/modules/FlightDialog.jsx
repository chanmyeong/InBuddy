import { Button } from '@/components/atoms/Button';
import { P } from '@/components/atoms/P';
import { format } from 'date-fns';
import { useState } from 'react';
import { Calendar as CalendarIcon, Check, TicketPlus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Label } from '@/components/atoms/label';
import { Input } from '@/components/atoms/input';
import { Calendar } from '@/components/atoms/calendar';
import { useDispatch, useSelector } from 'react-redux';
import { ScrollArea } from '@/components/atoms/scroll-area';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTrigger,
    DialogClose,
    DialogFooter,
    DialogDescription,
    DialogTitle,
} from '@/components/atoms/dialog';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/atoms/popover';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '@/components/atoms/command';
import { createflightInfo } from '@/apis/api/flightInfo';
import { flightInfoActions } from '@/stores/flightInfoStore';
import { useNavigate } from 'react-router-dom';

const airlines = [
    { name: 'ITA항공', airlineCode: 'AZ', terminal: 1, selfCheckIn: false },
    { name: 'KLM네덜란드항공', airlineCode: 'KL', terminal: 2, selfCheckIn: true },
    { name: 'S7항공', airlineCode: 'S7', terminal: 1, selfCheckIn: false },
    { name: '가루다인도네시아', airlineCode: 'GA', terminal: 2, selfCheckIn: false },
    { name: '그레이터베이항공', airlineCode: 'HB', terminal: 1, selfCheckIn: false },
    { name: '대한항공', airlineCode: 'KE', terminal: 2, selfCheckIn: true },
    { name: '델타항공', airlineCode: 'DL', terminal: 2, selfCheckIn: true },
    { name: '라오항공', airlineCode: 'QV', terminal: 1, selfCheckIn: false },
    { name: '란항공', airlineCode: 'LA', terminal: 1, selfCheckIn: false },
    { name: '로얄 에어 모로코', airlineCode: 'AT', terminal: 1, selfCheckIn: false },
    { name: '로얄 요르단 항공', airlineCode: 'RJ', terminal: 1, selfCheckIn: false },
    { name: '말레이시아 항공', airlineCode: 'MH', terminal: 1, selfCheckIn: false },
    { name: '몽골항공', airlineCode: 'OM', terminal: 1, selfCheckIn: false },
    { name: '바틱 에어 말레이시아', airlineCode: 'OD', terminal: 1, selfCheckIn: false },
    { name: '버진 애트란틱항공', airlineCode: 'VS', terminal: 1, selfCheckIn: false },
    { name: '버진 오스트레일리아', airlineCode: 'VA', terminal: 1, selfCheckIn: false },
    { name: '베트남항공', airlineCode: 'VN', terminal: 1, selfCheckIn: false },
    { name: '비스타라항공', airlineCode: 'UK', terminal: 1, selfCheckIn: false },
    { name: '비엣젯항공', airlineCode: 'VJ', terminal: 1, selfCheckIn: false },
    { name: '사우디아항공', airlineCode: 'SV', terminal: 1, selfCheckIn: false },
    { name: '산동항공', airlineCode: 'SC', terminal: 1, selfCheckIn: false },
    { name: '상하이항공', airlineCode: 'FM', terminal: 1, selfCheckIn: false },
    { name: '샤먼항공', airlineCode: 'MF', terminal: 2, selfCheckIn: false },
    { name: '세부퍼시픽항공', airlineCode: '5J', terminal: 1, selfCheckIn: false },
    { name: '스리랑카항공', airlineCode: 'UL', terminal: 1, selfCheckIn: false },
    { name: '스카이 앙코르 항공', airlineCode: 'ZA', terminal: 1, selfCheckIn: false },
    { name: '스쿠트타이거항공', airlineCode: 'TR', terminal: 1, selfCheckIn: false },
    { name: '심천항공', airlineCode: 'ZH', terminal: 1, selfCheckIn: false },
    { name: '싱가포르항공', airlineCode: 'SQ', terminal: 1, selfCheckIn: false },
    { name: '아르헨티나 항공', airlineCode: 'AR', terminal: 1, selfCheckIn: false },
    { name: '아메리칸항공', airlineCode: 'AA', terminal: 1, selfCheckIn: false },
    { name: '아시아나항공', airlineCode: 'OZ', terminal: 1, selfCheckIn: true },
    { name: '아에로멕시코', airlineCode: 'AM', terminal: 1, selfCheckIn: false },
    { name: '에미레이트항공', airlineCode: 'EK', terminal: 1, selfCheckIn: false },
    { name: '에바항공', airlineCode: 'BR', terminal: 1, selfCheckIn: false },
    { name: '에어 뉴질랜드', airlineCode: 'NZ', terminal: 1, selfCheckIn: false },
    { name: '에어 아스타나', airlineCode: 'KC', terminal: 1, selfCheckIn: false },
    { name: '에어 타히티 누이', airlineCode: 'TN', terminal: 1, selfCheckIn: false },
    { name: '에어 프랑스', airlineCode: 'AF', terminal: 2, selfCheckIn: true },
    { name: '에어로 몽골리아', airlineCode: 'M0', terminal: 1, selfCheckIn: false },
    { name: '에어마카오', airlineCode: 'NX', terminal: 1, selfCheckIn: false },
    { name: '에어부산', airlineCode: 'BX', terminal: 1, selfCheckIn: true },
    { name: '에어서울', airlineCode: 'RS', terminal: 1, selfCheckIn: true },
    { name: '에어아시아 버하드', airlineCode: 'AK', terminal: 1, selfCheckIn: false },
    { name: '에어아시아엑스', airlineCode: 'D7', terminal: 1, selfCheckIn: false },
    { name: '에어인디아 리미티드', airlineCode: 'AI', terminal: 1, selfCheckIn: false },
    { name: '에어프레미아', airlineCode: 'YP', terminal: 1, selfCheckIn: true },
    { name: '에티오피아항공', airlineCode: 'ET', terminal: 1, selfCheckIn: false },
    { name: '에티하드 항공', airlineCode: 'EY', terminal: 1, selfCheckIn: false },
    { name: '오스트리아 항공', airlineCode: 'OS', terminal: 1, selfCheckIn: false },
    { name: '우즈베키스탄항공', airlineCode: 'HY', terminal: 1, selfCheckIn: false },
    { name: '웨스트젯', airlineCode: 'WS', terminal: 1, selfCheckIn: false },
    { name: '유나이티드항공', airlineCode: 'UA', terminal: 1, selfCheckIn: false },
    { name: '이스라엘항공', airlineCode: 'LY', terminal: 1, selfCheckIn: false },
    { name: '이스타항공', airlineCode: 'ZE', terminal: 1, selfCheckIn: true },
    { name: '이집트항공', airlineCode: 'MS', terminal: 1, selfCheckIn: false },
    { name: '일본항공', airlineCode: 'JL', terminal: 1, selfCheckIn: false },
    { name: '전일본공수 주식회사', airlineCode: 'NH', terminal: 1, selfCheckIn: false },
    { name: '제주항공', airlineCode: '7C', terminal: 1, selfCheckIn: true },
    { name: '젯스타', airlineCode: 'JQ', terminal: 1, selfCheckIn: false },
    { name: '중국국제항공', airlineCode: 'CA', terminal: 1, selfCheckIn: false },
    { name: '중국남방항공', airlineCode: 'CZ', terminal: 1, selfCheckIn: false },
    { name: '중국동방항공', airlineCode: 'MU', terminal: 1, selfCheckIn: false },
    { name: '중화항공', airlineCode: 'CI', terminal: 2, selfCheckIn: true },
    { name: '진에어', airlineCode: 'LJ', terminal: 2, selfCheckIn: true },
    { name: '집에어', airlineCode: 'ZG', terminal: 1, selfCheckIn: false },
    { name: '천진항공', airlineCode: 'GS', terminal: 1, selfCheckIn: false },
    { name: '청도항공', airlineCode: 'QW', terminal: 1, selfCheckIn: false },
    { name: '카타르항공', airlineCode: 'QR', terminal: 1, selfCheckIn: false },
    { name: '캐나다항공', airlineCode: 'AC', terminal: 1, selfCheckIn: false },
    { name: '캐세이퍼시픽항공', airlineCode: 'CX', terminal: 1, selfCheckIn: true },
    { name: '코파항공', airlineCode: 'CM', terminal: 1, selfCheckIn: false },
    { name: '콴타스항공', airlineCode: 'QF', terminal: 1, selfCheckIn: false },
    { name: '타이거에어 타이완', airlineCode: 'IT', terminal: 1, selfCheckIn: false },
    { name: '타이에어아시아엑스', airlineCode: 'XJ', terminal: 1, selfCheckIn: false },
    { name: '타이항공', airlineCode: 'TG', terminal: 1, selfCheckIn: false },
    { name: '터키항공', airlineCode: 'TK', terminal: 1, selfCheckIn: true },
    { name: '티웨이항공', airlineCode: 'TW', terminal: 1, selfCheckIn: true },
    { name: '파키스탄 국제 항공', airlineCode: 'PK', terminal: 1, selfCheckIn: false },
    { name: '플라이나스', airlineCode: 'XY', terminal: 1, selfCheckIn: false },
    { name: '피치항공', airlineCode: 'MM', terminal: 1, selfCheckIn: false },
    { name: '핀에어', airlineCode: 'AY', terminal: 1, selfCheckIn: false },
    { name: '필리핀에어아시아', airlineCode: 'Z2', terminal: 1, selfCheckIn: false },
    { name: '필리핀항공', airlineCode: 'PR', terminal: 1, selfCheckIn: false },
    { name: '하와이안 항공', airlineCode: 'HA', terminal: 1, selfCheckIn: false },
    { name: '한 에어', airlineCode: 'H1', terminal: 1, selfCheckIn: false },
    { name: '홍콩익스프레스', airlineCode: 'UO', terminal: 1, selfCheckIn: false },
    { name: '홍콩항공', airlineCode: 'HX', terminal: 1, selfCheckIn: false },
    { name: '루프트한자 독일항공', airlineCode: 'LH', terminal: 1, selfCheckIn: false },
    { name: '미얀마항공', airlineCode: 'UB', terminal: 1, selfCheckIn: false },
    { name: '로얄브루나이항공', airlineCode: 'BI', terminal: 1, selfCheckIn: false },
    { name: '사천항공', airlineCode: '3U', terminal: 1, selfCheckIn: false },
    { name: '에어재팬', airlineCode: 'NQ', terminal: 1, selfCheckIn: false },
    { name: '미얀마국제항공', airlineCode: '8M', terminal: 1, selfCheckIn: false },
    { name: '춘추항공', airlineCode: '9C', terminal: 1, selfCheckIn: false },
    { name: '폴란드항공', airlineCode: 'LO', terminal: 1, selfCheckIn: false },
    { name: '오만항공', airlineCode: 'WY', terminal: 1, selfCheckIn: false },
    { name: '아틀라스항공', airlineCode: '5Y', terminal: 1, selfCheckIn: false },
];

function FlightDialog({ journeyId }) {
    let navigate = useNavigate();
    const dispatch = useDispatch();

    const [flightDate, setFlightDate] = useState();
    const [openCalander, setOpenCalander] = useState(false);

    const [openAirlineList, setOpenAirlineList] = useState(false);
    const [myAirline, setMyAirline] = useState('');
    const [myAirlineCode, setMyAirlineCode] = useState('');

    const [flightNumber, setFlightNumber] = useState('');

    const originalDate = new Date(flightDate);

    // 년, 월, 일, 시, 분, 초 추출
    const year = originalDate.getFullYear();
    const month = (originalDate.getMonth() + 1).toString().padStart(2, '0');
    const day = originalDate.getDate().toString().padStart(2, '0');
    // const hour = originalDate.getHours().toString().padStart(2, '0');
    // const minute = originalDate.getMinutes().toString().padStart(2, '0');
    // const second = originalDate.getSeconds().toString().padStart(2, '0');
    // const milliseconds = originalDate.getMilliseconds().toString().padStart(3, '0');

    // datetime 형식으로 조합
    const formattedDate = `${year}-${month}-${day}`; // ${hour}:${minute}:${second}.${milliseconds}`;

    const createFlightInfoMutation = useMutation({
        mutationFn: (params) => createflightInfo(params),
        onSuccess: (data) => {
            console.log('요청 성공:', data);
            // queryClient.invalidateQueries('createFlightInfo');
        },
        onError: (error) => {
            console.error('요청 실패:', error);
        },
    });

    // const getFlightInfoQuery = useQuery({
    //     queryKey: ['getFlightInfo'],
    //     queryFn: () => getflightInfo(localStorage.getItem('selectedJourneyId')),
    // });

    const handleFlightNumberChange = (e) => {
        setFlightNumber(e.target.value);
    };

    const handleAddFlight = () => {
        console.log(
            `flightDate: ${flightDate}, myAirlineCode: ${myAirlineCode}, flightNumber: ${flightNumber}, ${formattedDate}`
        );
        // console.log(myAirlineCode, flightNumber);
        createFlightInfoMutation.mutate({
            journeyId: `${localStorage.getItem('selectedJourneyId')}`,
            flightInfo: {
                flightCode: flightNumber,
                airline: myAirlineCode,
                departureDate: formattedDate,
                seat: 'not yet',
            },
        });

        // console.log(getFlightInfoQuery.data);

        dispatch(flightInfoActions.initialFlightInfo());
        dispatch(
            flightInfoActions.setFlightInfo({
                journeyId: `${localStorage.getItem('selectedJourneyId')}`,
                flightInfo: {
                    flightCode: flightNumber,
                    airline: myAirlineCode,
                    departureDate: formattedDate,
                    seat: 'not yet',
                },
            })
        );
        navigate('/main');
    };

    // console.log(
    //     'state.flightInfo',
    //     useSelector((state) => state.flightInfo)
    // );

    return (
        <Dialog>
            <div className="my-auto ">
                <div className="my-1 ">
                    <P font="regular" color="neutral" size="xs">
                        등록된 항공편이 아직 없어요!
                    </P>
                </div>
                <DialogTrigger asChild>
                    <Button variant="outline" className="mx-auto">
                        <div className="flex items-center gap-2">
                            <TicketPlus color="#000000" />
                            <P>항공편 등록</P>
                        </div>
                    </Button>
                </DialogTrigger>
            </div>

            <DialogContent>
                {/* 헤더 */}
                <DialogHeader>
                    <DialogTitle>
                        <P variant="mainHeader">항공편 등록</P>
                    </DialogTitle>
                    <DialogDescription className="mx-auto text-neutral-400">
                        여정에 대한 항공편을 등록해주세요.
                    </DialogDescription>
                </DialogHeader>

                {/* 항공기 출발 날짜 캘린더 */}
                <Popover open={openCalander} onOpenChange={setOpenCalander}>
                    <Label htmlFor="calender" className="text-left">
                        날짜
                    </Label>
                    <PopoverTrigger asChild>
                        <Button
                            variant={'outline'}
                            className={cn(
                                'w-[280px] justify-start text-left font-normal',
                                !flightDate && 'text-muted-foreground'
                            )}
                        >
                            <CalendarIcon className="w-4 h-4 mr-2" />
                            {flightDate ? format(flightDate, 'yyyy년 M월 d일') : <span>출발 날짜를 입력해주세요.</span>}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                        <Calendar
                            mode="single"
                            selected={flightDate}
                            onSelect={(currentValue) => {
                                setFlightDate(currentValue);
                                setOpenCalander(false);
                            }}
                            initialFocus
                        />
                    </PopoverContent>
                </Popover>

                {/* 항공사 선택 리스트 */}
                <Popover open={openAirlineList} onOpenChange={setOpenAirlineList} modal={true}>
                    <Label htmlFor="calender" className="text-left">
                        항공사
                    </Label>
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={openAirlineList}
                            className="w-[200px] justify-between"
                        >
                            {myAirline
                                ? airlines.find((airline) => airline.name === myAirline.toUpperCase())?.name
                                : '항공사를 선택해주세요.'}
                            {/* <ChevronsUpDown className="w-4 h-4 ml-2 opacity-50 shrink-0" /> */}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                        <Command>
                            <CommandInput placeholder="한글명으로 검색" />
                            <CommandList>
                                <ScrollArea className="h-48">
                                    <CommandEmpty>일치하는 항공사가 없습니다.</CommandEmpty>
                                    <CommandGroup>
                                        {airlines.map((airline) => (
                                            <CommandItem
                                                key={airline.name}
                                                value={airline.name}
                                                onSelect={(currentValue) => {
                                                    setMyAirline(currentValue === airline ? '' : currentValue);
                                                    setMyAirlineCode(airline.airlineCode);
                                                    setOpenAirlineList(false);
                                                }}
                                            >
                                                <Check
                                                    className={cn(
                                                        'mr-2 h-4 w-4',
                                                        myAirline.name === airline.name ? 'opacity-100' : 'opacity-0'
                                                    )}
                                                />
                                                {airline.name}
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>
                                </ScrollArea>
                            </CommandList>
                        </Command>
                    </PopoverContent>
                </Popover>

                {/* 편명 */}
                <Label htmlFor="flightnumber">편명</Label>
                <Input
                    type="flightnumber"
                    placeholder="알파벳 뒤 세자리 또는 네자리 숫자를 입력하세요."
                    onChange={handleFlightNumberChange}
                ></Input>

                <DialogFooter className="gap-2 my-2 sm:justify-end">
                    <DialogClose asChild>
                        <Button variant="outline" type="cancel">
                            취소
                        </Button>
                    </DialogClose>
                    <DialogClose asChild>
                        <Button variant="brand" type="submit" onClick={handleAddFlight}>
                            등록
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export default FlightDialog;
