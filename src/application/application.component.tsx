import React from 'react';
import Conf from 'conf';
import { Container } from "typedi";
import { Layout, Icon, Menu } from 'antd';
import { Provider, observer } from 'mobx-react';

import { DndProvider } from 'react-dnd'
import Backend from 'react-dnd-html5-backend'

import { ApplicationService } from './application.service';
import { ApplicationHeaderComponent } from '../application.header/application.header.component';

import { ViewsService } from '../views/views.service';
import { ViewsListComponent } from '../views/views.list.component';

import { PropsEditorComponent } from '../props.editor/props.editor.component';
import { ComponentsListComponent } from '../components/components.list.component';
import { DroppableWorkspacesComponent as WorkspaceComponent } from '../workspace/workspace.component';

export class ApplicationComponent extends React.Component {
  private viewsService = Container.get(ViewsService);

  private onMenuItemClick = (param: { item: { props: { id: string } } }) => {
    if (this.viewsService.views[param.item.props.id]) {
      this.viewsService.setActiveViewId(param.item.props.id);
    }
  };

  public render() {
    return (
      <DndProvider backend={Backend}>
        <Layout style={{ borderBottom: '1px solid #ccc' }}>
          <ApplicationHeaderComponent />
          <Layout>
            <Layout.Sider width={200} style={{ background: '#fff' }}>
              {/* @todo Should switch to manual collapsing as it doesnt work correctly for now */}
              <Menu
                mode="inline"
                inlineIndent={12}
                selectable={false}
                style={{ height: '100%' }}
                onClick={this.onMenuItemClick}
              >
                <ViewsListComponent />
                <ComponentsListComponent />
              </Menu>
            </Layout.Sider>
            <Layout style={{ padding: 0, height: '90vh' }}>
              <WorkspaceComponent />
            </Layout>
            <Layout.Sider width={200} style={{ background: '#fff' }}>
              {/* @todo Should switch to manual collapsing as it doesnt work correctly for now */}
              <Menu
                mode="inline"
                inlineIndent={12}
                selectable={false}
              >
                <PropsEditorComponent />
              </Menu>
            </Layout.Sider>
          </Layout>
        </Layout>
      </DndProvider>
    )
  }
}

/**
 * @todo check https://landing.ant.design/edit
 */