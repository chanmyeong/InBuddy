import { P } from '@/components/atoms/P';
import { Button } from '@/components/atoms/Button';
import prohibitedStuffPNG from '@/assets/prohibited-stuff-icon.png';

function BaggageInfoPage() {
    const commonStyle = {
        backgroundImage: `url(${prohibitedStuffPNG})`,
        backgroundSize: '537px 271px',
        height: '58px',
        border: '0',
    };

    const liquid1 = {
        ...commonStyle,
        backgroundPositionX: '0px',
        backgroundPositionY: '0px',
        width: '243px',
    };

    const liquid2 = {
        ...commonStyle,
        backgroundPositionX: '-294px',
        backgroundPositionY: '0px',
        width: '119px',
    };

    const threatening1 = {
        ...commonStyle,
        backgroundPositionX: '0px',
        backgroundPositionY: '-71px',
        width: '243px',
    };

    const threatening2 = {
        ...commonStyle,
        backgroundPositionX: '-294px',
        backgroundPositionY: '-71px',
        width: '181px',
    };

    const threatening3 = {
        ...commonStyle,
        backgroundPositionX: '0px',
        backgroundPositionY: '-142px',
        width: '181px',
    };

    const danger1 = {
        ...commonStyle,
        backgroundPositionX: '0px',
        backgroundPositionY: '-213px',
        width: '119px',
    };

    const danger2 = {
        ...commonStyle,
        backgroundPositionX: '-294px',
        backgroundPositionY: '-213px',
        width: '243px',
    };

    return (
        <>
            <P variant="mainHeader" className="my-4">
                기내 반입 제한물품 안내 기준
            </P>
            <P variant="default" color="neutral" className="text-center">
                기내 반입 제한물품을 챙기진 않았는지 점검하세요.
            </P>
            <div className="my-5">
                <Button variant="outline" className="border-2 border-red-500 p-2 mb-1.5 me-1.5">
                    <P variant="content" className="text-red-500">
                        기내 수하물 불가능
                    </P>
                </Button>
                <Button variant="outline" className="border-2 border-green-500 p-2 mb-1.5 me-1.5">
                    <P variant="content" className="text-green-500">
                        위탁 수하물 가능
                    </P>
                </Button>

                <div className="border border-solid rounded-md p-3 mb-1.5">
                    <div className="text-center">
                        <P variant="sectionHeader" className="text-[18px]">
                            액체, 스프레이, 젤 형태의 화장품
                        </P>
                        <P variant="sectionHeader" className="text-[18px]">
                            세면용품(치약, 샴푸 등) 또는 의약품류 등
                        </P>
                    </div>
                    <div className="flex flex-col items-center py-2">
                        <div style={liquid1} />
                    </div>
                    <div className="mb-4">
                        <P variant="content">
                            기내 휴대
                            <span className="px-1 text-red-500 font-pretendardBold">불가능</span>
                        </P>
                        <P>
                            (단, 개별 용기당 100ml 이하로 1인당 1L 비닐 지퍼백(20.5cm*20.5cm / 15cm*25cm) 1개에 한해
                            반입 가능
                        </P>
                    </div>
                    <div>
                        <P variant="content">
                            위탁수하물
                            <span className="px-1 text-green-500 font-pretendardBold">가능</span>
                        </P>
                        <P>
                            (단, 인화성이 없는 스프레이류는 항공위험물운송기준에 따라 총 2kg(2L) 범위 내에서 1개당
                            500g(500ml) 이하로만 반입 가능)
                        </P>
                    </div>
                </div>
                <div className="border border-solid rounded-md p-3 mb-1.5">
                    <div className="text-center">
                        <P variant="sectionHeader" className="text-[18px]">
                            고추장/김치 등 액체가 포함되어 있거나
                        </P>
                        <P variant="sectionHeader" className="text-[18px]">
                            젤 형태의 음식물류
                        </P>
                    </div>
                    <div className="flex flex-col items-center py-2">
                        <div style={liquid2} />
                    </div>
                    <div className="mb-4">
                        <P variant="content">
                            기내 휴대
                            <span className="px-1 text-red-500 font-pretendardBold">불가능</span>
                        </P>
                        <P>
                            (단, 개별 용기당 100ml 이하로 1인당 1L 비닐 지퍼백(20.5cm*20.5cm / 15cm*25cm) 1개에 한해
                            반입 가능
                        </P>
                    </div>
                    <div>
                        <P variant="content">
                            위탁수하물
                            <span className="px-1 text-green-500 font-pretendardBold">가능</span>
                        </P>
                        <P>(용량 제한 없이 가능)</P>
                    </div>
                </div>
                <div className="border border-solid rounded-md p-3 mb-1.5">
                    <div className="text-center">
                        <P variant="sectionHeader" className="text-[18px]">
                            창·도검류 등
                        </P>
                    </div>
                    <div className="flex flex-col items-center py-2">
                        <div style={threatening1} />
                    </div>
                    <div className="mb-4">
                        <P variant="content">
                            기내 휴대
                            <span className="px-1 text-red-500 font-pretendardBold">불가능</span>
                        </P>
                        <P>
                            (단, 둥근 날을 가진 버터칼, 안전날이 포함된 면도기, 안전면도날, 전기면도기 및 기내식 전용
                            나이프(항공사 소유)는 기내 휴대 반입가능)
                        </P>
                    </div>
                    <div>
                        <P variant="content">
                            위탁수하물
                            <span className="px-1 text-green-500 font-pretendardBold">가능</span>
                        </P>
                    </div>
                </div>
                <div className="border border-solid rounded-md p-3 mb-1.5">
                    <div className="text-center">
                        <P variant="sectionHeader" className="text-[18px]">
                            전자충격기, 총기, 무술호신용품 등
                        </P>
                    </div>
                    <div className="flex flex-col items-center py-2">
                        <div style={threatening2} />
                    </div>
                    <div className="mb-4">
                        <P variant="content">
                            기내 휴대
                            <span className="px-1 text-red-500 font-pretendardBold">불가능</span>
                        </P>
                    </div>
                    <div>
                        <P variant="content">
                            위탁수하물
                            <span className="px-1 text-green-500 font-pretendardBold">가능</span>
                        </P>
                        <P>
                            (단, 위탁수하물로 반입할 경우, 해당 항공운송사업자에게 총기소지허가서 또는 수출입허가서 등
                            관련서류를 확인시키고, 총알과 분리한 후, 단단히 보관함에 넣은 경우에만 가능)
                        </P>
                        <P>(총기류 부품 중 조준경은 기내 휴대 및 위탁수하물 반입가능)</P>
                    </div>
                </div>
                <div className="border border-solid rounded-md p-3 mb-1.5">
                    <div className="text-center">
                        <P variant="sectionHeader" className="text-[18px]">
                            공구류(망치, 렌치 등)
                        </P>
                    </div>
                    <div className="flex flex-col items-center py-2">
                        <div style={threatening3} />
                    </div>
                    <div className="mb-4">
                        <P variant="content">
                            기내 휴대
                            <span className="px-1 text-red-500 font-pretendardBold">불가능</span>
                        </P>
                    </div>
                    <div>
                        <P variant="content">
                            위탁수하물
                            <span className="px-1 text-green-500 font-pretendardBold">가능</span>
                        </P>
                    </div>
                </div>
            </div>
            <div className="my-5">
                <Button variant="outline" className="border-2 border-green-500 p-2 mb-1.5 me-1.5">
                    <P variant="content" className="text-green-500">
                        기내 수하물 가능
                    </P>
                </Button>
                <Button variant="outline" className="border-2 border-red-500 p-2 mb-1.5 me-1.5">
                    <P variant="content" className="text-red-500">
                        위탁 수하물 불가능
                    </P>
                </Button>

                <div className="border border-solid rounded-md p-3 mb-1.5">
                    <div className="text-center">
                        <P variant="sectionHeader" className="text-[18px]">
                            리튬이온배터리 등
                        </P>
                    </div>
                    <div className="flex flex-col items-center py-2">
                        <div style={danger1} />
                    </div>
                    <div className="mb-4">
                        <P variant="content">
                            기내 휴대
                            <span className="px-1 text-green-500 font-pretendardBold">가능</span>
                        </P>
                        <P>여분배터리 100Wh 이하 : 제한 없이 가능</P>
                        <P>여분배터리 100Wh 초과 ~ 160Wh 이하 : 항공사 승인 하에 기내 휴대로 1인당 2개 반입 가능</P>
                        <P>여분배터리 160Wh 초과 : 반입 불가</P>
                        <P>위 규정은 항공사 마다 상이하므로 각 항공사에 문의 필요</P>
                    </div>
                    <div>
                        <P variant="content">
                            위탁수하물
                            <span className="px-1 text-red-500 font-pretendardBold">불가능</span>
                        </P>
                    </div>
                </div>
            </div>
            <div className="my-5">
                <Button variant="outline" className="border-2 border-red-500 p-2 mb-1.5 me-1.5">
                    <P variant="content" className="text-red-500">
                        기내 수하물 불가능
                    </P>
                </Button>
                <Button variant="outline" className="border-2 border-red-500 p-2 mb-1.5 me-1.5">
                    <P variant="content" className="text-red-500">
                        위탁 수하물 불가능
                    </P>
                </Button>

                <div className="border border-solid rounded-md p-3 mb-1.5">
                    <div className="text-center">
                        <P variant="sectionHeader" className="text-[18px]">
                            인화성 가스액체, 방사능물질 등
                        </P>
                    </div>
                    <div className="flex flex-col items-center py-2">
                        <div style={danger2} />
                    </div>
                    <div className="mb-4">
                        <P variant="content">
                            기내 휴대
                            <span className="px-1 text-red-500 font-pretendardBold">불가능</span>
                        </P>
                    </div>
                    <div>
                        <P variant="content">
                            위탁수하물
                            <span className="px-1 text-red-500 font-pretendardBold">불가능</span>
                        </P>
                    </div>
                </div>
            </div>
        </>
    );
}

export default BaggageInfoPage;
