import { useRef, forwardRef, useEffect, useState } from 'react';
import { P } from '@/components/atoms/P';
import SectionLayout from '@/components/modules/SectionLayout';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import T13F from '@/assets/maps/T1-3F.svg?react';
import T23F from '@/assets/maps/T2-3F.svg?react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/atoms/Tabs';
import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarSeparator,
    MenubarTrigger,
} from '@/components/atoms/Menubar';

const MapT1 = forwardRef((props, ref) => {
    return (
        <div className="w-[90vw]" ref={ref}>
            <T13F />
        </div>
    )
});
MapT1.displayName = MapT1;
const MapT2 = forwardRef((props, ref) => {
    return (
        <div className="w-[90vw]" ref={ref}>
            <T23F />
        </div>
    )
});
MapT2.displayName = MapT2;

function RoamingInfoPage() {
    const svgContainerRef = useRef(null);
    const [selectedMarker, setSelectedMarker] = useState(null);
    const [terminalNo, setTerminalNo] = useState(null);

    const [header, setHeader] = useState(null);
    const [location, setLocation] = useState(null);
    const [businuessHour, setBusinuessHour] = useState(null);
    const [telephone, setTelephone] = useState(null);

    useEffect(() => {
        // 모든 g 태그를 숨김 처리
        const allGElements = svgContainerRef.current.querySelectorAll('g');
        allGElements.forEach((el) => {
            if (el.id === 'Background') {
                el.style.visibility = 'visible';
            } else {
                el.style.visibility = 'hidden';
            }
        });
    }, [terminalNo]);

    const handleMenuClick = (id) => {
        // 이전에 클릭된 요소 숨김 처리
        if (selectedMarker) {
            const prevSvgElement = svgContainerRef.current.querySelector(`#${selectedMarker}`);
            prevSvgElement.style.visibility = 'hidden';

            // 자식 g 태그들도 숨김 처리
            const childGElements = prevSvgElement.querySelectorAll('g');
            childGElements.forEach((child) => {
                child.style.visibility = 'hidden';
            });
        }

        // 클릭된 요소만 보임 처리
        const svgElement = svgContainerRef.current.querySelector(`#${id}`);
        svgElement.style.visibility = 'visible';

        // 클릭된 요소의 자식 g 태그들도 보임 처리
        const childGElements = svgElement.querySelectorAll('g');
        console.log(childGElements);
        childGElements.forEach((child) => {
            child.style.visibility = 'visible';
        });

        setSelectedMarker(id);

    };

    const handleInfo = (content) => {
        setHeader(content.menuTitle);
        setLocation(content.menuLocation);
        setBusinuessHour(content.businuessHour);
        setTelephone(content.telephone);
    }

    const menuContentT1 = {
        roaming: [
            {
                menuTitle: 'KT 로밍센터 서편',
                markerId: 'KT_x5F_Roaming_x5F_1',
                menuLocation: '3층 서편 4층 출국장 부근',
                businuessHour: '06:00 ~ 14:00',
                telephone: '02-2190-0901',
            },
            {
                menuTitle: 'KT 로밍센터 동편',
                markerId: 'KT_x5F_Roaming_x5F_2',
                menuLocation: '3층 동편 3번 출국장 부근',
                businuessHour: '06:00 ~ 22:00',
                telephone: '02-2190-0901',
            },
            {
                menuTitle: 'LG 유플러스 로밍센터',
                markerId: 'LG_x5F_Roaming_x5F_1',
                menuLocation: '3층 동편 3번 출국장 부근',
                businuessHour: '06:00 ~ 22:00',
                telephone: '02-3416-7010',
            },
            {
                menuTitle: 'SKT 로밍센터 면세구역',
                markerId: 'SKT_x5F_Roaming_x5F_1',
                menuLocation: '면세구역 3층 중앙 27번 게이트 부근',
                businuessHour: '07:00 ~ 21:00',
                telephone: '02-6343-9000',
            },
            {
                menuTitle: 'SKT 로밍센터 서편',
                markerId: 'SKT_x5F_Roaming_x5F_2',
                menuLocation: '3층 서편 4번 출국장 부근',
                businuessHour: '06:00 ~ 22:00',
                telephone: '02-6343-9000',
            },
            {
                menuTitle: 'SKT 로밍센터 동편',
                markerId: 'SKT_x5F_Roaming_x5F_3',
                menuLocation: '3층 동편 3번 출국장 부근',
                businuessHour: '06:00 ~ 22:00',
                telephone: '02-6343-9000',
            },
        ],
        dosirak: [
            {
                menuTitle: '와이파이 도시락',
                markerId: 'Dosirak_x5F_1',
                menuLocation: '3층 5번 출국장 부근',
                businuessHour: '06:00 ~ 22:00',
                telephone: '02-2190-0901',
            },
        ],
        usim: [
            {
                menuTitle: '공항유심센터 면세구역 서편',
                markerId: 'Usim_x5F_1',
                menuLocation: '면세구역 3층 서편 30번 게이트 부근',
                businuessHour: '07:00 ~ 21:00',
                telephone: '1899-0323',
            }, {
                menuTitle: '공항유심센터 면세구역 탑승동',
                markerId: 'Usim_x5F_2',
                menuLocation: '면세구역 탑승동 114번 게이트 부근',
                businuessHour: '07:00 ~ 21:00',
                telephone: '1899-0323',
            }, {
                menuTitle: '공항유심센터 면세구역 동편',
                markerId: 'Usim_x5F_3',
                menuLocation: '면세구역 3층 동편 15번 게이트',
                businuessHour: '07:00 ~ 21:00',
                telephone: '1899-0323',
            },
            {
                menuTitle: '공항유심센터',
                markerId: 'Usim_x5F_4',
                menuLocation: '3층 H카운터 공항 안내데스크 부근',
                businuessHour: '07:00 ~ 21:00',
                telephone: '1899-0323',
            },
        ],
        hana: [
            {
                menuTitle: '하나은행 환전소 출국장',
                markerId: 'Hana_x5F_1',
                menuLocation: '3층 일반지역 D,E 체크인카운터 부근',
                businuessHour: '06:00 ~ 22:00',
                telephone: '032-743-2220',
            }, {
                menuTitle: '하나은행 환전소 면세구역',
                markerId: 'Hana_x5F_2',
                menuLocation: '3층 면세지역 29번 게이트 부근',
                businuessHour: '06:00 ~ 22:00',
                telephone: '032-743-2220',
            }, {
                menuTitle: '하나은행 환전소 탑승동',
                markerId: 'Hana_x5F_3',
                menuLocation: '탑승동 3층 121번 게이트 부근',
                businuessHour: '06:00 ~ 22:00',
                telephone: '032-743-2220',
            }, {
                menuTitle: '하나은행 환전소 출국장',
                markerId: 'Hana_x5F_4',
                menuLocation: '3층 일반지역 4번 출입구 부근',
                businuessHour: '06:00 ~ 22:00',
                telephone: '032-743-2220',
            },
        ],
        woori: [
            {
                menuTitle: '우리은행 환전소 출국장',
                markerId: 'Woori_x5F_1',
                menuLocation: '3층 일반지역 11번 출입구 부근',
                businuessHour: '06:00 ~ 22:00 (운영중단)',
                telephone: '032-743-1050',
            }, {
                menuTitle: '우리은행 환전소 면세구역',
                markerId: 'Woori_x5F_2',
                menuLocation: '3층 면세지역 25번 게이트 부근',
                businuessHour: '06:00 ~ 22:30',
                telephone: '032-743-1050',
            }, {
                menuTitle: '우리은행 환전소 탑승동',
                markerId: 'Woori_x5F_3',
                menuLocation: '탑승동 3층 121번 게이트 부근',
                businuessHour: '08:00 ~ 16:00 (운영중단)',
                telephone: '032-743-1050',
            }, {
                menuTitle: '우리은행 환전소 출국장',
                markerId: 'Woori_x5F_4',
                menuLocation: '3층 일반지역 J, K 체크인카운터 부근',
                businuessHour: '06:00 ~ 22:00',
                telephone: '032-743-1050',
            },
        ],
        kookmin: [
            {
                menuTitle: '국민은행 환전소 출국장',
                markerId: 'Kookmin_x5F_1',
                menuLocation: '3층 일반지역 5번 출국장 부근',
                businuessHour: '06:00 ~ 22:00',
                telephone: '032-743-3260',
            }, {
                menuTitle: '국민은행 환전소 출국장 24H',
                markerId: 'Kookmin_x5F_2',
                menuLocation: '3층 일반지역 3번 출국장 부근',
                businuessHour: '00:00 ~ 24:00',
                telephone: '032-743-3260',
            },
        ],
        passport: [
            {
                menuTitle: '인천공항 T1 여권민원실',
                markerId: 'passport_x5F_1',
                menuLocation: '3층 일반지역 G 체크인카운터 부근',
                businuessHour: '09:00 ~ 18:0 (월~일요일 정상운영, 법정공휴일 휴무)',
                telephone: '032-740-2777~8',
            },
        ],

    }
    const menuContentT2 = {
        roaming: [
            {
                menuTitle: 'KT 로밍센터',
                markerId: 'KT_x5F_Roaming_x5F_1',
                menuLocation: ' 3층 D-E체크인 카운터 사이',
                businuessHour: '06:00 ~ 22:00',
                telephone: '02-2190-0901',
            },
            {
                menuTitle: 'LG 유플러스 로밍센터',
                markerId: 'LG_x5F_Roaming_x5F_1',
                menuLocation: '3층 D- E체크인 카운터 사이',
                businuessHour: '06:00 ~ 22:00',
                telephone: '02-3416-7010',
            },
            {
                menuTitle: 'SKT 로밍센터',
                markerId: 'SKT_x5F_Roaming_x5F_1',
                menuLocation: '3층 D-E체크인 카운터 사이',
                businuessHour: '06:00 ~ 22:00',
                telephone: '02-6343-9000',
            },
            {
                menuTitle: 'SKT 로밍센터 면세지역',
                markerId: 'SKT_x5F_Roaming_x5F_2',
                menuLocation: '3층 면세지역 251번 게이트 맞은편',
                businuessHour: '07:00 ~ 21:00',
                telephone: '02-6343-9000',
            },
        ],
        dosirak: [
            {
                menuTitle: '와이파이 도시락',
                markerId: 'Dosirak_x5F_1',
                menuLocation: '1층 1번 출구 부근',
                businuessHour: '06:00 ~ 22:00',
                telephone: '02-2190-0901',
            },
        ],
        usim: [
            {
                menuTitle: '공항유심센터 출국장',
                markerId: 'Usim_x5F_1',
                menuLocation: '3층 5번 출구 서점(BOOK STORE)',
                businuessHour: '07:00 ~ 21:00',
                telephone: '1899-0323',
            }, {
                menuTitle: '공항유심센터 면세구역',
                markerId: 'Usim_x5F_2',
                menuLocation: '면세구역 동편 254번 게이트 서점(BOOK STORE)',
                businuessHour: '07:00 ~ 21:00',
                telephone: '1899-0323',
            }
        ],
        hana: [
            {
                menuTitle: '하나은행 환전소 출국장',
                markerId: 'Hana_x5F_1',
                menuLocation: '3층 일반지역 H 체크인카운터 부근',
                businuessHour: '06:00 ~ 22:00',
                telephone: '032-875-1111',
            }, {
                menuTitle: '하나은행 환전소 면세구역',
                markerId: 'Hana_x5F_2',
                menuLocation: '3층 면세지역 254번 게이트 부근',
                businuessHour: '06:00 ~ 22:00',
                telephone: '032-875-1111',
            }
        ],
        woori: [
            {
                menuTitle: '우리은행 환전소 출국장',
                markerId: 'Woori_x5F_1',
                menuLocation: '3층 일반지역 11번 출입구 부근',
                businuessHour: '06:30 ~ 20:00',
                telephone: '032-743-2050',
            }, {
                menuTitle: '우리은행 환전소 면세구역',
                markerId: 'Woori_x5F_2',
                menuLocation: '3층 면세지역 252번 게이트 부근',
                businuessHour: '07:00 ~ 20:00',
                telephone: '032-743-2050',
            }
        ],
        kookmin: [
            {
                menuTitle: '국민은행 환전소 출국장 24H',
                markerId: 'Kookmin_x5F_1',
                menuLocation: '3층 일반지역 1번 출국장 부근',
                businuessHour: '00:00 ~ 24:00',
                telephone: '032-743-3260',
            },
            {
                menuTitle: '국민은행 환전소 출국장',
                markerId: 'Kookmin_x5F_2',
                menuLocation: '3층 일반지역 체크인카운터 H 부근',
                businuessHour: '06:00 ~ 22:00',
                telephone: '032-743-3260',
            },
        ],

    }



    return (
        <div className="flex flex-col items-center mx-8">
            <P variant="mainHeader" className="my-10">
                로밍 방법 안내
            </P>

            <Tabs defaultValue="T1" className="flex flex-col items-center">
                <TabsList className="grid w-[200px] grid-cols-2">
                    <TabsTrigger value="T1" className="font-pretendardBold"
                        onClick={() => setTerminalNo('1')}>
                        T1
                    </TabsTrigger>
                    <TabsTrigger value="T2" className="font-pretendardBold"
                        onClick={() => setTerminalNo('2')}>
                        T2
                    </TabsTrigger>

                </TabsList>
                <TabsContent value="T1">
                    <div className="flex justify-center mb-3">
                        <Menubar className="">
                            <MenubarMenu>
                                <MenubarTrigger className="font-pretendardBold">해외로밍</MenubarTrigger>
                                <MenubarContent>
                                    {menuContentT1.roaming.map((content) =>
                                        <div key={content.markerId}>
                                            <MenubarSeparator />
                                            <MenubarItem className="flex flex-col"
                                                onClick={() => { handleMenuClick(content.markerId); handleInfo(content); }}>
                                                <P variant="content">{content.menuTitle}</P>
                                                <P size="xs">{content.menuLocation}</P>
                                            </MenubarItem>
                                        </div>
                                    )}
                                </MenubarContent>
                            </MenubarMenu>
                            <MenubarMenu>
                                <MenubarTrigger className="font-pretendardBold">해외유심</MenubarTrigger>
                                <MenubarContent>
                                    {menuContentT1.usim.map((content) =>
                                        <div key={content.markerId}>
                                            <MenubarSeparator />
                                            <MenubarItem className="flex flex-col"
                                                onClick={() => { handleMenuClick(content.markerId); handleInfo(content); }}>
                                                <P variant="content">{content.menuTitle}</P>
                                                <P size="xs">{content.menuLocation}</P>
                                            </MenubarItem>
                                        </div>
                                    )}
                                </MenubarContent>
                            </MenubarMenu>
                            <MenubarMenu>
                                <MenubarTrigger className="font-pretendardBold">포켓와이파이</MenubarTrigger>
                                <MenubarContent>
                                    {menuContentT1.dosirak.map((content) =>
                                        <div key={content.markerId}>
                                            <MenubarSeparator />
                                            <MenubarItem className="flex flex-col"
                                                onClick={() => { handleMenuClick(content.markerId); handleInfo(content); }}>
                                                <P variant="content">{content.menuTitle}</P>
                                                <P size="xs">{content.menuLocation}</P>
                                            </MenubarItem>
                                        </div>
                                    )}
                                </MenubarContent>
                            </MenubarMenu>
                        </Menubar>
                    </div>
                    <TransformWrapper
                        initialScale={4}
                        initialPositionX={-517}
                        initialPositionY={-627}
                        wheel={{
                            step: 1,
                            smoothStep: 0.005,
                        }}
                    >
                        <TransformComponent>
                            <MapT1 className="w-full" ref={svgContainerRef} />
                        </TransformComponent>
                    </TransformWrapper>
                </TabsContent>
                <TabsContent value="T2">
                    <div className="flex justify-center mb-3">
                        <Menubar className="">
                            <MenubarMenu>
                                <MenubarTrigger className="font-pretendardBold">해외로밍</MenubarTrigger>
                                <MenubarContent>
                                    {menuContentT2.roaming.map((content) =>
                                        <div key={content.markerId}>
                                            <MenubarSeparator />
                                            <MenubarItem className="flex flex-col"
                                                onClick={() => { handleMenuClick(content.markerId); handleInfo(content); }}>
                                                <P variant="content">{content.menuTitle}</P>
                                                <P size="xs">{content.menuLocation}</P>
                                            </MenubarItem>
                                        </div>
                                    )}
                                </MenubarContent>
                            </MenubarMenu>
                            <MenubarMenu>
                                <MenubarTrigger className="font-pretendardBold">해외유심</MenubarTrigger>
                                <MenubarContent>
                                    {menuContentT2.usim.map((content) =>
                                        <div key={content.markerId}>
                                            <MenubarSeparator />
                                            <MenubarItem className="flex flex-col"
                                                onClick={() => { handleMenuClick(content.markerId); handleInfo(content); }}>
                                                <P variant="content">{content.menuTitle}</P>
                                                <P size="xs">{content.menuLocation}</P>
                                            </MenubarItem>
                                        </div>
                                    )}
                                </MenubarContent>
                            </MenubarMenu>
                            <MenubarMenu>
                                <MenubarTrigger className="font-pretendardBold">포켓와이파이</MenubarTrigger>
                                <MenubarContent>
                                    {menuContentT2.dosirak.map((content) =>
                                        <div key={content.markerId}>
                                            <MenubarSeparator />
                                            <MenubarItem className="flex flex-col"
                                                onClick={() => { handleMenuClick(content.markerId); handleInfo(content); }}>
                                                <P variant="content">{content.menuTitle}</P>
                                                <P size="xs">{content.menuLocation}</P>
                                            </MenubarItem>
                                        </div>
                                    )}
                                </MenubarContent>
                            </MenubarMenu>
                        </Menubar>
                    </div>
                    <TransformWrapper
                        initialScale={4}
                        initialPositionX={-517}
                        initialPositionY={-527}
                        wheel={{
                            step: 1,
                            smoothStep: 0.005,
                        }}
                    >
                        <TransformComponent>
                            <MapT2 className="w-full" ref={svgContainerRef} />
                        </TransformComponent>
                    </TransformWrapper>
                </TabsContent>
            </Tabs>
            <P className="text-xs text-gray-400">손가락을 움직여 화면을 움직이거나 크기를 조절할 수 있습니다.</P>

            {header ?
                <SectionLayout sectionHeaderText={header}>
                    <ul className="list-disc list-inside">
                        <li className="py-1 text-base text-text-black font-pretendardBold">위치 : {location}</li>
                        <li className="py-1 text-base text-text-black font-pretendardBold">운영시간 : {businuessHour}</li>
                        <li className="py-1 text-base text-text-black font-pretendardBold">연락처 : {telephone}</li>
                    </ul>
                </SectionLayout> : null}
            <SectionLayout sectionHeaderText="로밍 서비스 안내">
                <P>
                    본인이 한국에서 사용하는 번호로 외국에서도 전화 및 데이터를 이용할 수 있게 하는 유료 서비스입니다. 인터넷 또는 공항 내 로밍센터에 방문하여 본인에게 맞는 로밍 요금제를 알아보고 이용할 수 있습니다.
                </P>
            </SectionLayout>
            <SectionLayout sectionHeaderText="유심 서비스 안내">
                <P>
                    현재 사용 중인 한국 유심을 잠시 탈착하고 해외에서만 사용 가능한 유심을 삽입하여 전화 및 데이터를 이용할 수 있는 서비스입니다. 한국 유심을 탈착하였기 때문에 한국에서 사용하는 번호로는 통화할 수 없으며 카카오톡이나 SNS 등 데이터를 사용한 서비스는 해외 유심의 데이터 기능으로 정상적으로 사용 가능합니다.
                </P>
            </SectionLayout>
            <SectionLayout sectionHeaderText="와이파이 도시락 서비스 안내">
                <P>
                    해외에서 와이파이 통신 기능을 제공하는 단말기를 대여하는 서비스입니다. 기존 스마트폰에서 와이파이를 연결하는 방식으로 사용하면 됩니다.</P>
            </SectionLayout>
        </div >
    );
}

export default RoamingInfoPage;
