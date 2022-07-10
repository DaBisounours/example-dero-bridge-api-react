import { useCallback, useContext, useState } from "react"
import { DeroContext } from "../App";
import { ConnectionStatus } from "../utils/connection-status";

// Define the props of our component
interface Props {
    status: ConnectionStatus
}

// GetBalanceComponent definition
export default (props: Props) => {

    const [recipient, setRecipient] = useState<string | null>();
    
    const [amount, setAmount] = useState<number>(0);


    const deroBridgeApi = useContext(DeroContext);

    const transfer = useCallback(async () => {
        deroBridgeApi.wallet('start-transfer', {
            scid: "00000000000000000000000000000000",
            destination: recipient,
            amount: amount,
          })
    }, [props.status, amount, recipient])

    // We render the component only if status is connected 
    if (props.status == ConnectionStatus.Connected) {
        return <div className='GetBalanceComponent'>
            <h2>Transfer Component</h2>
            <div>
                <label htmlFor='amount'>Amount</label>
                <input id='amount' type='number' placeholder="0"
                    onChange={(event) => setAmount(+event.target.value)}
                />
            </div>
            <div>
                <label htmlFor='to'>Recipient Address</label>
                <input id='to' 
                    onChange={(event) => setRecipient(event.target.value)}
                />
            </div>
            <button onClick={transfer} disabled={recipient == null}>Transfer</button>

        </div>
    } else {
        return <div></div>
    }
}