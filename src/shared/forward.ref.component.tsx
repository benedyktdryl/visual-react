import React from 'react';

interface Props {
  refId: string;
  onRef: (element: Element) => void;
}

export class ForwardRefComponent extends React.Component<Props> {
  private get refId() {
    return this.props.refId.replace(/[^\w\s]/gi, '')
  }

  componentDidMount() {
    this.props.onRef(document.querySelector(`[data-refid=${this.refId}]`).firstElementChild);
  }

  render() {
    return <span data-refid={this.refId}>{this.props.children}</span>;
  }
}