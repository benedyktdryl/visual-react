import React from 'react';
import * as antd from 'antd';
import { Layout } from 'antd';
import { observer, inject } from 'mobx-react';

import { ConnectDropTarget, DropTargetMonitor } from 'react-dnd'
import { DropTarget, DropTargetConnector } from 'react-dnd'

import { WORKSPACE_DROP_ID } from '../shared/consts';
import { ForwardRefComponent } from '../shared/forward.ref.component';

import { PagesService } from '../pages/pages.service';

interface Props {
  canDrop: boolean
  isOver: boolean
  connectDropTarget: ConnectDropTarget
  pagesService?: PagesService
}

@inject('pagesService')
@observer
class WorkspacesComponent extends React.Component<Props> {
  get isDragDropActive() {
    return this.props.canDrop && this.props.isOver;
  }

  render() {
    return (
      <ForwardRefComponent refId="workspace-component" onRef={this.props.connectDropTarget}>
        <Layout.Content
          className="workspace-component"
          style={{
            margin: 0,
            height: '100%',
            background: this.props.pagesService.currentPage.content.length === 0 ? '#ccc' : '#fff',
            border: this.isDragDropActive ? '1px dashed #1890ff' : 'none'
          }}
        >
          {this.props.pagesService.currentPage.content.map(componentData => {
            /**
             * @todo: Add react-beautiful-dnd here to move components around
             * @todo: Investigate if we can retrieve proper TS types for ANTD here...
             */
            const Component = (antd as { [key: string]: unknown })[componentData.type] as React.ComponentType<{ id: string }>;

            return <Component key={componentData.id} id={componentData.id} {...componentData.props} />
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