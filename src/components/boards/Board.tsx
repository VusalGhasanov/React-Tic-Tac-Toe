import Square from '@/components/squares/Square';
import styles from './Board.module.css';
import { useEffect, useState } from 'react';

export default function Board() {

    const results: number[][] = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    const [next, setNext] = useState<Number>(1);

    const [reset, setReset] = useState<Boolean>(false);

    const [squares, setSquares] = useState(Array(9).fill(null));

    useEffect(() => {

        results.map((result: number[]) => {

            let [firstElement, secondElement, thirdElement] = result.map(num => document.getElementById(num.toString()));

            if(firstElement?.innerText == 'X' && secondElement?.innerText == 'X' && thirdElement?.innerText == 'X') {
                alert('First player won game');
                setReset(true);
                return;
            }

            if(firstElement?.innerText == 'O' && secondElement?.innerText == 'O' && thirdElement?.innerText == 'O') {
                alert('Second player won game');
                setReset(true);
                return;
            }

        });

        const elements = [];

        for (let i = 0; i < 9; i++) {
            elements.push(document.getElementById(i.toString()));
        }

        const isDraw = elements.every(element => element?.hasChildNodes());

        if (isDraw) {
            alert('The game is draw');
            setReset(true);
            return;
        }
    }, [next]);

    return (
        <>
            <div className={styles.board}>
                {squares.map((square, key) => <Square key={key} next={next} changeNext={setNext} id={key} reset={reset} />)}
            </div>
        </>   
    )
}