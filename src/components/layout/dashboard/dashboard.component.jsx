import { useEffect } from "react"
import Footer from "../../footer/footer.component";
import Header from "../../header/header.component";
import Sidebar from "../../sidebar/sidebar.component";

const DashboardLayout = ({children}) => {
    useEffect(() => {
        document.body.className = '';
        document.body.className = 'nk-body npc-crypto has-sidebar has-sidebar-fat ui-clean';
    }, []);

    return (
        <div class="nk-app-root">
            <div class="nk-main ">
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