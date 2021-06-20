import { useSelector } from 'react-redux';
import DepositContainer1 from '../containers/Deposit1'
import DepositContainer2 from '../containers/Deposit2';
import DepositContainer3 from '../containers/Deposit3';
import DepositContainer4 from '../containers/Deposit4';
import DepositContainer5 from '../containers/Deposit5';

const DepositWrapper = () => {
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
            case 4:
                return <DepositContainer5 />
            default:
                return <DepositContainer1 />
        }
    }

    return (
        <>
            <div className="nk-content nk-content-fluid">
                <div className="container-xl wide-lg">
                    <div className="nk-content-body">
                        {getCurrentDepositContainer(currentStage)}
                    </div>
                </div>
            </div>
        </>
    )
}

export default DepositWrapper