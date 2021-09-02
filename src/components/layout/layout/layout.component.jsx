import { useState } from "react";
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router";
import { getUser } from "../../../redux/auth/auth.actions";
import { getPreference, getReferalCount } from "../../../redux/profile/profile.actions";
import { currencyExchange } from "../../../redux/util/util.actions";

import Footer from "../../footer/footer.component";
import Header from "../../header/header.component";
import Sidebar from "../../sidebar/sidebar.component";
import Spinner from "../../spinner/spinner.component";

const token = localStorage.getItem('BITFETTER_AUTH_TOKEN');
const Layout = ({ children }) => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.user);
    const toggleState = useSelector(state => state.util.showSidebar)

    useEffect(() => {
        document.body.className = '';
        document.body.className = 'nk-body npc-crypto has-sidebar has-sidebar-fat ui-clean ';

        dispatch(getUser())
        dispatch(currencyExchange())
        dispatch(getReferalCount())
        dispatch(getPreference())
    }, []);

    useEffect(() => {
        if (toggleState) {
            document.body.classList.add('nav-shown');
        } else {
            document.body.classList.remove('nav-shown');
        }
    }, [toggleState])


    return user === null ? (<Spinner />) : (
        <div className="nk-app-root">
            <div className="nk-main ">
                {/* Sidebar */}
                <Sidebar />
                {/* Main */}
                <div className="nk-wrap">
                    {/* Header */}
                    <Header />
                    {/* Content */}
                    {children}
                    {/* Footer */}
                    <Footer />
                </div>
            </div>
        </div>
    )
}

export default Layout