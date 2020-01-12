import React from 'react';
import { Container } from 'typedi';
import { Layout, Switch } from 'antd';
import { observer } from 'mobx-react';

import { WorkspaceService } from '../workspace/workspace.service';
import { ApplicationService } from '../application/application.service';

@observer
export class ApplicationHeaderComponent extends React.Component {
  private workspaceService = Container.get(WorkspaceService);
  private applicationService = Container.get(ApplicationService);

  public render() {
    return (
      <Layout.Header style={{
        background: '#fff',
        borderBottom: "1px solid #ccc"
      }}>
        {/* @todo Switch to flexbox later, no time for that for now */}
        <p style={{ float: 'left' }}>{this.applicationService.projectName}</p>

        <div style={{ float: 'right' }}>
          <p style={{ display: 'inline-block', marginRight: '10px' }}>Enable preview:</p>
          <Switch
            onChange={this.workspaceService.toggleMode}
            checked={this.workspaceService.previewMode}
          />
        </div>
      </Layout.Header>
    )
  }
}