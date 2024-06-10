# CINEMA APP

## Setup Instructions

### Prerequisites

1. **Node.js**: Ensure you have Node.js installed on your machine. You can download it from [nodejs.org](https://nodejs.org/).
2. **Postgresql**: Install Postgresql and create a database for the project.

### Installation Steps

1. **Clone the Repository**:

   ```sh
   git clone git@github.com:Movses5555/cinema_app.git
   cd cinema_app
   ```

### Server
1. **Install Dependencies**:
   ```sh
   cd server
   npm install
   ```

#### Configure the Database

1. **Create a `.env` File**:

   - Create a `.env` file in the root directory of your project.
   - Open the `.env` file and add the following content:
    ```
      PORT=5000
      NODE_ENV=development
     ```

2. **Save the Changes**:
   - Save the `.env` file.

3. **Add Database Credentials**:

   - Open the `./config/config.json` file and add the following content with your database credentials:
     ```
      {
        "development": {
          "username": "postgres",
          "password": "secret",
          "database": "cinema-app",
          "host": "localhost",
          "dialect": "postgres"
        }
      }
     ```
     Replace the values (`postgres`, `secret`, `cinema-app`, `localhost`, `postgres`) with your actual database connection details.

4. **Save the Changes**:
   - Save the `./config/config.json` file.

5. **Migrate Database**:
    ```sh
      npx sequelize-cli db:migrate
    ```

#### Start the Development Server

```sh
npm start
```


### Client
1. **Install Dependencies**:
   ```sh
   cd client
   npm install
   ```

#### Configure the API

1. **Create a `.env` File**:

   - Create a `.env` file in the root directory of your project.
   - Open the `.env` file and add the following content:
    ```
      REACT_APP_SERVER_BASE_URL=http://localhost:5000
     ```

2. **Save the Changes**:
   - Save the `.env` file.


#### Start the Development Server

```sh
npm start
```
