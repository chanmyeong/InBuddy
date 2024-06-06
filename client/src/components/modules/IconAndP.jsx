import PropTypes from 'prop-types';

import { cn } from '@/lib/utils';

import { P } from '@/components/atoms/P.jsx';

function IconAndP({ className, svg, text, color }) {
    return (
        <div className={(cn('flex flex-row'), className)}>
            <img src={svg} alt="포인터 아이콘" />
            <P variant="subHeader" color={color}>
                &nbsp;&nbsp;{text}
            </P>
        </div>
    );
}

IconAndP.propTypes = {
    className: PropTypes.string,
    svg: PropTypes.string,
    text: PropTypes.string,
    color: PropTypes.string,
};

export default IconAndP;
