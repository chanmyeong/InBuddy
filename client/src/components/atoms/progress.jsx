import * as React from 'react';
import * as ProgressPrimitive from '@radix-ui/react-progress';

import { cn } from '@/lib/utils';

import PropTypes from 'prop-types';

const Progress = React.forwardRef(({ className, value, ...props }, ref) => (
    <ProgressPrimitive.Root
        ref={ref}
        className={cn('relative h-2 w-full overflow-hidden rounded-full bg-primary/30', className)}
        {...props}
    >
        <ProgressPrimitive.Indicator
            className="flex-1 w-full h-full transition-all bg-success-500"
            style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
        />
    </ProgressPrimitive.Root>
));
Progress.displayName = ProgressPrimitive.Root.displayName;

Progress.propTypes = {
    className: PropTypes.string,
    value: PropTypes.number,
};

export { Progress };
