import { Component, type ReactNode } from 'react';

type Props = {
  name: string;
  description: string;
  image?: string;
};

export default class ResultCard extends Component<Props> {
  render(): ReactNode {
    const { name, description, image } = this.props;

    return (
      <div className="result-card">
        {image && <img src={image} alt={name} />}
        <div>
          <h3>{name}</h3>
          <p>{description}</p>
        </div>
      </div>
    );
  }
}
