import React from 'react';
import { Container } from 'typedi';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';

import { WorkspaceService } from './workspace.service';

import { ComponentData } from '../shared/types';

interface Props {
  componentData: ComponentData;
  Component: React.ComponentType<unknown>;
}

@observer
export class WorkspaceWrapperComponent extends React.Component<Props> {
  private workspaceService = Container.get(WorkspaceService);

  private onComponentWrapperClick = () => {
    this.workspaceService.setCurrentComponentData(this.props.componentData);
  }

  render(): any {
    const { componentData, Component } = this.props;
    const component = <Component {...componentData.props} />;

    return this.workspaceService.previewMode ?
      component :
      <span
        style={{
          position: 'relative',
          display: 'inline-block',
          border: '1px solid red'
        }}>
        <div style={{ border: '1px solid #ccc', position: 'absolute', zIndex: 10, width: '100%', height: '100%' }} onClick={this.onComponentWrapperClick} />
        {component}
      </span>;
  }
}