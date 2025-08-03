import type React from 'react';
import './AboutPage.css';

export const AboutPage: React.FC = () => (
  <main className="about-page">
    <h1>About This App</h1>
    <p>
      Created by <strong>Nadin N.</strong>
    </p>
    <p>
      This application was built as part of the{' '}
      <a
        href="https://rs.school/courses/reactjs"
        target="_blank"
        rel="noreferrer"
      >
        RS School React Course
      </a>
      .
    </p>
    <p>
      Check out my GitHub:{' '}
      <a href="https://github.com/Nadin-Nov" target="_blank" rel="noreferrer">
        github.com/Nadin-Nov
      </a>
    </p>
  </main>
);
