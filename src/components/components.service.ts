import fs from "fs";
import path from "path";
import { Container } from "typedi";

import { ComponentData } from "../shared/types";
import { ConfigService } from "../config/config.service";
import { observable } from "mobx";

export class ComponentsService {
  private configService = Container.get(ConfigService);

  @observable
  public components: ComponentData[] = [];

  constructor() {
    /**
     * @todo: This should be retrieved from `${config.get('dataPath')}/components/${config.get('componentsLib')}`
     * @todo: There should be list of Node packages to be used and should query through them, getting `/dist` directory to retrieve them
     * @todo: react-docgen should be applied automatically and results should be just cached somewhere
     */
    this.components = Object.values(
      JSON.parse(
        fs
          .readFileSync(
            path.join(process.cwd(), "data", "components", "antd.json")
          )
          .toString()
      )
    ).map(({ displayName, props }) => ({
      props,
      name: displayName,
      type: displayName
    }));

    /* eslint no-console: 0 */
    console.log(this.components);
  }
}
