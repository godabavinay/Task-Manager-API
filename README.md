# Task Manager API

This project is meant to explore and learn REST API architecture and good patterns to follow.

### Node.js Version

This project requires Node.js version `>=20.12.1` and npm version `>=10.5.0`. Ensure you have the correct versions installed before proceeding.

## Setup Instructions

### Install Dependencies

1. Navigate to the root directory of the project and run the following command to install the required dependencies:

   ```bash
   npm install
   ```

2. Navigate to the `tests/loadTests` folder and install the dependencies for load testing:

   ```bash
   cd tests/loadTests
   npm install
   ```

### Install k6 for Load Testing

To run load tests, you need to install `k6` on your local machine. Follow the instructions below based on your operating system:

- **Linux**:

  ```bash
  sudo apt update
  sudo apt install -y k6
  ```

- **MacOS**:

  ```bash
  brew install k6
  ```

- **Windows**:

  Download the latest release from the [k6 GitHub releases page](https://github.com/grafana/k6/releases) and follow the installation instructions.

Once installed, you can run the load tests using the provided scripts.

## Scripts

The following scripts are available in the `package.json` file:

- **`build`**: Compiles the TypeScript code into JavaScript.

  ```bash
  npm run build
  ```

- **`dev`**: Starts the development server with hot-reloading enabled.

  ```bash
  npm run dev
  ```

- **`start`**: Starts the production server.

  ```bash
  npm run start
  ```

- **`k6:build`**: Compiles the TypeScript code for load tests.

  ```bash
  npm run k6:build
  ```

- **`test:load`**: Runs load tests using `k6`. This script starts the development server, waits for it to be ready, builds the load test files, and then executes the specified k6 test file (default is `index.js`).
  You can specify a different file by setting the `FILE` environment variable.

  ```bash
  # Run the default load test (index.js)
  npm run test:load

  # Run a specific load test file (e.g., tasks.js)
  FILE=tasks.js npm run test:load
  ```

- **`test`**: Runs both unit and integration tests, as well as generates a coverage report using Vitest.

  ```bash
  npm run test
  ```

- **`test:unit`**: Runs unit tests using Vitest for files in the `src` directory.

  ```bash
  npm run test:unit
  ```

- **`test:integration`**: Runs integration tests using Vitest for files in the `tests/integration` directory.

  ```bash
  npm run test:integration
  ```

- **`test:coverage`**: Runs tests and generates a coverage report using Vitest.

  ```bash
  npm run test:coverage
  ```

- **`test:ui`**: Runs both unit and integration tests with a UI interface using Vitest.

  ```bash
  npm run test:ui
  ```
