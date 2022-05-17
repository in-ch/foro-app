export function isNickname(value: string) {
  if (value.length < 2) {
    return false;
  } else {
    return true;
  }
}
