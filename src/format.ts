
export function money (val: number, digits: number = 2): any {
  if (val.toFixed(digits) === (0.0).toFixed(digits)) {
    return "-"
  } else {
    return "£" + val.toFixed(digits)
  }
}
