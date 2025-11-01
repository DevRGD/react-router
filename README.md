# Todo App Frontend (React & Vite)

This is the frontend web application for the Todo App, built with React, TypeScript, and Vite.

It's a modern, fast, and responsive Single-Page Application (SPA) that uses a data-driven approach to routing and data management, communicating with the secure Node.js backend.

## Core Technology

* **Framework:** React 19 & TypeScript
* **Build Tool:** Vite
* **Routing:** React Router v7 (Data-Driven)
* **Styling:** TailwindCSS
* **API Comms:** Axios
* **State Management:** React Context (`AuthContext`) for global auth state

## Key Features & Architecture

This application is built around modern React Router v7 data-driven patterns, minimizing component-level state management for data fetching.

### Data-Driven Routing

Instead of using `useEffect` hooks for data, the app uses `loader` and `action` functions defined in `src/router.ts`.

* **Loaders (`loader`):** Functions like `todoListLoader` and `todoDetailLoader` are responsible for fetching data for a route *before* it renders. This simplifies loading and error states.
* **Actions (`action`):** Functions like `loginAction` and `todoCreateAction` handle all form submissions (`<Form>`). They perform the API mutation and redirect, keeping components clean and declarative.

### Authentication Handling

The app provides a seamless and secure authentication experience.

1.  **Auth Context:** A global `AuthContext` provides the current user state (`isAuthenticated`, `user`) to all components.
2.  **Initial Load:** The `rootLoader` in `router.ts` is called on app startup. It pings the backend's `/auth/refresh` endpoint to check if the user has a valid session.
3.  **Automatic Refresh:** The `axios` instance in `lib/api.ts` includes an interceptor. If an API call fails with a 401 Unauthorized error, this interceptor automatically attempts to get a new `accessToken` using the `refreshToken` and then retries the original request.
4.  **Protected Routes:** The `TodoLayout` component checks the `AuthContext` and automatically redirects unauthenticated users to the `/auth/login` page.

## Getting Started

1.  Clone the repository.
2.  Run `npm install` (or `yarn install`).
3.  Create a `.env.local` file in the root.
4.  Add the backend API URL to the `.env.local` file:
    ```
    VITE_API_URL=http://localhost:8080
    ```
5.  Ensure the backend API server is running.
6.  Run `npm run dev` to start the Vite development server.
