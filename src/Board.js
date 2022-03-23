import React, { useState } from "react";
import { Square } from "./Square";
import { calculateWinner } from "./CalculateWinner";

export function Board() {
	const [squares, setSquares] = useState(Array(9).fill(null));
	const [XIsNext, setXIsNext] = useState(true);

	const winner = calculateWinner(squares);
	let status = "";

	const handleClick = (i) => {
		const squaress = squares.slice();
		if (calculateWinner(squares) || squares[i]) {
			return;
		}
		squaress[i] = XIsNext ? "X" : "O";
		setSquares(squaress);
		setXIsNext(!XIsNext);
	};

	const renderSquare = (i) => {
		return <Square value={squares[i]} onClick={() => handleClick(i)} />;
	};

	if (winner === "equal") {
		status = "Game is equal";
	} else if (winner) {
		status = "Winner is : " + winner;
	} else {
		status = "Next player : " + (XIsNext ? "X" : "O");
	}

	return (
		<div>
			<div className='status'>
				<h1>{status}</h1>
			</div>
			<div className='board-row'>
				{renderSquare(0)}
				{renderSquare(1)}
				{renderSquare(2)}
			</div>
			<div className='board-row'>
				{renderSquare(3)}
				{renderSquare(4)}
				{renderSquare(5)}
			</div>
			<div className='board-row'>
				{renderSquare(6)}
				{renderSquare(7)}
				{renderSquare(8)}
			</div>
		</div>
	);
}
