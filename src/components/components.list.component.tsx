import React from 'react';
import { action } from 'mobx';
import { Menu, Button } from 'antd';
import { inject, observer } from 'mobx-react';

import { ComponentsService } from './components.service'
import { DraggableComponentsListItemComponent } from './components.list.item.component';

import { PagesService } from '../pages/pages.service';

export interface Props {
  pagesService?: PagesService;
  componentsService?: ComponentsService;
}

@inject('componentsService', 'pagesService')
@observer
export class ComponentsListComponent extends React.Component<Props> {
  render() {
    const { componentsService, pagesService, ...props } = this.props;

    return (
      <Menu.SubMenu
        {...props}
        key="components"
        title={
          <strong>Components</strong>
        }
      >
        {this.props.componentsService.components.map(componentData => (
          <DraggableComponentsListItemComponent pagesService={pagesService} key={componentData.id} componentData={componentData} />
        ))}
      </Menu.SubMenu>
    )
  }
}