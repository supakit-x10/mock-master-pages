import { Locale } from "./locale.enum";

export interface LocaleParams {
  locale: Locale;
}

export interface SearchParams {
  id: string;
}

export interface Params<P = LocaleParams, Sp = SearchParams> {
  params: P;
  searchParams: Sp;
}
