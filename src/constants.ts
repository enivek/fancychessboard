export enum Color {
    White = "w",
    Black = "b"
}

export enum Piece {
    Pawn = "p",
    Knight = "n",
    Bishop = "b",
    Rook = "r",
    Queen = "q",
    King = "k"
}

export enum Row {
    A = "a",
    B = "b",
    C = "c",
    D = "d",
    E = "e",
    F = "f",
    G = "g",
    H = "h"
}

export function getAllRows(): Array<Row> {
    let result = [Row.A, Row.B, Row.C, Row.D, Row.E, Row.F, Row.G, Row.H];
    return result;
}

export function getAllColumns(): Array<number> {
    let result = [1, 2, 3, 4, 5, 6, 7, 8];
    return result;
}
