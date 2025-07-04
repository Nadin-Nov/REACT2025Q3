import { Component } from 'react';

import ErrorButton from '../components/ErrorButton';
import SearchSection from '../components/SearchSection';

export default class MainPage extends Component {
  render() {
    return (
      <div className="main-page">
        <SearchSection />
        <ErrorButton />
      </div>
    );
  }
}
