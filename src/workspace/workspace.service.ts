import { observable, action } from "mobx";

import { ComponentData } from "../shared/types";

export class WorkspaceService {
  @observable
  previewMode = false;

  @observable
  currentComponentData: ComponentData | null = null;

  @action
  toggleMode = () => {
    this.previewMode = !this.previewMode;
  };

  @action
  setCurrentComponentData = (componentData: ComponentData) => {
    this.currentComponentData = componentData;
  };
}
