# Sister Dashboard

A modern dashboard application built with Next.js and Tailwind CSS.

## Getting Started

First, install the dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```
API_URL=http://api.example.com
```

Replace the `API_URL` with your actual backend API URL.

## Authentication

The application includes authentication with the following endpoints:

- Login: `${API_URL}/auth/login`
  - Method: POST
  - Body:
    ```json
    {
      "email": "Admin@example.com",
      "password": "Admin"
    }
    ```

## Features

- Modern UI with Tailwind CSS
- Responsive design
- Form validation
- Reusable components
- Authentication with JWT

## Folder Structure

- `/app` - Next.js app directory
  - `/components` - Reusable UI components
    - `/auth` - Authentication-related components
    - `/ui` - UI components like buttons, inputs, etc.
  - `/lib` - Utility functions
  - `/services` - API services
  - `/types` - TypeScript type definitions

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
