import styles from './Square.module.css';
import {forwardRef, ForwardedRef} from 'react';

type SquarePropsType = {
    id: Number,
    clickEvent: any
};

const Square = (props : SquarePropsType, ref: ForwardedRef<HTMLDivElement>) => {
    return (
        <>
            <div id={props.id.toString()} ref={ref} className={styles.square} onClick={() => props.clickEvent(props.id)}></div>
        </>   
    )
};

export default forwardRef(Square);