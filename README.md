This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## ------------------------------------------------------

Todo Application
Overview
-This project is a Todo application built with React and TypeScript. It allows users to manage their tasks by adding, editing, deleting, and filtering todos. The application communicates with a backend server through an API to handle CRUD operations.

Features
-Add New Todos: Users can create new tasks with a name, description, due date, and status.
-Edit Todos: Existing tasks can be updated.
-Delete Todos: Users can remove tasks from the list.
-Filter and Sort: Todos can be filtered by status and date, and sorted by due date.
-Responsive UI: The application is styled to be user-friendly and responsive.

Getting Started
Prerequisites
-Node.js (v14 or later)

Running the Application
-in dev = npm run dev

Usage
http://localhost:3001/todo
-Add a Todo: Fill out the form in the TodoForm component and click "Add".
-Edit a Todo: Click on the "Edit" button next to a todo, make changes, and save.
-Delete a Todo: Click on the "Delete" button next to a todo.
-Filter and Sort: Use the FilterSection component to filter and sort todos by status and due date.

http://localhost:3001/sharing
-Real-time Updates: Todos are updated in real-time through WebSocket communication.
-Display Todos: Renders a table with columns for Name, Description, Due Date, and Status.

API Endpoints
-GET /tasks: Fetch all todos with optional query parameters for filtering and sorting.
-POST /tasks: Add a new todo.
-PUT /tasks/: Update an existing todo.
-DELETE /tasks/: Delete a todo.
