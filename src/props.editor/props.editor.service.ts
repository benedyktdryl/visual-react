import { computed } from "mobx";

export class PropsEditorService {
  @computed
  get propsData() {
    return ["foo", "bar"];
  }
}
