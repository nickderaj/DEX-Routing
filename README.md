## Table of Contents

1. [Project Setup](#project-setup)
2. [Layout](#layout)
3. [Tests](#tests)
4. [Screenshots](#screenshots)

## Project Setup

- To run the app, run `pnpm i` and `pnpm dev`.
- To run all the tests (cached), run `pnpm test`.
- To run all the tests & watch for changes, run `pnpm test:watch`.
- To build all the apps and packages, run `pnpm build`.
- The lint and formatting functions are `pnpm lint` and `pnpm format` respectively.
- The lint, format and test function will auto-run when you try to commit to a git repo to ensure that the code is formatted and tested before being pushed.
- Commitlint is also used to ensure that the commit messages are formatted correctly (e.g. "feat: new modals added" and "test: updated test for x function")

## Layout

This is a Full Stack Monorepo powered by Turborep, Next.js (frontend), Node.js (backend) with Express, Redux, Tailwind CSS, Jest, ESlint, Prettier and Husky Git Hooks.

### Apps

The apps folder contains a backend and web folder, which are the actual apps that are spun up when you run pnpm dev & will be deployed.

### Packages

The packages folder contains all the global configs, e.g. eslint, prettier and jest configs, as well as common UI elements that can be shared between multiple apps (e.g. a button component), if I were to add more apps to this monorepo.

## Tests

### Frontend

- Written Jest & React Testing Library.
- The UI components in the package folder are all fully tested with unit tests to ensure they work as intended

### Backend

- Written with Jest & Supertest.
- There are tests for the actual routes, and they call the methods in the controller to ensure that the controller methods work as intended.
- The models are also fully tested.

## Screenshots

| <img src="screenshots\1.png" width="500"> |
| :---------------------------------------: |
|       **Figure 1.** \_Landing Page        |

|  <img src="screenshots\2a.png" width="500">   |
| :-------------------------------------------: |
| **Figure 2a.** _Search with multiple results_ |

| <img src="screenshots\2b.png" width="500"> |
| :----------------------------------------: |
|  **Figure 2b.** _Search with one result_   |

| <img src="screenshots\3.png" width="500"> |
| :---------------------------------------: |
|      **Figure 3.** _Pool Pair Modal_      |

| <img src="screenshots\4.png" width="500"> |
| :---------------------------------------: |
|      **Figure 4.** _Loading spinner_      |

| <img src="screenshots\5.png" width="500"> |
| :---------------------------------------: |
|  **Figure 5.** _Token pair unsupported_   |

| <img src="screenshots\6.png" width="500"> |
| :---------------------------------------: |
|   **Figure 6.** _Server not responding_   |

| <img src="screenshots\7.png" width="500"> |
| :---------------------------------------: |
|      **Figure 7.** _Supported Pair_       |

| <img src="screenshots\8.png" width="500"> |
| :---------------------------------------: |
|   **Figure 8.** _All tests successful_    |
