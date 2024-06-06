import { P } from '@/components/atoms/P';
import T1counter from '@/assets/maps/map_baggage_checkin_counter_T1.png';
import T2counter from '@/assets/maps/map_baggage_checkin_counter_T2.png';
import T1counterlabel from '@/assets/maps/map_baggage_checkin_counter_T1_label.png';
import T2counterlabel from '@/assets/maps/map_baggage_checkin_counter_T2_label.png';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { Link } from 'react-router-dom';
import IconAndP from '@/components/modules/IconAndP';
import pointerIcon from '@/assets/icons/pointer.svg';
import { InfoCircledIcon } from '@radix-ui/react-icons';
function CheckInCounterInfoPage() {
    // 임의설정
    const flightInfo = {
        flightNo: 'TW291',
        realFlightNo: 'TW291',
        terminalNo: '1',
        checkinCounter: 'F01-F36',
    };

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

    const counterMapStyle =
        flightInfo.terminalNo == '1'
            ? {
                initialScale: 1.7,
                initialPositionX: -130,
                initialPositionY: -76,
                mapSrc: T1counter,
                mapLabelSrc: T1counterlabel,
            }
            : {
                initialScale: 1.7,
                initialPositionX: -122,
                initialPositionY: -95,
                mapSrc: T2counter,
                mapLabelSrc: T2counterlabel,
            };

    return (
        <div className="flex flex-col items-center justify-end w-full">
            <P variant="mainHeader" className="my-10">
                체크인 카운터 안내
            </P>
            <TransformWrapper
                initialScale={counterMapStyle.initialScale}
                initialPositionX={counterMapStyle.initialPositionX}
                initialPositionY={counterMapStyle.initialPositionY}
            >
                <TransformComponent>
                    <img src={counterMapStyle.mapSrc}></img>
                </TransformComponent>
                <img src={counterMapStyle.mapLabelSrc}></img>
            </TransformWrapper>

            <P className="text-xs text-gray-400">손가락을 움직여 화면을 움직이거나 크기를 조절할 수 있습니다.</P>

            <div className="flex flex-col items-center justify-center w-[90%] my-5 text-xl bg-white border shadow-lg h-36 rounded-3xl">
                <div className="flex items-center ">
                    <p className="px-2 text-3xl font-bold">{flightInfo.flightNo}</p>
                    <p>편 체크인 카운터는</p>
                </div>
                <div className="flex">
                    <p>제</p>
                    <p className="px-2 text-3xl font-bold">{flightInfo.terminalNo}</p>
                    <p>여객터미널의</p>
                </div>
                <div className="flex">
                    <p className="px-2 text-3xl font-bold">{flightInfo.checkinCounter}</p>
                    <p>입니다.</p>
                </div>
            </div>
            <div className="self-center">
                <div className="grid grid-cols-2">
                    <p>운항사</p>
                    <p className="text-end">
                        {airlines.find((airline) => airline.airlineCode == flightInfo.flightNo.substring(0, 2)).name}
                    </p>
                </div>
                <div className="grid grid-cols-2">
                    <p>실제 운항사</p>
                    <p className="text-end">
                        {
                            airlines.find((airline) => airline.airlineCode == flightInfo.realFlightNo.substring(0, 2))
                                .name
                        }
                    </p>
                </div>
                <div className="grid grid-cols-2">
                    <p>셀프 체크인 / 백드랍</p>
                    {/* 밑에 수정 */}
                    {airlines.find((airline) => airline.airlineCode == flightInfo.realFlightNo.substring(0, 2))
                        .selfCheckIn ? (
                        <p className="text-blue-600 text-end">가능</p>
                    ) : (
                        <p className="text-red-600 text-end">불가능</p>
                    )}
                    <P></P>
                </div>
            </div>

            <Link to="/info/terminaltransport">
                <IconAndP
                    className="flex flex-row justify-center my-5 mb-4"
                    svg={pointerIcon}
                    text="혹시 다른 터미널에 계신가요?"
                />
            </Link>
            <div className="self-start mx-2 my-4">
                <div className="flex items-center gap-2 my-1">
                    <InfoCircledIcon />
                    <P variant="content">실제 운항사란?</P>
                </div>
                <P>
                    공동운항 여부에 따라 예약한 항공사와 실제 운항하는 항공사가 다른 경우가 있어요. 이 경우에 해당편
                    수속은 실제 운항 항공사 카운터에서 담당하게 됩니다.
                </P>
            </div>
        </div>
    );
}

export default CheckInCounterInfoPage;
