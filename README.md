# iamdylan.dev

Welcome to `iamdylan.dev`, a dynamic and professional portfolio website. Built with Next.js 16 (App Router), React 19 and TypeScript, this site features a sleek design powered by Material-UI (MUI). It's not just a showcase of skills and projects but also includes a blog, contact forms with Google reCAPTCHA for spam protection, rate limiting for enhanced security, and emailing functionality.

This project is bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Features

- **Next.js 16**: App Router with server-rendered and static pages.
- **TypeScript**: Ensuring code reliability and maintainability with strong typing.
- **Material-UI (MUI)**: A modern UI framework providing a suite of components for a great user interface.
- **Google reCAPTCHA**: Integrated into forms for spam protection.
- **Rate Limiting**: Implemented to prevent abuse and ensure service availability.
- **Emailing**: Contact form email via Resend (see `EMAIL_SETUP.md`).
- **Blog**: Posts stored as static content in `src/utils/staticBlogPosts.ts`.

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

Open [http://localhost:3000](http://localhost:3000) to view the site in your browser. You can start editing by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses `next/font` for font optimization, including the custom Google Font, Inter.

## Learn More about Next.js

- [Next.js Documentation](https://nextjs.org/docs) - Features and API.
- [Learn Next.js](https://nextjs.org/learn) - An interactive tutorial.
- Feedback and contributions are welcome at [the Next.js GitHub repository](https://github.com/vercel/next.js/).

## Deployment

Deploy with the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme), recommended by Next.js. See the [Next.js deployment documentation](https://nextjs.org/docs/deployment) for details.

## Development Scripts

Requires Node 24 (see `.nvmrc`).

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the app for production.
- `npm start`: Runs the built app in production mode.
- `npm run lint`: Runs ESLint.
- `npm run typecheck`: Checks TypeScript types.
- `npm test`: Runs the Vitest suite.
- `npm run format:check` / `npm run format:write`: Checks or applies Prettier formatting.

CI (`.github/workflows/ci.yml`) runs format check, lint, typecheck, tests and build on every pull request.

## Dependencies

This project includes a variety of dependencies for functionality and development, including MUI components, Axios for HTTP requests, Resend for email, rate limiting, React and Next.js libraries, and many others for optimal development experience.

---

For any queries or contributions, feel free to open an issue or a pull request in the repository.
