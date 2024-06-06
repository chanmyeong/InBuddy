import { useSelector, useDispatch } from 'react-redux';

import { counterActions } from '@/stores/counterStoreTemplate';

const PageCounter = () => {
    const dispatch = useDispatch();
    const counter = useSelector((state) => state.counter.counter);
    const show = useSelector((state) => state.counter.showCounter);

    const incrementHandler = () => {
        dispatch(counterActions.increment());
    };
    const increaseHandler = () => {
        dispatch(counterActions.increase(10)); // {type: some_unique_identifier, payload: 10}
    };
    const decrementHandler = () => {
        dispatch(counterActions.decrement());
    };
    const toggleCounterHandler = () => {
        dispatch(counterActions.toggleCounterHandler());
    };
};

export default pageCounter;
