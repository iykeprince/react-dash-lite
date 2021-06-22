import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom"
import { selectedTab } from "../../../redux/transaction/transaction.actions";

const TransactionTab = () => {
    const dispatch = useDispatch();
    const [activeLink, setActiveLink] = useState("all");
    

    return (<ul className="nk-nav nav nav-tabs">
        <li className="nav-item">
            <Link className={`nav-link ${activeLink === 'all' && 'active'}`} to="#" onClick={e => {
                e.preventDefault();
                setActiveLink('all')
                
                dispatch(selectedTab(0))
            }}>All</Link>
        </li>
        <li className="nav-item">
            <Link className={`nav-link ${activeLink === 'deposit' && 'active'}`} to="#" onClick={e => {
                e.preventDefault();
                setActiveLink('deposit')
                dispatch(selectedTab(1))
            }}>Deposit</Link>
        </li>
        <li className="nav-item">
            <Link className={`nav-link ${activeLink === 'withdraw' && 'active'}`} to="#" onClick={e => {
                e.preventDefault();
                setActiveLink('withdraw')
                dispatch(selectedTab(2))
            }}>Withdraw</Link>
        </li>
        <li className="nav-item">
            <Link className={`nav-link ${activeLink === 'pending' && 'active'}`} to="#" onClick={e => {
                e.preventDefault();
                setActiveLink('pending')
                dispatch(selectedTab(3))
            }}>
                Scheduled <span className="badge badge-primary">3</span>
            </Link>
        </li>
    </ul>)
}

export default TransactionTab