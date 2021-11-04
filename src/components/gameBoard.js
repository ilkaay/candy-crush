/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";

import blueCandy from "../images/blue-candy.png";
import greenCandy from "../images/green-candy.png";
import orangeCandy from "../images/orange-candy.png";
import purpleCandy from "../images/purple-candy.png";
import redCandy from "../images/red-candy.png";
import yellowCandy from "../images/yellow-candy.png";

import checkForColumnOfFour from "./utils/checks/checkForColumnOfFour";
import checkForColumnOfThree from "./utils/checks/checkForColumnOfThree";
import checkForRowOfFour from "./utils/checks/checkForRowOfFour";
import checkForRowOfThree from "./utils/checks/checkForRowOfThree";
import moveIntoSquareBelow from "./utils/moveIntoSquareBelow";

const width = 8;
const candyColors = [
  blueCandy,
  greenCandy,
  orangeCandy,
  purpleCandy,
  redCandy,
  yellowCandy,
];

const GameBoard = () => {
  const [currentColorArrangement, setCurrentColorArrangement] = useState([]);

  const createBoard = () => {
    const randomColorArrangement = [];

    for (let i = 0; i < width * width; i++) {
      const randomNumberFrom0to5 = Math.floor(
        Math.random() * candyColors.length
      );
      const randomColor = candyColors[randomNumberFrom0to5];
      randomColorArrangement.push(randomColor);
    }
    setCurrentColorArrangement(randomColorArrangement);
  };

  const [squareBeingDragged, setSquareBeingDragged] = useState();
  const [squareBeingReplaced, setSquareBeingReplaced] = useState();

  const dragStart = (e) => {
    setSquareBeingDragged(e.target);
  };
  const dragDrop = (e) => {
    setSquareBeingReplaced(e.target);
  };

  const dragEnd = (e) => {
    if (!squareBeingDragged || !squareBeingReplaced) {
      return;
    }
    const squareBeingDraggedId = parseInt(
      squareBeingDragged.getAttribute("data-id")
    );
    const squareBeingReplacedId = parseInt(
      squareBeingReplaced.getAttribute("data-id")
    );

    currentColorArrangement[squareBeingReplacedId] =
      squareBeingDragged.getAttribute("src");
    currentColorArrangement[squareBeingDraggedId] =
      squareBeingReplaced.getAttribute("src");

    const validMoves = [
      squareBeingDraggedId - 1,
      squareBeingDraggedId - width,
      squareBeingDraggedId + 1,
      squareBeingDraggedId + width,
    ];

    const validMove = validMoves.includes(squareBeingReplacedId);

    const isAColumnOfFour = checkForColumnOfFour(
      width,
      currentColorArrangement
    );
    const isARowOfFour = checkForRowOfFour(currentColorArrangement);
    const isAColumnOfThree = checkForColumnOfThree(
      width,
      currentColorArrangement
    );
    const isARowOfThree = checkForRowOfThree(currentColorArrangement);

    if (
      squareBeingReplacedId &&
      validMove &&
      (isARowOfThree || isARowOfFour || isAColumnOfFour || isAColumnOfThree)
    ) {
      setSquareBeingDragged(null);
      setSquareBeingReplaced(null);
    } else {
      currentColorArrangement[squareBeingReplacedId] =
        squareBeingReplaced.getAttribute("src");
      currentColorArrangement[squareBeingDraggedId] =
        squareBeingDragged.getAttribute("src");
      setCurrentColorArrangement([...currentColorArrangement]);
    }
  };

  useEffect(() => {
    createBoard();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      checkForColumnOfThree(width, currentColorArrangement);
      checkForRowOfThree(currentColorArrangement);
      checkForColumnOfFour(width, currentColorArrangement);
      checkForRowOfFour(currentColorArrangement);
      moveIntoSquareBelow(width, currentColorArrangement, candyColors);
      setCurrentColorArrangement([...currentColorArrangement]);
    }, 100);
    return () => clearInterval(timer);
  }, [
    checkForColumnOfThree,
    checkForColumnOfFour,
    checkForRowOfThree,
    checkForRowOfFour,
    moveIntoSquareBelow,
    currentColorArrangement,
  ]);

  return (
    <div className='game'>
      {currentColorArrangement.map((candyColor, index) => (
        <img
          alt={candyColor}
          src={candyColor}
          style={{ backgroundColor: candyColor }}
          key={index}
          data-id={index}
          draggable={true}
          onDragStart={dragStart}
          onDragOver={(e) => e.preventDefault()}
          onDragEnter={(e) => e.preventDefault()}
          onDragLeave={(e) => e.preventDefault()}
          onDrop={dragDrop}
          onDragEnd={dragEnd}
        />
      ))}
    </div>
  );
};

export default GameBoard;
