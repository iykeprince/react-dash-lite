import moment from "moment"
import { useState } from "react"
import DashModal from "../../../components/modal/modal.component"
import transaction from "../../../services/transaction.service"
import TransactionModal from "../modals/TransactionModal"
import ReactHtmlParser from 'react-html-parser';

const TransactionItem = ({ transaction, type }) => {
    const [showModal, setShowModal] = useState(false);

    const onHideModal = () => setShowModal(false)

    const handleShowModal = e => {
        e.preventDefault();
        setShowModal(true)
    }

    return (<div className="nk-odr-item ">
        <div className="nk-odr-col">
            <div className="nk-odr-info">
                <div className="nk-odr-badge">
                    {transaction.withdraw_id && <><span className="nk-odr-icon  bg-danger-dim text-danger icon ni ni-arrow-down-left"></span>
                        <span className="nk-odr-icon text-secondary icon ni ni-wallet-fill"></span></>}
                    {transaction.depositor_id && <><span className="nk-odr-icon bg-success-dim text-success icon ni ni-arrow-up-right"></span>
                        <span className="nk-odr-icon text-secondary icon ni ni-wallet-fill"></span></>}
                    {transaction.transaction_id && <>
                        <span className={`nk-odr-icon ${transaction.transaction_type === 'DEPOSIT' ? 'bg-success-dim text-success icon ni ni-arrow-up-right' : ' bg-danger-dim text-danger icon ni ni-arrow-down-left'} `}></span>
                        <span className="nk-odr-icon text-secondary icon ni ni-wallet-fill"></span>
                        </>
                        }

                </div>

                {type === 'all' ? <>
                    {transaction.transaction_type === "DEPOSIT" && <div className="nk-odr-data">
                        <div className="nk-odr-label ellipsis">Deposit via Crypto Wallet</div>
                        <div className="nk-odr-meta">
                            <span className="date">{moment(transaction.transaction_created_at).format('LL')}</span>
                            <span className="status dot-join">
                                Completed
                    </span>
                        </div>
                    </div>}
                    {transaction.transaction_type === "INVEST" && <div className="nk-odr-data">
                        <div className="nk-odr-label ellipsis">Invested on {transaction.plan_name}</div>
                        <div className="nk-odr-meta">
                            <span className="date">{moment(transaction.transaction_created_at).format('LL')}</span>
                            <span className="status dot-join">
                                Completed
                            </span>
                        </div>
                    </div>}
                    {transaction.transaction_type === 'REFERAL_BONUS' && <div className="nk-odr-data">
                        <div className="nk-odr-label ellipsis">Bonus for First Deposit</div>
                        <div className="nk-odr-meta">
                            <span className="date">{moment(transaction.transaction_created_at).format('LL')}</span>
                            <span className="status dot-join">
                                Completed
                            </span>
                        </div>
                    </div>}
                    {transaction.transaction_type === 'WITHDRAW_FUND' && <div className="nk-odr-data">
                        <div className="nk-odr-label ellipsis">Withdrawal</div>
                        <div className="nk-odr-meta">
                            <span className="date">{moment(transaction.transaction_created_at).format('LL')}</span>
                            <span className="status dot-join">
                                Completed
                            </span>
                        </div>
                    </div>}
                </> : type === 'pending' ? <div className="nk-odr-data">
                    <div className="nk-odr-label ellipsis">{transaction.withdraw_id ? 'Pending Withdraw' : 'Pending Deposit'} via Crypto Wallet</div>
                    <div className="nk-odr-meta">
                        <span className="date">{moment(transaction.created_at).format('LL')}</span>
                        <span className="status dot-join">
                            Pending
                    </span>
                    </div>
                </div> : <div className="nk-odr-data">
                    <div className="nk-odr-label ellipsis">{type.toUpperCase()} via Crypto Wallet</div>
                    <div className="nk-odr-meta">
                        <span className="date">{moment(transaction.created_at).format('LL')}</span>
                        <span className="status dot-join">
                            Completed
                    </span>
                    </div>
                </div>
                }
            </div>
        </div>
        <div className="nk-odr-col nk-odr-col-amount">
            <div className="nk-odr-amount">

                {type === 'all' ?
                    <div className="number-md text-s text-danger">
                        {transaction.transaction_type === "DEPOSIT" && `- ${transaction.amount}`}
                        {transaction.transaction_type === 'INVEST' && `- ${transaction.amount}`}
                        {transaction.transaction_type === 'WITHDRAW_FUND' && `+ ${transaction.amount}`}
                        {transaction.transaction_type === 'REFERAL_BONUS' && `+ ${transaction.amount}`}
                        <span className="currency">{' '}USD</span>
                    </div>
                    : <div className={`number-md text-s ${transaction.withdraw_id ? 'text-danger' : 'text-success'}`}>
                        {transaction.withdraw_id ? `+ ${transaction.amount}` : `- ${transaction.amount}`}
                        <span className="currency">{' '}USD</span>
                    </div>
                }
                <div className="number-sm">{transaction.crypto_value} <span className="currency">{transaction.crypto_currency.toUpperCase()}</span></div>
            </div>
        </div>
        <div className="nk-odr-col nk-odr-col-action">
            <div className="nk-odr-action">
                <a onClick={handleShowModal} className="tnx-details" href="#" data-tnx="UStDYUdmMW5yUThHZ3Z1MmhUT1ZZUT09"><em className="icon ni ni-forward-ios"></em></a>
            </div>
        </div>
        <DashModal show={showModal} onHide={onHideModal} title={ReactHtmlParser(`Order ID #<small class="text-primary">TNX85312687</small>`)}>
            <TransactionModal transaction={transaction} />
        </DashModal>
    </div>)
}

export default TransactionItem