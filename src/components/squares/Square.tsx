import styles from './Square.module.css';
import {MutableRefObject, useEffect, useRef} from 'react';

type SquareType = {
    id: Number,
    next: Number,
    reset: Boolean,
    changeNext: any
};

export default function Square({id, next, reset, changeNext} : SquareType) {

    const divRef = useRef() as MutableRefObject<HTMLDivElement>;

    useEffect(() => {   

        if (reset) divRef.current.innerText = '';

    }, [reset])

    const clickEvent = () => {

        if (divRef.current.hasChildNodes()) return;

        divRef.current.innerText = next == 1 ? 'X' : 'O';

        changeNext(next == 1 ? 2 : 1);
    };

    return (
        <>
            <div id={id} ref={divRef} className={styles.square} onClick={clickEvent}></div>
        </>   
    )
}