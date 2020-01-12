import React from 'react';
import { action } from 'mobx';
import Container from 'typedi';
import { Menu, Button } from 'antd';
import { observer } from 'mobx-react';

import { ComponentsService } from './components.service'
import { DraggableComponentsListItemComponent } from './components.list.item.component';

import { ViewsService } from '../views/views.service';

@observer
export class ComponentsListComponent extends React.Component {
  private viewsService = Container.get(ViewsService);
  private componentsService = Container.get(ComponentsService);

  render() {
    return (
      <Menu.SubMenu
        {...this.props}
        key="components"
        title={
          <strong>Components</strong>
        }
      >
        {this.componentsService.components.map(componentData => (
          <DraggableComponentsListItemComponent key={componentData.type} componentData={componentData} />
        ))}
      </Menu.SubMenu>
    )
  }
}