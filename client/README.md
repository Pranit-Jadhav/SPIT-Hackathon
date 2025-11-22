# Authentication React App

This is a React.js application converted from HTML pages. It includes authentication flows for login, signup, forgot password, OTP verification, and change password.

## Features

- Login page
- Sign Up page
- Forgot Password page
- OTP Verification page
- Change Password page
- React Router for navigation
- Bootstrap 5 for styling
- Responsive design

## Installation

1. Install dependencies:
```bash
npm install
```

## Running the Application

Start the development server:
```bash
npm start
```

The app will open at [http://localhost:3000](http://localhost:3000)

## Build for Production

Create a production build:
```bash
npm run build
```

## Project Structure

```
spit project/
├── public/
│   ├── images/
│   │   ├── bg.png
│   │   └── mlogo.png
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Login.js
│   │   ├── SignUp.js
│   │   ├── ForgotPassword.js
│   │   ├── OTP.js
│   │   └── ChangePassword.js
│   ├── App.js
│   ├── index.js
│   └── index.css
├── package.json
└── README.md
```

## Routes

- `/` or `/login` - Login page
- `/signup` - Sign Up page
- `/forgot-password` - Forgot Password page
- `/otp` - OTP Verification page
- `/change-password` - Change Password page

## Technologies Used

- React 18.2.0
- React Router DOM 6.20.0
- Bootstrap 5.3.0
- React Scripts 5.0.1

