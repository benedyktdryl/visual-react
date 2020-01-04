import React from 'react';
import * as uuid from "uuid";
import { action } from 'mobx';
import { Modal, Button, Input } from 'antd';
import { inject, observer } from 'mobx-react';

import { PagesService, Page } from './pages.service'

export interface Props {
  pagesService?: PagesService;
}

@inject('pagesService')
@observer
export class PageAddComponent extends React.Component<Props> {
  @action
  onSubmit = () => {
    /**
     * @todo Shouldn't be an object of `Page` with default values?
     */
    const page: Page = { id: uuid.v4(), name: this.props.pagesService.addPageDialog.result, content: [] };

    this.props.pagesService.pages[page.id] = page;
    this.onCancel();
  };

  @action
  onCancel = () => {
    this.props.pagesService.addPageDialog.result = '';
    this.props.pagesService.addPageDialog.isOpen = false;
  };

  @action
  onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.props.pagesService.addPageDialog.result = e.target.value;
  }

  render() {
    return <Modal
      title="Add Page"
      visible={this.props.pagesService.addPageDialog.isOpen}
      onOk={this.onSubmit}
      okButtonProps={{ disabled: this.props.pagesService.addPageDialog.result.trim().length === 0 }}
      onCancel={this.onCancel}
    >
      <Input value={this.props.pagesService.addPageDialog.result} onChange={this.onChange} />
    </Modal>

  }
}