import { useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router';
import DashboardLayout from '../../components/layout/dashboard/dashboard.component'
import DepositContainer1 from './containers/Deposit1'
import DepositContainer2 from './containers/Deposit2';
import DepositContainer3 from './containers/Deposit3';
import DepositContainer4 from './containers/Deposit4';
import './css/investorm-app.css'

const DepositPage = () => {
    const { url, path } = useRouteMatch();
    const currentStage = useSelector(state => state.deposit.currentStage)

    const getCurrentDepositContainer = (currentStage) => {
        switch (currentStage) {
            case 0:
                return <DepositContainer1 />
            case 1:
                return <DepositContainer2 />
            case 2:
                return <DepositContainer3 />
            case 3: 
                return <DepositContainer4 />
            default:
                return <DepositContainer1 />
        }
    }

    return (
        <DashboardLayout>
            <div className="nk-content nk-content-fluid">
                <div className="container-xl wide-lg">
                    <div className="nk-content-body">
                        {getCurrentDepositContainer(currentStage)}
                    </div>
                </div>
            </div>
        </DashboardLayout>
    )
}

export default DepositPage