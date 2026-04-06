# CafeApp - Full-Stack Cafe Management System

A high-performance management application for cafes, featuring a robust **Spring Boot** REST API and a dynamic **React** frontend. The system supports full item CRUD (Create, Read, Update, Delete) operations, image uploads, and an integrated cart management system.

## 🏗️ Architecture Overview

### Backend (Spring Boot)
* **Framework:** Spring Boot 4.0.1 with Java 21.
* **Database:** MySQL integration via **Spring Data JPA**.
* **Key Features:**
    * **RESTful Controllers:** Managed through `ItemController` with endpoints for item discovery, detailed retrieval, and deletion.
    * **Multipart Support:** Handles item creation with image file uploads using `@RequestPart`.
    * **Data Integrity:** Implements a specialized `UpdateDTO` for partial item updates.
    * **Auto-Documentation:** Integrated with **SpringDoc OpenAPI (Swagger)** for interactive API testing.

### Frontend (React + Vite)
* **Framework:** React 19 with Vite for ultra-fast bundling.
* **Styling:** A hybrid approach using **Tailwind CSS**, **Styled Components**, and **Material UI (MUI)** for a polished interface.
* **State & Routing:** Utilizes `react-router-dom` for navigation and standard React hooks (`useState`, `useRef`, `useEffect`) for complex UI states like form modals and cart toggles.
* **API Client:** Axios for asynchronous communication with the Spring Boot backend.

## 🚀 Key Features

* **Dynamic Item Management:** Admin-capable forms for adding new items with descriptions, pricing, and images.
* **Integrated Cart System:** A `CartMenu` component that manages order selections in real-time.
* **Live Updates:** A `reloadTrigger` mechanism ensures the UI stays in sync with the backend database without manual refreshes.
* **Responsive Design:** Styled with a custom `Theme` and `AppContainer` to ensure a consistent look across devices.

## 📂 Project Structure

```text
├── Backend/
│   ├── src/main/java/com/example/FoodAPI/
│   │   ├── controller/      # REST Endpoints (ItemController)
│   │   ├── model/           # JPA Entities (Items)
│   │   ├── repo/            # Repository interfaces and DTOs
│   │   └── service/         # Business Logic (ItemService)
│   └── src/main/resources/  # Application & MySQL configurations
└── Frontend/
    ├── src/components/      # UI: AddForm, CartMenu, Navbar, ItemCard
    ├── src/pages/           # Layouts: MainPage, ManagePage, ItemPage
    └── App.jsx              # Main application logic and state provider
```

## ⚙️ Setup & Installation

### Backend Requirements
* Java 21
* MySQL Server
* Maven

1.  Create a database named `FoodDB` in MySQL.
2.  Update `src/main/resources/application.properties` with your MySQL credentials.
3.  Run the application:
    ```bash
    ./mvnw spring-boot:run
    ```

### Frontend Requirements
* Node.js (Latest LTS)

1.  Navigate to the `Frontend` directory.
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the development server:
    ```bash
    npm run dev
    ```

## 🚦 API Reference (Base Path: `/api`)

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/items` | Retrieve all cafe items. |
| `POST` | `/additem` | Add a new item with image (Multipart). |
| `GET` | `/getitem/{id}`| Fetch specific item details. |
| `PUT` | `/updateitem/{id}`| Update existing item details via DTO. |
| `DELETE`| `/deleteitem/{id}`| Remove an item from the system. |

---
*Developed by Pugazhendhi-siva as part of a professional Full-Stack portfolio.*
