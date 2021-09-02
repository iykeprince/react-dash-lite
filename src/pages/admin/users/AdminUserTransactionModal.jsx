import moment from 'moment';
import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserTransactions } from '../../../redux/admin/admin.action';
import transaction from '../../../services/transaction.service';

const AdminUserTransactionModal = ({
    showModal,
    onHideModal,
    selectedUserId
}) => {
    const dispatch = useDispatch();
    const transactions = useSelector(state => state.admin.userTransactions);

    useEffect(() => {
        dispatch(getUserTransactions(selectedUserId))
    }, []);


    return (
        <div className="modal-body">
            <div className="nk-block nk-block-lg">
                <div className="nk-block-head">
                    <h5 className="nk-block-title">Transactions</h5>
                </div>
                <div className="card card-bordered">
                    <table className="table table-iv-tnx">
                        <thead className="thead-light">
                            <tr>
                                <th className="tb-col-type"><span className="overline-title">Type</span></th>
                                <th className="tb-col-date"><span className="overline-title">Date</span></th>
                                <th className="tb-col-time tb-col-end"><span className="overline-title">Amount</span></th>
                            </tr>
                        </thead>
                        <tbody>
                            
                            {transactions.length && transactions.map((transaction, i) => (<tr key={i}>
                                <td className="tb-col-type"><span className="sub-text">{transaction.transaction_type}</span></td>
                                <td className="tb-col-date"><span className="sub-text">{moment(transaction.transaction_created_at).format('DD MMM, YYYY')}</span></td>
                                <td className="tb-col-time tb-col-end">
                                    {transaction.transaction_type === 'INVEST' && <span className="lead-text text-success">+ {transaction.amount}</span>}
                                    {transaction.transaction_type === 'DEPOSIT' && <span className="lead-text text-success">+ {transaction.amount}</span>}
                                    {transaction.transaction_type === 'WITHDRAW_FUND' && <span className="lead-text text-danger">- {transaction.amount}</span>}
                                    {transaction.transaction_type === 'REFERAL_BONUS' && <span className="lead-text text-info">+ {transaction.amount}</span>}
                                </td>
                            </tr>))}
                           
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default AdminUserTransactionModal