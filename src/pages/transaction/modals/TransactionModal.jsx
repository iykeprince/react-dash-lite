import moment from "moment"
import { useSelector } from "react-redux";

const TransactionModal = ({ transaction }) => {
    console.log('transaction', transaction)
    const exchangeData = useSelector(state => state.util.exchangeData);
    const user= useSelector(state => state.auth.user)

    return (<div class="modal-body modal-body-md">
        {/* <div class="nk-modal-head mb-2 mb-sm-4">
            <h4 class="nk-modal-title title">
                Order ID #<small class="text-primary">TNX85312687</small>
            </h4>
        </div> */}
        <div class="nk-block">
            <div class="nk-block-between flex-wrap g-3">
                <div class="nk-tnx">
                    <span class="nk-tnx-icon bg-warning-dim text-warning icon ni ni-arrow-up-right"></span><span class="nk-tnx-icon text-secondary icon ni ni-wallet-fill"></span>
                    <div class="nk-tnx-text">
                        <h5 class="title">{transaction.amount} USD</h5>
                        <span class="sub-text mt-n1">{moment(transaction.transaction_created_at).format('LL')}</span>
                    </div>
                </div>
                <ul class="align-center flex-wrap gx-3">
                    <li>
                        {transaction.transaction_id && <span class="badge badge-sm badge-success">
                            Completed
                        </span>}
                        {transaction.depositor_id && <span class={`${transaction.payment_confirmation === "0" ? 'badge badge-sm badge-danger' : 'badge badge-sm badge-success'}`}>
                            {transaction.payment_confirmation === '0' ? 'Pending' : 'Completed'}
                        </span>}
                        {transaction.withdraw_id && <span class={`${transaction.confirmation === "0" ? "badge badge-sm badge-danger" : "badge badge-sm badge-success"}`}>
                            {transaction.confirmation === '0' ? "Pending" : "Completed"}
                        </span>}
                    </li>
                </ul>
            </div>

            <div class="divider md stretched"></div>
            {transaction.withdraw_id && <>
                <h5 class="overline-title">Withdraw Details</h5>
                <div class="row gy-3">
                    <div class="col-md-6">
                        <span class="sub-text">Withdraw Amount</span>
                        <span class="caption-text">{transaction.amount} USD</span>
                    </div>
                    <div class="col-md-6">
                        <span class="sub-text">Debited in Account</span>
                        <span class="caption-text">{transaction.amount} USD</span>
                    </div>
                    <div class="col-lg-6">
                        <span class="sub-text">Exchage Rate</span>
                        {exchangeData && <span class="caption-text">
                            1 {exchangeData.base} = {parseFloat(exchangeData.price).toFixed(2)} USD
                        </span>}
                    </div>
                    <div class="col-lg-6">
                        <span class="sub-text">Details</span>
                        <span class="caption-text">Withdraw via Tether Wallet</span>
                    </div>
                </div></>}
            {transaction.depositor_id && <>
                <h5 class="overline-title">Depositor Details</h5>
                <div class="row gy-3">
                    <div class="col-md-6">
                        <span class="sub-text">Deposit Amount</span>
                        <span class="caption-text">{transaction.amount} USD</span>
                    </div>
                    <div class="col-md-6">
                        <span class="sub-text">Debited in Account</span>
                        <span class="caption-text">{transaction.amount} USD</span>
                    </div>
                    <div class="col-lg-6">
                        <span class="sub-text">Exchage Rate</span>
                        {exchangeData && <span class="caption-text">
                            1 {exchangeData.base} = {parseFloat(exchangeData.price).toFixed(2)} USD
                        </span>}
                    </div>
                    <div class="col-lg-6">
                        <span class="sub-text">Details</span>
                        <span class="caption-text">Withdraw via Tether Wallet</span>
                    </div>
                </div></>}
            {transaction.transaction_id && <>
                <h5 class="overline-title">Transaction Details</h5>
                <div class="row gy-3">
                    <div class="col-md-6">
                        <span class="sub-text">Deposit Amount</span>
                        <span class="caption-text">{transaction.amount} USD</span>
                    </div>
                    <div class="col-md-6">
                        <span class="sub-text">Debited in Account</span>
                        <span class="caption-text">{transaction.amount} USD</span>
                    </div>
                    <div class="col-lg-6">
                        <span class="sub-text">Exchage Rate</span>
                        {exchangeData && <span class="caption-text">
                            1 {exchangeData.base} = {parseFloat(exchangeData.price).toFixed(2)} USD
                        </span>}
                    </div>
                    <div class="col-lg-6">
                        <span class="sub-text">Details</span>
                        <span class="caption-text">Withdraw via Tether Wallet</span>
                    </div>
                </div></>}

            <div class="divider md stretched"></div>
            <h5 class="overline-title">Additional</h5>
            <div class="row gy-3">
                <div class="col-lg-6">
                    <span class="sub-text">
                        Payment Method
                    </span>
                    <span class="caption-text">{'CRYPTO WALLET'}</span>
                </div>

                <div class="col-lg-6">
                    <span class="sub-text">
                        Account To
                    </span>
                    <span class="caption-text text-break"><span class="small">567yhgft7tg6878h9</span></span>
                </div>

                <div class="col-lg-6">
                    <span class="sub-text">Updated Balance</span>
                    <span class="caption-text">{new Intl.NumberFormat('en-US').format(user.trading_wallet)} USD</span>
                </div>


                {transaction.transaction_id && <div class="col-lg-12">
                    <span class="sub-text">Hash(#)</span>
                    <span class="caption-text text-break">{transaction.crypto_hash}</span>
                </div>}

               
            </div>
            <div class="divider md stretched"></div>
            <div class="notes">
                <ul>
                    <li class="alert-note is-plain text-primary">
                        <em class="icon ni ni-info"></em>
                        <p>The transaction has been completed at {moment(transaction.transaction_created_at).format('MMMM Do YYYY, h:mm:ss a')}.</p>
                    </li>
                </ul>
            </div>
        </div>
    </div>)
}

export default TransactionModal