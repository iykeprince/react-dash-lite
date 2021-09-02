import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import { getAllUsers, reset, updateTopup } from '../../../redux/admin/admin.action';

const AdminTopUpModal = ({ selectedUser, onHideModal }) => {
    const dispatch = useDispatch();
    const topUp = useSelector(state => state.admin.topUp);
    const loading = useSelector(state => state.admin.loading);
    
    const [topup, setTopup] = useState({
        userId: selectedUser.id,
        investment: 0,
        profit: 0,
        tradeBonus: 0,
        referalBonus: 0
    })

    useEffect(() => {
        if(topUp?.message){
            console.log(topUp.message)
            toast.info(topUp.message);
            onHideModal();
        }
        return () => {
            dispatch(reset());
            dispatch(getAllUsers())
        }
    }, [topUp?.message]);

    const handleSubmit = e => {
        e.preventDefault();

        topup.investment = parseFloat(topup.investment);
        topup.profit = parseFloat(topup.profit);
        topup.tradeBonus = parseFloat(topup.tradeBonus);
        topup.referalBonus = parseFloat(topup.referalBonus);
        
        dispatch(updateTopup(topup));
        
    }

    return (
        <>
        <div className="modal-body modal-body-lg">
            <h5 className="title">Top Up Account</h5>

            <div className="tab-content">
                <div className="tab-pane active" id="personal">
                    <form onSubmit={handleSubmit}>
                        <div className="row gy-4">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label className="form-label" htmlFor="full-name">Full Name</label>
                                    <input type="text" className="form-control form-control-lg" id="full-name" value={selectedUser.fullname} readOnly />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label className="form-label" htmlFor="display-name">Investment</label> - <small>{selectedUser.amount_in_stock}</small>
                                    <input 
                                        type="text" 
                                        className="form-control form-control-lg" 
                                        placeholder="Enter Amount" 
                                        onChange={e => setTopup({...topup, investment: e.target.value})} 
                                        value={topup.investment} 
                                    />
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="form-group">
                                    <label className="form-label" htmlFor="phone-no">Profit</label> - <small>{selectedUser.available_profit}</small>
                                    <input 
                                        type="text" 
                                        className="form-control form-control-lg" 
                                        placeholder="Enter Amount" 
                                        onChange={e => setTopup({...topup, profit: e.target.value})} 
                                        value={topup.profit} 
                                    />
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="form-group">
                                    <label className="form-label" htmlFor="phone-no">Trade Bonus</label> - <small>{selectedUser.trade_bonus}</small>
                                    <input 
                                        type="text" 
                                        className="form-control form-control-lg" 
                                        placeholder="Enter Amount" 
                                        onChange={e => setTopup({...topup, tradeBonus: e.target.value})} 
                                        value={topup.tradeBonus} 
                                    />
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="form-group">
                                    <label className="form-label" htmlFor="birth-day">Referral Bonus</label> - <small>{selectedUser.referal_bonus}</small>
                                    <input 
                                        type="text" 
                                        className="form-control form-control-lg" 
                                        placeholder="Enter Amount" 
                                        onChange={e => setTopup({...topup, referalBonus: e.target.value})} 
                                        value={topup.referalBonus}     
                                    />
                                </div>
                            </div>

                            <div className="col-12">
                                <ul className="align-center flex-wrap flex-sm-nowrap gx-4 gy-2">
                                    <li>
                                        <button disabled={loading} type="submit" className="btn btn-lg btn-primary">{loading ? 'Please wait...' : 'Update Account'}</button>
                                    </li>
                                    <li>
                                        <a href="#" onClick={e => {e.preventDefault(); onHideModal(); }} className="link link-light">Cancel</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </form>
                </div>

            </div>
        </div>
        <ToastContainer />
        </>
    )
}

export default AdminTopUpModal