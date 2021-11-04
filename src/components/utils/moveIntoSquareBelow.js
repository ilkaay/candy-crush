import blank from "./../../images/blank.png";

const moveIntoSquareBelow = (width, currentColorArrangement, candyColors) => {
  for (let i = 0; i <= 55; i++) {
    const firstRow = [0, 1, 2, 3, 4, 5, 6, 7];
    const isFirstRow = firstRow.includes(i);

    if (isFirstRow && currentColorArrangement[i] === blank) {
      let randomNumberFrom0to5 = Math.floor(Math.random() * candyColors.length);
      currentColorArrangement[i] = candyColors[randomNumberFrom0to5];
    }

    if (currentColorArrangement[i + width] === blank) {
      currentColorArrangement[i + width] = currentColorArrangement[i];
      currentColorArrangement[i] = blank;
    }
  }
};

export default moveIntoSquareBelow;
