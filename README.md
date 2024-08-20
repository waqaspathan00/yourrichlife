# YourRichLife

## Table of Contents

1. [Features](#features)
2. [Getting Started](#getting-started)
   - [Prerequisites](#prerequisites)
   - [Installation](#installation)
3. [Firebase Configuration](#firebase-configuration)
   - [Create a Firebase Project](#create-a-firebase-project)
   - [Add a Web App to Your Project](#add-a-web-app-to-your-project)
   - [Retrieve Your Firebase Config](#retrieve-your-firebase-config)
   - [Create environment variables](#create-environment-variables)
   - [Run the Application](#run-the-application)
4. [Contributing](#contributing)
5. [License](#license)

## Features

- **Goal Setting**: Create specific financial goals and track your progress.
- **Progress Tracking**: Visualize your savings journey and stay motivated.
- **User-Friendly Interface**: Simple and intuitive design for easy goal management.
- **Free Access**: Enjoy all features for free until the official release of Copilot Money's savings goal feature.

## Getting Started

### Prerequisites

Before you can run the project locally, ensure you have the following installed:

- Node.js (version 14 or higher)
- npm (version 6 or higher)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/waqaspathan00/yourrichlife.git
   cd yourrichlife
   ```
   
2. **Install dependencies:**

    ```bash
    npm install
    ```

3. **Add Firebase configuration:**

    To run the application, you need to configure Firebase. Follow the steps below to get your Firebase configuration JSON settings.

## Firebase Configuration

### Create a Firebase Project

- Go to the [Firebase Console](https://console.firebase.google.com/).
- Click on "Add Project" and follow the setup wizard.

### Add a Web App to Your Project

- After creating the project, select the project you just created.
- Click on the gear icon next to "Project Overview" and choose "Project settings."
- In the "General" tab, scroll down to "Your apps" and click on the web icon `</>` to add a new web app.
- Register your app by providing a name and clicking "Register app."

### Retrieve Your Firebase Config

- Once your app is registered, Firebase will provide a configuration object that looks like this:

   ```json
   {
       apiKey: "YOUR_API_KEY",
       authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
       projectId: "YOUR_PROJECT_ID",
       storageBucket: "YOUR_PROJECT_ID.appspot.com",
       messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
       appId: "YOUR_APP_ID",
       measurementId: "YOUR_MEASUREMENT_ID"
   }
  ```
- Copy this configuration object.  

### Create environment variables

- Create a `.env.local` file in the root directory of the project.
- Add the following environment variables to the file:

   ```bash
    NEXT_PUBLIC_FIREBASE_CONFIG='PASTE_FIREBASE_CONFIG_OBJ_HERE'
   ```

### Run the Application

   ```bash
   npm run dev
   ```

You can locally view YourRichLife at http://localhost:3000. 

Or publicly at https://yourrichlife.vercel.app.

We welcome contributions! Please feel free to submit a pull request or open an issue.

This project is licensed under the MIT License. See the LICENSE file for more details.