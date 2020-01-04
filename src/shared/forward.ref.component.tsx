import React from 'react';

interface Props {
  refId: string;
  onRef: (element: Element) => void;
}

export class ForwardRefComponent extends React.Component<Props> {
  componentDidMount() {
    this.props.onRef(document.querySelector(`.${this.props.refId}`));
  }

  render() {
    return this.props.children;
  }
}