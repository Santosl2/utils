export const isValidCNPJ = (value: string | number | number[] = "") => {
  if (!value) return false;

  const numbers = matchNumbers(value);
  if (numbers.length !== 14) return false;

  const items = [...new Set(numbers)];
  if (items.length === 1) return false;

  const digit0 = validCalc(12, numbers);
  const digit1 = validCalc(13, numbers);

  return digit0 === numbers[12] && digit1 === numbers[13];
};

function validCalc(x: number, numbers: number[]) {
  let factor = x - 7;
  let sum = 0;

  for (let i = 0; i < x; i++) {
    sum += numbers[i] * factor--;
    if (factor < 2) factor = 9;
  }

  const result = 11 - (sum % 11);
  return result > 9 ? 0 : result;
}

function matchNumbers(value: string | number | number[] = "") {
  const match = value
    .toString()
    .replace(/[^\d]+/g, "")
    .match(/\d/g);
  return Array.isArray(match) ? match.map(Number) : [];
}
