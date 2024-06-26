## Getting Started

Follow the steps below to get this project up and running on your local machine.

## Prerequisites
Before you begin, ensure you have met the following requirements:

- Node.js installed (v16.x or later recommended)
- PostgreSQL database installed and running

## Installation
1. **Extract Zip File**: Extract the contents of the zip file to a directory on your machine.

2. **Install Dependencies**: Open a terminal or command prompt, navigate to the project directory, and run the following command to install the required dependencies:
   ```bash
    npm install
    ```

3. **Set Environment Variables**: Open the .env file located in the root directory of the project and configure the database connection settings according to your PostgreSQL database:
    ``` bash
    DB_HOST= your_database_host
    DB_USER= your_database_username
    DB_PASS= your_database_password
    DB_NAME= your_database_name
    ```

4. **Run Database Migration**: To create the necessary tables in the PostgreSQL database, run the following command:
    ``` bash
    npm run dbsync
    ```

5. **Run Database Seed**: To create data in the PostgreSQL database, hit seed_data end point with GET method:
    ``` bash
    {{BASE_URL}}/gps/seed_data
    ```

6. **To start the application, use the following command**: 
    ``` bash
    npm run start
    ```

7. By using port 8000, users will be able to access the application via http://localhost:8000. If you have a preference for another port, simply change that port in ENV.


