# DERO RPC BRIDGE API Tutorial

For this example we will be using the React Framework with [vite](https://vitejs.dev) and [yarn](https://yarnpkg.com/) tools.

Lets get right into it:

## Quick app setup


```sh
# create project using vite
yarn create vite
```

Then enter the *project name*, select `react` and `react-ts`.

When the project is created, you need to move to this folder, add the bridge to your project and install packages :

```sh
# Move into the project folder
cd PROJECT_NAME # change that to your actual project name

# Add the bridge to your project
yarn add dero-rpc-bridge-api

# Install dependencies and start dev server
yarn && yarn dev
```

Now you should have a running development server!

## Initialising the connection with the Bridge

In the main component (App)
