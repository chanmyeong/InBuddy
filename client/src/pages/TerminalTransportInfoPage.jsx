
import React from "react";
import { P } from "@/components/atoms/P";
import SectionLayout from "@/components/modules/SectionLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/atoms/Tabs";
import Map from "@/components/atoms/Map";
import T1 from '@/assets/maps/T1_shuttlebus_stop.png'
import T2 from '@/assets/maps/T2_shuttlebus_stop.png'
import TerminalMap from '@/assets/maps/Terminal_transport_map.jpg'

function TerminalTransportInfoPage() {
    return (
        <div>
            <P variant='mainHeader' className='my-10'>터미널 간 이동 방법</P>
            <img src={TerminalMap} alt="terminalMap" />
            <Tabs defaultValue="toT2" className="flex flex-col">
                <TabsList className="w-48 self-center">
                    <TabsTrigger value="toT2" >
                        T1에서 T2
                    </TabsTrigger>
                    <TabsTrigger value="toT1" >
                        T2 에서 T1
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="toT2" className='self-center'>
                    <img src={T1} alt="" />
                    <SectionLayout sectionHeaderText="제 1 여객터미널 셔틀버스 승차장">
                        <ul className="list-disc list-inside">
                            <li className="py-1 text-base text-text-black font-pretendardBold">탑승 위치 : T1 3층 8번 게이트 앞</li>
                            <li className="py-1 text-base text-text-black font-pretendardBold">운행시간 : 05:06 ~ 23:56</li>
                            <li className="py-1 text-base text-text-black font-pretendardBold">소요시간 : 약 15분</li>
                        </ul>
                    </SectionLayout>

                    <SectionLayout sectionHeaderText='운행시간이 아닌가요?'>
                        <P variant='content'>심야 시간에는 셔틀버스를 운행하지 않으므로 택시를 타고 이동하셔야 합니다.</P>
                    </SectionLayout>
                </TabsContent>
                <TabsContent value="toT1" className='self-center'>
                    <img src={T2} alt="" />
                    <SectionLayout sectionHeaderText="제 2 여객터미널 셔틀버스 승차장">
                        <ul className="list-disc list-inside">
                            <li className="py-1 text-base text-text-black font-pretendardBold">탑승 위치 : T2 3층 4, 5번 게이트 사이</li>
                            <li className="py-1 text-base text-text-black font-pretendardBold">운행시간 : 04:38 ~ 23:48</li>
                            <li className="py-1 text-base text-text-black font-pretendardBold">소요시간 : 약 18분</li>
                        </ul>
                    </SectionLayout>

                    <SectionLayout sectionHeaderText='운행시간이 아닌가요?'>
                        <P variant='content'>심야 시간에는 셔틀버스를 운행하지 않으므로 택시를 타고 이동하셔야 합니다.</P>
                    </SectionLayout>
                </TabsContent>
            </Tabs>


        </div>)
}

export default TerminalTransportInfoPage;