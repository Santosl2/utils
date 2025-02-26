import { PHONE_REGEX } from "../regex";

export function isValidPhone(phone: string) {
  return PHONE_REGEX.test(phone);
}
