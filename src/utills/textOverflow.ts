export const textOverflow = (text: string) => {
  if (text.length > 5) {
    return text.substr(0, 5) + '...';
  } else {
    return text;
  }
};
