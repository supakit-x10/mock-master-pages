import { Locale } from "../types/locale.enum";

export const getLangPath = (
  val: Locale,
  pathname: string,
  searchParams?: string
) => {
  const pathSplit = pathname.split("/");
  const lang = pathSplit.filter((f) =>
    Object.values(Locale).includes(f as Locale)
  );

  let path = pathname;
  if (lang.length) {
    path = path.replace(`${lang[0]}`, `${val}`);
  } else {
    path = `/${val}${path}`;
  }

  if (searchParams) {
    return `${path}?${searchParams}`;
  } else {
    return path;
  }
};
