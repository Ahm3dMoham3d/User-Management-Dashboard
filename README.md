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

- **User Authentication and Role-Based Access Control**: Secure authentication with RBAC and Router Guard to ensure users can only access permitted sections.
- **Admin Panel for Managing Users**: Manage users, roles, and permissions efficiently.
- **Dashboard with Role-Specific Functionality**: Tailored dashboard views based on user roles.
- **Secure Session Management**: Ensures secure user sessions with LocalStorage or SessionStorage.
- **Data Visualization with Charts**: Interactive and insightful visual representations of data.
- **Dynamic & Powerful Data Table**: Built with TanStack/Table, supporting:
  - Sorting & Filtering
  - Debounced Search
  - Pagination for efficient data handling
- **Export to CSV**: Easily export table data to CSV for offline analysis or reporting.
- **Accessibility Compliance (WCAG AA)**: Full keyboard navigation support.
- **Theme Switcher**: User-friendly dark/light mode switching.
- **Error & Loading State Management**: Graceful handling of API errors and loading indicators.
- **Pinia State Management**: Efficient and reactive global state management with Pinia.

## Architectural Decisions and Approach

### Application Structure

The project is built with **Vue 3** and **TypeScript**, using the **Composition API** for better code organization and reusability. It follows a modular architecture, separating authentication, user management, and role-based access control (RBAC) into distinct components and stores.

### State Management

**Pinia** is used for global state management, ensuring reactive and efficient state handling. It manages user authentication, permissions, and UI state while maintaining simplicity and performance.

### Mock API and Data Handling

The application does not use a real backend; instead, it relies on a **mock API** to simulate authentication and role-based access. This allows for frontend development without requiring a backend connection.

## Development Considerations

### API Optimization

Although the API is mocked, requests are minimized using efficient state management with Pinia to avoid unnecessary re-fetching of data.

### Shared Logic Handling

Common functionalities, such as authentication and permission checks, are managed using **authStore** and **usersStore**, ensuring reusability and maintainability across components.

### Client-Side Data Caching

Pinia persists relevant state data to LocalStorage or SessionStorage to maintain user sessions and avoid redundant data fetching.

### Scaling Strategy

To handle multiple user roles and permissions, the application uses a modular RBAC approach, making it easy to extend or modify access levels dynamically.

## Testing Strategy

Testing is focused on unit tests for core components and Pinia stores using **Vitest** and **Vue Testing Library**. Additionally, end-to-end (E2E) testing is implemented using **Playwright** to validate user workflows.

### Test Coverage

- **Unit Tests**: Approximately 70% of the application is covered with unit tests.
- **E2E Tests**: End-to-end tests validate login, role-based access, and user management functionalities.

### Running Tests

#### Unit Tests:

Run the following command to execute unit tests:

```sh
npm run test
```

#### End-to-End (E2E) Tests:

First, install Playwright:

```sh
npm install @playwright/test --save-dev
```

Install required browsers:

```sh
npx playwright install
```

Run the E2E tests:

```sh
npx playwright test ./src/tests/userManagement.spec.js
```

## Offline Capabilities

LocalStorage is used to retain user sessions and cached data. Service Workers could be integrated for offline asset caching and background synchronization when reconnected.

## Architecture Questions

1. **How would you optimize API calls in this application for performance?**  
   API calls are optimized by leveraging Pinia to cache user-related data, reducing redundant requests. Additionally, debounced search and pagination minimize unnecessary API interactions.

2. **Describe your approach to handling shared logic between components.**  
   Shared logic is managed using **authStore** and **usersStore** in Pinia, ensuring a clean and reusable structure for authentication, user permissions, and role-based access control.

3. **How would you implement client-side data caching for this dashboard?**  
   Client-side caching is handled using LocalStorage and SessionStorage for user sessions and frequently accessed data, reducing re-fetching and improving performance.

4. **What strategy would you use to scale this application if it needed to support hundreds of different user permission types?**  
   A modular RBAC system is used, allowing dynamic role and permission assignment. This enables easy expansion of user permissions without major architectural changes.

5. **Explain your testing strategy and how you decided what to test.**  
   A mix of unit tests (Vitest) for core components and Pinia stores, along with E2E tests (Playwright) for user flows, ensures both isolated logic validation and real-world interactions are covered.

6. **How would you handle offline capabilities in this application?**  
   Offline support can be improved by integrating Service Workers for asset caching and background synchronization, allowing limited functionality when offline.

## Contribution

Feel free to fork the repository and submit a pull request for improvements or bug fixes.

## License

This project is open-source and available under the [MIT License](LICENSE).
