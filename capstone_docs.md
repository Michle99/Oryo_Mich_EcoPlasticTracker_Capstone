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


## Requirements
 