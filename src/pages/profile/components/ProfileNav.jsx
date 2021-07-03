import { useEffect } from "react"
import { useState } from "react"
import { Link } from "react-router-dom"

const ProfileNav = ({activeLink}) => {
    const [title, setTitle] = useState(activeLink)
    
    useEffect(() => {
        if(title === 'profile'){
            setTitle('Profile Info')
        }else if (title === 'account'){
            setTitle('Account info')
        }else {
            setTitle('Security info')
        }
    }, [])

    return (
        <>
            <div className="nk-block-head">
                <div className="nk-block-head-content">
                    <h2 className="nk-block-title fw-normal">{title}</h2>
                    <div className="nk-block-des">
                        <p>You have full control to manage your own account setting.</p>
                    </div>
                </div>
            </div>
            <ul className="nk-nav nav nav-tabs">
                <li className={`nav-item ${activeLink === 'profile' ? 'active' : ''}`}>
                    <Link to="/profile" className="nav-link">Profile</Link>
                </li>
                <li className={`nav-item ${activeLink === 'account' ? 'active' : ''}`}>
                    <Link to="/profile/account" className="nav-link" >Accounts</Link>
                </li>
                <li className={`nav-item ${activeLink === 'security' ? 'active' : ''}`}>
                    <Link to="/profile/security" className="nav-link">Security</Link>
                </li>
            </ul>
        </>
    )
}

export default ProfileNav