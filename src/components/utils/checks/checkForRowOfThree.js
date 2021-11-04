import blank from "./../../../images/blank.png";

const checkForRowOfThree = (currentColorArrangement) => {
  for (let i = 0; i < 64; i++) {
    const rowOfThree = [i, i + 1, i + 2];
    const decidedColor = currentColorArrangement[i];
    const isBlank = currentColorArrangement[i] === blank;
    const notValid = [
      6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55, 63, 64,
    ];

    if (notValid.includes(i)) continue;

    if (
      rowOfThree.every(
        (square) => currentColorArrangement[square] === decidedColor && !isBlank
      )
    ) {
      rowOfThree.forEach((square) => (currentColorArrangement[square] = blank));
      return true;
    }
  }
};

export default checkForRowOfThree;
