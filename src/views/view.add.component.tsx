import React from 'react';
import * as uuid from "uuid";
import { action } from 'mobx';
import { Container } from 'typedi';
import { observer } from 'mobx-react';
import { Modal, Button, Input } from 'antd';

import { ViewsService, View } from './views.service'

@observer
export class ViewAddComponent extends React.Component {
  private viewsService = Container.get(ViewsService);

  @action
  onSubmit = () => {
    /**
     * @todo Shouldn't be an object of `View` with default values?
     */
    const view: View = { id: uuid.v4(), name: this.viewsService.addViewDialog.result, content: [] };

    this.viewsService.views[view.id] = view;
    this.onCancel();
  };

  @action
  onCancel = () => {
    this.viewsService.addViewDialog.result = '';
    this.viewsService.addViewDialog.isOpen = false;
  };

  @action
  onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.viewsService.addViewDialog.result = e.target.value;
  }

  render() {
    return <Modal
      title="Add View"
      visible={this.viewsService.addViewDialog.isOpen}
      onOk={this.onSubmit}
      okButtonProps={{ disabled: this.viewsService.addViewDialog.result.trim().length === 0 }}
      onCancel={this.onCancel}
    >
      <Input value={this.viewsService.addViewDialog.result} onChange={this.onChange} />
    </Modal>

  }
}