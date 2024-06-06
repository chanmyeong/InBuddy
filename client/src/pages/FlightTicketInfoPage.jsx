import { Card, CardContent, CardFooter, CardHeader } from '@/components/atoms/Card';
import { Div } from '@/components/atoms/Div';
import FlightBox from '@/components/modules/FlightBox';
import { InformationCircleIcon } from '@heroicons/react/24/solid';
import cloudImg from '@/assets/cloud-img.svg';
import { useEffect, useState } from 'react';
import { P } from '@/components/atoms/P';
import { Separator } from '@/components/atoms/Separator';
import { Circle, MessageCircleWarning, Pencil } from 'lucide-react';
import { Link } from 'react-router-dom';
import SeatInfoBox from '@/components/modules/SeatInfoBox';
import WeatherInfo from '@/components/modules/WeatherInfo';
import FlightDelayInfo from '@/components/modules/FlightDelayInfo';
import FlightCancellationInfo from '@/components/modules/FlightCancellationInfo';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/atoms/dialog';
import { Alert } from '@/components/atoms/Alert';
import { Button } from '@/components/atoms/Button';
import { useQuery } from '@tanstack/react-query';
import { getFlightStatusInfo } from '@/apis/api/flightStatusInfo';
import { useSelector } from 'react-redux';
import { flightInfo } from '@/components/modules/JourneyBox';

// TODO: dummy data
// const flightInfo = {
//     departureDate: '2024-04-11',
//     flightCode: '5Y517',
//     departureAirportIATA: 'ICN',
//     arrivalAirportIATA: 'NRT',
//     flightTime: '1h 25m',
//     departureTime: {
//         timeZone: 'UTC+09:00',
//         time: '10:20',
//     },
//     arrivalTime: {
//         timeZone: 'UTC+09:00',
//         time: '12:50',
//     },
//     departureAirportName: '인천',
//     arrivalAirportName: '도쿄/나리타',
// };

const statusCode = Object.freeze({
    출발: { text: '출발', ready: '탑승 완료', color: 'success-400' },
    정상: { text: '정상', ready: '탑승 준비', color: 'success-400', component: WeatherInfo },
    지연: { text: '지연', ready: '탑승 지연', color: 'warning-400', component: FlightDelayInfo },
    결항: { text: '결항', ready: '탑승 취소', color: 'error-400', component: FlightCancellationInfo },
});

function FlightTicketInfoPage() {
    const [seatNum, setSeatNum] = useState(null);
    const [boardingGate, setBoardingGate] = useState('-');
    const [isOpen, setIsOpen] = useState(false);
    const [status, setStatus] = useState('');

    const isConcourse = 101 <= Number(boardingGate) && Number(boardingGate) <= 132;

    const getFlightStatusQuery = useQuery({
        queryKey: ['flightStatusInfo'],
        queryFn: () => getFlightStatusInfo(flightInfo.flightCode.slice(0, 2), flightInfo.flightCode.slice(2, 5)),
        enabled: true,
    });

    // useEffect(() => {
    //     console.log('flightInfo', flightInfo);
    //     console.log(flightInfo.status);
    //     if (flightInfo.status === undefined || flightInfo.status === '') {
    //         alert('현재 항공권 상태를 알 수 없습니다.');
    //     }
    // }, []);

    useEffect(() => {
        if (getFlightStatusQuery.isSuccess) {
            const response = getFlightStatusQuery.data.data;
            if (response.data && response.data.flight_Status !== null) {
                const flightStatus = response.data.flight_status;
                console.log(response);
                setStatus(statusCode[flightStatus]);
            }
        } else if (getFlightStatusQuery.isError) {
            const response = getFlightStatusQuery.error;
            console.log(response);
        }
    }, [getFlightStatusQuery]);

    return (
        <>
            {isConcourse && (
                <Dialog defaultOpen={isConcourse}>
                    <DialogTrigger className="w-[100%]">
                        <Alert className="flex items-center border border-warning-400">
                            <MessageCircleWarning className="stroke-warning-400" />
                            <P size="md" className="text-center">
                                해당 항공편은 탑승동에서 출발하는 항공편입니다.
                            </P>
                        </Alert>
                    </DialogTrigger>
                    <DialogContent className="w-[80%] rounded-lg border-warning-400">
                        <DialogHeader className="text-left">
                            <DialogTitle>
                                <div className="flex items-center gap-1">
                                    <MessageCircleWarning className="stroke-warning-400" />
                                    <P size="lg" font="bold">
                                        탑승동에서 출발하는 항공편
                                    </P>
                                </div>
                            </DialogTitle>
                        </DialogHeader>
                        <div>
                            <P>해당 항공편을 탑승하기 위해서는 출국심사 이후 셔틀트레인을 타야 합니다.</P>
                            <P>이동에 추가로 시간이 소요될 수 있으니 참고 바랍니다.</P>
                        </div>
                    </DialogContent>
                </Dialog>
            )}
            <div
                className="flex flex-col items-center justify-end w-full"
                style={{
                    backgroundImage: `url(${cloudImg})`,
                    backgroundPosition: '70% 0%',
                    backgroundRepeat: 'no-repeat',
                }}
            >
                {
                    <div className="mt-10 w-[90%]">
                        <Card className={`bg-${status?.color} mx-2 my-2 shadow-xl border-none rounded-2xl`}>
                            <CardHeader className="relative flex flex-col h-12">
                                <Div
                                    className="absolute w-32 transform -translate-x-1/2 bg-white border border-black -translate-y-1/4 -top-1/4 left-1/2"
                                    size="sm"
                                >
                                    <InformationCircleIcon className="w-4 h-4" />
                                    <p className="px-2">{status?.ready}</p>
                                </Div>
                            </CardHeader>
                            <CardContent className="items-center px-4 py-4 my-2 bg-white">
                                {/* TODO : flighInfo */}
                                <FlightBox flightInfo={flightInfo} />
                                <div className="flex flex-col">
                                    <div className="flex justify-around ">
                                        <div className="flex flex-col w-1/2 mx-3 my-2">
                                            <Separator className="my-2" />
                                            <P variant="content" font="regular" size="sm" color="neutral">
                                                탑승구
                                            </P>
                                            <div className="flex flex-col items-center py-1">
                                                {/* TODO : 탑승구 boardingGate  */}
                                                <P variant="content" size="xl" className="text-center " font="regular">
                                                    {boardingGate}
                                                </P>
                                                {boardingGate !== '-' && (
                                                    <P
                                                        variant="content"
                                                        size="sm"
                                                        className="text-center underline"
                                                        font="regular"
                                                        color="neutral"
                                                    >
                                                        <Link>위치 확인</Link>
                                                    </P>
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex flex-col w-1/2 mx-3 my-2">
                                            <Separator className="my-2" />
                                            <div className="flex items-center justify-between gap-2">
                                                <P variant="content" font="regular" size="sm" color="neutral">
                                                    좌석 번호
                                                </P>
                                                {seatNum && (
                                                    <SeatInfoBox
                                                        setSeatNum={setSeatNum}
                                                        isOpen={isOpen}
                                                        setIsOpen={setIsOpen}
                                                    >
                                                        <Pencil
                                                            size="15"
                                                            className="mr-2 cursor-pointer stroke-neutral-400"
                                                        />
                                                    </SeatInfoBox>
                                                )}
                                            </div>

                                            <div className="flex flex-col items-center py-1 ">
                                                {/* TODO : 좌석 번호  */}
                                                {seatNum ? (
                                                    <>
                                                        <P
                                                            variant="content"
                                                            size="xl"
                                                            className="text-center "
                                                            font="regular"
                                                        >
                                                            {seatNum}
                                                        </P>

                                                        <P
                                                            variant="content"
                                                            size="sm"
                                                            className="text-center underline"
                                                            font="regular"
                                                            color="neutral"
                                                        >
                                                            <Link>위치 확인</Link>
                                                        </P>
                                                    </>
                                                ) : (
                                                    <SeatInfoBox
                                                        setSeatNum={setSeatNum}
                                                        isOpen={isOpen}
                                                        setIsOpen={setIsOpen}
                                                    >
                                                        <Button variant="outline">등록</Button>
                                                    </SeatInfoBox>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex justify-around">
                                        <div className="flex flex-col w-1/2 mx-3 my-2">
                                            <Separator className="my-2" />
                                            <P variant="content" font="regular" size="sm" color="neutral">
                                                예정된 출발 시간
                                            </P>
                                            {/* TODO : 예정 출발 시간  */}
                                            <P variant="content" size="xl" className="py-1 text-center" font="regular">
                                                {flightInfo.departureTime.timeExpected}
                                            </P>
                                        </div>
                                        <div className="flex flex-col w-1/2 mx-3 my-2">
                                            <Separator className="my-2" />
                                            <P variant="content" font="regular" size="sm" color="neutral">
                                                상태
                                            </P>
                                            <div className="py-1 text-xl text-center">
                                                <div className="flex items-center justify-center">
                                                    <Circle className={`fill-${status?.color}`} color={status?.color} />
                                                    <p className="px-3">{status?.text}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter className="h-12"></CardFooter>
                        </Card>
                    </div>
                }
            </div>
            {getFlightStatusQuery.isSuccess && <></>}
        </>
    );
}

export default FlightTicketInfoPage;
