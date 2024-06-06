import { P } from '@/components/atoms/P';
import PropTypes from 'prop-types';

function SectionLayout({ sectionHeaderText, children }) {
    return (
        <>
            <P variant="sectionHeader" className="mt-6 mb-2">
                {sectionHeaderText}
            </P>
            {children}
        </>
    );
}

SectionLayout.propTypes = {
    sectionHeaderText: PropTypes.string,
    children: PropTypes.any,
};

export default SectionLayout;
