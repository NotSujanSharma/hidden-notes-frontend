# Hidden Notes Frontend

Welcome to the frontend of the Hidden Notes platform! This project allows users to register, log in, generate a unique link, and receive anonymous messages. The UI is modern, fully responsive, and optimized for both mobile and desktop devices.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Setup Instructions](#setup-instructions)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [Pages and Components](#pages-and-components)
- [Authentication](#authentication)
- [API Integration](#api-integration)
- [Additional Features](#additional-features)
- [Testing](#testing)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## Features

- **User Authentication:** Register and log in securely using email and password.
- **Unique Messaging Link:** Generate and share a unique link to receive anonymous messages.
- **Message Submission:** Public form for anyone to send anonymous messages with CAPTCHA verification.
- **Dashboard:** View received messages with categories, timestamps, and read status.
- **Profile Management:** Change password and log out.
- **Dark Mode:** Toggle between light and dark themes.
- **Responsive Design:** Fully optimized for mobile and desktop.
- **SEO Optimized:** Meta tags for better social media sharing.
- **Animations:** Smooth transitions and hover effects using Framer Motion.

## Tech Stack

- **Frontend Framework:** Next.js (React-based)
- **Styling:** Tailwind CSS
- **State Management:** Zustand
- **Authentication:** JWT via API calls
- **Animations:** Framer Motion
- **Forms:** React Hook Form
- **CAPTCHA:** react-google-recaptcha
- **Notifications:** react-toastify (optional)

## Project Structure

```plaintext
my-app/
├── components/           # Reusable components (Navbar, Footer, etc.)
├── pages/                # Next.js pages for routing
│   ├── _app.js           # _app
│   ├── index.js          # Landing page
│   ├── register.js       # Registration page
│   ├── login.js          # Login page
|   |── logout.js         # Logout
│   ├── dashboard.js      # Dashboard (protected)
│   ├── submit/           # Dynamic route for message submission
│   │   └── [link_id].js
│   └── profile.js        # Profile page (protected)
├── store/                # Zustand stores for state management
│   └── auth.js           # Authentication store
├── styles/               # Global styles (if needed)
├── utils/                # Utility functions
│   └── api.js            # API request utilities
└── public/               # Static assets
```

## Setup Instructions

### Clone the repository:

```sh
git clone https://github.com/notsujansharma/hidden-notes-frontend.git
cd hidden-notes-frontend
```

### Install dependencies:

```sh
npm install
```

### Set up environment variables:

1. Create a `.env.local` file in the root directory.
2. Add the following variables:

```sh
NEXT_PUBLIC_API_URL=https://api.example.com
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_recaptcha_site_key
```

- Replace `https://api.example.com` with the actual backend API URL.
- Obtain a Google reCAPTCHA site key and replace `your_recaptcha_site_key`.

### Run the development server:

```sh
npm run dev
```

- The application will be available at [http://localhost:3000](http://localhost:3000).

## Environment Variables

- `NEXT_PUBLIC_API_URL`: The base URL of the backend API (e.g., `https://api.example.com`).
- `NEXT_PUBLIC_RECAPTCHA_SITE_KEY`: Google reCAPTCHA site key for message submission security.

## Running the Application

### Development Mode:

```sh
npm run dev
```

### Production Build:

```sh
npm run build
npm run start
```

## Pages and Components

### 1. Landing Page (`/`)

- Hero section with CTA buttons for registration and login.
- Minimalist design with smooth animations.

### 2. Authentication Pages

- **Register Page (`/register`)**: Form for user registration with email and password validation.
- **Login Page (`/login`)**: Form for user login, stores JWT token upon successful authentication.

### 3. Dashboard (`/dashboard`)

- Displays the user's unique Hidden Notes link.
- Lists received messages with category, timestamp, and read status.
- Includes a copy-to-clipboard button for the link.

### 4. Message Submission Page (`/submit/[link_id]`)

- Public page for submitting anonymous messages.
- Includes message content, category selection, and CAPTCHA verification.

### 5. Profile Page (`/profile`)

- Allows users to change their password.
- Includes a logout button.

## Authentication

- **JWT Authentication:** Tokens are stored in local storage and managed via Zustand.
- **Protected Routes:** Dashboard and Profile pages are accessible only to authenticated users.
- **API Requests:** Authenticated requests include the JWT token in the Authorization header.

## API Integration

The frontend integrates with the following backend API endpoints:

- `POST /api/register`: Register a new user.
- `POST /api/login`: Authenticate a user and receive a JWT token.
- `POST /api/user` : Retrieve user details.
- `GET /api/get-link`: Retrieve the user's unique messaging link.
- `POST /api/messages/:link_id`: Submit an anonymous message.
- `GET /api/messages`: Retrieve the user's received messages.
- `PUT /api/user/password`: Change the user's password (assumed endpoint).

API requests are handled in `utils/api.js` for reusability.

## Additional Features

- **Dark Mode:** Toggle between light and dark themes using a button in the Navbar.
- **Copy-to-Clipboard:** Easily copy the unique messaging link.
- **Responsive Design:** Optimized for both mobile and desktop devices.
- **SEO Optimized:** Meta tags for better sharing on social media.
- **Animations:** Smooth transitions and hover effects using Framer Motion.

## Testing

- **Unit Testing:** Use Jest and React Testing Library for component tests.
- **End-to-End Testing:** Use Cypress for testing user flows.
- **Manual Testing:** Ensure responsiveness, dark mode, and API integration work as expected.

## Deployment

- **Vercel:** Recommended for easy deployment of Next.js applications.
- **Environment Variables:** Set up environment variables in Vercel's dashboard.
- **Custom Domain:** Configure a custom domain if needed.

## Contributing

1. Fork the repository.
2. Create a new branch:
   ```sh
   git checkout -b feature-branch
   ```
3. Make your changes and commit:
   ```sh
   git commit -m 'Add new feature'
   ```
4. Push to the branch:
   ```sh
   git push origin feature-branch
   ```
5. Open a pull request.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.
