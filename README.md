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

- **`k6:test`**: Runs the load tests using `k6`. This script starts the development server, waits for it to be ready, builds the load test files, and then executes the tests.

  ```bash
  npm run k6:test
  ```

- **`test`**: Runs the unit tests using Vitest.

  ```bash
  npm run test
  ```
