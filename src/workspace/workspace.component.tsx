import React from 'react';
import * as antd from 'antd';
import { Layout } from 'antd';
import { Container } from 'typedi';
import { observer } from 'mobx-react';

import { ConnectDropTarget, DropTargetMonitor } from 'react-dnd'
import { DropTarget, DropTargetConnector } from 'react-dnd'

import { WorkspaceWrapperComponent } from './workspace.wrapper.component';

import { ComponentData } from '../shared/types';
import { WORKSPACE_DROP_ID } from '../shared/consts';
import { ForwardRefComponent } from '../shared/forward.ref.component';

import { ViewsService } from '../views/views.service';

interface Props {
  canDrop: boolean
  isOver: boolean
  connectDropTarget: ConnectDropTarget
}

@observer
class WorkspacesComponent extends React.Component<Props> {
  private viewsService = Container.get(ViewsService);

  get isDragDropActive() {
    return this.props.canDrop && this.props.isOver;
  }

  render() {
    /**
     * @todo investigate https://github.com/ryanseddon/react-frame-component
     */
    return (
      <ForwardRefComponent refId="workspace-component" onRef={this.props.connectDropTarget}>
        <Layout.Content
          style={{
            margin: 0,
            height: '100%',
            background: this.viewsService.activeView.content.length === 0 ? '#ccc' : '#fff',
            border: this.isDragDropActive ? '1px dashed #1890ff' : 'none'
          }}
        >
          {this.viewsService.activeView.content.map(componentData => {
            /**
             * @todo Add react-beautiful-dnd here to move components around
             * @todo Investigate if we can retrieve proper TS types for ANTD here...
             */
            const Component = (antd as { [key: string]: any })[componentData.type];

            return <WorkspaceWrapperComponent key={componentData.id} Component={Component} componentData={componentData} />
          })}
        </Layout.Content>
      </ForwardRefComponent>
    )
  }
}

/**
 * @todo `workspace.service` should do this job and have injected other service
 */
export const DroppableWorkspacesComponent = DropTarget(
  WORKSPACE_DROP_ID,
  {
    drop: (props) => ({}),
  },
  (connect: DropTargetConnector, monitor: DropTargetMonitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop(),
  }),
)(WorkspacesComponent)