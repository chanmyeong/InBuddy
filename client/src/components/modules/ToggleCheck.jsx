import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { Div } from '@/components/atoms/Div.jsx';
import { P } from '@/components/atoms/P.jsx';

function ToggleCheck({ iconLeft, title, content, iconRight, footerQuote, check = true, linkPage, onHandleDivClick }) {
    // const [isCheck, setIsCheck] = useState(check);

    // const handleClick = () => {
    //     setIsCheck(!isCheck);
    // };
    return (
        <>
            <Div
                borderColor={check ? 'brand' : 'default'}
                className="flex flex-row justify-between py-10 shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] cursor-pointer"
                onClick={onHandleDivClick}
            >
                {check ? <div className="text-brand-500">{iconLeft} </div> : <div>{iconLeft} </div>}
                <div className="items-start px-4">
                    <P font="font-pretendardRegular" size="lg" color={check ? 'brand' : 'black'}>
                        {title}
                    </P>
                    <P font="font-pretendardRegular" size="xs" color="neutral">
                        {content}
                    </P>
                </div>
                <div>{iconRight} </div>
            </Div>
            <P className="flex justify-end mt-1.5 mb-4" color="brand" font="font-pretendardRegular" size="sm">
                <Link to={linkPage}>{footerQuote}</Link>
            </P>
        </>
    );
}

ToggleCheck.propTypes = {
    iconLeft: PropTypes.object,
    iconRight: PropTypes.object,
    title: PropTypes.string,
    content: PropTypes.string,
    footerQuote: PropTypes.string,
    check: PropTypes.bool,
    linkPage: PropTypes.string,
    onHandleDivClick: PropTypes.func,
};

export default ToggleCheck;
