# Giphy Searcher

## Utilizes React + Vite

## Getting Started

**Prerequisites:** [Node.js](https://nodejs.org/) (v18 or later) and npm.

1. Install dependencies:

   ```
   npm install
   ```

2. Set up your Giphy API key. Copy `.env.example` to `.env`:

   ```
   cp .env.example .env
   ```

   Then open `.env` and replace the placeholder with your own Giphy API key (get one at [developers.giphy.com](https://developers.giphy.com/)):

   ```
   VITE_GIPHY_KEY=your_giphy_api_key_here
   ```

3. Start the dev server:

   ```
   npm run dev
   ```

   Vite will print a local URL (usually `http://localhost:5173`) — open it in your browser.



This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
