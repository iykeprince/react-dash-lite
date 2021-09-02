import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../../../components/spinner/spinner.component";
import { getDeposits, getPendingTransactions, getTransactions, getWithdraws } from "../../../redux/transaction/transaction.actions";
import transaction from "../../../services/transaction.service";
import TransactionItem from "./TransactionItem";

const TransactionList = () => {
    const selected = useSelector(state => state.transaction.selectedTab)
    const dispatch = useDispatch();
    const transactions = useSelector(state => state.transaction.transactions);
    const loading = useSelector(state => state.transaction.loading)
    const [type, setType] = useState("all")
    // const deposits = useSelector(state => state.transaction.deposits);
    // const withdraws = useSelector(state => state.transaction.withdraws);
    // const pendings = useSelector(state => state.transaction.pendings);

    useEffect(() => {

        switch (selected) {
            case 0:
                dispatch(getTransactions())
                setType('all')
                break;
            case 1:
                dispatch(getDeposits());
                setType('deposit')
                break;
            case 2:
                dispatch(getWithdraws());
                setType('withdraw')
                break;
            case 3:
                dispatch(getPendingTransactions());
                setType('pending')
                break;
            default:
                dispatch(getTransactions())
        }
    }, [selected])


    useEffect(() => {
    }, [type])

    return (<div className="nk-odr-list is-stretch card card-bordered ">
        {loading && <Spinner />}
        {(transactions && !transactions.length) && <div className="card p-4">
                <div className="nk-card-body">
                <p className="nk-card-title">No transaction available yet!</p>
                </div>
            </div>}
        {transactions && transactions.map((transaction, index) =>
            <TransactionItem
                key={index} 
                type={type}
                transaction={transaction}
            />)
        }
        
        {/* <div className="nk-odr-item ">
            <div className="nk-odr-col">
                <div className="nk-odr-info">
                    <div className="nk-odr-badge">
                        <span className="nk-odr-icon bg-success-dim text-success icon ni ni-arrow-down-left"></span><span className="nk-odr-icon text-secondary icon ni ni-wallet-fill"></span>
                    </div>
                    <div className="nk-odr-data">
                        <div className="nk-odr-label ellipsis">Deposit via Crypto Wallet</div>
                        <div className="nk-odr-meta">
                            <span className="date">Jun 15, 2021</span>
                            <span className="status dot-join">
                                Completed
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="nk-odr-col nk-odr-col-amount">
                <div className="nk-odr-amount">
                    <div className="number-md text-s text-success">
                        + 4,366.987
                        <span className="currency">USD</span>
                    </div>
                    <div className="number-sm">0.10900000 <span className="currency">BTC</span></div>
                </div>
            </div>
            <div className="nk-odr-col nk-odr-col-action">
                <div className="nk-odr-action">
                    <a className="tnx-details" href="#" data-tnx="cFkxYUFNdnVNVlgrZEs4d09YU0FPZz09"><em className="icon ni ni-forward-ios"></em></a>
                </div>
            </div>
        </div>
        <div className="nk-odr-item ">
            <div className="nk-odr-col">
                <div className="nk-odr-info">
                    <div className="nk-odr-badge">
                        <span className="nk-odr-icon bg-purple-dim text-purple icon ni ni-exchange"></span>
                    </div>
                    <div className="nk-odr-data">
                        <div className="nk-odr-label ellipsis">Invest on Premium Plan</div>
                        <div className="nk-odr-meta">
                            <span className="date">Jun 15, 2021</span>
                            <span className="status dot-join">
                                Completed
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="nk-odr-col nk-odr-col-amount">
                <div className="nk-odr-amount">
                    <div className="number-md text-s text-danger">
                        - 600.000
                        <span className="currency">USD</span>
                    </div>
                    <div className="number-sm">600.000 <span className="currency">USD</span></div>
                </div>
            </div>
            <div className="nk-odr-col nk-odr-col-action">
                <div className="nk-odr-action">
                    <a className="tnx-details" href="#" data-tnx="Y2pYdm0rOWhxU0M2cUFyNlZLaTQ5Zz09"><em className="icon ni ni-forward-ios"></em></a>
                </div>
            </div>
        </div>
        <div className="nk-odr-item ">
            <div className="nk-odr-col">
                <div className="nk-odr-info">
                    <div className="nk-odr-badge">
                        <span className="nk-odr-icon bg-purple-dim text-purple icon ni ni-exchange"></span>
                    </div>
                    <div className="nk-odr-data">
                        <div className="nk-odr-label ellipsis">Invest on Venus</div>
                        <div className="nk-odr-meta">
                            <span className="date">Jun 15, 2021</span>
                            <span className="status dot-join">
                                Completed
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="nk-odr-col nk-odr-col-amount">
                <div className="nk-odr-amount">
                    <div className="number-md text-s text-danger">
                        - 250.000
                        <span className="currency">USD</span>
                    </div>
                    <div className="number-sm">250.000 <span className="currency">USD</span></div>
                </div>
            </div>
            <div className="nk-odr-col nk-odr-col-action">
                <div className="nk-odr-action">
                    <a className="tnx-details" href="#" data-tnx="SFpUeXROeW8rbk8vMlV5cm1wakpCZz09"><em className="icon ni ni-forward-ios"></em></a>
                </div>
            </div>
        </div>
        <div className="nk-odr-item ">
            <div className="nk-odr-col">
                <div className="nk-odr-info">
                    <div className="nk-odr-badge">
                        <span className="nk-odr-icon bg-success-dim text-success icon ni ni-arrow-down-left"></span><span className="nk-odr-icon text-secondary icon ni ni-wallet-fill"></span>
                    </div>
                    <div className="nk-odr-data">
                        <div className="nk-odr-label ellipsis">Deposit via Crypto Wallet</div>
                        <div className="nk-odr-meta">
                            <span className="date">Jun 09, 2021</span>
                            <span className="status dot-join">
                                Completed
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="nk-odr-col nk-odr-col-amount">
                <div className="nk-odr-amount">
                    <div className="number-md text-s text-success">
                        + 4,000.000
                        <span className="currency">USD</span>
                    </div>
                    <div className="number-sm">4,000.00000000 <span className="currency">USDC</span></div>
                </div>
            </div>
            <div className="nk-odr-col nk-odr-col-action">
                <div className="nk-odr-action">
                    <a className="tnx-details" href="#" data-tnx="cS9SQVA4SEE5ZE9uajVGWDZpZEY4dz09"><em className="icon ni ni-forward-ios"></em></a>
                </div>
            </div>
        </div>
        <div className="nk-odr-item ">
            <div className="nk-odr-col">
                <div className="nk-odr-info">
                    <div className="nk-odr-badge">
                        <span className="nk-odr-icon bg-success-dim text-success icon ni ni-arrow-to-right"></span>
                    </div>
                    <div className="nk-odr-data">
                        <div className="nk-odr-label ellipsis">Bonus for First Deposit</div>
                        <div className="nk-odr-meta">
                            <span className="date">Jun 10, 2021</span>
                            <span className="status dot-join">
                                Completed
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="nk-odr-col nk-odr-col-amount">
                <div className="nk-odr-amount">
                    <div className="number-md text-s text-success">
                        + 400.000
                        <span className="currency">USD</span>
                    </div>
                    <div className="number-sm">400.000 <span className="currency">USD</span></div>
                </div>
            </div>
            <div className="nk-odr-col nk-odr-col-action">
                <div className="nk-odr-action">
                    <a className="tnx-details" href="#" data-tnx="a3lQUmdFYzZpOG1FQitleHc0akdldz09"><em className="icon ni ni-forward-ios"></em></a>
                </div>
            </div>
        </div>
        <div className="nk-odr-item ">
            <div className="nk-odr-col">
                <div className="nk-odr-info">
                    <div className="nk-odr-badge">
                        <span className="nk-odr-icon bg-success-dim text-success icon ni ni-arrow-to-right"></span>
                    </div>
                    <div className="nk-odr-data">
                        <div className="nk-odr-label ellipsis">Signup Bonus</div>
                        <div className="nk-odr-meta">
                            <span className="date">Jun 09, 2021</span>
                            <span className="status dot-join">
                                Completed
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="nk-odr-col nk-odr-col-amount">
                <div className="nk-odr-amount">
                    <div className="number-md text-s text-success">
                        + 500.000
                        <span className="currency">USD</span>
                    </div>
                    <div className="number-sm">500.000 <span className="currency">USD</span></div>
                </div>
            </div>
            <div className="nk-odr-col nk-odr-col-action">
                <div className="nk-odr-action">
                    <a className="tnx-details" href="#" data-tnx="ZkNVaVAzV2htK042cDYvZnJ2UjQzUT09"><em className="icon ni ni-forward-ios"></em></a>
                </div>
            </div>
        </div> */}
    </div>)
}

export default TransactionList