import React, { useEffect } from 'react'
import { Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Route, useRouteMatch } from "react-router"
import Layout from '../../components/layout/layout/layout.component';
import { getPlans } from '../../redux/plan/plan.actions';
import PlanContainer from './containers/PlanContainer';
import PlanInvestContainer from './containers/PlanInvestContainer';


const PlanPage = () => {
    const match = useRouteMatch();
    const currentStage = useSelector(state => state.plan.currentStage);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPlans())
    }, [])

    const getCurrentPlanStage = currentStage => {
        switch (currentStage) {
            case 0:
                return <PlanContainer />
            case 1:
                return <PlanInvestContainer />
            default:
                return <PlanContainer />
        }
    }

    return (
        <Layout>
            <div className="nk-content nk-content-fluid">
                <div className="container-xl wide-lg">

                    {getCurrentPlanStage(currentStage)}
                </div>
            </div>
        </Layout>
    )
}

export default PlanPage