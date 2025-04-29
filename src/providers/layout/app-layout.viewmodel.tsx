import { DatabaseOutlined } from "@ant-design/icons";
import { MenuProps } from "antd";
import { ItemType } from "antd/es/breadcrumb/Breadcrumb";
import { configure, makeAutoObservable } from "mobx";
import { Locale } from "@/types/locale.enum";
import { Path } from "@/types/path.enum";
import { getPathname } from "@/utils/pathname.util"; // Utility ล้าง Path

configure({
  enforceActions: "never",
});

export class ConsoleViewModel {
  private setLang = "English";
  title = "";
  collapsed = false;
  selectedKeys = "";
  clientId = "";
  apiKey = "";
  breadcrumbs: ItemType[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  get lang(): string {
    return this.setLang;
  }

  set lang(val: Locale) {
    switch (val) {
      case "en":
        this.setLang = "English";
        break;
      case "th":
        this.setLang = "Thai";
        break;
      default:
        break;
    }
  }

  setActive(pathname: string, menu: Path[]) {
    for (const iterator of menu) {
      const of = pathname.indexOf(iterator);
      if (of !== -1) {
        this.selectedKeys = iterator;
        return;
      }
    }
  }

  setBreadcrumbsFromPath(pathname: string) {
    const parts = pathname
      .replace(/^\/|\/$/g, "")
      .split("/")
      .filter(Boolean);

    this.breadcrumbs = parts.map((part) => ({
      title: part
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" "),
    }));

    this.title = String(this.breadcrumbs.at(-1)?.title ?? "");
  }
}

const consoleViewModel = new ConsoleViewModel();

export default consoleViewModel;
