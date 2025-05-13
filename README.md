# CRUD-API

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/skylive-skl/CRUD-API.git
   ```
2. Navigate to the project directory:
   ```bash
   cd CRUD-API
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

## Running the Application
- To run in development mode:
  ```bash
  npm run start:dev
  ```
- To build and run in production mode:
  ```bash
  npm run start:prod
  ```
- To run the application with load balancing:
  ```bash
  npm run start:multi
  ```

## Testing
To run the tests, use the following command:
```bash
npm test

test:verbose
```

Too bad I didn’t manage to write a single one 😅


## Project Structure
- `src/cluster` — Load balancing logic
- `src/controllers` — Controllers for handling HTTP requests
- `src/services` — Business logic of the application
- `src/db` — Temporary data storage
- `src/models` — Data models
- `src/routes` — Routes for request handling
- `src/utils` — Utility functions

## Requirements
- Node.js version 16 or higher
- npm version 7 or higher

## License
This project is licensed under the ISC License.
