import { useCallback, useContext, useState } from "react"
import { DeroContext } from "../App";
import { ConnectionStatus } from "../utils/connection-status";

// Define the props of our component
interface Props {
    status: ConnectionStatus
}

// GetBalanceComponent definition
export default (props: Props) => {
    // Balance and error message, updated when clicking the Get Balance button
    const [balance, setBalance] = useState<string | number>('unknown');
    const [errorMessage, setErrorMessage] = useState<string>();

    // Here we get the bridge object from the context
    const deroBridgeApi = useContext(DeroContext);
    
    // Callback when clicking the Get Balance button
    const getBalance = useCallback(async () => {
        // Call the GetBalance method from the wallet
        deroBridgeApi.wallet('get-balance')
            .then((response: any) => { // When successful
                // Update the balance state of the component
                setBalance(response.data.result.balance / 100000)
                // Empty the error message
                setErrorMessage("");
            })
            .catch((err: any) => { // When failed
                // Update the balance to unknown
                setBalance('unknown');
                // Update the error message
                setErrorMessage(err.message);
            })
    }, [props.status]) // Update the function when the connection status change so that the context actually provide a deroBridgeApi object

    // We render the component only if status is connected 
    if (props.status == ConnectionStatus.Connected) {
        return <div className='GetBalanceComponent'>
            <h2>GetBalance Component</h2>

            <button onClick={getBalance}>Get Wallet Balance</button>

            <div>Balance:</div>
            <div>{balance}</div>
            <div>{errorMessage}</div>
        </div>
    } else {
        return <div></div>
    }
    
}