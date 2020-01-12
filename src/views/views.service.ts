import { observable, computed, action } from "mobx";

import { ComponentData } from "../shared/types";
import { DEFAULT_VIEW_ID } from "../shared/consts";

export interface View {
  id: string;
  name: string;
  content: ComponentData[];
}

export interface Views {
  [key: string]: View;
}

export class ViewsService {
  @observable
  activeViewId = DEFAULT_VIEW_ID;

  @observable
  views: Views = {
    [DEFAULT_VIEW_ID]: {
      id: DEFAULT_VIEW_ID,
      name: "Main",
      content: []
    }
  };

  @observable
  addViewDialog = {
    isOpen: false,
    result: ""
  };

  @action
  setActiveViewId = (viewId: string) => {
    this.activeViewId = viewId;
  };

  @computed
  get viewsList() {
    return Object.values(this.views);
  }

  @computed
  get activeView() {
    return this.views[this.activeViewId];
  }
}
