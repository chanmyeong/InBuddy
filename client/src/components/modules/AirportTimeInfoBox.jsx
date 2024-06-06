import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';
import { P } from '@/components/atoms/P';

const airports = {
    ICN: 'Asia/Seoul',
    AMS: 'Europe/Amsterdam', // 암스테르담
    KTM: 'Asia/Kathmandu', // 카트만두
    OSL: 'Europe/Oslo', // 오슬로
    NOU: 'Pacific/Noumea', // 누메아
    AKL: 'Pacific/Auckland', // 오클랜드
    KHH: 'Asia/Taipei', // 가오슝
    TPE: 'Asia/Taipei', // 타이페이
    CPH: 'Europe/Copenhagen', // 코펜하겐
    MUC: 'Europe/Berlin', // 뮌헨
    CGN: 'Europe/Berlin', // 쾰른
    FRA: 'Europe/Berlin', // 프랑크푸르트
    VTE: 'Asia/Vientiane', // 비엔티안
    OVB: 'Asia/Novosibirsk', // 노보시비르스크
    SVO: 'Europe/Moscow', // 모스크바
    VVO: 'Asia/Vladivostok', // 블라디보스토크
    UUS: 'Asia/Sakhalin', // 사할린
    LED: 'Europe/Moscow', // 상트페테르부르크
    YKS: 'Asia/Yakutsk', // 야쿠츠크
    IKT: 'Asia/Irkutsk', // 이르쿠츠크
    KHV: 'Asia/Vladivostok', // 하바로프스크
    BEY: 'Asia/Beirut', // 베이루트
    LUX: 'Europe/Luxembourg', // 룩셈부르크
    BKI: 'Asia/Kuala_Lumpur', // 코타키나발루
    KUL: 'Asia/Kuala_Lumpur', // 쿠알라룸푸르
    PEN: 'Asia/Kuala_Lumpur', // 페낭
    MLE: 'Indian/Maldives', // 말레
    ULN: 'Asia/Ulaanbaatar', // 울란바토르
    GUM: 'Pacific/Guam', // 괌
    JFK: 'America/New_York', // 뉴욕
    EWR: 'America/New_York', // 뉴욕/뉴어크
    DFW: 'America/Chicago', // 댈러스
    DTW: 'America/Detroit', // 디트로이트
    LAS: 'America/Los_Angeles', // 라스베이거스
    LAX: 'America/Los_Angeles', // 로스앤젤레스
    MIA: 'America/New_York', // 마이애미
    MEM: 'America/Chicago', // 멤피스
    SPN: 'Pacific/Saipan', // 사이판
    SFO: 'America/Los_Angeles', // 샌프란시스코
    SEA: 'America/Los_Angeles', // 시애틀
    ORD: 'America/Chicago', // 시카고
    ATL: 'America/New_York', // 애틀랜타
    ANC: 'America/Anchorage', // 앵커리지
    ILN: 'America/New_York', // 에어본 에어파크
    IAD: 'America/New_York', // 워싱턴
    IND: 'America/Indiana/Indianapolis', // 인디애나폴리스
    PHL: 'America/New_York', // 필라델피아
    HNL: 'Pacific/Honolulu', // 호놀룰루
    HOU: 'America/Chicago', // 휴스턴
    RGN: 'Asia/Yangon', // 양곤
    BAH: 'Asia/Bahrain', // 바레인
    DAC: 'Asia/Dhaka', // 다카
    CCS: 'America/Caracas', // 마이케티아
    DAD: 'Asia/Ho_Chi_Minh', // 다낭
    HAN: 'Asia/Ho_Chi_Minh', // 하노이
    SGN: 'Asia/Ho_Chi_Minh', // 호찌민
    BRU: 'Europe/Brussels', // 브뤼셀
    SOF: 'Europe/Sofia', // 소피아
    GRU: 'America/Sao_Paulo', // 상파울루
    BWN: 'Asia/Brunei', // 반다르스리브가완
    CMB: 'Asia/Colombo', // 콜롬보
    GOT: 'Europe/Stockholm', // 고테버그
    STO: 'Europe/Stockholm', // 스톡홀름
    BSL: 'Europe/Zurich', // 바젤
    ZRH: 'Europe/Zurich', // 취리히
    MAD: 'Europe/Madrid', // 마드리드
    BCN: 'Europe/Madrid', // 바르셀로나
    SIN: 'Asia/Singapore', // 싱가포르
    DXB: 'Asia/Dubai', // 두바이
    AUH: 'Asia/Dubai', // 아부다비
    BUE: 'America/Argentina/Buenos_Aires', // 부에노스 아이레스
    GYD: 'Asia/Baku', // 바쿠
    LHR: 'Europe/London', // 런던/히드로
    MEL: 'Australia/Melbourne', // 멜버른
    BNE: 'Australia/Brisbane', // 브리즈번
    SYD: 'Australia/Sydney', // 시드니
    VIE: 'Europe/Vienna', // 비엔나
    TAS: 'Asia/Tashkent', // 타슈켄트
    THR: 'Asia/Tehran', // 테헤란
    TLV: 'Asia/Tel_Aviv', // 텔아비브
    CAI: 'Africa/Cairo', // 카이로
    FCO: 'Europe/Rome', // 로마
    MXP: 'Europe/Rome', // 밀라노
    DEL: 'Asia/Kolkata', // 델리
    BOM: 'Asia/Kolkata', // 뭄바이
    MAA: 'Asia/Kolkata', // 첸나이
    DPS: 'Asia/Jakarta', // 덴파사르
    CGK: 'Asia/Jakarta', // 자카르타
    KOJ: 'Asia/Tokyo', // 가고시마
    KMQ: 'Asia/Tokyo', // 고마쓰
    KMJ: 'Asia/Tokyo', // 구마모토
    KKJ: 'Asia/Tokyo', // 기타큐슈
    NGS: 'Asia/Tokyo', // 나가사키
    NGO: 'Asia/Tokyo', // 나고야
    KIJ: 'Asia/Tokyo', // 니가타
    TAK: 'Asia/Tokyo', // 다카마쓰
    TOY: 'Asia/Tokyo', // 도야마
    NRT: 'Asia/Tokyo', // 도쿄/ 나리타
    HND: 'Asia/Tokyo', // 도쿄/ 하네다
    MYJ: 'Asia/Tokyo', // 마쓰야마
    KMI: 'Asia/Tokyo', // 미야자키
    CTS: 'Asia/Tokyo', // 삿포로
    SDJ: 'Asia/Tokyo', // 센다이
    FSZ: 'Asia/Tokyo', // 시즈오카
    AKJ: 'Asia/Tokyo', // 아사히카와
    AOJ: 'Asia/Tokyo', // 아오모리
    OSA: 'Asia/Tokyo', // 오사카
    KIX: 'Asia/Tokyo', // 오사카/ 간사이
    OIT: 'Asia/Tokyo', // 오이타
    OKJ: 'Asia/Tokyo', // 오카야마
    OKA: 'Asia/Tokyo', // 오키나와
    YGJ: 'Asia/Tokyo', // 요나고
    HKD: 'Asia/Tokyo', // 하코다테
    FKS: 'Asia/Tokyo', // 후쿠시마
    FUK: 'Asia/Tokyo', // 후쿠오카
    HIJ: 'Asia/Tokyo', // 히로시마
    CAN: 'Asia/Shanghai', // 광저우
    KWL: 'Asia/Shanghai', // 구이린(계림)
    KWE: 'Asia/Shanghai', // 구이양
    NNG: 'Asia/Shanghai', // 난닝
    NKG: 'Asia/Shanghai', // 난징
    KHN: 'Asia/Shanghai', // 난창
    NGB: 'Asia/Shanghai', // 닝보
    DLC: 'Asia/Shanghai', // 다롄
    LJG: 'Asia/Shanghai', // 리장
    MFM: 'Asia/Macau', // 마카오
    MDG: 'Asia/Shanghai', // 무단장
    PEK: 'Asia/Shanghai', // 베이징
    PVG: 'Asia/Shanghai', // 상하이/ 푸동
    XMN: 'Asia/Shanghai', // 샤먼
    SIA: 'Asia/Shanghai', // 서안
    SHE: 'Asia/Shanghai', // 선양
    SZX: 'Asia/Shanghai', // 선전
    SJW: 'Asia/Shanghai', // 스자좡
    XIY: 'Asia/Shanghai', // 시안
    SYX: 'Asia/Shanghai', // 싼야
    YNJ: 'Asia/Shanghai', // 옌지
    YNZ: 'Asia/Shanghai', // 옌청
    YNT: 'Asia/Shanghai', // 옌타이
    URC: 'Asia/Urumqi', // 우루무치
    WEH: 'Asia/Shanghai', // 웨이하이
    CGO: 'Asia/Shanghai', // 정저우
    TNA: 'Asia/Shanghai', // 지난
    CSX: 'Asia/Shanghai', // 창사
    CGQ: 'Asia/Shanghai', // 창춘
    CTU: 'Asia/Shanghai', // 청두
    CKG: 'Asia/Shanghai', // 충칭
    TAO: 'Asia/Shanghai', // 칭다오
    KMG: 'Asia/Shanghai', // 쿤밍
    TSN: 'Asia/Shanghai', // 톈진
    HRB: 'Asia/Shanghai', // 하얼빈
    HAK: 'Asia/Shanghai', // 하이커우
    HGH: 'Asia/Shanghai', // 항저우
    HKG: 'Asia/Hong_Kong', // 홍콩
    HIA: 'Asia/Shanghai', // 화이안
    PRG: 'Europe/Prague', // 프라하
    STI: 'America/Santo_Domingo', // 산티아고
    TSE: 'Asia/Almaty', // 아스타나
    ALA: 'Asia/Almaty', // 알마티
    DOH: 'Asia/Qatar', // 도하
    REP: 'Asia/Phnom_Penh', // 시엠립
    PNH: 'Asia/Phnom_Penh', // 프놈펜
    YVR: 'America/Vancouver', // 밴쿠버
    YYC: 'America/Edmonton', // 캘거리
    YYZ: 'America/Toronto', // 토론토
    KWI: 'Asia/Kuwait', // 쿠웨이트
    FRU: 'Asia/Bishkek', // 비슈케크
    BKK: 'Asia/Bangkok', // 방콕
    DMK: 'Asia/Bangkok', // 방콕/돈므앙
    CNX: 'Asia/Bangkok', // 치앙마이
    HKT: 'Asia/Bangkok', // 푸껫
    IST: 'Europe/Istanbul', // 이스탄불
    ASB: 'Asia/Ashgabat', // 아쉬가바트
    ROR: 'Pacific/Palau', // 코로르
    WAW: 'Europe/Warsaw', // 바르샤바
    CDG: 'Europe/Paris', // 파리
    NAN: 'Pacific/Fiji', // 난디
    HEL: 'Europe/Helsinki', // 헬싱키
    MNL: 'Asia/Manila', // 마닐라
    CEB: 'Asia/Manila', // 세부
    SFS: 'Asia/Manila', // 수비크
    KLO: 'Asia/Manila', // 칼리보
    CRK: 'Asia/Manila', // 클라크필드
    TAE: 'Asia/Seoul', // 대구
    PUS: 'Asia/Seoul', // 부산
    GMP: 'Asia/Seoul', // 서울/ 김포
    CJU: 'Asia/Seoul', // 제주
};

const AirportTimeInfoBox = ({ code }) => {
    const [date, setDate] = useState();
    const [time, setTime] = useState('');

    useEffect(() => {
        let requestAnimationFrameId;

        const updateTime = () => {
            const timezone = airports[code];
            if (timezone) {
                // 현재 UTC 시간을 공항의 타임존에 맞게 변환
                const now = new Date();
                const zonedTime = utcToZonedTime(now, timezone);
                // 변환된 시간을 원하는 포맷으로 표시
                const formattedDate = format(zonedTime, 'yyyy년 MM월 dd일', { timeZone: timezone });
                const formattedTime = format(zonedTime, 'hh:mm a', { timeZone: timezone });
                setDate(formattedDate);
                setTime(formattedTime);
            } else {
                setTime('Unknown Airport Code');
            }
            requestAnimationFrameId = requestAnimationFrame(updateTime);
        };

        const handleVisibilityChange = () => {
            if (document.visibilityState === 'visible') {
                updateTime();
            } else {
                cancelAnimationFrame(requestAnimationFrameId);
            }
        };

        updateTime();
        document.addEventListener('visibilitychange', handleVisibilityChange);

        return () => {
            cancelAnimationFrame(requestAnimationFrameId);
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, [code]);

    return (
        <>
            <P size="sm" color="neutral">
                {date}
            </P>
            <P size="xl" font="bold">
                {time}
            </P>
        </>
    );
};

export default AirportTimeInfoBox;
