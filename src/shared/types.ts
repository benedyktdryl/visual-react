import React from "react";

export interface ComponentData {
  name: string;
  type: string;
  props: {
    [key: string]: any;
  };
  /**
   * @todo Should be type of react-docgen output
   */
  propsData?: any;
  id?: string;
}
