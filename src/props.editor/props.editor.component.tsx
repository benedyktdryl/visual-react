import React from 'react';
import { List } from 'antd';
import { action } from 'mobx';
import { Container } from 'typedi';
import { observer } from 'mobx-react';

import { PropsEditorService } from './props.editor.service';

@observer
export class PropsEditorComponent extends React.Component {
  private propsEditorService = Container.get(PropsEditorService);

  render() {
    return (
      <List
        dataSource={this.propsEditorService.propsData}
        renderItem={item => (
          <List.Item>
            {item}
          </List.Item>
        )}
      />
    )
  }
}

/**
 * @todo https://www.fast.design/docs/en/packages/fast-tooling-react/#css-editor
 * @todo https://github.com/Raathigesh/fabulous/blob/master/src/ui/App.tsx
 */