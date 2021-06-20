import { useEffect, useReducer, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import Slider from "react-slick"
import Spinner from "../../../components/spinner/spinner.component";
import { actionSetSelectedPlan, navigateToPlanInvestment } from "../../../redux/plan/plan.actions";

const PlanContainer = () => {
    const allPlans = useSelector(state => state.plan.plans)
    const loading = useSelector(state => state.plan.loading)

    const [plans, setPlans] = useState([])
    const [selectedPlan, setSelectedPlan] = useState(null);
    const dispatch = useDispatch();
    const history = useHistory();


    useEffect(() => {
        if(allPlans){
            console.log(plans)
            setPlans(allPlans)
        }
        if(selectedPlan){
            console.log('selected plan', selectedPlan)
        }

    }, [selectedPlan, allPlans])

    const settings = {
        "slidesToShow": 3,
        "slidesToScroll": 1,
        "infinite": false,
        "responsive": [
            { "breakpoint": 992, "settings": { "slidesToShow": 2 } },
            { "breakpoint": 768, "settings": { "slidesToShow": 1 } }
        ]
    }

    const handleSelectionChange = e => {
        console.log(e.target.value)
    }

    const handleClick = (e) => {
        e.preventDefault()
        if (selectedPlan) {
            dispatch(actionSetSelectedPlan(selectedPlan));
            dispatch(navigateToPlanInvestment())
        }
        else window.alert('Please select a plan')
    }

    if(loading ){
        console.log('loading plans')
        return <Spinner />
    }

    return (<>
        <div className="nk-content-body">
            <div className="nk-block-head text-center">
                <div className="nk-block-head-content">
                    <div className="nk-block-head-sub"><span></span></div>
                    <div className="nk-block-head-content">
                        <h2 className="nk-block-title fw-normal">Our Plans</h2>
                        <div className="nk-block-des">
                            <p>Choose your investment plan and start earning.</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="nk-block">
                <form className="plan-iv">
                    {/* <div className="plan-iv-currency text-center">
                        <ul className="nav nav-switch nav-tabs bg-white">
                            <li className="nav-item">
                                <a href="#" className="nav-link active">USD</a>
                            </li>
                            <li className="nav-item">
                                <a href="#" className="nav-link">BTC</a>
                            </li>
                        </ul>
                    </div> */}
                    
                    <div className="plan-iv-list nk-slider nk-slider-s2">
                        <ul className="plan-list slider-init">
                            <Slider {...settings}>
                                {plans.map(plan => (<li key={plan.plan_id} className="plan-item">
                                 
                                  <input type="radio" id="plan-iv-1" name="plan-iv" className="plan-control" checked={JSON.stringify(plan) === JSON.stringify(selectedPlan)} />
                                      
                                    <div className="plan-item-card">
                                        <div className="plan-item-head">
                                            <div className="plan-item-heading">
                                                <h4 className="plan-item-title card-title title">{plan.title}</h4>
                                                <p className="sub-text">{plan.isMax ? 'MAX' : ' '}</p>
                                            </div>
                                            <div className="plan-item-summary card-text">
                                                <div className="row">
                                                    <div className="col-6">
                                                        <span className="lead-text">{plan.dailyInterest}%</span>
                                                        <span className="sub-text">Daily Interest</span>
                                                    </div>
                                                    <div className="col-6">
                                                        <span className="lead-text">{plan.termDays}</span>
                                                        <span className="sub-text">Term Days</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="plan-item-body">
                                            <div className="plan-item-desc card-text">
                                                <ul className="plan-item-desc-list">
                                                    <li><span className="desc-label">Min Deposit</span> - <span className="desc-data">{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(plan.minDeposit)}</span></li>
                                                    <li><span className="desc-label">Max Deposit</span> - <span className="desc-data">{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(plan.maxDeposit)}</span></li>
                                                    <li><span className="desc-label">Total Return</span> - <span className="desc-data">{plan.totalReturn}%</span></li>
                                                </ul>
                                                <div className="plan-item-action">
                                                    <label htmlFor="plan-iv-1" className="plan-label" onClick={() => setSelectedPlan(plan)}>
                                                        <span className="plan-label-base">Choose this plan</span>
                                                        <span className="plan-label-selected">Plan Selected</span>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </li>))}
                            </Slider>
                        </ul>
                    </div>
                    <div className="plan-iv-actions text-center">
                        <button onClick={handleClick} className="btn btn-primary btn-lg"> <span>Continue to Invest</span> <em className="icon ni ni-arrow-right"></em></button>
                    </div>
                </form>
            </div>
        </div>
    </>)
}

export default PlanContainer