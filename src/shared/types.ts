import React from "react";

export interface ComponentData {
  id: string;
  name: string;
  type: string;
  props: {
    [key: string]: any;
  };
}
