import { useEffect } from "react"
import { useSelector } from "react-redux"
import { getTransactions } from "../../redux/transaction/transaction.actions"

const TransactionPage = () => {
    const transactions = useSelector(state => state.transaction.transactions);
    
    useEffect(() => {
        getTransactions()
    }, [])
    return (
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
                        <ul className="nk-nav nav nav-tabs">
                            <li className="nav-item">
                                <a className="nav-link active" href="https://investorm.xyz/transactions">All</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="https://investorm.xyz/transactions?type=deposit">Deposit</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="https://investorm.xyz/transactions?type=withdraw">Withdraw</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="https://investorm.xyz/transactions?view=scheduled">
                                    Scheduled <span className="badge badge-primary">3</span>
                                </a>
                            </li>
                        </ul>
                        <div className="nk-block nk-block-xs">
                            <div className="nk-block-head nk-block-head-sm">
                                <div className="nk-block-between">
                                    <div className="nk-block-head-content">
                                        <h6 className="nk-block-title">All Transaction</h6>
                                    </div>
                                    <ul className="nk-block-tools gx-2">
                                        <li>
                                            <a href="#" className="search-toggle toggle-search btn btn-icon btn-trigger" data-target="search"><em className="icon ni ni-search"></em></a>
                                        </li>
                                        <li>
                                            <div className="dropdown">
                                                <a href="#" className="btn btn-trigger btn-icon dropdown-toggle" data-toggle="dropdown">
                                                    <div className="dot dot-primary"></div>
                                                    <em className="icon ni ni-filter-alt"></em>
                                                </a>

                                                <div className="filter-wg dropdown-menu dropdown-menu-lg dropdown-menu-right">
                                                    <div className="dropdown-head">
                                                        <span className="sub-title dropdown-title">Filter Transaction</span>
                                                    </div>
                                                    <form action="https://investorm.xyz/transactions" method="GET">
                                                        {/* <input type="hidden" name="filter" value="true" /> */}
                                                        <div className="dropdown-body dropdown-body-rg">
                                                            <div className="row gx-6 gy-3">
                                                                <div className="col-6">
                                                                    <div className="form-group">
                                                                        <label className="overline-title overline-title-alt">Type</label>
                                                                        <select name="type" className="form-select form-select-sm select2-hidden-accessible" data-select2-id="1" tabIndex="-1" aria-hidden="true">
                                                                            <option value="any" data-select2-id="3">Any Type</option>
                                                                            <option value="bonus">Bonus</option>
                                                                            <option value="charge">Charge</option>
                                                                            <option value="deposit">Deposit</option>
                                                                            <option value="withdraw">Withdraw</option>
                                                                            <option value="investment">Investment</option>
                                                                            <option value="referral">Referral</option>
                                                                        </select>
                                                                        <span className="select2 select2-container select2-container--default" dir="ltr" data-select2-id="2" style={{width: 'auto'}}>
                                                                            <span className="selection">
                                                                                <span className="select2-selection select2-selection--single" role="combobox" aria-haspopup="true" aria-expanded="false" tabIndex="0" aria-disabled="false" aria-labelledby="select2-type-3v-container">
                                                                                    <span className="select2-selection__rendered" id="select2-type-3v-container" role="textbox" aria-readonly="true" title="Any Type">Any Type</span>
                                                                                    <span className="select2-selection__arrow" role="presentation"><b role="presentation"></b></span>
                                                                                </span>
                                                                            </span>
                                                                            <span className="dropdown-wrapper" aria-hidden="true"></span>
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                                <div className="col-6">
                                                                    <div className="form-group">
                                                                        <label className="overline-title overline-title-alt">Status</label>
                                                                        <select name="status" className="form-select form-select-sm select2-hidden-accessible" data-select2-id="4" tabIndex="-1" aria-hidden="true">
                                                                            <option value="any" data-select2-id="6">Any Status</option>
                                                                            <option value="cancelled">Cancelled</option>
                                                                            <option value="failed">Failed</option>
                                                                            <option value="completed">Completed</option>
                                                                        </select>
                                                                        <span className="select2 select2-container select2-container--default" dir="ltr" data-select2-id="5" style={{width: 'auto'}}>
                                                                            <span className="selection">
                                                                                <span className="select2-selection select2-selection--single" role="combobox" aria-haspopup="true" aria-expanded="false" tabIndex="0" aria-disabled="false" aria-labelledby="select2-status-18-container">
                                                                                    <span className="select2-selection__rendered" id="select2-status-18-container" role="textbox" aria-readonly="true" title="Any Status">Any Status</span>
                                                                                    <span className="select2-selection__arrow" role="presentation"><b role="presentation"></b></span>
                                                                                </span>
                                                                            </span>
                                                                            <span className="dropdown-wrapper" aria-hidden="true"></span>
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                                <div className="col-6">
                                                                    <div className="form-group">
                                                                        <label className="overline-title overline-title-alt">From</label>
                                                                        <input className="form-control date-picker" name="date[from]" type="text" value="" readOnly />
                                                                    </div>
                                                                </div>

                                                                <div className="col-6">
                                                                    <div className="form-group">
                                                                        <label className="overline-title overline-title-alt">To</label>
                                                                        <input className="form-control date-picker" name="date[to]" type="text" value=""  readOnly/>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="dropdown-foot between">
                                                            <button type="submit" className="btn btn-secondary">Filter</button>
                                                            <a href="#" className="clickable">Reset Filter</a>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                                <form >
                                    <div className="search-wrap search-wrap-extend bg-lighter" data-search="search">
                                        <div className="search-content">
                                            <a href="#" className="search-back btn btn-icon toggle-search" data-target="search"><em className="icon ni ni-arrow-left"></em></a>
                                            <input type="text" name="query" className="form-control border-transparent form-focus-none" placeholder="Search by transaction id" readOnly />
                                            <button className="search-submit btn btn-icon mr-1"><em className="icon ni ni-search"></em></button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="nk-odr-list is-stretch card card-bordered ">
                                <div className="nk-odr-item ">
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
                                                + 4,000.000
                                                    <span className="currency">USD</span>
                                            </div>
                                            <div className="number-sm">4,000.00000000 <span className="currency">USDC</span></div>
                                        </div>
                                    </div>
                                    <div className="nk-odr-col nk-odr-col-action">
                                        <div className="nk-odr-action">
                                            <a className="tnx-details" href="#" data-tnx="UStDYUdmMW5yUThHZ3Z1MmhUT1ZZUT09"><em className="icon ni ni-forward-ios"></em></a>
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
                                </div>
                            </div>
                            <div className="mt-4">

                            </div>
                        </div>
                    </div>
                </div>
            </div>)
}

export default TransactionPage