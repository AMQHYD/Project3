
# InvoiceFlow - Project Documentation

## Overview

InvoiceFlow is a web application built with Next.js, Firebase, Genkit, ShadCN UI, and Tailwind CSS. It provides tools for managing invoices, recurring invoices, estimates, clients, and products/services. This document outlines the architecture, features, and technologies used in the project.

## Table of Contents

1.  [Frontend](#frontend)
    *   [Architecture](#frontend-architecture)
    *   [Components](#frontend-components)
    *   [Styling](#frontend-styling)
    *   [Routing](#frontend-routing)
    *   [State Management](#frontend-state-management)
2.  [Backend](#backend)
    *   [Firebase](#backend-firebase)
    *   [Genkit](#backend-genkit)
    *   [Authentication](#backend-authentication)
    *   [Database Schema](#backend-database-schema)
3.  [Technologies Used](#technologies-used)
4.  [Setup and Installation](#setup-and-installation)
5.  [Folder Structure](#folder-structure)
6.  [Contributing](#contributing)
7.  [License](#license)

## Frontend

### Frontend Architecture

The frontend is built using Next.js, a React framework that enables server-side rendering and static site generation. The application follows a component-based architecture, with reusable UI components built using ShadCN UI and styled with Tailwind CSS.

### Components

The core components are:

*   **Dashboard Components:**
    *   Revenue Overview (AreaChart)
    *   Invoice Status (PieChart)
    *   Top Clients (BarChart)
    *   Summary Cards
*   **Form Components:**
    *   Invoice Form
    *   Estimate Form
    *   Client Form
    *   Product/Service Form
    *   Recurring Invoice Form
    *   Profile Form
*   **UI Components (ShadCN UI):**
    *   Button
    *   Input
    *   Textarea
    *   Select
    *   Calendar
    *   Dialog
    *   Avatar
    *   DropdownMenu
    *   ScrollArea
    *   Card
    *   Alert
    *   Badge
    *   Checkbox
    *   RadioGroup
    *   Slider
    *   Switch
    *   Table
    *   Tabs
    *   Toast
    *   Tooltip
    *   Accordion
    *   AlertDialog
    *   Menubar
    *   Popover
    *   Progress
    *   Sheet
    *   Skeleton
*   **Layout Components:**
    *   Sidebar
    *   Header
    *   Root Layout

### Styling

*   **Tailwind CSS:** Used for utility-first styling, providing a consistent and responsive design.
*   **ShadCN UI:** Provides pre-built, accessible React components styled with Tailwind CSS.
*   **Global Styles:** Located in `src/app/globals.css`, defining the color palette and base styles.

### Routing

Next.js App Router is used for navigation:

*   `/`: Dashboard
*   `/invoices`: Invoice Management
*   `/invoices/create`: Create Invoice Form
*   `/recurring-invoices/create`: Create Recurring Invoice Form
*   `/estimates`: Estimate Management
*   `/estimates/create`: Create Estimate Form
*   `/clients/create`: Add Client Form
*   `/products/create`: Add Product/Service Form
*   `/profile`: User Profile
*   `/login`: Login Page

### State Management

*   **React Hooks:** Primarily used for managing component state.
*   **React Hook Form:** Manages form state and validation.

## Backend

### Firebase

Firebase is used as the backend-as-a-service:

*   **Authentication:** Firebase Authentication handles user authentication, including login and logout.
*   **Firestore:** (Hypothetical) If the application were to expand to use a database, Firestore would be used for storing data (clients, products, invoices, estimates).
*   **Storage:** Firebase Storage could be used for storing user profile logos.

### Genkit

Genkit integrates AI functionalities into the application.

### Authentication

Firebase Authentication is used to manage user authentication:

*   **Login:** Allows users to log in with email and password.
*   **Demo User:** A demo user (`demo@example.com` / `demo1234`) is provided for easy testing.
*   **Logout:** Allows users to log out of the application.

### Database Schema

(Hypothetical, as no actual database connection is implemented)

```
Clients:
- id (SERIAL, PRIMARY KEY)
- name (TEXT, NOT NULL)
- company (TEXT)
- email (TEXT)
- phone (TEXT)
- address (TEXT)
- city (TEXT)
- state_province (TEXT)
- postal_code (TEXT)
- country (TEXT)
- notes (TEXT)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)

Products:
- id (SERIAL, PRIMARY KEY)
- name (TEXT, NOT NULL)
- description (TEXT)
- price (DECIMAL, NOT NULL)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)

Invoices:
- id (SERIAL, PRIMARY KEY)
- client_id (INTEGER, NOT NULL, FOREIGN KEY referencing Clients.id)
- invoice_number (TEXT, NOT NULL)
- issue_date (DATE, NOT NULL)
- due_date (DATE, NOT NULL)
- subtotal (DECIMAL)
- total_amount (DECIMAL, NOT NULL)
- notes (TEXT)
- terms (TEXT)
- template (TEXT)
- status (TEXT)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)

InvoiceItems:
- id (SERIAL, PRIMARY KEY)
- invoice_id (INTEGER, NOT NULL, FOREIGN KEY referencing Invoices.id)
- product_id (INTEGER, NOT NULL, FOREIGN KEY referencing Products.id)
- description (TEXT)
- quantity (INTEGER, NOT NULL)
- unit_price (DECIMAL, NOT NULL)
- tax_percentage (DECIMAL)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)

RecurringInvoices:
- id (SERIAL, PRIMARY KEY)
- client_id (INTEGER, NOT NULL, FOREIGN KEY referencing Clients.id)
- name (TEXT)
- frequency (TEXT, NOT NULL)
- day_of_month (INTEGER)
- start_date (DATE, NOT NULL)
- end_date (DATE)
- limit (INTEGER)
- payment_terms (TEXT)
- automatically_send (BOOLEAN)
- notes (TEXT)
- terms (TEXT)
- template (TEXT)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)

Estimates:
- id (SERIAL, PRIMARY KEY)
- client_id (INTEGER, NOT NULL, FOREIGN KEY referencing Clients.id)
- estimate_number (TEXT, NOT NULL)
- issue_date (DATE, NOT NULL)
- expiry_date (DATE, NOT NULL)
- subtotal (DECIMAL)
- total_amount (DECIMAL, NOT NULL)
- notes (TEXT)
- terms (TEXT)
- template (TEXT)
- status (TEXT)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)

EstimateItems:
- id (SERIAL, PRIMARY KEY)
- estimate_id (INTEGER, NOT NULL, FOREIGN KEY referencing Estimates.id)
- product_id (INTEGER, NOT NULL, FOREIGN KEY referencing Products.id)
- description (TEXT)
- quantity (INTEGER, NOT NULL)
- unit_price (DECIMAL, NOT NULL)
- tax_percentage (DECIMAL)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)

UserProfile:
- id (SERIAL, PRIMARY KEY)
- name (TEXT)
- mobile (TEXT)
- address (TEXT)
- business_name (TEXT)
- logo (TEXT)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

## Technologies Used

*   **Next.js:** React framework for building full-stack web applications.
*   **Firebase:** Backend-as-a-service for authentication and (potentially) database and storage.
*   **Genkit:** AI development platform for building and deploying AI-powered features.
*   **ShadCN UI:** Reusable UI components styled with Tailwind CSS.
*   **Tailwind CSS:** Utility-first CSS framework for styling.
*   **TypeScript:** Superset of JavaScript that adds static typing.
*   **React Hook Form:** Library for managing form state and validation in React.
*   **Zod:** Schema validation library.
*   **jsPDF/jsPDF-autotable:** Library for generating PDF documents.
*   **lucide-react:** Icons library.

## Setup and Installation

1.  Clone the repository:
    ```bash
    git clone [repository-url]
    cd [project-directory]
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Set up Firebase:
    *   Create a Firebase project in the Firebase Console.
    *   Enable Authentication.
    *   (If needed) Set up Firestore and Storage.
    *   Obtain Firebase configuration and add it to the `.env` file.
4.  Run the development server:
    ```bash
    npm run dev
    ```

## Folder Structure

```
.
├── .env                           # Environment variables
├── MVP.md                         # MVP Features
├── README.md                      # Project Readme
├── components.json                # ShadCN UI configuration
├── database_schema.md             # Database schema
├── next.config.ts                 # Next.js configuration
├── package.json                   # Project dependencies
├── src
│   ├── ai                         # Genkit AI-related code
│   │   ├── ai-instance.ts         # Genkit instance configuration
│   │   └── dev.ts                 # Genkit development file
│   ├── app                        # Next.js App Router directory
│   │   ├── clients
│   │   │   └── create             # Add client page
│   │   │       └── page.tsx
│   │   ├── dashboard              # Dashboard page
│   │   │   └── page.tsx
│   │   ├── estimates              # Estimate Management Page
│   │   │   ├── create
│   │   │   │   └── page.tsx
│   │   │   └── page.tsx
│   │   ├── invoices               # Invoice Management Page
│   │   │   ├── create
│   │   │   │   └── page.tsx
│   │   │   └── page.tsx
│   │   ├── layout.tsx             # Root layout
│   │   ├── login                  # Login page
│   │   │   └── page.tsx
│   │   ├── metadata.ts            # Metadata
│   │   ├── page.tsx               # Home page (Dashboard)
│   │   ├── products               # Product Management Page
│   │   │   └── create
│   │   │       └── page.tsx
│   │   ├── profile                # User Profile Page
│   │   │   └── page.tsx
│   │   └── recurring-invoices   # Recurring Invoice Management Page
│   │       └── create
│   │           └── page.tsx
│   ├── components                 # Reusable components
│   │   └── ui                     # ShadCN UI components
│   ├── hooks                      # Custom hooks
│   ├── lib                        # Utility functions
│   └── styles                     # Global styles
├── tailwind.config.ts           # Tailwind CSS configuration
└── tsconfig.json                # TypeScript configuration
```

## Contributing

Contributions are welcome! Please follow these steps:

1.  Fork the repository.
2.  Create a new branch for your feature or bug fix.
3.  Make your changes and commit them with descriptive messages.
4.  Submit a pull request.

## License

[MIT](LICENSE)

 