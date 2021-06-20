import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify';
import { createWithdrawAccount } from '../../../redux/withdraw/withdraw.actions';

const CURRENCY_LIST = ["BTC", "ETH", "USDT"]
const AddWithdrawAccountModal = () => {
    const loading = useSelector(state => state.withdraw.loading);
    const dispatch = useDispatch();
    const [accountData, setAccountData] = useState({ walletAddress: '', walletLabel: '', walletName: '' })

    const handleChange = e => setAccountData({ ...accountData, [e.target.name]: e.target.value });



    const handleSubmit = e => {
        e.preventDefault();
        dispatch(createWithdrawAccount(accountData))
    }

    return (<div>
        <p>Add your personal wallet to withdraw your funds.</p>
        <div className="divider sm stretched"></div>
        <form className="form" onSubmit={handleSubmit}>
            <div className="row gy-4">
                <div className="col-12">
                    <div className="row gx-2">
                        <div className="col-4">
                            <div className="form-group">
                                <label 
                                    className="form-label" 
                                    htmlFor="currency">Wallet Name
                                </label>
                                <div className="form-control-wrap">
                                    <select
                                        onChange={handleChange}
                                        name="walletName" 
                                        value={accountData.walletName}
                                        className="form-control"
                                        id="wdm-wallet-type"
                                        data-ui="lg"
                                        data-select2-id="wdm-wallet-type"
                                        tabIndex="-1"
                                        aria-hidden="true">
                                        {CURRENCY_LIST.map((item, index) => <option key={index} value={item}>{item}</option>)}
                                    </select>
                                    
                                </div>
                            </div>
                        </div>
                        <div className="col-8">
                            <div className="form-group">
                                <label className="form-label" htmlFor="account-label">Wallet Address <span className="text-danger">*</span></label>
                                <div className="form-control-wrap">
                                    <input onChange={handleChange} type="text" name="walletAddress" value={accountData.walletAddress} className="form-control form-control-lg" id="account-label" />
                                </div>
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="form-note mt-2">You will receive payment on this account in selected currency.</div>
                        </div>
                    </div>
                </div>
                <div className="col-12">
                    <div className="form-group">
                        <label className="form-label" htmlFor="account-label">Label of account <span>(Optional)</span></label>
                        <div className="form-control-wrap">
                            <input type="text" name="walletLabel" onChange={handleChange} value={accountData.label} className="form-control form-control-lg" id="account-label" placeholder="eg. Personal" />
                        </div>
                        <div className="form-note">
                            You can easily identify using this. The label will auto genarate if you leave blank.<br />
                        </div>
                    </div>
                </div>
                <div className="col-12">

                    <ul className="align-center flex-wrap flex-sm-nowrap gx-4 gy-2">
                        <li>
                            <button type="submit" className="btn btn-primary" id="save-user-wd-account" >
                                <span className={`spinner-border spinner-border-sm ${!loading ? 'hide' : ''}`} role="status" aria-hidden="true"></span>
                                <span>Add Account</span>
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </form>
        <div className="divider md stretched"></div>
        <p className="small text-info mb-1">Please ensure that you have provide correct address and you have access of that.</p>
        <p className="small text-danger">Caution: You will lose your funds if your wallet address is wrong or you don't have access.</p>
    </div>
    )
}

export default AddWithdrawAccountModal