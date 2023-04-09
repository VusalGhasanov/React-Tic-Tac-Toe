import styles from './Square.module.css';
import {forwardRef, ForwardedRef, MouseEventHandler} from 'react';

type SquarePropsType = {
    id: Number,
    clickEvent: MouseEventHandler
};

const Square = (props : SquarePropsType, ref: ForwardedRef<HTMLDivElement>) => {
    return (
        <>
            <div id={props.id.toString()} ref={ref} className={styles.square} onClick={props.clickEvent}></div>
        </>   
    )
};

export default forwardRef(Square);