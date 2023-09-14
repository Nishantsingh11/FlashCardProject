# Flashcard Management App Documentation

## Table of Contents
1. [Introduction](#introduction)
2. [Project Structure](#project-structure)
3. [Installation](#installation)
4. [Usage](#usage)
5. [Features](#features)
6. [Configuration](#configuration)
7. [Technologies Used](#technologies-used)
8. [Contributing](#contributing)
9. [License](#license)
10. [Package Details](#package-details)

---

## 1. Introduction
The Flashcard Management App is a web application designed to assist users in creating, managing, and sharing flashcards. This documentation provides an overview of the project's structure, installation instructions, usage guidelines, and key features.

## 2. Project Structure
- `src`: Contains the source code for the application.
- `components`: React components used in the app.
- `redux`: Redux store configuration, action creators, and reducers.
- `img`: Images used in the project.
- `App.js`: Main application component.
- `public`: Public assets and HTML template.
- `redux`: Redux-related files, including action types, actions, reducers, and the store configuration.

## 3. Installation
To run the Flashcard Management App locally, follow these steps:

1. Clone the repository:
    ```shell
    git clone https://github.com/Jayswati/flashCaard.git
    ```

2. Navigate to the project directory:
    ```shell
    cd flashcard-management-app
    ```

3. Install project dependencies:
    ```shell
    npm install
    ```

4. Start the development server:
    ```shell
    npm start
    ```

5. Access the application at http://localhost:3000.

## 4. Usage
- **Creating Flashcards:** Use the "Create New" option to create flashcard groups, add terms, and upload images.
- **Viewing Flashcards:** Access "My Flashcards" to view and manage your created flashcards.
- **Sharing Flashcards:** Click the share button to generate a shareable link for your flashcards.

## 5. Features
- Create and manage flashcard groups.
- Add and edit terms within each flashcard group.
- Upload images for groups and terms.
- View and navigate through flashcards.
- Share flashcards via generated links.
- Download and print flashcards.

## 6. Configuration
- **Local Storage:** The app uses local storage to persist flashcards between sessions. You can customize storage behavior in the `localStorage` module.

## 7. Technologies Used
- **React:** A JavaScript library for building user interfaces.
- **Redux:** A predictable state container for managing application data.
- **Formik and Yup:** Libraries for handling forms and validation.
- **React Router:** A routing library for React applications.

## 8. Contributing
Contributions to the Flashcard Management App are encouraged! To contribute:

1. Fork the repository.
2. Create a new branch for your changes.
3. Commit your changes and push them to your fork.
4. Submit a pull request to the main repository.

## 9. License
This project is licensed under the MIT License. You can find the full license text in the LICENSE file.

Sure, here's the section about the package details added to your README.md:

---

## 10. Package Details
- **Homepage:** [FlashCard Homepage](https://nishantsingh11.github.io/FlashCard)
- **Name:** flascard
- **Version:** 0.1.0
- **Private:** true

### Dependencies
- **@testing-library/jest-dom:** ^5.16.5
- **@testing-library/react:** ^13.4.0
- **@testing-library/user-event:** ^13.5.0
- **formik:** ^2.4.3
- **gh-pages:** ^6.0.0
- **react:** ^18.2.0
- **react-dom:** ^18.2.0
- **react-hot-toast:** ^2.4.1
- **react-icons:** ^4.10.1
- **react-redux:** ^8.1.2
- **react-router-dom:** ^6.11.1
- **react-scripts:** 5.0.1
- **redux:** ^4.2.1
- **web-vitals:** ^2.1.4
- **yup:** ^1.2.0

### Scripts
- **predeploy:** npm run build
- **deploy:** gh-pages -b main -d build
- **start:** react-scripts start
- **build:** react-scripts build
- **test:** react-scripts test
- **eject:** react-scripts eject

### ESLint Configuration
```json
"eslintConfig": {
  "extends": [
    "react-app",
    "react-app/jest"
  ]
}
```

### Browserslist Configuration
```json
"browserslist": {
  "production": [
    ">0.2%",
    "not dead",
    "not op_mini all"
  ],
  "development": [
    "last 1 chrome version",
    "last 1 firefox version",
    "last 1 safari version"
  ]
}
```

### Dev Dependencies
- **tailwindcss:** ^3.3.3

---

---