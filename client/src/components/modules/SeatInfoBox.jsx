import PropTypes from 'prop-types';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/atoms/dialog';
import { Button } from '@/components/atoms/Button';
import { Label } from '@/components/atoms/label';
import { Input } from '@/components/atoms/input';
import BarcodeCameraBox from './BarcodeCameraBox';
import { useState } from 'react';
import { P } from '../atoms/P';
import { InformationCircleIcon } from '@heroicons/react/24/solid';

const SeatInfoBox = ({ children, setSeatNum, isOpen, setIsOpen }) => {
    const [inputValue, setInputValue] = useState('');

    const handleRegisterClick = () => {
        const regex = /^\d{1,3}[A-Za-z]$/;
        if (regex.test(inputValue)) {
            setSeatNum(inputValue);
            setIsOpen(false);
        } else {
            alert('좌석 번호 형식이 올바르지 않습니다. 다시 확인해주세요.');
        }
    };

    return (
        <div className="flex items-center justify-center">
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger asChild>{children}</DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader className="text-left">
                        <DialogTitle>좌석 번호 등록</DialogTitle>
                        <DialogDescription>항공권의 바코드로 좌석 번호를 등록해보세요.</DialogDescription>
                    </DialogHeader>
                    <BarcodeCameraBox setInputValue={setInputValue} />
                    <div className="flex flex-col justify-center px-1 my-2">
                        <div className="flex items-center gap-4 ">
                            <Label htmlFor="seatNum" className="text-right text-md">
                                좌석 번호
                            </Label>
                            <Input
                                id="seatNum"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                className="w-20"
                            />
                        </div>
                        <div className="flex items-center gap-1">
                            <InformationCircleIcon className="w-4 h-4 fill-neutral-400" />
                            <P size="xs" color="neutral" className="my-3">
                                바코드 인식에 문제가 발생할 경우, 직접 입력하세요.
                            </P>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit" onClick={handleRegisterClick}>
                            등록
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

SeatInfoBox.propTypes = {
    children: PropTypes.node,
    seatNum: PropTypes.string,
    setSeatNum: PropTypes.func.isRequired,
    isOpen: PropTypes.bool.isRequired,
    setIsOpen: PropTypes.func.isRequired,
};

export default SeatInfoBox;
