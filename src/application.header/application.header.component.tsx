import React from 'react';
import { Layout, Switch } from 'antd';
import { observer, inject } from 'mobx-react';

import { WorkspaceService } from '../workspace/workspace.service';
import { ApplicationService } from '../application/application.service';

export interface Props {
  workspaceService?: WorkspaceService;
  applicationService?: ApplicationService;
}

@inject('applicationService', 'workspaceService')
@observer
export class ApplicationHeaderComponent extends React.Component<Props> {
  public render() {
    return (
      <Layout.Header style={{
        background: '#fff',
        borderBottom: "1px solid #ccc"
      }}>
        {/* @todo Switch to flexbox later, no time for that for now */}
        <p style={{ float: 'left' }}>{this.props.applicationService.projectName}</p>

        <div style={{ float: 'right' }}>
          <p style={{ display: 'inline-block', marginRight: '10px' }}>Enable preview:</p>
          <Switch
            onChange={this.props.workspaceService.toggleMode}
            checked={this.props.workspaceService.previewMode}
          />
        </div>
      </Layout.Header>
    )
  }
}