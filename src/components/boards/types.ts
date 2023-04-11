import {RefObject} from 'react';

export type InitialValues = {
    reset: boolean,
    next: number,
    squares: number[]
}

export type ActionType = {
    type: string,
    reset: boolean,
    next: number,
    squares: number[]
}

export type SquareRefType = {
    [key: number]: RefObject<HTMLDivElement>
};