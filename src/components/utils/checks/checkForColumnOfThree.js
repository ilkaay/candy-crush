import blank from "./../../../images/blank.png";

const checkForColumnOfThree = (width, currentColorArrangement) => {
  for (let i = 0; i <= 47; i++) {
    const columnOfThree = [i, i + width, i + width * 2];
    const decidedColor = currentColorArrangement[i];
    const isBlank = currentColorArrangement[i] === blank;

    if (
      columnOfThree.every(
        (square) => currentColorArrangement[square] === decidedColor && !isBlank
      )
    ) {
      columnOfThree.forEach(
        (square) => (currentColorArrangement[square] = blank)
      );
      return true;
    }
  }
};

export default checkForColumnOfThree;
