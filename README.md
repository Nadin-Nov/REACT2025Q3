# NADIN-NOV-REACT2025Q3 - React Forms

## Project Overview

This is a React application built with TypeScript and Vite.
It fThis project is a React application built with TypeScript and Vite.
It demonstrates two different approaches to building forms inside modals (via React Portals):

Uncontrolled Form (classic refs / native validation on submit)

React Hook Form + Zod (controlled form with live validation)

Both forms collect the same data (name, age, email, passwords, gender, terms agreement, picture, country autocomplete) and save it to a Redux Toolkit store.
After submission, the forms close automatically, and the entered data is displayed on the main page.

The app also includes password strength validation, image upload (base64), country autocomplete, accessibility-friendly modals, and Redux state management..

---

## Technology Stack

- React 19.1
- TypeScript 5.8
- Vite
- React Hook Form
- Zod + @hookform/resolvers
- Redux Toolkit + React-Redux
- Vitest
- ESLint
- Husky

## Getting Started

### Clone the repository

git clone <https://github.com/Nadin-Nov/REACT2025Q3.git>
git checkout forms

### Install dependencies

`npm install`

### Run the development server

`npm run dev`

### Build the project for production

`npm run build`

## Code Quality Commands

### Check code with ESLint

`npm run lint`

### Fix ESLint errors automatically

`npx eslint . --fix`

### Format code with Prettier

`npm run format:fix`

### Tests

This project uses Vitest for unit testing and coverage reports.

Run all tests

`npm run test`

Run tests with coverage report

`npm run test:coverage`
