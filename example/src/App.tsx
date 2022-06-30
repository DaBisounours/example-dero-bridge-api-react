import { useCallback, useState } from 'react'
import logo from './logo.svg'
import './App.css'

// @ts-ignore
import DeroBridgeApi from 'dero-rpc-bridge-api'
import React from 'react';
import MyComponent from './components/MyComponent';


export enum ConnectionStatus {
  NotConnected = "not connected",
  Connected = "connected to the bridge!",
  Connecting = "connecting...",
  Failed = 'connection failed !'
}

export const DeroContext = React.createContext<DeroBridgeApi>(null);

function App() {
  const [bridge, setBridge] = useState<DeroBridgeApi>()
  const [status, setStatus] = useState<ConnectionStatus>(ConnectionStatus.NotConnected)

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
    <DeroContext.Provider value={bridge}>
      <div className='App'>
      <h1>Dero RPC Bridge API example app</h1>
        <button onClick={connect}>connect</button>
        <div>Status:</div>
        <div><i>{status}</i></div>
        <MyComponent status={status}/>
      </div>
    </DeroContext.Provider>
  )
}

export default App
