import { createInstance, InitOptions } from "i18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { initReactI18next } from "react-i18next/initReactI18next";
import { PageName } from "../types/page-name.enum";
import i18nConfig from "./i18n.config";

interface TranslationsOptions {
  locale: string;
  pageName: PageName[];
  i18nInstance?: ReturnType<typeof createInstance>;
  resources?: Record<string, any>; // You might want to adjust this type based on your actual resource structure
}

const initTranslations = async ({
  locale,
  pageName,
  i18nInstance,
  resources,
}: TranslationsOptions) => {
  i18nInstance = i18nInstance ?? createInstance();

  i18nInstance.use(initReactI18next);

  if (!resources) {
    i18nInstance.use(
      resourcesToBackend(
        (language: string, namespace: string) =>
          import(`./${language}/${namespace}.json`)
      )
    );
  }

  const i18nOptions: InitOptions = {
    lng: locale,
    resources,
    fallbackLng: i18nConfig.defaultLocale,
    supportedLngs: i18nConfig.locales,
    defaultNS: pageName[0],
    fallbackNS: pageName[0],
    ns: pageName,
    preload: resources ? [] : i18nConfig.locales,
  };

  await i18nInstance.init(i18nOptions);

  return {
    i18n: i18nInstance,
    resources: i18nInstance.services.resourceStore.data,
    t: i18nInstance.t.bind(i18nInstance), // Ensure correct binding
  };
};

export default initTranslations;
