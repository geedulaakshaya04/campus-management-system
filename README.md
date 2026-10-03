# AI-Powered Campus Management System

Comprehensive enterprise-grade digital campus platform built for higher education institutions.

## Architecture
- **Backend:** Spring Boot 3.2, Java 21, Spring Data JPA, Spring Security 6, JWT, MySQL 8
- **Frontend:** React 19, Vite 8, Tailwind CSS v4, Axios, Lucide React
- **AI Core:** RAG Engine, Embeddings, Vector Store, LLM Integration (Phase 5)

## Milestone 1 Setup & Run Instructions

### 1. Database
Make sure MySQL service is running. You can create the database manually or let Spring Boot automatically create it on startup:
```sql
CREATE DATABASE IF NOT EXISTS campus_management_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### 2. Backend (Spring Boot)
Option A: Run with batch script:
```powershell
cd backend
.\start-backend.bat
```

Option B: Set environment variables and run with Maven:
```powershell
cd backend
$env:DB_USERNAME="root"
$env:DB_PASSWORD="your_mysql_password"
mvn spring-boot:run
```
Swagger UI docs will be available at: `http://localhost:8080/swagger-ui.html`
Health check endpoint: `http://localhost:8080/api/health`

### 3. Frontend (React + Vite)
```powershell
cd frontend
npm run dev
```
Open `http://localhost:5173` in your browser.
