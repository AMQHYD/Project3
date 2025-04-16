
# Database Schema
# Database Schema

This document outlines the database schema for the InvoiceFlow application.

## Tables

### Clients

| Column          | Type     | Constraints | Description                                                        |
| --------------- | -------- | ----------- | ------------------------------------------------------------------ |
| id              | SERIAL   | PRIMARY KEY | Unique identifier for the client                                   |
| name            | TEXT     | NOT NULL    | Name of the client                                                 |
| company         | TEXT     |             | Company name of the client                                         |
| email           | TEXT     |             | Email address of the client                                        |
| phone           | TEXT     |             | Phone number of the client                                         |
| address         | TEXT     |             | Address of the client                                              |
| city            | TEXT     |             | City of the client                                                 |
| state_province  | TEXT     |             | State/Province of the client                                       |
| postal_code     | TEXT     |             | Postal code of the client                                          |
| country         | TEXT     |             | Country of the client                                              |
| notes           | TEXT     |             | Additional notes about the client                                  |
| created_at      | TIMESTAMP| DEFAULT NOW() | Timestamp of when the client was created                           |
| updated_at      | TIMESTAMP| DEFAULT NOW() | Timestamp of when the client was last updated                    |

### Products

| Column          | Type     | Constraints | Description                                                        |
| --------------- | -------- | ----------- | ------------------------------------------------------------------ |
| id              | SERIAL   | PRIMARY KEY | Unique identifier for the product/service                          |
| name            | TEXT     | NOT NULL    | Name of the product/service                                        |
| description     | TEXT     |             | Description of the product/service                                 |
| price           | DECIMAL  | NOT NULL    | Price of the product/service                                       |
| created_at      | TIMESTAMP| DEFAULT NOW() | Timestamp of when the product/service was created                  |
| updated_at      | TIMESTAMP| DEFAULT NOW() | Timestamp of when the product/service was last updated           |

### Invoices

| Column               | Type      | Constraints    | Description                                                        |
| -------------------- | --------- | -------------- | ------------------------------------------------------------------ |
| id                   | SERIAL    | PRIMARY KEY      | Unique identifier for the invoice                                  |
| client_id          | INTEGER   | NOT NULL       | Foreign key referencing the Clients table                           |
| invoice_number       | TEXT      | NOT NULL       | Invoice number                                                     |
| issue_date           | DATE      | NOT NULL       | Date when the invoice was issued                                   |
| due_date             | DATE      | NOT NULL       | Date when the invoice is due                                       |
| subtotal             | DECIMAL   |                | Subtotal amount of the invoice                                    |
| total_amount         | DECIMAL   | NOT NULL       | Total amount of the invoice (including taxes)                      |
| notes                | TEXT      |                | Additional notes for the invoice                                   |
| terms                | TEXT      |                | Terms and conditions for the invoice                               |
| template             | TEXT      |                | Template used for the invoice                                      |
| status               | TEXT      |                | Current status of the invoice (e.g., draft, sent, paid, due)      |
| created_at           | TIMESTAMP | DEFAULT NOW()  | Timestamp of when the invoice was created                          |
| updated_at           | TIMESTAMP | DEFAULT NOW()  | Timestamp of when the invoice was last updated                   |

### Invoice Items

| Column          | Type     | Constraints | Description                                                        |
| --------------- | -------- | ----------- | ------------------------------------------------------------------ |
| id              | SERIAL   | PRIMARY KEY | Unique identifier for the invoice item                               |
| invoice_id      | INTEGER   | NOT NULL    | Foreign key referencing the Invoices table                           |
| product_id      | INTEGER   | NOT NULL    | Foreign key referencing the Products table                           |
| description     | TEXT     |             | Description of the item                                            |
| quantity        | INTEGER   | NOT NULL    | Quantity of the item                                               |
| unit_price      | DECIMAL   | NOT NULL    | Unit price of the item                                             |
| tax_percentage  | DECIMAL   |             | Tax percentage applied to the item                                  |
| created_at      | TIMESTAMP| DEFAULT NOW() | Timestamp of when the item was created                           |
| updated_at      | TIMESTAMP| DEFAULT NOW() | Timestamp of when the item was last updated                    |

### Recurring Invoices

| Column               | Type      | Constraints    | Description                                                        |
| -------------------- | --------- | -------------- | ------------------------------------------------------------------ |
| id                   | SERIAL    | PRIMARY KEY      | Unique identifier for the recurring invoice                          |
| client_id          | INTEGER   | NOT NULL       | Foreign key referencing the Clients table                           |
| name                 | TEXT      |                | Name or description of the recurring invoice                        |
| frequency            | TEXT      | NOT NULL       | Frequency of the recurring invoice (e.g., weekly, monthly, yearly) |
| day_of_month         | INTEGER   |                | Day of the month for monthly recurring invoices                      |
| start_date           | DATE      | NOT NULL       | Date when the recurring invoice series starts                         |
| end_date             | DATE      |                | Date when the recurring invoice series ends                           |
| limit                | INTEGER   |                | Maximum number of invoices to generate                               |
| payment_terms        | TEXT      |                | Payment terms for the recurring invoice                              |
| automatically_send   | BOOLEAN   |                | Whether to automatically send invoices when generated                |
| notes                | TEXT      |                | Additional notes for the recurring invoice                           |
| terms                | TEXT      |                | Terms and conditions for the recurring invoice                       |
| template             | TEXT      |                | Template used for the recurring invoice                              |
| created_at           | TIMESTAMP | DEFAULT NOW()  | Timestamp of when the recurring invoice was created                 |
| updated_at           | TIMESTAMP | DEFAULT NOW()  | Timestamp of when the recurring invoice was last updated          |

### Estimates

| Column          | Type     | Constraints | Description                                                        |
| --------------- | -------- | ----------- | ------------------------------------------------------------------ |
| id              | SERIAL   | PRIMARY KEY | Unique identifier for the estimate                                  |
| client_id          | INTEGER   | NOT NULL    | Foreign key referencing the Clients table                           |
| estimate_number | TEXT     | NOT NULL    | Estimate number                                                    |
| issue_date      | DATE     | NOT NULL    | Date when the estimate was issued                                  |
| expiry_date     | DATE     | NOT NULL    | Date when the estimate expires                                     |
| subtotal             | DECIMAL   |                | Subtotal amount of the estimate                                    |
| total_amount    | DECIMAL  | NOT NULL    | Total amount of the estimate (including taxes)                     |
| notes           | TEXT     |             | Additional notes for the estimate                                  |
| terms           | TEXT     |             | Terms and conditions for the estimate                                |
| template        | TEXT     |             | Template used for the estimate                                     |
| status          | TEXT     |             | Current status of the estimate (e.g., draft, sent, accepted)       |
| created_at      | TIMESTAMP| DEFAULT NOW() | Timestamp of when the estimate was created                           |
| updated_at      | TIMESTAMP| DEFAULT NOW() | Timestamp of when the estimate was last updated                    |

### Estimate Items

| Column          | Type     | Constraints | Description                                                        |
| --------------- | -------- | ----------- | ------------------------------------------------------------------ |
| id              | SERIAL   | PRIMARY KEY | Unique identifier for the estimate item                               |
| estimate_id      | INTEGER   | NOT NULL    | Foreign key referencing the Estimates table                           |
| product_id      | INTEGER   | NOT NULL    | Foreign key referencing the Products table                           |
| description     | TEXT     |             | Description of the item                                            |
| quantity        | INTEGER   | NOT NULL    | Quantity of the item                                               |
| unit_price      | DECIMAL   | NOT NULL    | Unit price of the item                                             |
| tax_percentage  | DECIMAL   |             | Tax percentage applied to the item                                  |
| created_at      | TIMESTAMP| DEFAULT NOW() | Timestamp of when the item was created                           |
| updated_at      | TIMESTAMP| DEFAULT NOW() | Timestamp of when the item was last updated                    |

### UserProfile

| Column          | Type     | Constraints | Description                                                        |
| --------------- | -------- | ----------- | ------------------------------------------------------------------ |
| id              | SERIAL   | PRIMARY KEY | Unique identifier for the user profile                             |
| name            | TEXT     |             | User's name                                                        |
| mobile          | TEXT     |             | User's mobile number                                               |
| address         | TEXT     |             | User's address                                                     |
| business_name   | TEXT     |             | User's business name                                               |
| logo            | TEXT     |             | URL or path to the user's business logo                             |
| created_at      | TIMESTAMP| DEFAULT NOW() | Timestamp of when the user profile was created                     |
| updated_at      | TIMESTAMP| DEFAULT NOW() | Timestamp of when the user profile was last updated              |

## Relationships

*   `Invoices.client_id` references `Clients.id`
*   `InvoiceItems.invoice_id` references `Invoices.id`
*   `InvoiceItems.product_id` references `Products.id`
*   `RecurringInvoices.client_id` references `Clients.id`
*   `Estimates.client_id` references `Clients.id`
*   `EstimateItems.estimate_id` references `Estimates.id`
*   `EstimateItems.product_id` references `Products.id`

**Note:**

*   This schema is a basic representation and might need adjustments based on specific application requirements.
*   The SERIAL type is specific to PostgreSQL and automatically creates a sequence for auto-incrementing IDs. Other database systems might use different types for auto-incrementing columns.
