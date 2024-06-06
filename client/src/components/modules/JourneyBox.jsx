import { P } from '@/components/atoms/P';
import FlightBox from './FlightBox';
import PropTypes from 'prop-types';
import FlightDialog from './FlightDialog';
import Stamp from '@/assets/stamp.png';

import { useDispatch, useSelector } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

import { journeyActions } from '@/stores/journeyStore';

import { getflightInfo } from '@/apis/api/flightInfo';
import { getFlightStatusInfo } from '@/apis/api/flightStatusInfo';
import { flightInfoActions } from '@/stores/flightInfoStore';

JourneyBox.propTypes = {
    journey: PropTypes.object.isRequired,
};

// TODO: dummy data
export let flightInfo = {
    departureDate: '',
    flightCode: '',
    departureAirportIATA: 'ICN',
    arrivalAirportIATA: '',
    flightTime: '',
    departureTime: {
        timeZone: 'UTC+09:00',
        timeExpected: '',
        timePlan: '',
    },
    arrivalTime: {
        timeZone: 'UTC+09:00',
        timeExpected: '',
        timePlan: '',
    },
    departureAirportName: '인천',
    arrivalAirportName: '',
    flight_status: '',
};

function transformString(str) {
    // 정규 표현식을 사용하여 괄호 안의 내용을 추출하고 공백을 기준으로 첫 번째와 두 번째 단어를 '/'로 연결
    const result = str.replace(/\(([^)]+)\)/, (match, p1) => {
        // p1은 괄호 안의 내용을 나타냄
        const parts = p1.split(' '); // 공백을 기준으로 문자열을 분리
        if (parts.length >= 2) {
            return `${parts[0]}/${parts[1]}`; // 첫 번째와 두 번째 단어를 '/'로 연결
        }
        return p1; // 만약 분리된 부분이 2개 미만이라면 원본 문자열의 괄호 안 내용을 반환
    });

    return result;
}

function JourneyBox({ journey }) {
    const dispatch = useDispatch();

    // const flightInfoList = useSelector((state) => state.flightInfo);
    // const journeyList = useSelector((state) => state.journey);
    //console.log(journey);
    console.log('map 내부', journey.journeyId);
    // const [hasFlightInfo, setHasFlightInfo] = useState(false);

    // console.log(flightInfoList);
    // console.log(journeyList);

    const getFlightInfoQuery = useQuery({
        queryKey: ['getFlightInfo', journey.journeyId],
        queryFn: () => getflightInfo(journey.journeyId),
    });

    if (getFlightInfoQuery.isSuccess) {
        console.log(getFlightInfoQuery.data.data);
        if (getFlightInfoQuery.data.data !== null) {
            flightInfo.departureDate = getFlightInfoQuery.data.data.departureDate;
            flightInfo.flightCode = getFlightInfoQuery.data.data.airline + getFlightInfoQuery.data.data.flightCode;
        }
    }
    //console.log('getFlightInfoQuery 이후의 flightInfo 정보', flightInfo);

    const getFlightStatusQuery = useQuery({
        queryKey: ['flightStatusInfo', journey.journeyId],
        queryFn: () => getFlightStatusInfo(flightInfo.flightCode.slice(0, 2), flightInfo.flightCode.slice(2, 5)),
        enabled: true,
    });

    if (getFlightStatusQuery.isSuccess) {
        if (getFlightStatusQuery.data.data.data !== null) {
            flightInfo.arrivalAirportIATA = getFlightStatusQuery.data.data.data.destination.slice(0, 3);
            flightInfo.departureTime.timeExpected = getFlightStatusQuery.data.data.data.departure_time_expected;
            flightInfo.departureTime.timePlan = getFlightStatusQuery.data.data.data.departure_time_plan;
            flightInfo.arrivalAirportName = transformString(getFlightStatusQuery.data.data.data.destination.slice(3));

            // const copyFlightInfo = { ...flightInfo };
            // console.log('copyFlightInfo', copyFlightInfo);
            // dispatch(flightInfoActions.initialFlightInfo());
            // dispatch(flightInfoActions.setFlightInfo({ ...copyFlightInfo }));

            getFlightInfoQuery.refetch();
        }
    }

    console.log('getFlightStatusQuery 이후의 flightInfo 정보', flightInfo);

    console.log(
        '지금',
        useSelector((state) => state.flightInfo)
    );
    // useEffect(() => {
    //     if (getFlightInfoQuery.data && getFlightInfoQuery.data.data) {
    //         // && getMyFlightQuery.data
    //         // setHasFlightInfo(true);
    //         // 여기서 flightInfo 객체 내부 바꿔주기
    //         const newFlightInfo = {
    //             journeyId: journey.journeyId,
    //             ...getFlightInfoQuery.data.data,
    //         };
    //         console.log(newFlightInfo);

    //         flightInfo = {
    //             departureDate: getFlightInfoQuery.data.data.departureDate,
    //             flightCode: getFlightInfoQuery.data.data.airline + getFlightInfoQuery.data.data.flightCode,
    //             departureAirportIATA: 'ICN',
    //             arrivalAirportIATA: 'FUK',
    //             flightTime: '1h 25m',
    //             departureTime: {
    //                 timeZone: 'UTC+09:00',
    //                 time: '10:05',
    //             },
    //             arrivalTime: {
    //                 timeZone: 'UTC+09:00',
    //                 time: '11:30',
    //             },
    //             departureAirportName: '인천',
    //             arrivalAirportName: '후쿠오카',
    //         };
    //         console.log('flightInfo', flightInfo);

    //         dispatch(journeyActions.initialJourney(newFlightInfo));
    //         dispatch(journeyActions.setJourney(newFlightInfo));
    //     }
    // }, [getFlightInfoQuery.data]);

    // 박스 공통 레이아웃
    const commonClassName =
        'rounded-md flex flex-col mx-8 my-10 py-10 h-80 p-3 shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] text-center w-[80%]';

    // 과거 여정 박스에만 적용되는 스타일 (ex: 완료 스탬프 추가)
    const pastJourneystyle = {
        backgroundImage: `url(${Stamp})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
    };

    const handleJourneyClick = () => {
        localStorage.setItem('selectedJourneyId', journey.journeyId); // localStorage에 journeyId 저장
    };

    return (
        <>
            <div
                className={commonClassName}
                style={journey.journeyDone ? pastJourneystyle : null}
                onClick={handleJourneyClick}
            >
                <P variant="mainHeader" className="my-4">
                    {journey.journeyName}
                </P>
                {/* 여기서 내가 지금 가진 journey.id를 쏴. api로.
                    그럼 journey.id에 등록된 항공편 정보가 들어오겠지.
                    그럼 그 정보를 journey.flightInfo에 담아.
                    이러면 journey.id에 등록된 항공편 정보가 없었다면 null이나 뭐 다른게 반환될꺼고
                    그러면 등록해달라는 버튼이 나오면 되는거고 // 정보가 있으면 해당하는
                    정보 보여주면 됨 journey.flightInfo*/}
                {getFlightInfoQuery.data && getFlightInfoQuery.data.data ? (
                    <FlightBox flightInfo={flightInfo} />
                ) : (
                    <FlightDialog journeyId={journey.journeyId} />
                )}
            </div>
        </>
    );
}

export default JourneyBox;
