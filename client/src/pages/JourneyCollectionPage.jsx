import { JourneyAddDialog } from '@/components/modules/JourneyAddDialog';
import JourneyBox from '@/components/modules/JourneyBox';
import { P } from '@/components/atoms/P';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { authActions } from '@/stores/authStore';
import { useQuery, useQueries, useMutation } from '@tanstack/react-query';
import { getCookie } from '@/apis/cookies';
import { fetchUserProfile, reissueToken } from '@/apis/api/auth';
import { useEffect } from 'react';
import { JourneyAllActions } from '@/stores/journeyAllStore';
import { getJourney, createJourney, deleteJourney, modifyJourney } from '@/apis/api/journey';

function JourneyCollectionPage() {
    const journeyList = useSelector((state) => state.journeyAll);
    console.log(journeyList);

    const dispatch = useDispatch();

    // 로그인 성공 시 유저 정보를 바탕으로 여정 처음에 가져오는 요청

    const { data, isLoading, error } = useQuery({
        queryKey: ['auth'],
        queryFn: fetchUserProfile,
        enabled: true, // useQuery가 즉시 실행되도록 설정
    });

    useEffect(() => {
        if (!isLoading && data) {
            dispatch(authActions.getUserProfile(data.data));
            dispatch(authActions.setAccessToken(getCookie('access_token')));
            dispatch(authActions.setRefreshToken(getCookie('refresh_token')));
        }
    }, [dispatch, isLoading, data]);

    useEffect(() => {
        // 에러가 발생했을 때 처리
        if (error) {
            if (error.response && error.response.status === 401) {
                // access token 만료
                // console.log(error.response);
                reissueToken()
                    .then((refreshTokenResponse) => {
                        if (refreshTokenResponse.status === 200) {
                            return fetchUserProfile();
                        } else {
                            throw new Error('Refresh Token expired');
                        }
                    })
                    .then(() => {
                        //setUser(userInfoResponse.data);
                        dispatch(authActions.getUserProfile(data.data));

                        // setToken({
                        //     accessToken: getCookie('access_token'),
                        //     refreshToken: getCookie('refresh_token'),
                        // });
                        dispatch(authActions.setAccessToken(getCookie('access_token')));
                        dispatch(authActions.setRefreshToken(getCookie('refresh_token')));
                    })
                    .catch(() => {
                        console.log('refresh error');
                        // refresh token도 만료 또는 유효하지 않음
                        // 에러 처리
                        throw new Error('Refresh Token expired');
                    });
            }
        }
    }, [error]);

    const { data: journeyData } = useQuery({
        queryKey: ['journey'],
        queryFn: getJourney,
        enabled: true, // useQuery가 즉시 실행되도록 설정
    });
    useEffect(() => {
        if (journeyData) {
            dispatch(JourneyAllActions.setJourney(journeyData.data)); // 전역 상태에 저장
            console.log('journeyData', journeyData);
        }
    });

    return (
        <>
            <div className="flex flex-col items-center justify-center">
                {journeyList && journeyList.map((journey) => <JourneyBox journey={journey} key={journey.journeyId} />)}

                <div className="rounded-md flex flex-col justify-center mx-8 my-10 py-10 h-80 p-3 shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] text-center w-[80%]">
                    <div className="my-1 ">
                        <P variant="sectionHeader" className="my-1">
                            계획된 여정이 없습니다.
                        </P>
                        <P font="regular" color="neutral" size="xs">
                            완벽한 여행 계획을 위해 여정을 추가해보세요!
                        </P>
                    </div>
                    <div className="my-4 ">
                        <JourneyAddDialog />
                    </div>
                </div>
            </div>
        </>
    );
}

export default JourneyCollectionPage;
