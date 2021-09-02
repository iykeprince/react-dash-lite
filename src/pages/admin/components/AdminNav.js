const AdminNav = () => {
    return ( <div className="dropdown-menu dropdown-menu-right">
    <ul className="link-list-opt no-bdr">
        <li><a href="/admin-users"><em className="icon ni ni-user-alt"></em><span>Manage Users</span></a></li>
        <li><a href="/admin-payments"><em className="icon ni ni-coin-alt"></em><span>Manage Payments</span></a></li>
        <li><a href="/admin-withdrawals"><em className="icon ni ni-coin-alt"></em><span>Manage Withdrawals</span></a></li>
        <li><a href="/admin-topup"><em className="icon ni ni-coin"></em><span>Account Top-Up</span></a></li>
    </ul>
</div>)
}

export default AdminNav