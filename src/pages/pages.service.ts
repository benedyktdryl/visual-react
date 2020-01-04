import { observable, computed, action } from "mobx";

import { ComponentData } from "../shared/types";
import { DEFAULT_PAGE_ID } from "../shared/consts";

export interface Page {
  id: string;
  name: string;
  content: ComponentData[];
}

export interface Pages {
  [key: string]: Page;
}

export class PagesService {
  @observable
  currentPageId = DEFAULT_PAGE_ID;

  @observable
  pages: Pages = {
    [DEFAULT_PAGE_ID]: {
      id: DEFAULT_PAGE_ID,
      name: "Home",
      content: []
    }
  };

  @observable
  addPageDialog = {
    isOpen: false,
    result: ""
  };

  @action
  setCurrentPageId = (pageId: string) => {
    this.currentPageId = pageId;
  };

  @computed
  get pagesList() {
    return Object.values(this.pages);
  }

  @computed
  get currentPage() {
    return this.pages[this.currentPageId];
  }
}
