import { observable, action } from "mobx";

export class WorkspaceService {
  @observable
  previewMode = false;

  @action
  toggleMode = () => {
    this.previewMode = !this.previewMode;
  };
}
