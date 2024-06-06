import React from "react";
import { POSITION_NONE, UncontrolledReactSVGPanZoom } from 'react-svg-pan-zoom';
import { ReactSvgPanZoomLoader } from 'react-svg-pan-zoom-loader';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { ReactSVG } from "react-svg";




function Map(props) {

    // 미니맵 안뜨게 바꿈
    const miniatureProps = {
        position: POSITION_NONE
    }

    return (
        <>
            <TransformWrapper>
                <TransformComponent>
                    <img src={T1_counter_L} alt="test" />
                </TransformComponent>
            </TransformWrapper>




            <ReactSvgPanZoomLoader src={props.svgFile} render={(content) => (
                <UncontrolledReactSVGPanZoom height={500} miniatureProps={miniatureProps}>
                    <svg width={500} height={500} >
                        {content}
                    </svg>
                </UncontrolledReactSVGPanZoom>
            )} />
        </>
    )
}

export default Map;