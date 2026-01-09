# Appwrite Setup Guide

Follow these steps to configure your [Appwrite](https://appwrite.io/) backend for the Sticky Notes application.

### 1. Database & Collection
- Create a new Database in your console.
- Inside that database, create a Collection named `notes`.

### 2. Attributes (Fields)
Add these fields manually in the Attributes tab. 
*(Note: System fields like $id and $createdAt are automatically managed).*

- **body**: String (1000), Required: No
- **colors**: String (200), Required: No
- **position**: String (200), Required: No
- **userId**: String (36), Required: **Yes**

### 3. Indexing
- Go to the Indexes tab and click Create Index.
- **Index Type**: Key
- **Attribute**: `userId`

### 4. Permissions (Security)
Go to the Settings tab of your collection:
- **Document Level Security**: Set to **Enabled (ON)**.
- **Permissions**: Add Role `Any` (or `Users`).
- **Access**: Select **Create, Read, Update, and Delete**.

### 5. Authentication
- Go to the Auth section sidebar.
- In the Settings tab, ensure **Email/Password** is toggled **ON**.

### 6. Environment Variables
Create a `.env` file in your project root:
```env
VITE_ENDPOINT=https://cloud.appwrite.io/v1
VITE_PROJECT_ID="your_project_id"
VITE_DATABASE_ID="your_database_id"
VITE_COLLECTION_NOTES_ID="your_collection_id"
```
---