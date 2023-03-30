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

    const checkWinner = (user: string) => {

        results.map( (result: number[]) => {

            const check = result.every( num => document.getElementById(num.toString())?.innerText == user);

            if (check) {
                alert(`${user} player won game`);
                return setReset(true);
            }
        })
    } 

    const checkDraw = () => {
        const elements = [];

        for (let i = 0; i < 9; i++) {
            elements.push(document.getElementById(i.toString()));
        }

        const isDraw = elements.every(element => element?.hasChildNodes());

        if (isDraw) {
            alert('The game is draw');
            return setReset(true);
        }
    }

    useEffect(() => {

        checkWinner('T');

        checkWinner('V');

        checkDraw();

    }, [next]);

    return (
        <>
            <div className={styles.board}>
                {squares.map((square, key) => <Square key={key} next={next} changeNext={setNext} id={key} reset={reset} />)}
            </div>
        </>   
    )
}