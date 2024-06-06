import { Info, MessageSquareWarningIcon } from 'lucide-react';
import { Badge } from '@/components/atoms/Badge';
import { Card, CardHeader } from '@/components/atoms/Card';
import { P } from '@/components/atoms/P';
import { useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { getflightDelayInfo } from '@/apis/api/flightStatusInfo';

export const Spinner = () => {
    return (
        <div role="status">
            <svg
                aria-hidden="true"
                className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                />
                <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                />
            </svg>
            <span className="sr-only">Loading...</span>
        </div>
    );
};

const FlightDelayInfo = () => {
    const [prediction, setPrediction] = useState('');

    const flightDelayMutation = useMutation({
        mutationFn: (journeyName) => getflightDelayInfo(journeyName),
        onSuccess: (data) => {
            setPrediction(data.data);
            // console.log('요청 성공:', data);
        },
    });

    useEffect(() => {
        flightDelayMutation.mutate('KE401');
    }, []);

    return (
        <Card className="border-none shadow-none">
            <CardHeader className="mx-2 my-2">
                <div className="items-center ">
                    <P font="bold" variant="subHeader" size="2xl" className="my-1">
                        앞으로 얼마나 지연이 될까요?
                    </P>

                    <Badge variant="secondary" className="my-2 w-fit">
                        <div className="flex items-center">
                            <Info size={18} className="mx-1 stroke-text-ming" />
                            <div>
                                <P className="mx-1 text-xs" color="ming">
                                    날씨, 항공사, 시기 등 과거 데이터를 분석하여,
                                </P>
                                <P className="mx-1 text-xs" color="ming">
                                    이 항공편의 예상 지연 시간(분)을 제공합니다.
                                </P>
                            </div>
                        </div>
                    </Badge>
                </div>
            </CardHeader>

            <div className="flex items-center justify-center h-10 mb-8">
                {flightDelayMutation.isPending && <Spinner />}
                {flightDelayMutation.isError && (
                    <div className="flex gap-2">
                        <MessageSquareWarningIcon className="stroke-error-400" />
                        <div className="text-md font-pretendardBold text-error-400">
                            분석에 필요한 데이터가 부족합니다.
                        </div>
                    </div>
                )}
                {flightDelayMutation.isSuccess && (
                    <div className="text-5xl font-pretendardBold text-error-400">{prediction} 분</div>
                )}
            </div>
        </Card>
    );
};

export default FlightDelayInfo;
