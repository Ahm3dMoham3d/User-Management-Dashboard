# User Management Dashboard

## Overview

The **User Management Dashboard** is a web application that allows administrators to manage users, roles, and permissions efficiently. It provides different access levels, including Admin, Manager, and Viewer roles.

## Getting Started

### Prerequisites

Ensure you have the following installed on your system:

- Node.js (Latest LTS recommended)
- npm (Node Package Manager)
- Git

### Installation and Setup

1. Clone the repository:

   ```sh
   git clone https://github.com/Ahm3dMoham3d/User-Management-Dashboard.git
   cd User-Management-Dashboard
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Start the development server:

   ```sh
   npm run dev
   ```

### Login Credentials

Use the following credentials to access different roles:

- **Admin**:

  - Email: `admin@example.com`
  - Password: `password`

- **Manager**:

  - Email: `manager@example.com`
  - Password: `password`

- **Viewer**:
  - Email: `viewer@example.com`
  - Password: `password`

## Features

- **User Authentication and Role-Based Access Control**: Secure user authentication with RBAC (Role-Based Access Control) and Router Guard to ensure users can only access permitted sections.
- **Admin Panel for Managing Users**: Manage users, roles, and permissions efficiently.
- **Dashboard with Role-Specific Functionality**: Tailored dashboard views based on user roles.
- **Secure Session Management**: Ensures secure user sessions with LocalStorage or SessionStorage.
- **Data Visualization with Charts**: Interactive and insightful visual representations of data to enhance decision-making.
- **Dynamic & Powerful Data Table**: Built with TanStack/Table, supporting:
  - Sorting & Filtering
  - Debounced Search
  - Pagination for efficient data handling
- **Export to CSV**: Easily export table data to CSV for offline analysis or reporting.
- **Accessibility Compliance (WCAG AA)**: Full keyboard navigation support for a seamless user experience.
- **Theme Switcher**: User-friendly dark/light mode switching.
- **Error & Loading State Management**: Graceful handling of API errors and loading indicators for a smooth UX.
- **Pinia State Management**: Efficient and reactive global state management with Pinia, ensuring performance and maintainability.

## Architectural Decisions and Approach

### Application Structure

The project is built with **Vue 3**, using the **Composition API** for better code organization and reusability. It follows a modular architecture, separating authentication, user management, and role-based access control (RBAC) into distinct components and stores.

### State Management

**Pinia** is used for global state management, ensuring reactive and efficient state handling. It manages user authentication, permissions, and UI state while maintaining simplicity and performance.

### Mock API and Data Handling

The application does not use a real backend; instead, it relies on a **mock API** to simulate authentication and role-based access. This allows for frontend development without requiring a backend connection.

## Development Considerations

### API Optimization

Although the API is mocked, requests are minimized using efficient state management with Pinia to avoid unnecessary re-fetching of data.

### Shared Logic Handling

Common functionalities, such as authentication and permission checks, are managed using composable functions to ensure reusability and maintainability across components.

### Client-Side Data Caching

Pinia persists relevant state data to LocalStorage or SessionStorage to maintain user sessions and avoid redundant data fetching.

### Scaling Strategy

To handle multiple user roles and permissions, the application uses a modular RBAC approach, making it easy to extend or modify access levels dynamically.

## Testing Strategy

Testing is focused on unit tests for core components and Pinia stores using **Vitest** and **Vue Testing Library** to ensure proper role-based access behavior and state management. Additionally, end-to-end (E2E) testing is implemented using **Playwright** to validate user workflows and interactions.

### Test Coverage

- **Unit Tests**: Approximately 70% of the application is covered with unit tests. These tests ensure the functionality of individual components, stores, and composable functions.
- **E2E Tests**: End-to-end tests are written to validate user flows, such as login, role-based access, and user management functionalities.

### Running Tests

#### Unit Tests:

Run the following command to execute unit tests:

```sh
npm run test
```

This will run all Vitest unit tests and provide a coverage report.

#### End-to-End (E2E) Tests:

First, install Playwright if not already installed:

```sh
npm install @playwright/test --save-dev
```

Install the required browsers for Playwright:

```sh
npx playwright install
```

Run the E2E tests for the user management workflow:

```sh
npx playwright test ./src/tests/userManagement.spec.js
```

## Offline Capabilities

LocalStorage is used to retain user sessions and cached data. Service Workers could be integrated for offline asset caching and background synchronization when reconnected.

## Contribution

Feel free to fork the repository and submit a pull request for improvements or bug fixes.

## License

This project is open-source and available under the [MIT License](LICENSE).
