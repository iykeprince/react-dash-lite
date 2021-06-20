
import { useEffect, useState } from 'react'
import DashModal from "../../../components/modal/modal.component";
import AddWithdrawAccountModal from "../modals/AddWithdrawAccountModal";
import { toast, ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import ProfileNav from "../components/ProfileNav";
import { getWithdrawAccounts } from "../../../redux/withdraw/withdraw.actions";
import AccountEmpty from "../components/AccountEmpty";
import AccountList from '../components/AccountList';

const AccountContainer = () => {
    const [showModal, setShowModal] = useState(false);
    const message = useSelector(state => state.withdraw.message);
    const accounts = useSelector(state => state.withdraw.accounts);
    const loading = useSelector(state => state.withdraw.loading)
    const errorMessage = useSelector(state => state.withdraw.error)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getWithdrawAccounts())
    }, [])

    useEffect(() => {
        if (message !== null) {
            toast.success(message);
            onHideModal();
        }
    }, [message])

    const onHideModal = () => setShowModal(false);

 

    return (<>
        <div className="nk-content-body">
            <ProfileNav activeLink="account" />
            <div className="nk-block">

                {accounts.length 
                    ? <AccountList setShowModal={setShowModal} />
                    : <AccountEmpty setShowModal={setShowModal} />
                }

            </div>
        </div>
        <DashModal show={showModal} onHide={onHideModal} title="Add new wallet" >
            <AddWithdrawAccountModal />
        </DashModal>

        <ToastContainer />
    </>)
}

export default AccountContainer