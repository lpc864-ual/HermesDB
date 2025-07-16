# HermesDB Backend

This backend is built with NestJS and provides the core logic for HermesDB

## Project Structure

- **main.ts**: Defines the port used by the backend (default: 3000).
- **app.module.ts**: Configures the system, injects dependencies, and loads environment variables.
- **controllers/**: Contains the API controllers.
- **dto/**: Defines the data structures (DTOs) used for communication.
- **services/**:
  - `db-introspector.service.ts`: Auxiliary logic for verifying database URLs and extracting DDL.
  - `chat.service.ts`: Handles logic for obtaining responses from the AI model (Llama sqlcoder:7b-q4_K_S).
  - `app.service.ts`: General control logic.

## Requirements

- **Node.js** (recommended: latest LTS)
- **Docker** (with at least 6GB RAM allocated)
- **PostgreSQL** and **MongoDB** (via Docker Compose)
- **AI Model**: Llama sqlcoder:7b-q4_K_S (7B parameters, quantized, ~4GB, needs at least 5GB RAM)

## Environment Variables

Create a `.env` file in the `backend/` directory. You can use `backend/example.env` as a template. As open source software, replace the contents of .example.env with .env. These are the same credentials you need to test the software.

- <b>MongoDB connection string</b> for storing chat context.
- <b>Path or URL to the AI model</b> (note: it must be a root URL, e.g., /, as shown in the template).
- <b>Model name</b>: required and must match the one downloaded in the Docker container.
- <b>Tokens</b>: set the maximum number of tokens to use for AI responses.
- <b>Message text</b>: configure the default or initial message text if needed.

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Start the Backend Server

```bash
npm run start
```

### 3. Start Required Docker Containers

The backend depends on several Docker containers:
- MongoDB (for storing AI context)
- The AI model
- PostgreSQL (for testing)

Start all services with:

```bash
docker-compose -f backend/docker-compose.dev.yml up -d
```

> **Important:**  
> The AI model requires at least 5GB of RAM. Allocate at least 6GB to Docker/WSL2.

### 4. Configure WSL2 Memory (Windows Only)

1. **Create `.wslconfig`**  
   Open Notepad and paste the following:

   ```
   [wsl2]
   memory=6GB
   processors=2
   swap=2GB
   localhostForwarding=true
   ```

   Save as `.wslconfig` (with quotes) in your Windows user folder, e.g.:
   ```
   C:\Users\[YourWindowsUser]\.wslconfig
   ```

2. **Verify the File**  
   In PowerShell:
   ```powershell
   dir C:\Users\[YourWindowsUser]\wslconfig
   ```
   Ensure the file exists and has no extension.

3. **Restart WSL**  
   In PowerShell:
   ```powershell
   wsl --shutdown
   ```

4. **Check Memory Allocation**  
   Open your WSL terminal and run:
   ```bash
   free -h
   ```
   You should see around 6GB total memory.

### 5. Test the API

Use Postman or a similar tool to test the endpoints.  
To start a chat, send a POST request to:

```
http://localhost:3000/
```

With the following JSON body (replace with your DB URL as needed):

```json
{
  "url": "postgresql://postgres_test_db:postgres_test_db@localhost:5432/postgres_test_db"
}
```

---

> **Note:**  
> The AI model may take several minutes to respond, depending on your system resources. Please be patient.

---