
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import Layout from "../../components/layout/layout/layout.component";
import { getDeposits, getPendingTransactions, getTransactions, getWithdraws, selectedTab } from "../../redux/transaction/transaction.actions"
import TransactionFilter from "./components/TransactionFilter";
import TransactionList from "./components/TransactionList";
import TransactionTab from "./components/TransactionTab";

const TransactionPage = () => {
    const selected = useSelector(state => state.transaction.selectedTab)
    const [title, setTitle] = useState();

    useEffect(() => {
        switch(selected){
            case 0:
                setTitle('All Transaction')
                break;
            case 1: 
                setTitle('Deposits')
                break;
            case 2:
                setTitle('Withdraw')
                break;
            case 3:
                setTitle('Pending Transaction')
                break;
            default:
                setTitle('')
        }
    }, [selected]);


    return (<Layout>
            <div className="nk-content nk-content-fluid">
                <div className="container-xl wide-lg">
                    <div className="nk-content-body">
                        <div className="nk-block-head">
                            <div className="nk-block-head-sub"><span>History</span></div>
                            <div className="nk-block-between-sm g-4">
                                <div className="nk-block-head-content">
                                    <h2 className="nk-block-title fw-normal">Transactions</h2>
                                    <div className="nk-block-des">
                                        <p>List of transactions in your account.</p>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <TransactionTab  />
                        <div className="nk-block nk-block-xs">
                            <div className="nk-block-head nk-block-head-sm">
                                <div className="nk-block-between">
                                    <div className="nk-block-head-content">
                                        <h6 className="nk-block-title">{title}</h6>
                                    </div>
                                    <TransactionFilter />
                                </div>
                                {/* <form >
                                    <div className="search-wrap search-wrap-extend bg-lighter" data-search="search">
                                        <div className="search-content">
                                            <a href="#" className="search-back btn btn-icon toggle-search" data-target="search"><em className="icon ni ni-arrow-left"></em></a>
                                            <input type="text" name="query" className="form-control border-transparent form-focus-none" placeholder="Search by transaction id" readOnly />
                                            <button className="search-submit btn btn-icon mr-1"><em className="icon ni ni-search"></em></button>
                                        </div>
                                    </div>
                                </form> */}
                            </div>
                             <TransactionList />
                            <div className="mt-4">

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </Layout>)
}

export default TransactionPage