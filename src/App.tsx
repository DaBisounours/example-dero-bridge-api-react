import { useCallback, useState } from 'react'
import logo from './logo.svg'
import './App.css'

// @ts-ignore
import DeroBridgeApi from 'dero-rpc-bridge-api'
import React from 'react';
import GetBalanceComponent from './components/GetBalanceComponent';
//import TransferComponent from './components/TransferComponent';
import { ConnectionStatus } from './utils/connection-status';


// Global context variable to use all across the app
export const DeroContext = React.createContext<DeroBridgeApi>(null);

// App component
function App() {
  // The bridge object given to the DeroContext
  const [bridge, setBridge] = useState<DeroBridgeApi>()

  // The connection status : not connected by default
  const [status, setStatus] = useState<ConnectionStatus>(ConnectionStatus.NotConnected)

  // Callback when we click the connect button
  const connect = useCallback(async () => {
    // When clicked set status to connecting
    setStatus(ConnectionStatus.Connecting);

    // Instanciate the bridge
    const deroBridgeApi = new DeroBridgeApi();

    // Call bridge init function
    deroBridgeApi.init()
      .then(() => { // When successful
        // Update the connection status
        setStatus(ConnectionStatus.Connected);
      })
      .catch((err: any) => { // When we catch an error
        // Update the connection status with the error message
        setStatus(err.message);
      })

    // We keep the bridge object in the app's state, so that other components can interact with it
    setBridge(deroBridgeApi);
  }, [])

  return (
    // Pass the bridge object to the context provider
    // The app has a title a button calling the connect callback defined earlier and a custom components defined in components/
    <DeroContext.Provider value={bridge}>
      <div className='App'>
        <h1>Dero RPC Bridge API example app</h1>
        
        <button onClick={connect}>connect</button>
        
        <div>Status:</div>
        <div><i>{status}</i></div>
        
        <GetBalanceComponent status={status}/>
        

      </div>
    </DeroContext.Provider>
  )
}

export default App

//<TransferComponent status={status}/>