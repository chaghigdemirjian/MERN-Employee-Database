# Employee Database App

A simple, interactive, full-stack Employee Database application built using the **MERN** stack (MongoDB, Express, React Vite and Node.js) using **Tailwind CSS** for styling. The app uses **React Router** for navigation between pages. Users can create, edit, and delete an employee record using the app. 

## Features

- **Employee Records**: Create, read, update and delete (CRUD) operations for employee records. 
- **Employee Details**: users can enter an employee's name, position and select a rank from 3 predefined levels. 
- **Styling**: Responsive design using Tailwind CSS.  
- **Routing**: **React Router** is used to navigate between the main home page, record page, and edit record page.

## Tech Stack

- **Frontend**: React, Vite and Tailwind CSS
- **Backend**: Node.js and Express.js
- **Database**: MongoDB (Atlas) 
- **Routing**: React Router Dom

### Pre-Requisites 
- **Node.js**: (v16 or later)
- **MongoDB Atlas**: Requires  Atlas Account for database setup

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/chaghigdemirjian/MERN-Employee-Database.git
    ```

2. Navigate to the project directory (if not already there):

    ```bash
    cd mern
    ```

3. Install dependencies:

    - Install dependencies for the frontend:

    ```bash
    cd client && npm install  
    ```

    - Install dependencies for the backend:

    ```bash
    cd ../server && npm install
    npm install dotenv
    ```
4. Set up Tailwind CSS:

    ```bash
    cd ../client
    npm install -D tailwindcss postcss autoprefixer
    npx tailwindcss init -p
    ```

    - In your `tailwind.config.js`, configure the `content` array to ensure Tailwind CSS scans the right files:

    ```js
    module.exports = {
      content: [
        "./index.html",
        "./src/**/*.{js,jsx,ts,tsx}",
      ],
      theme: {
        extend: {
      fontFamily: {
        sans: ['Roboto', 'sans-serif'],
      },
      gridTemplateColumns: {
        '70/30' : '70% 28%',
      },
     },
    },
      plugins: [],
    }
    ```
5. Create a .env file in the server folder with the following variables:

    ```bash
    MONGODB_URI=<Your MongoDB Atlas URI>  
    PORT=5050  
    ```

### Running the App

1. Backend:

    ```bash
    cd server
    node --env-file=config.env server 
    ```

2. Frontend:

    ```bash
    cd ../client
    npm run dev 
    ```

3. Open your browser and go to `http://localhost:5173` (Frontend Development).
4. Open your browser and go to `http://localhost:5050` (Backend Development).


### Proxy Configuration

To simplify API requests and avoid CORS issues during development, the Vite server proxies `/api` requests to the backend Server running on port 5050. 

- **Vite Server Port**: `5173`
- **Backend Server Port**: `5050`
- **MongoDB Connection**: MongoDB Atlas URI specified in .env. 

### Available Scripts

- **Backend**: `node --env-file=config.env server`. Starts the backend server with environment variables loaded from .env.
- **Frontend**: `npm run dev`. Starts the development server for the react app.  
