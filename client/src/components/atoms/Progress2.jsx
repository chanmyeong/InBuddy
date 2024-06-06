import { useState } from 'react';
import PropTypes from 'prop-types';

function Progress2({ total, selected }) {
    const [progress, setProgress] = useState({
        totalCnt: total,
        selectedCnt: selected,
    });

    const calculateWidth = () => {
        const { totalCnt, selectedCnt } = progress;
        if (totalCnt === 0) return '0px'; // totalCnt가 0인 경우 0px 반환하여 오류 방지
        const widthPercent = (selectedCnt / totalCnt) * 100;
        return `${widthPercent}%`;
    };

    return (
        <>
            <div className="h-2 rounded w-80 bg-neutral-300">
                <div className={`h-2 rounded bg-success-400`} style={{ width: calculateWidth() }} />
            </div>
        </>
    );
}

Progress2.propTypes = {
    total: PropTypes.number,
    selected: PropTypes.number,
};

export default Progress2;
