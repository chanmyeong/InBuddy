import PropTypes from 'prop-types';

import { P } from '@/components/atoms/P.jsx';
import { Switch } from '@/components/atoms/Switch';

function PAndSwitch({ header, content, isCheck, checking }) {
    const handleChange = (checked) => {
        // console.log('Switch의 checked 값:', checked);
        !checked;
        checking(checked);
    };

    return (
        <>
            <div className="flex flex-row justify-between">
                <P variant="content">{header}</P>
                <Switch checked={isCheck} onCheckedChange={handleChange} />
            </div>
            <P className="mt-2 mb-2" variant="default" size="sm" color="neutral">
                {content}
            </P>
        </>
    );
}

PAndSwitch.propTypes = {
    header: PropTypes.string,
    content: PropTypes.string,
    isCheck: PropTypes.bool,
    checking: PropTypes.func,
};

export default PAndSwitch;
