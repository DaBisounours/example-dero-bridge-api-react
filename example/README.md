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

Let's start with the main component (App.ts):

```ts
import './App.css'

// Simply return a div
function App() {

  return (
    <div className='App'>
    </div>
  )
}
```

We will declare a *state variable* `bridge` that will hold the object imported from the `dero-rpc-bridge-api`.

```ts
import { useState } from 'react' // Import useState
import './App.css'

import DeroBridgeApi from 'dero-rpc-bridge-api' // Import the brigde

function App() {
  // Add the state variable using useState hook
  const [bridge, setBridge] = useState<DeroBridgeApi>()

  return (
    <div className='App'>
    </div>
  )
}
```

Then add a button to connect to the bridge !

```ts
import { useCallback, useState } from 'react' // Import useCallback
import './App.css'

import DeroBridgeApi from 'dero-rpc-bridge-api'


function App() {

  const [bridge, setBridge] = useState<DeroBridgeApi>()

  // Add the button callback function
  const connect = useCallback(async () => {
    ...
  }, [])

  return (
    <div className='App'>
      // Add the button calling the connect function on click
      <button onClick={connect}>connect</button>
    </div>
  )
}
```


We will also setup a state variable, to handle the status of the connection to the bridge. We will start by declaring an enumeration of the different states:

In `connection-status.ts` :
```ts
// Declare the enumeration. We will move this in a separate file later to 
export enum ConnectionStatus {
  NotConnected = "not connected",
  Connected = "connected to the bridge!",
  Connecting = "connecting...",
  Failed = 'connection failed !'
}

```

And declare the variable in `App.tsx`:

```ts
import { useCallback, useState } from 'react' 
import './App.css'

import DeroBridgeApi from 'dero-rpc-bridge-api'
import { ConnectionStatus } from './utils/connection-status' // Import ConnectionStatus enumeration


function App() {

  const [bridge, setBridge] = useState<DeroBridgeApi>()
  const [status, setStatus] = useState<ConnectionStatus>()

  // Add the button callback function
  const connect = useCallback(async () => {
    ...
  }, [])

  return (
    <div className='App'>
      // Add the button calling the connect function on click
      <button onClick={connect}>connect</button>
    </div>
  )
}
```

We're almost done with the first part ! We need to handle the click of the button :

```ts
  ...

  const connect = useCallback(async () => {

    // Start by setting the status of the connection to connecting when we click.
    setStatus(ConnectionStatus.Connecting);

    // Load the bridge in a local constant variable
    const deroBridgeApi = new DeroBridgeApi();

    // Initialise the object and handle the different Promise cases
    deroBridgeApi.init()
      .then(() => { // When connection is successful
        // We set status to Connected !
        setStatus(ConnectionStatus.Connected);
      })
      .catch((err: any) => { // If an error occured
        // We just put the error message as the status. We could handle it better, but it works for this example !
        setStatus(err.message);
      })

    // Then we save the object in the app's state variable.
    setBridge(deroBridgeApi);
    
  }, [])

  ...
```


Great ! Now we should end up with this :

#### App.tsx
```ts
import { useCallback, useState } from 'react'
import logo from './logo.svg'
import './App.css'

// @ts-ignore
import DeroBridgeApi from 'dero-rpc-bridge-api'
import { ConnectionStatus } from './utils/connection-status'



function App() {
  const [bridge, setBridge] = useState<DeroBridgeApi>()
  const [status, setStatus] = useState<ConnectionStatus>()

  const connect = useCallback(async () => {
    setStatus(ConnectionStatus.Connecting);

    const deroBridgeApi = new DeroBridgeApi();

    deroBridgeApi.init()
      .then(() => {
        setStatus(ConnectionStatus.Connected);
      })
      .catch((err: any) => {
        setStatus(err.message);
      })

    setBridge(deroBridgeApi);
  }, [])

  return (
    <div className='App'>
      <button onClick={connect}>connect</button>
      <div>Status: {status}</div>
    </div>
  )
}

export default App
```

#### connection-status.ts
```ts
export enum ConnectionStatus {
    NotConnected = "not connected",
    Connected = "connected to the bridge!",
    Connecting = "connecting...",
    Failed = 'connection failed !'
}  

```

Then when you open [](http://localhost:3000) :

![](image/screen1.png)

And click on connect :

![](image/screen2.png)

## Create a context to access the bridge anywhere in the app.
