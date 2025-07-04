import { Component, type ReactNode } from 'react';

type Props = {
  name: string;
  description: string;
};

export default class ResultCard extends Component<Props> {
  render(): ReactNode {
    const { name, description } = this.props;

    return (
      <div className="result-card border p-2 rounded shadow-sm mb-2">
        <h3 className="font-bold">{name}</h3>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    );
  }
}
