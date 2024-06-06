import { Ban } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '../atoms/Alert';
import { Card, CardHeader } from '../atoms/Card';
import { P } from '../atoms/P';
import { useState } from 'react';

const FlightCancellationInfo = () => {
    const [reason, setReason] = useState('결항 사유');

    return (
        <Card className="border-none shadow-none">
            <CardHeader className="mx-2 my-2">
                <Alert>
                    <div className="flex items-center gap-2">
                        <Ban className="stroke-error-400" />
                        <AlertTitle>
                            <P font="bold" variant="subHeader" color="error" size="xl">
                                결항 안내
                            </P>
                        </AlertTitle>
                    </div>
                    <div className="my-2">
                        <P size="md">다음과 같은 사유로 해당 항공편은 결항되었습니다.</P>
                        <P size="md">{reason}</P>
                    </div>
                </Alert>
            </CardHeader>
        </Card>
    );
};

export default FlightCancellationInfo;
