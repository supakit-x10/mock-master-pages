import { Locale } from "../types/locale.enum";

export const locales: Locale[] = Object.values(Locale)

const i18nConfig = {
  locales,
  defaultLocale: Locale.En,
};

export default i18nConfig;
