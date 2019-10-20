export const truncateDate = date => new Date(date).toDateString();


export const truncateWords = (text, wordsNumber) => {
  const wordArray = text.split(' ');

  if (wordArray.length <= wordsNumber) {
    return text
  } else {
    return wordArray.slice(0, wordsNumber).join(' ') + '...';
  }
};
