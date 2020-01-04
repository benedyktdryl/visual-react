import React from 'react';
import Conf from 'conf';
import { Layout, Icon, Menu } from 'antd';
import { Provider, observer } from 'mobx-react';

import { DndProvider } from 'react-dnd'
import Backend from 'react-dnd-html5-backend'

import { ApplicationService } from './application.service';
import { ApplicationHeaderComponent } from '../application.header/application.header.component';

import { PagesService } from '../pages/pages.service';
import { PagesListComponent } from '../pages/pages.list.component';

import { ComponentsService } from '../components/components.service';
import { ComponentsListComponent } from '../components/components.list.component';

import { WorkspaceService } from '../workspace/workspace.service';
import { DroppableWorkspacesComponent as WorkspacesComponent } from '../workspace/workspace.component';

export class ApplicationComponent extends React.Component {
  /**
   * @todo: we should use some kind of factory here to also create default config if doesnt exists
   * @todo: defaultConfig = { dataPath: './data', componentsLib: 'antd' }
   */
  private configService = new Conf();
  private pagesService = new PagesService();
  private workspaceService = new WorkspaceService();
  private componentsService = new ComponentsService();
  private applicationService = new ApplicationService();

  private get injectables() {
    return {
      pagesService: this.pagesService,
      workspaceService: this.workspaceService,
      componentsService: this.componentsService,
      applicationService: this.applicationService
    }
  }

  private onMenuItemClick = (param: { item: { props: { id: string } } }) => {
    if (this.pagesService.pages[param.item.props.id]) {
      this.pagesService.setCurrentPageId(param.item.props.id);
    }
  };

  public render() {
    return (
      <DndProvider backend={Backend}>
        <Provider {...this.injectables}>
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
                  <PagesListComponent />
                  <ComponentsListComponent />
                </Menu>
              </Layout.Sider>
              <Layout style={{ padding: 0, height: '90vh' }}>
                <WorkspacesComponent />
              </Layout>
              <Layout.Sider width={200} style={{ background: '#fff' }}>
                {/* @todo Should switch to manual collapsing as it doesnt work correctly for now */}
                <Menu
                  mode="inline"
                  inlineIndent={12}
                  selectable={false}
                >
                  <ComponentsListComponent />
                </Menu>
              </Layout.Sider>
            </Layout>
          </Layout>
        </Provider>
      </DndProvider>
    )
  }
}