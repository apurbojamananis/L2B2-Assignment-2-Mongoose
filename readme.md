**Instruction: How to run this application locally**

#### Requirements:

- Node.js
- npm package manager
- ts-node-dev package

1. Install dependencies:

`npm install`

2. Start the application: There are two ways to start the application:

- **Production mode:** This will start the application using the pre-compiled server file located at ./dist/server.js.

`npm run start:prod`

- **Development mode:** This will start the application using the ts-node-dev package to compile and run the TypeScript code on the fly

`npm run start:dev`

**Additional commands:**

- Build:

`npm run build`

- Linting:

`npm run lint`

`npm run lint:fix`

- Prettier Formatting:

`npm run prettier`

`npm run prettier:fix`
