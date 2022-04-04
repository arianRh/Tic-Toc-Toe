import React, { useEffect, useState } from "react";
import { Square } from "./Square";
import { calculateWinner } from "./CalculateWinner";

export function Board() {
	const [XIsNext, setXIsNext] = useState(() => {
		if (Math.floor(Math.random() * 2) < 0.5) {
			return true;
		} else {
			return false;
		}
	});
	const [history, setHistory] = useState([Array(9).fill(null)]);
	const [step, setStep] = useState(0);
	const [xWinCounter, setXWinCounter] = useState(
		() => localStorage.getItem("xWins") || "0"
	);
	const [oWinCounter, setOWinCounter] = useState(
		() => localStorage.getItem("oWins") || "0"
	);
	const allHistorys = history.slice(0, step + 1);
	const currentHistory = allHistorys[allHistorys.length - 1];
	const winner = calculateWinner(currentHistory);
	let status = "";
	const jumpTo = (step) => {
		setStep(step);
		setXIsNext(step % 2 === 0);
		setHistory((prevState) => {
			return [...prevState.slice(0, step + 1)];
		});
	};
	const moves = allHistorys.map((step, move) => {
		const desc = move ? "Go to move #" + move : "Go to game start";
		return (
			<li key={move}>
				<button onClick={() => jumpTo(move)}>{desc}</button>
			</li>
		);
	});

	useEffect(() => {
		if (winner === "equal") {
			return;
		} else {
			if (winner === "X") {
				localStorage.setItem("xWins", +xWinCounter + 1);
				setXWinCounter(localStorage.xWins);
			}
			if (winner === "O") {
				localStorage.setItem("oWins", +oWinCounter + 1);
				setOWinCounter(localStorage.oWins);
			}
		}
	}, [winner]);

	const handleClick = (i) => {
		const squares = currentHistory.slice();
		if (calculateWinner(currentHistory) || currentHistory[i]) {
			return;
		}
		squares[i] = XIsNext ? "X" : "O";
		setHistory((prevState) => {
			return [...prevState, squares];
		});
		setStep(history.length);
		setXIsNext(!XIsNext);
	};

	const handleReset = () => {
		localStorage.clear();
		setHistory([Array(9).fill(null)]);
		setXWinCounter(0);
		setOWinCounter(0);
	};

	const renderSquare = (i) => {
		return <Square value={currentHistory[i]} onClick={() => handleClick(i)} />;
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
			<div className='status'>
				<h1>{status}</h1>
				<ol>{moves}</ol>
			</div>
			<div>
				<h3>Player one victory : {xWinCounter}</h3>
				<h3>Player two victory : {oWinCounter}</h3>

				<button type='button' onClick={handleReset}>
					Reset
				</button>
			</div>
		</div>
	);
}
