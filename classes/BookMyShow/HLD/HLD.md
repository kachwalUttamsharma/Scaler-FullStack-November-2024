# BookMyShow Clone - High Level Design (HLD) and Low Level Design (LLD)

---

# 1. High Level Design (HLD)

## 1.1 Introduction

This document presents the architecture and overall design of the "BookMyShow Clone" application, a platform for booking movie tickets online.

## 1.2 Goals & Objectives

- Allow users to browse movies.
- Enable booking of tickets.
- Provide user authentication (login/registration/forget password).
- Ensure smooth frontend-backend interaction.

## 1.3 Technology Stack

- **Frontend**: React.js (Vite Bundler)
- **Backend**: Node.js + Express (assumed)
- **Database**: MongoDB (assumed)
- **Hosting**: AWS EC2 / Vercel / Netlify (Frontend), AWS / Railway (Backend)

## 1.4 Overall Architecture

```
[Client Browser]
    |
[React Frontend (Vite)]
    |
[Backend REST APIs (Node.js + Express)]
    |
[MongoDB Database]
```

## 1.5 Modules

- **Authentication Module**

  - User login
  - User registration
  - Forgot password

- **Movie Browsing Module**

  - Display list of movies
  - Movie details page

- **Ticket Booking Module**

  - Select seats
  - Confirm booking

- **Admin Module**
  - Add/Delete Movies

## 1.6 User Flow

1. User lands on Homepage.
2. User browses movies.
3. User logs in / signs up.
4. User selects a movie to book.
5. User books a show and confirms.
6. Confirmation page shown.

## 1.7 API Endpoints (Assumed)

| API                     | Method | Purpose              |
| :---------------------- | :----- | :------------------- |
| /bms/v1/login           | POST   | User login           |
| /bms/v1/register        | POST   | New user signup      |
| /bms/v1/forgot-password | POST   | Password recovery    |
| /bms/v1/movies          | GET    | Fetch list of movies |
| /bms/v1/movies/:id      | GET    | Fetch movie details  |
| /bms/v1/booking         | POST   | Book a ticket        |

---

# 2. Low Level Design (LLD) - Frontend

## 2.1 Pages and Components

### Pages

- `HomePage.jsx` — Displays list of movies
- `Login.jsx` — User login page
- `Register.jsx` — New user registration
- `Forget.jsx` — Forgot password page
- `BookShow.jsx` — Booking a movie
- `SingleMovie.jsx` — Detailed view of a movie

### Components

- `Header.js` — Navigation bar
- `MovieCard.jsx` — Displays individual movie summary
- `SeatSelector.jsx` (Assumed) — For seat selection during booking
- `BookingSummary.jsx` (Assumed) — Show booking summary

## 2.2 Component Hierarchy

```
App.jsx
  |
  |-- Header
  |-- Routes
       |-- HomePage
            |-- MovieCard
       |-- Login
       |-- Register
       |-- Forget
       |-- SingleMovie
       |-- BookShow
            |-- SeatSelector
            |-- BookingSummary
```

## 2.3 Event Handling and API Integration

- `Login.jsx`

  - Handle form submission.
  - POST request to `/api/login`.

- `Register.jsx`

  - Handle registration form.
  - POST request to `/api/register`.

- `Forget.jsx`

  - Handle password reset.
  - POST request to `/api/forgot-password`.

- `HomePage.jsx`

  - Fetch movies from `/api/movies`.

- `SingleMovie.jsx`

  - Fetch specific movie details `/api/movies/:id`.

- `BookShow.jsx`
  - Submit booking to `/api/booking`.

## 2.4 Folder Structure

```
/src
  /components
    Header.js
    MovieCard.jsx
    SeatSelector.jsx (assumed)
    BookingSummary.jsx (assumed)
  /pages
    HomePage.jsx
    Login.jsx
    Register.jsx
    Forget.jsx
    BookShow.jsx
    SingleMovie.jsx
  App.jsx
  main.jsx
  index.css
  App.css
```

## 2.5 Best Practices

- Use **React Router** for navigation.
- Use **Context API** or **Redux** for state management.
- Form validations on frontend.
- API calls should have error handling.
- Loading indicators for async operations.
- Proper .env management for API endpoints.

---

# End of Document
