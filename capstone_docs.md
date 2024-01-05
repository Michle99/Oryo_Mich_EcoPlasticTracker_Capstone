# EcoPlasticTracker

## Description

EcoPlasticTracker is a web application that allows users to report and track plastic pollution in various locations. Users can submit reports with details about plastic waste they come across, such as location, type of plastic, and any relevant images. The application also provides a visual representation of plastic pollution hotspots on a map.

## High-Level Architecture:

1. Frontend (React):
- User Interface for submitting pollution reports.
- Interactive map displaying reported plastic pollution hotspots.
- Integration with backend APIs for data retrieval and submission.

2. Backend (Node.js and Express):
- RESTful API to handle user authentication, pollution report submission, and retrieval.
- MongoDB database to store user information and pollution reports.

3. Database (MongoDB):
Collections for Users and PollutionReports.

## Low-Level Designs (Markdown):

### Frontend (React):

####  Frontend Architecture

#### Components
1. **Header Component:**
   - Navigation links and user authentication status.

2. **Map Component:**
   - Displays an interactive map with reported plastic pollution hotspots.

3. **ReportForm Component:**
   - Form for users to submit pollution reports with location, type, and optional images.

4. **ReportsList Component:**
   - Lists all reported pollution incidents with details.

#### State Management
- **Redux:**
  - Manages the application state, including user authentication and pollution reports.

#### API Integration
- **Axios:**
  - Makes HTTP requests to the backend API for data retrieval and submission.

#### Routing
- **React Router:**
  - Handles navigation between different components.

#### Styling
- **CSS Modules:**
  - Scoped styling for each React component.


### Backend (Node.js and Express):

### Backend Architecture

#### Routes
1. **Authentication Routes:**
   - `/api/auth/signup`: User registration.
   - `/api/auth/login`: User login.

2. **Pollution Report Routes:**
   - `/api/reports/submit`: Submit a new pollution report.
   - `/api/reports/all`: Get all pollution reports.

#### Controllers
1. **AuthController:**
   - Handles user registration and login.

2. **ReportController:**
   - Manages the submission and retrieval of pollution reports.

#### Middleware
- **Authentication Middleware:**
  - Validates user authentication for protected routes.

#### Database (MongoDB)
- **Collections:**
  1. **Users:**
     - Stores user information (username, email, password hash).
  2. **PollutionReports:**
     - Stores details about pollution incidents (location, type, images).

#### Security
- **bcrypt:**
  - Hashes user passwords before storing them in the database.
- **JWT (JSON Web Tokens):**
  - Generates and verifies authentication tokens.

## Steps/Tasks:

1. ### Set Up Project Structure:
- Create separate directories for frontend and backend.
- Initialize React app for the frontend (`create-react-app`).
- Initialize Node.js app for the backend (`npm init`).

2. ### Frontend Implementation:
- Implement React components for Header, Map, ReportForm, and ReportsList.
- Set up Redux for state management.
- Integrate Axios for API communication.
- Implement React Router for navigation.

3. ### Backend Implementation:
- Set up Express.js server.
- Implement routes for user authentication and pollution reports.
- Create controllers for authentication and pollution reports.
- Implement middleware for authentication.
- Connect to MongoDB and define database schemas.

4. ### Database Setup:
- Set up a MongoDB database.
- Create collections for Users and PollutionReports.

5. ### User Authentication:

- Implement user registration and login functionality using bcrypt and JWT.

6. ### Pollution Report Submission:

- Create an API endpoint to handle pollution report submissions.
- Save submitted reports to the MongoDB database.


7. ### Pollution Report Retrieval:

- Create an API endpoint to retrieve all pollution reports.
- Implement logic to fetch reports from the database.

8. ### Map Integration:

- Integrate a map library (e.g., Leaflet or Mapbox) into the React app.
- Display reported pollution incidents on the map.


9. ### Styling:

- Style React components using CSS Modules.

10. ### Testing:

- Test the application thoroughly, including frontend and backend functionalities.

11. ### Deployment:

- Deploy the frontend (React) and backend (Node.js and MongoDB) to a hosting platform (e.g., Heroku, AWS).

## Requirements

- Fundamental Understanding of Express, MongoDB, and Node.js
- Fundamental Understanding of React, Redux and React Hooks.

## 