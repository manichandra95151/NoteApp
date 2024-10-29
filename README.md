
# NoteApp

A simple and elegant note-taking application built using React and Firebase. This app allows users to create, read, update, and delete notes. Users can also pin notes for quick access and filter notes by title, description, or tags.

![NoteApp](https://github.com/manichandra95151/Mani-s-Portfolio/blob/main/src/Data/imgaes/NoteApp.png?raw=true)

## Live Demo

Check out the live version of the project [here](https://note-app-pi-green.vercel.app/).

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Folder Structure](#folder-structure)
- [Contributing](#contributing)
- [Acknowledgements](#acknowledgements)

## Features

- User authentication using Firebase Authentication.
- Create, edit, and delete notes.
- Pin notes to keep them at the top.
- Tag notes for better organization.
- Search functionality to find notes quickly.
- Responsive design for optimal use on mobile and desktop devices.

## Tech Stack

- **Frontend**: React, Redux, React Router, Tailwind CSS
- **Backend**: Firebase (Firestore for database, Authentication for user management, Storage for file uploads)
- **Additional Libraries**:
  - `react-toastify` for notifications
  - `lucide-react`and `react-icons` for icons
  - `react-spinners` for loading animations

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/manichandra95151/NoteApp.git
   ```

2. **Navigate to the project directory:**
   ```bash
   cd noteapp
   ```

3. **Install dependencies:**
   ```bash
   npm install
   ```

4. **Create a `.env` file in the root directory and add your Firebase configuration:**
   ```env
   REACT_APP_FIREBASE_API_KEY=your_api_key
   REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
   REACT_APP_FIREBASE_PROJECT_ID=your_project_id
   REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   REACT_APP_FIREBASE_APP_ID=your_app_id
   ```

5. **Run the application:**
   ```bash
   npm start
   ```

## Usage

1. **User Authentication**: Users can sign up or log in using Firebase Authentication.
2. **Creating Notes**: Once logged in, users can create new notes by entering a title and description.
3. **Editing Notes**: Users can click on an existing note to edit it.
4. **Deleting Notes**: Users can delete notes they no longer need.
5. **Pinning Notes**: Users can pin notes for easy access.
6. **Tagging Notes**: Users can add tags to notes to organize them better.
7. **Searching Notes**: Users can search for notes using the search bar.

## Folder Structure

```
noteapp/
│
├── public/
│   ├── index.html             # Main HTML file
│   └── favicon.ico            # Favicon for the application
│
├── src/
│   ├── components/            # Contains React components
│   │   └── utils/             # Utility functions and components
│   ├── redux/                 # Redux store and slices
│   ├── firebase/              # Firebase configuration
│   ├── hooks/                 # Custom hooks (e.g., useAuth)
│   ├── pages/                 # Dashboard page
│   ├── App.js                 # Main application component
│   └── index.js               # Application entry point
│   
├── .env                       # Environment variables
├── package.json               # Project metadata and dependencies
└── README.md                  # Project documentation
```

## Contributing

Contributions are welcome! If you have suggestions or improvements, feel free to create a pull request or open an issue.


## Acknowledgements

- [Firebase](https://firebase.google.com/) for backend services.
- [React](https://reactjs.org/) for building user interfaces.
- [Redux](https://redux.js.org/) for state management.
- [Tailwind CSS](https://tailwindcss.com/) for styling.
