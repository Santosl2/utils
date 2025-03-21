import { isValidCNPJ } from "./cnpj";
import { isValidCpf } from "./cpf";
import { isValidPhone } from "./phone";

export const Validators = {
  cnpj: isValidCNPJ,
  cpf: isValidCpf,
  phone: isValidPhone,
};
