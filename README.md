# TigerReTail 2 🛍️

Princeton's modern marketplace - where Tigers buy, sell, and connect.

## About

`TigerReTail 2` is a dedicated marketplace platform designed exclusively for the Princeton University community. Whether you're looking to sell textbooks, find furniture, offer services, or discover unique items on campus, TigerReTail provides a trusted space for all your marketplace needs.

### Key Features

-   **List & Sell**: Create listings for items you want to sell or rent
-   **Request Items**: Post requests for specific items or services
-   **Connect & Trade**: Get matched with sellers and arrange safe on-campus transactions

### Coming Spring 2025

-   **Auctions**: Real-time bidding system with automated settlement
-   **Enhanced Senior Sale**: Streamlined virtual yard sale experience
-   **In-App Messaging**: Direct communication between buyers and sellers
-   **Service Profiles**: Showcase your skills and services to the community

## Tech Stack

`TigerReTail 2` is built primarily with the following technologies:

-   **Frontend**: [Svelte](https://svelte.dev/), [TailwindCSS](https://tailwindcss.com/), [ShadCN Svelte](https://www.shadcn-svelte.com/)
-   **Backend**: [Bun](https://bun.sh/), [PostgreSQL](https://www.postgresql.org/), [DrizzleORM](https://drizzleorm.com/), [SvelteKit](https://kit.svelte.dev/)
-   **Deployment**: [Vercel](https://vercel.com/), [Docker](https://www.docker.com/)
-   **Tools**: [GitHub Actions](https://github.com/features/actions), [Prettier](https://prettier.io/), [ESLint](https://eslint.org/), [Vitest](https://vitest.dev/)

## Development

To run the application locally, you will need to have [Node.js](https://nodejs.org/en/), [Bun](https://bun.sh/), and [Docker](https://www.docker.com/products/docker-desktop/) installed on your machine. Once you have the prerequisites installed, follow the steps below to set up the development environment:

1. Clone the repository:

```bash
git clone https://github.com/TigerAppsOrg/TigerRetail-2
cd TigerRetail-2
```

2. Install the project dependencies:

```bash
bun install
```

3. Create a `.env` file in the root directory of the project with the following environment variables. The `SESSION_SECRET` can be any 32-character string:

```bash
DATABASE_URL="postgres://root:mysecretpassword@localhost:5432/local"
SESSION_SECRET=12345678901234567890123456789012
```

4. Start the local database and development server. Docker must be running on your machine for this to work (since it spins up a PostgreSQL container):

```bash
bun run db:start
bun run db:migrate
bun run dev
```

You can use `bun run db:studio` to open a GUI for the database. Format the code with `bun run format`, lint with `bun run lint`, and run tests with `bun run test`.

## Contributing

If you would like to contribute to the project, please reach out to the TigerApps team at **it.admin@tigerapps.org**.

## Credits

`TigerReTail 2` was created by TigerApps team members Ben Aepli '28, Glen Nfor '27, Angelina Ji '27, Winsice Ng '26, Marvin Chen '26, Erica Lee '26, and Joshua Lau '26.

The [original TigerReTail project](https://github.com/TigerAppsOrg/TigerReTail) was developed by Albert Lin '23, Katie McLaughlin '23, Sara Schwartz '23, and Phoebe Lin '23.

## License

This project is licensed under the BSD 3-Clause License - see the [LICENSE](LICENSE) file for details.
