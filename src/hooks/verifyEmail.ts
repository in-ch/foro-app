export function isEmail(value: string) {
  let regExp = /(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
  return regExp.test(value); // 형식에 맞는 경우 true 리턴
}
