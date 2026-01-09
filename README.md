# Sticky Notes

A professional drag-and-drop sticky notes application with user-specific data persistence.

## Core Features

- **User Auth**: Secure sign-up/login using Appwrite Auth.
- **Private Notes**: Database rules ensure users only see their own content.
- **Canvas Interaction**: Drag, drop, and position notes anywhere.
- **Live Sync**: Real-time updates for text, color, and coordinates.
- **Smart Formatting**: Auto-resizing text areas and color presets.

## Tech Stack

- **Framework**: React JS
- **Backend-as-a-Service**: Appwrite (Auth & Databases)

## Setup Guide

1. **Clone & Install**
   ```bash
   git clone <REPO_URL>
   cd <repository_name> && npm install
   ```

2. **Environment Variables**  
Create a .env file in the root directory
   ```bash
    VITE_ENDPOINT="https://cloud.appwrite.io/v1"
    VITE_PROJECT_ID="your_project_id"
    VITE_DATABASE_ID="your_db_id"
    VITE_COLLECTION_NOTES_ID="your_collection_id"
   ```

3. **Setup Appwrite**  
Note: Backend setup refer APPWRITE_SETUP.md file

4. **Run the app**
   ```bash
    npm run dev
   ```
---