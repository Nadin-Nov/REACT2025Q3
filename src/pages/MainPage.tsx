import { Component } from 'react';

import ErrorButtom from '../components/ErrorButton';
import Header from '../components/Header';
import ResultList from '../components/ResultsList';

export default class MainPage extends Component {
  render() {
    return (
      <div className="main-page">
        <Header />
        <main>
          <ResultList />
          <ErrorButtom />
        </main>
      </div>
    );
  }
}
