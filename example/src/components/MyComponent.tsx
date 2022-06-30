import { useCallback, useContext, useState } from "react"
import { ConnectionStatus, DeroContext } from "../App";

interface Props {
    status: ConnectionStatus
}

export default (props: Props) => {
    const [balance, setBalance] = useState<string | number>('unknown');
    const [errorMessage, setErrorMessage] = useState<string>();

    const deroBridgeApi = useContext(DeroContext);
    
    const getBalance = useCallback(async () => {
        const api = deroBridgeApi;
        api.wallet('get-balance')
            .then((response: any) => {
                console.log(response)
                setBalance(response.data.result.balance / 100000)
                setErrorMessage("");
            })
            .catch((err: any) => {
                console.log(err);
                setErrorMessage("Failed");
            })
    }, [props.status])

    if (props.status == ConnectionStatus.Connected) {
        return <div className='MyComponent'>
            <h2>Inner compoent</h2>
            <button onClick={getBalance}>Get Wallet Balance</button>
            <div>Balance:</div>
            <div>{balance}</div>
            <div>{errorMessage}</div>
        </div>
    } else {
        return <div></div>
    }
    
}