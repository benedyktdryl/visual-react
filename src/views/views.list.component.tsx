import React from 'react';
import { action } from 'mobx';
import { Container } from 'typedi';
import { Menu, Button } from 'antd';
import { observer } from 'mobx-react';

import { ViewsService } from './views.service'
import { ViewAddComponent } from './view.add.component';

@observer
export class ViewsListComponent extends React.Component {
  private viewsService = Container.get(ViewsService);

  @action
  onViewAddClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    this.viewsService.addViewDialog.isOpen = true;
  };

  render() {
    /**
     * @todo Button for adding views should be separate component
     */
    return <>
      <Menu.SubMenu
        {...this.props}
        key="views"
        title={
          <>
            <strong>Views</strong>
            <Button
              shape="circle"
              style={{
                position: 'relative',
                left: '10px'
              }}
              onClick={this.onViewAddClick}>+</Button>
          </>
        }
      >
        {this.viewsService.viewsList.map(({ id, name }) => (
          <Menu.Item
            id={id}
            key={name}
            style={{ color: id === this.viewsService.activeViewId ? '#1890ff' : 'inherit' }}
          >
            {name}
          </Menu.Item>
        ))}
      </Menu.SubMenu>
      <ViewAddComponent />
    </>
  }
}