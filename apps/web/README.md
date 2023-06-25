# Documentation

## Table of Contents

1. [API](#api)
2. [Components](#components)
3. [Constants](#constants)
4. [Pages](#pages)
5. [Styles](#styles)
6. [Types](#types)

## API

- Contains all the api routes, e.g. `getAllRoutes` & `getBestRoute`.

## Components

- Contains all the components that aren't already in the shared `ui` library.
- In this case, there is only a Layout that is specific to Next.js as it uses next/head to set the metadata for the page & the modal for displaying the best route.

## Constants

- Contains all constants, in this very simple webapp there is only the API_URL

## Pages

- Contains all the pages, as well as the `_app.ts`x`and`\_document.tsx` files that are specific to Next.js.

## Styles

- CSS files, there is only a global CSS file that resets the styles & imports Tailwind.

## Types

- I have just added the Environment Variables to the `process.env` type so that TypeScript doesn't complain when using them.
