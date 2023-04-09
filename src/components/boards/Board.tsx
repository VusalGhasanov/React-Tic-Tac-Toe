import Square from '@/components/squares/Square';
import styles from './Board.module.css';
import { Reducer, useEffect, useReducer, useRef } from 'react';

interface InitialValues {
    reset: boolean,
    next: number,
    squares: number[]
}

type ActionType = {
    type: string,
    reset: boolean,
    next: number,
    squares: number[]
}

const reducer: Reducer<InitialValues, ActionType> = (state: InitialValues, action: ActionType) => {

    switch (action.type) {
        case 'SET_SQUARES':
            return {
                ...state,
                Squares : action.squares
            }

        case 'SET_RESET':
            return {
                ...state,
                reset : action.reset
            }

        case 'SET_NEXT':
            return {
                ...state,
                next : action.next
            }
    
        default:
            throw Error(`Unknown action ${action.type}`)
    }

}

const initialData: InitialValues = {
    reset : false,
    next : 1,
    squares : Array(9).fill(1)
}

export default function Board() {

    const [state, dispatch] = useReducer(reducer, initialData)

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

    const squareRef = useRef<HTMLDivElement>(null);

    const checkWinner = (user: string) => {

        results.map( (result: number[]) => {

            const check = result.every( num => document.getElementById(num.toString())?.innerText == user);

            if (check) {
                alert(`${user} player won game`);

                return dispatch({
                    type : 'SET_RESET',
                    reset : true
                });
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
            
            return dispatch({
                type : 'SET_RESET',
                reset : true
            });
        }
    }

    const clickToSquare = () => {

        if (squareRef.current === null) return false;

        if (squareRef.current.hasChildNodes()) return;

        squareRef.current.innerText = state.next == 1 ? 'T' : 'V';

        dispatch({
            type : 'SET_NEXT',
            next : next == 1 ? 2 : 1
        });
    };

    useEffect(() => {

        checkWinner('T');

        checkWinner('V');

        checkDraw();

    }, [state.next]);

    useEffect(() => {   

        if (state.reset && squareRef.current !== null) squareRef.current.innerText = '';

    }, [state.reset])

    return (
        <>
            <div className={styles.board}>
                {state.squares.length > 0 && 
                    state.squares.map((square: number|null, key: number) => {
                        return <Square 
                            id={key} 
                            key={key} 
                            ref={squareRef} 
                            clickEvent={clickToSquare} 
                        />
                })}
            </div>
        </>   
    )
}