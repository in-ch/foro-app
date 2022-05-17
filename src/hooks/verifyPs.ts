export function isPassword(value: string) {
  let regExp = /^(?=.*[a-zA-Z])((?=.*\d)|(?=.*\W)).{8,20}$/;
  // 8 ~ 20자 영문, 숫자 조합
  return regExp.test(value); // 형식에 맞는 경우 true 리턴
}
export function isPasswordEqual(value1: string, value2: string) {
  if (value1 === value2) {
    return true;
  } else {
    return false;
  }
}
