import { Card, CardContent } from '@/components/atoms/Card';
import clearDay from '@bybas/weather-icons/design/fill/animation-ready/clear-day.svg';
import partlyCloudyDay from '@bybas/weather-icons/design/fill/animation-ready/partly-cloudy-day.svg';
import celsius from '@bybas/weather-icons/design/fill/animation-ready/celsius.svg';
import AirportTimeInfoBox from '@/components/modules/AirportTimeInfoBox';
import { P } from '@/components/atoms/P';
import { Separator } from '../atoms/Separator';
import { PlaneLanding, PlaneTakeoff } from 'lucide-react';
import { Badge } from '../atoms/Badge';

// TODO: dummy data
const flightInfo = {
    departureDate: '2024-03-08',
    flightCode: 'TW213',
    departureAirportIATA: 'ICN',
    arrivalAirportIATA: 'NRT',
    flightTime: '2h 30m',
    departureTime: {
        timeZone: 'UTC+09:00',
        time: '10:20',
    },
    arrivalTime: {
        timeZone: 'UTC+09:00',
        time: '12:50',
    },
    departureAirportName: '인천',
    arrivalAirportName: '도쿄/나리타',
};

const WeatherInfo = () => {
    return (
        <Card className="border-none shadow-none">
            <CardContent className="flex items-center justify-around gap-2 px-1 mx-4 my-6 bg-white ">
                <div className="mx-2 ">
                    <Badge className="bg-gray-400">
                        <div className="flex items-center gap-2">
                            <PlaneTakeoff />
                            서울/인천
                        </div>
                    </Badge>

                    <div className="flex flex-col items-start justify-between gap-2 -mx-1 ">
                        <div className="mx-1 my-1 ">
                            <AirportTimeInfoBox code={'ICN'}></AirportTimeInfoBox>
                        </div>
                        <div className="flex items-center ">
                            <div>
                                {/* TODO : 날씨 이미지 */}
                                {/* 참고 https://basmilius.github.io/weather-icons/index-fill.html */}
                                <img src={clearDay} alt="clearDay" width="90px" />
                            </div>
                            <div className="flex items-center">
                                {/* TODO: 기온 */}
                                <P size="5xl">3</P>
                                <img src={celsius} alt="celsius" width="60px" className="self-end -m-3 " />
                            </div>
                        </div>
                    </div>
                </div>
                <Separator orientation="vertical" className="h-48 " />
                <div className="mx-2 ">
                    <Badge className="bg-gray-400">
                        <div className="flex items-center gap-2">
                            <PlaneLanding />
                            {/* TODO : 현지 공항 이름 */}
                            {flightInfo.arrivalAirportName}
                        </div>
                    </Badge>

                    <div className="flex flex-col items-start justify-between gap-2 -mx-1">
                        <div className="mx-1 my-1 ">
                            {/* TODO: 현지 공항 코드로 현지 시각 정보 계산 */}
                            <AirportTimeInfoBox code={flightInfo.arrivalAirportIATA}></AirportTimeInfoBox>
                        </div>
                        <div className="flex items-center ">
                            <div>
                                {/* TODO : 날씨 이미지 */}
                                {/* 참고 https://basmilius.github.io/weather-icons/index-fill.html */}
                                <img src={partlyCloudyDay} alt="partlyCloudyDay" width="90px" />
                            </div>
                            <div className="flex items-center">
                                {/* TODO: 기온 */}
                                <P size="5xl">5</P>
                                <img src={celsius} alt="celsius" width="60px" className="self-end -m-3" />
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default WeatherInfo;
