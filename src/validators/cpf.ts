export const isValidCpf = (cpfValue: string) => {
  if (!cpfValue) return false;

  const formatToString = (val: unknown) => {
    if (Array.isArray(val)) return val.join("");
    if (typeof val === "string") return val;
    return null;
  };

  const cpfString = formatToString(cpfValue);

  if (!cpfString) return false;

  const cpf = cpfString.replace(/[^\d]+/g, "");

  // Validates length
  if (cpf.length !== 11) return false;

  // Clear invalids
  if (/^(\d)\1+$/.test(cpf)) return false;

  let sum = 0;
  let remain;

  for (let i = 1; i <= 9; i++)
    sum = sum + parseInt(cpf.substring(i - 1, i)) * (11 - i);
  remain = (sum * 10) % 11;

  if (remain == 10 || remain == 11) remain = 0;
  if (remain != parseInt(cpf.substring(9, 10))) return false;

  sum = 0;
  for (let i = 1; i <= 10; i++)
    sum = sum + parseInt(cpf.substring(i - 1, i)) * (12 - i);
  remain = (sum * 10) % 11;

  if (remain == 10 || remain == 11) remain = 0;
  if (remain != parseInt(cpf.substring(10, 11))) return false;

  return true;
};
