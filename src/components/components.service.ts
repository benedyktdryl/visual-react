import * as uuid from "uuid";

import { ComponentData } from "../shared/types";

export class ComponentsService {
  /**
   * @todo: This should be retrieved from `${config.get('dataPath')}/components/${config.get('componentsLib')}`
   */
  components: ComponentData[] = [
    {
      name: "Button",
      type: "Button",
      props: { children: "My button" },
      id: uuid.v4()
    },
    { name: "Checkbox", type: "Checkbox", props: {}, id: uuid.v4() }
  ];
}
