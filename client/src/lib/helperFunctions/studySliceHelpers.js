export const weightedRandomSelection = (cardsObj) => {
  const weightedArray = Object.values(cardsObj);

  const totalWeight = weightedArray.reduce((acc, { weight }) => acc + weight, 0);

  const randomValue = Math.random() * totalWeight;

  let cumulativeWeight = 0;
  for (const card of weightedArray) {
    const { weight } = card;
    cumulativeWeight += weight;
    if (randomValue <= cumulativeWeight) {
      return card;
    }
  }
};

export const getDifferentCard = (previousCardId, cardsObj) => {
  const nextCard = weightedRandomSelection(cardsObj);

  if (nextCard._id === previousCardId) {
    return getDifferentCard(previousCardId, cardsObj);
  };

  return nextCard;
}