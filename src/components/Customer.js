import { useContext } from "react"
import CustomerContext from "../context/CustomerContext"
import { computeRewards, filterNthLastMonthTrans } from "../utils";

function Customer() {
    const { customerdata, deleteTransaction } = useContext(CustomerContext);
    return (
        <div className='table-responsive'>
            <table className="table  table-hover table-bordered table-striped align-middle border-primary">
                <caption>List of customers</caption>
                <thead className="table-dark">
                    <tr>
                        <th scope="col">S no.</th>
                        <th scope="col">Customer Name</th>
                        <th scope="col">1st Last</th>
                        <th scope="col">2nd Last</th>
                        <th scope="col">3rd Last</th>
                        <th scope="col">Total Rewards</th>
                        <th scope="col">Transactions</th>
                    </tr>
                </thead>
                <tbody>
                    {customerdata.map((customerd) => {
                        const last = computeRewards(filterNthLastMonthTrans(customerd.purchase, 1)),
                            secondLast = computeRewards(filterNthLastMonthTrans(customerd.purchase, 2)),
                            thirdLast = computeRewards(filterNthLastMonthTrans(customerd.purchase, 3));
                        return (
                            <tr key={customerd.id}>
                                <th scope="row">{customerd.id}</th>
                                <td><strong>{customerd.name.toUpperCase()}</strong></td>
                                <td className="text-primary"><strong>{last}</strong> (Points)</td>
                                <td className="text-primary"><strong>{secondLast}</strong> (Points)</td>
                                <td className="text-primary"><strong>{thirdLast}</strong> (Points)</td>
                                <td className="text-success"><strong>{last + secondLast + thirdLast}</strong> (Points)</td>
                                <td>
                                    <details>
                                        <summary>Transactions <span className="badge rounded-pill bg-warning">{customerd.purchase.length}</span></summary>
                                        <ul type="square" className="transactionList">
                                            {customerd.purchase.map((transaction) => (
                                                <li key={transaction.id} onClick={() => deleteTransaction(transaction.id, transaction.customerId)}>
                                                    price:{transaction.purchased}, rewards:{transaction.rewards}
                                                </li>
                                            ))}
                                        </ul>
                                    </details>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default Customer