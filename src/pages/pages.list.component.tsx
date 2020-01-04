import React from 'react';
import { action } from 'mobx';
import { Menu, Button } from 'antd';
import { inject, observer } from 'mobx-react';

import { PagesService } from './pages.service'
import { PageAddComponent } from './page.add.component';

export interface Props {
  pagesService?: PagesService;
}

@inject('pagesService')
@observer
export class PagesListComponent extends React.Component<Props> {
  @action
  onPageAddClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    this.props.pagesService.addPageDialog.isOpen = true;
  };

  render() {
    const { pagesService, ...props } = this.props;

    /**
     * @todo Button for adding pages should be separate component
     */
    return <>
      <Menu.SubMenu
        {...props}
        key="pages"
        title={
          <>
            <strong>Pages</strong>
            <Button
              shape="circle"
              style={{
                position: 'relative',
                left: '10px'
              }}
              onClick={this.onPageAddClick}>+</Button>
          </>
        }
      >
        {this.props.pagesService.pagesList.map(({ id, name }) => (
          <Menu.Item
            id={id}
            key={name}
            style={{ color: id === this.props.pagesService.currentPageId ? '#1890ff' : 'inherit' }}
          >
            {name}
          </Menu.Item>
        ))}
      </Menu.SubMenu>
      <PageAddComponent />
    </>
  }
}