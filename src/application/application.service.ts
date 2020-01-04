import { observable } from "mobx";

export class ApplicationService {
  @observable
  projectName: string = "test";
}
