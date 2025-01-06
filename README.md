# ExpressTSCRUD API

A RESTful CRUD API built with **Express.js** and **TypeScript**, designed for managing tasks. The project follows best practices for code organization, error handling, and scalability. 

---

## Features

- **Task Management**: Create, read, update, and delete tasks.
- **Pagination**: Fetch tasks with pagination support.
- **Middleware**: Includes error handling, CORS configuration, logging, and rate limiting.
- **Clean Architecture**: Modular and scalable folder structure.
- **SQL Database Integration**: Uses PostgreSQL (or another SQL-based DB) for data storage.
- **Comprehensive Documentation**: Includes a Postman collection for testing.

---

## Folder Structure

```
.
├── dist                  # Compiled JavaScript code (generated by TypeScript)
├── node_modules          # Project dependencies
├── postman               # Postman collection for API testing
│   └── ExpressTSCRUD API.json
├── schema                # Database schema
│   └── schema.sql
├── src                   # Source files
│   ├── config            # Configuration files
│   │   ├── cors.config.ts
│   │   └── db.config.ts
│   ├── dtos              # Data Transfer Objects
│   │   ├── allTasks.dto.ts
│   │   ├── pagination.dto.ts
│   │   └── task.dto.ts
│   ├── middlewares       # Application middlewares
│   │   ├── app.error.handler.ts
│   │   ├── global.rate.limiter.ts
│   │   ├── logger.ts
│   │   └── route.not.found.ts
│   ├── shared            # Shared utilities
│   │   ├── api.error.ts
│   │   ├── api.response.ts
│   │   └── http.status.codes.ts
│   ├── tasks             # Task-related modules
│   │   ├── tasks.controllers.ts
│   │   ├── tasks.routes.ts
│   │   └── tasks.services.ts
│   ├── utils             # Utility functions
│   │   ├── db.connect.ts
│   │   └── return.error.ts
│   └── server.ts         # Main server file
├── .env                  # Environment variables (not included in the repo)
├── .gitignore            # Files and directories to ignore in Git
├── package-lock.json     # Auto-generated dependency tree
├── package.json          # Project dependencies and scripts
├── tsconfig.json         # TypeScript configuration
└── tsconfig.tsbuildinfo  # TypeScript build info (auto-generated)
```

---

## API Routes

| Method | Endpoint                | Description              | Access   |
|--------|-------------------------|--------------------------|----------|
| POST   | `/api/v1/tasks`         | Create a new task        | Public   |
| GET    | `/api/v1/tasks`         | Get all tasks (paginated)| Public   |
| GET    | `/api/v1/tasks/:id`     | Get a task by ID         | Public   |
| PUT    | `/api/v1/tasks/:id`     | Update a task by ID      | Public   |
| DELETE | `/api/v1/tasks/:id`     | Delete a task by ID      | Public   |

---

## Prerequisites

- **Node.js** v18+ 
- **PostgreSQL** (or another SQL database)
- **TypeScript** v4+

---

## Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/ExpressTSCRUD.git
cd ExpressTSCRUD
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Set Up Environment Variables
Create a `.env` file in the root directory with the following variables:

```env
NODE_ENV=development
PORT=your-server-port
DB_HOST=your-database-host
DB_PORT=your-database-port
DB_NAME=your-database-name
DB_USER=your-database-username
DB_PWD=your-database-password
```

### 4. Set Up the Database
Run the SQL schema file to create the necessary tables:

```bash
psql -U your-username -d your-database-name -f schema/schema.sql
```

### 5. Build the Project
```bash
npm run build
```

### 6. Start the Server
```bash
npm start
```

The server will start on `http://localhost:<PORT>`.

---

## Testing the API

### 1. Using Postman
- Import the Postman collection from the `postman` folder: `ExpressTSCRUD API.json`.
- Test the API endpoints.

### 2. Using cURL
Example to fetch paginated tasks:
```bash
curl -X GET "http://localhost:<PORT>/api/v1/tasks?page=1"
```

---

## Scripts

| Command           | Description                          |
|-------------------|--------------------------------------|
| `npm run build`   | Compiles TypeScript to JavaScript.   |
| `npm start`       | Starts the server.                  |
| `npm run dev`     | Starts the server in dev mode.       |

---

## Technologies Used

- **Node.js**: Backend runtime.
- **Express.js**: Web framework.
- **TypeScript**: Strongly typed JavaScript.
- **PostgreSQL**: Relational database.
- **Postman**: API testing tool.

---

Feel free to customize this `README.md` based on your preferences or add more sections like **Contributors**, **Roadmap**, or **FAQs**.