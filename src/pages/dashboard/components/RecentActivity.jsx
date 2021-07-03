import moment from "moment";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../../../components/spinner/spinner.component";
import { getTransactions } from "../../../redux/transaction/transaction.actions";

const RecentActivity = () => {
    const dispatch = useDispatch();
    const transactions = useSelector(state => state.transaction.transactions);

    useEffect(() => {
        dispatch(getTransactions())
    }, [])

    if(!transactions.length){
        return <Spinner />
    }

    const firstFiveTransaction = transactions.slice(0, 5);
    console.log(firstFiveTransaction)

    return (
    <>
        <div className="card-head">
            <div className="card-title  mb-0">
                <h5 className="title">Recent Activities</h5>
            </div>
            <div className="card-tools">
                <ul className="card-tools-nav">

                    <li className="active"><a href="#">All</a></li>
                </ul>
            </div>
        </div>
        <div className="tranx-list card card-bordered">
            {firstFiveTransaction.map((transaction, index) => <div key={index} className="tranx-item">
                <div className="tranx-col">
                    <div className="tranx-info">
                        <div className="tranx-data">
                            <div className="tranx-label">{transaction.transaction_type} <em className="tranx-icon sm icon ni ni-sign-btc"></em></div>
                            <div className="tranx-date">{moment(transaction.transaction_created_at).format('ll')}</div>
                        </div>
                    </div>
                </div>
                <div className="tranx-col">
                    <div className="tranx-amount">
                        <div className="number">{transaction.crypto_value} <span className="currency currency-btc">{transaction.crypto_currency}</span></div>
                        <div className="number-sm">{transaction.amount} <span className="currency currency-usd">USD</span></div>
                    </div>
                </div>
            </div>)}
            {/* <div className="tranx-item">
                <div className="tranx-col">
                    <div className="tranx-info">
                        <div className="tranx-data">
                            <div className="tranx-label">Buy Ehtereum <span className="tranx-icon sm"><img src="./images/coins/eth.svg" alt="" /></span></div>
                            <div className="tranx-date">Nov 12, 2019 11:34 PM</div>
                        </div>
                    </div>
                </div>
                <div className="tranx-col">
                    <div className="tranx-amount">
                        <div className="number">1.538405 <span className="currency currency-btc">ETH</span></div>
                        <div className="number-sm">1,176.34 <span className="currency currency-usd">USD</span></div>
                    </div>
                </div>
            </div>
            <div className="tranx-item">
                <div className="tranx-col">
                    <div className="tranx-info">
                        <div className="tranx-data">
                            <div className="tranx-label">Buy Bitcoin <em className="tranx-icon sm icon ni ni-sign-btc"></em></div>
                            <div className="tranx-date">Nov 12, 2019 11:34 PM</div>
                        </div>
                    </div>
                </div>
                <div className="tranx-col">
                    <div className="tranx-amount">
                        <div className="number">0.5384 <span className="currency currency-btc">BTC</span></div>
                        <div className="number-sm">3,980.93 <span className="currency currency-usd">USD</span></div>
                    </div>
                </div>
            </div>
            <div className="tranx-item">
                <div className="tranx-col">
                    <div className="tranx-info">
                        <div className="tranx-data">
                            <div className="tranx-label">Buy Ehtereum <span className="tranx-icon sm"><img src="./images/coins/eth.svg" alt="" /></span></div>
                            <div className="tranx-date">Nov 12, 2019 11:34 PM</div>
                        </div>
                    </div>
                </div>
                <div className="tranx-col">
                    <div className="tranx-amount">
                        <div className="number">1.538405 <span className="currency currency-btc">ETH</span></div>
                        <div className="number-sm">1,176.34 <span className="currency currency-usd">USD</span></div>
                    </div>
                </div>
            </div> */}
        </div>
    </>
);
}

export default RecentActivity