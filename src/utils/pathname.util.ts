import { Locale } from "@/types/locale.enum";

export const getPathname = (pathname: string) => {
  let path = pathname;
  const pathSplit = pathname.split("/");
  const lang = pathSplit.filter((f) =>
    Object.values(Locale).includes(f as Locale)
  );

  if (lang.length) {
    path = path.replace(`/${lang[0]}`, "");
  }

  return path;
};
