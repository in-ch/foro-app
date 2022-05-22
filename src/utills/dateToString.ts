export const DateToString = (
  year: number | undefined,
  month: number | undefined,
  day: number | undefined,
) => {
  return `${year}-${String(month)?.length > 1 ? '' : '0'}${month}-${
    String(day)?.length > 1 ? '' : '0'
  }${day}`;
};
