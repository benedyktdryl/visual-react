import React from 'react';
import { Menu } from 'antd';
import { inject } from 'mobx-react';

import { DragSourceMonitor, ConnectDragSource } from 'react-dnd'
import { DragSource, DragSourceConnector } from 'react-dnd'

import { ComponentData } from '../shared/types';
import { WORKSPACE_DROP_ID } from '../shared/consts';
import { ForwardRefComponent } from '../shared/forward.ref.component';

import { PagesService } from '../pages/pages.service';

export interface Props {
  componentData: ComponentData;
  isDragging: boolean
  connectDragSource: ConnectDragSource
  pagesService: PagesService
}

export class ComponentsListItemComponent extends React.Component<Props> {
  render() {
    const { connectDragSource, isDragging, componentData, pagesService, ...props } = this.props;
    const { type, name } = componentData;

    return (
      <ForwardRefComponent refId={`component-${type}`} onRef={connectDragSource}>
        <Menu.Item
          {...props}
          className={`component-${type}`}
          style={{
            opacity: isDragging ? 0.4 : 1,
            height: '30px',
            lineHeight: '30px'
          }}>{name}</Menu.Item>
      </ForwardRefComponent>
    )
  }
}

export const DraggableComponentsListItemComponent = DragSource(
  /**
   * @todo: check if we can make component preview when dragging https://gist.github.com/kevinweber/3c519c32db6c976e9cbb5565dc3822f1
   */
  WORKSPACE_DROP_ID,
  {
    beginDrag: (props: Props) => props.componentData,
    endDrag(props: Props, monitor: DragSourceMonitor) {
      const item = monitor.getItem();
      const dropResult = monitor.getDropResult();

      props.pagesService.currentPage.content.push(item);
    },
  },
  (connect: DragSourceConnector, monitor: DragSourceMonitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  }),
)(ComponentsListItemComponent)