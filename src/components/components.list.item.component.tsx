import React from 'react';
import { Menu } from 'antd';
import Container from 'typedi';
import uuid from 'uuid';

import { DragSourceMonitor, ConnectDragSource } from 'react-dnd'
import { DragSource, DragSourceConnector } from 'react-dnd'

import { ComponentData } from '../shared/types';
import { WORKSPACE_DROP_ID } from '../shared/consts';
import { ForwardRefComponent } from '../shared/forward.ref.component';

import { ViewsService } from '../views/views.service';

export interface Props {
  componentData: ComponentData;
  isDragging: boolean
  connectDragSource: ConnectDragSource
}

export class ComponentsListItemComponent extends React.Component<Props> {
  render() {
    const { connectDragSource, isDragging, componentData, ...props } = this.props;
    const { type, name } = componentData;

    return (
      <ForwardRefComponent refId={`component-${type}`} onRef={connectDragSource}>
        <Menu.Item
          {...props}
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
      const item: ComponentData = monitor.getItem();
      const dropResult = monitor.getDropResult();
      const viewsService = Container.get(ViewsService);

      /**
       * @todo Class here? Or just component service should return wrapped and cleaned object?
       */
      const componentItem = {
        id: uuid.v4(),
        name: item.name,
        type: item.type,
        props: Object.entries(item.props).reduce((memo, [propName, { defaultValue }]) => {
          if (defaultValue) {
            memo[propName] = eval(defaultValue) as unknown;
          }

          return memo;
        }, {} as ComponentData['props']),
        propsData: item.props
      }

      viewsService.activeView.content.push(componentItem);
    },
  },
  (connect: DragSourceConnector, monitor: DragSourceMonitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  }),
)(ComponentsListItemComponent)