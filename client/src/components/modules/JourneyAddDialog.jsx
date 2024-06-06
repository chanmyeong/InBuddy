import { Button } from '@/components/atoms/Button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/atoms/dialog';
import { Input } from '@/components/atoms/input';
import { P } from '../atoms/P';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createJourney } from '@/apis/api/journey';

export function JourneyAddDialog() {
    const queryClient = useQueryClient();
    const dispatch = useDispatch();
    const [input, setInput] = useState('');
    const handleInputChange = (e) => {
        setInput(e.target.value);
    };

    const createJourneyMutation = useMutation({
        mutationFn: (journeyName) => createJourney(journeyName),
        onSuccess: (data) => {
            console.log('요청 성공:', data);
            queryClient.invalidateQueries('journey');
        },
        onError: (error) => {
            console.error('요청 실패:', error);
        },
    });

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="brand">
                    <P className="text-white">나의 여정 추가하기</P>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>
                        <P variant="mainHeader">여정 이름 등록</P>
                    </DialogTitle>
                    <DialogDescription className="mx-auto text-neutral-400">
                        여정에 대한 이름을 등록하세요.
                    </DialogDescription>
                </DialogHeader>
                <div className="flex items-center space-x-2">
                    <div className="grid flex-1 gap-2">
                        <Input defaultValue="여정의 제목을 입력하세요." onChange={handleInputChange} />
                    </div>
                </div>
                <DialogFooter className="gap-2 my-2 sm:justify-end">
                    <DialogClose asChild>
                        <Button type="button" variant="secondary">
                            취소
                        </Button>
                    </DialogClose>
                    <DialogClose asChild>
                        <Button
                            variant="brand"
                            type="submit"
                            onClick={() => {
                                createJourneyMutation.mutate(input);
                            }}
                        >
                            등록
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
