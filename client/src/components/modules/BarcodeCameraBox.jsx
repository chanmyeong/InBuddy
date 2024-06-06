import { useEffect, useRef } from 'react';
import { BrowserMultiFormatReader } from '@zxing/library';
import PropTypes from 'prop-types';

const BarcodeCameraBox = ({ setInputValue }) => {
    const videoRef = useRef(null); // video 요소를 위한 ref 생성

    useEffect(() => {
        const codeReader = new BrowserMultiFormatReader();

        codeReader
            .listVideoInputDevices()
            .then((videoInputDevices) => {
                let selectedDeviceId;

                // 후면 카메라 선택
                const backCameraDevice = videoInputDevices.find((device) =>
                    device.label.toLowerCase().includes('back')
                );

                console.log(backCameraDevice);
                if (backCameraDevice) {
                    selectedDeviceId = backCameraDevice.deviceId;
                } else {
                    // 후면 카메라를 찾지 못한 경우, 첫 번째 장치를 기본값으로 사용
                    selectedDeviceId = videoInputDevices[0].deviceId;
                }

                console.log(selectedDeviceId);
                return codeReader.decodeFromVideoDevice(selectedDeviceId, videoRef.current, (result, err) => {
                    if (result) {
                        const boardingPassData = result.text.split(/\s+/);
                        const boardingPassSeatInfo = boardingPassData[4]; // 예: "257Y030G0007" 또는 다른 형식
                        const regex = /\d+[A-Z]/g;
                        const seatInfoMatch = boardingPassSeatInfo.match(regex);
                        if (seatInfoMatch && seatInfoMatch.length >= 2) {
                            const matched = seatInfoMatch[1];
                            const seatNumber = matched.match(/\d+/)[0];
                            const seatClass = matched.match(/[A-Z]/)[0];

                            const fullSeatInfo = `${Number(seatNumber)}${seatClass}`; // "30G"

                            console.log(fullSeatInfo);
                            setInputValue(fullSeatInfo);
                        } else {
                            // 좌석 정보가 예상한 형식과 다를 경우의 처리
                            console.error('Invalid seat information format');
                        }
                    }
                    // if (err) {
                    //     console.error(err);
                    // }
                });
            })
            .catch((err) => {
                console.error(err);
            });

        // 컴포넌트가 언마운트될 때 실행될 정리 함수
        return () => {
            codeReader.reset();
        };
    }, [setInputValue]); // 빈 의존성 배열을 제공하여 컴포넌트 마운트 시에만 실행되도록 함

    return (
        <div>
            <video ref={videoRef} style={{ width: '100%' }}></video>
        </div>
    );
};

BarcodeCameraBox.propTypes = {
    setInputValue: PropTypes.func.isRequired,
};

export default BarcodeCameraBox;
