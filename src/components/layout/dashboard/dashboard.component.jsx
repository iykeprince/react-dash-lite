import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../../redux/auth/auth.actions";
import Footer from "../../footer/footer.component";
import Header from "../../header/header.component";
import Sidebar from "../../sidebar/sidebar.component";

const DashboardLayout = ({children}) => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.user);
    // const token = useSelector(state => state.auth.token) || localStorage.getItem('BITFETTER_AUTH_TOKEN');

    useEffect(() => {
        document.body.className = '';
        document.body.className = 'nk-body npc-crypto has-sidebar has-sidebar-fat ui-clean';

        
        dispatch(getUser())
    }, []);

    return user === null ? (<span><h3>Loading</h3></span>) : (
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

export default DashboardLayout