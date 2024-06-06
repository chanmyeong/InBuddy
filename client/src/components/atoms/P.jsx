import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';

import { cn } from '@/lib/utils';
import PropTypes from 'prop-types';

const pVariants = cva('', {
    variants: {
        variant: {
            default: 'text-sm font-pretendardRegular text-text-black',
            mainHeader: 'text-3xl font-pretendardBold text-text-black text-center',
            sectionHeader: 'text-xl font-pretendardBold text-text-nileBlue',
            subHeader: 'text-text-ming font-pretendardBold text-lg',
            content: 'text-text-black font-pretendardBold text-base',
        },
        color: {
            black: 'text-text-black',
            nileBlue: 'text-text-nileBlue',
            ming: 'text-text-ming',
            neutral: 'text-neutral-500',
            error: 'text-error-500',
            warning: 'text-warning-500',
            success: 'text-success-500',
            brand: 'text-brand-500',
        },
        size: {
            xs: 'text-xs',
            sm: 'text-sm',
            base: 'text-base',
            lg: 'text-lg',
            xl: 'text-xl',
            '2xl': 'text-2xl',
            '3xl': 'text-3xl',
            '4xl': 'text-4xl',
            '5xl': 'text-5xl',
        },
        font: {
            regular: 'font-pretendardRegular',
            bold: 'font-pretendardBold',
        },
    },
    defaultVariants: {
        variant: 'default',
    },
});

const P = React.forwardRef(({ className, variant, color, size, font, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'p';
    return <Comp className={cn(pVariants({ variant, color, size, font, className }))} ref={ref} {...props} />;
});
P.displayName = 'P';

P.propTypes = {
    className: PropTypes.string,
    variant: PropTypes.string,
    color: PropTypes.string,
    size: PropTypes.string,
    font: PropTypes.string,
    asChild: PropTypes.bool,
};

export { P, pVariants };
