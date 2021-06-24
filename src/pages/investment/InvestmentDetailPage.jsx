import Layout from "../../components/layout/layout/layout.component"
import { Link, useRouteMatch } from 'react-router-dom'
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getInvestmentInfo } from "../../redux/investment/investment.actions";
import Spinner from "../../components/spinner/spinner.component";
import moment from "moment";

const InvestmentDetailPage = () => {
    const match = useRouteMatch();
    const dispatch = useDispatch();
    const id = match.params.detailId;

    const investmentData = useSelector(state => state.investment.investmentData)

    useEffect(() => {
        dispatch(getInvestmentInfo(id))
    }, []);

    if (investmentData === null)
        return <Spinner />

    const amount = parseFloat(investmentData.amount);
    const profit = (parseInt(investmentData.totalReturns) / 100) * amount;
    const dailyProfit = (parseFloat(investmentData.dailyInterest)/100) * profit;
    const totalReturnedAmount = amount + profit;

    return (<div className="nk-content nk-content-fluid">
        <div className="container-xl wide-lg">


            <div className="nk-content-body">
                <div className="nk-block-head">
                    <div className="nk-block-head-sub"><Link to="/investment" className="text-soft back-to"><em className="icon ni ni-arrow-left"> </em><span>Investment</span></Link></div>
                    <div className="nk-block-between-md g-4">
                        <div className="nk-block-head-content">
                            <h3 className="nk-block-title fw-normal">{investmentData.title} Plan</h3>
                            <div className="nk-block-des">
                                <p>INV-50050225 {investmentData.payment_confirmation === "0"
                                    ? <span className="badge badge-primary ml-1">Active</span>
                                    : <span className="badge badge-danger ml-1">INACTIVE</span>}</p>
                            </div>
                        </div>
                        <div className="nk-block-head-content">
                            <ul className="nk-block-tools gx-3">
                                <li><Link to="#" className="btn btn-icon btn-white btn-light"><em className="icon ni ni-reload"></em></Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="nk-block">
                    <div className="card card-bordered">
                        <div className="card-inner">
                            <div className="row gy-gs">
                                <div className="col-md-6">
                                    <div className="nk-wgacc">
                                        <div className="nk-wgacc-group flex-lg-nowrap gx-4">
                                            <div className="nk-wgacc-sub">
                                                <div className="nk-wgacc-amount">
                                                    <div className="number">{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount)} <span className="fw-normal text-base">USD</span></div>
                                                </div>
                                                <div className="nk-wgacc-subtitle">Invested</div>
                                            </div>
                                            <div className="nk-wgacc-sub">
                                                <span className="nk-wgacc-sign text-soft"><em className="icon ni ni-plus"></em></span>
                                                <div className="nk-wgacc-amount">
                                                    <div className="number">{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(profit)}</div>
                                                </div>
                                                <div className="nk-wgacc-subtitle">Profit</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6 col-lg-4 offset-lg-2">
                                    <div className="nk-wgacc pl-md-3">
                                        <div className="nk-wgacc-group flex-lg-nowrap gx-4">
                                            <div className="nk-wgacc-sub">
                                                <div className="nk-wgacc-amount">
                                                    <div className="number">
                                                    {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(totalReturnedAmount)} <span className="fw-normal text-base">USD</span>
                                                    </div>
                                                </div>
                                                <div className="nk-wgacc-subtitle">
                                                    Total Returned (inc. cap)
                                                    <em className="icon ni ni-info nk-tooltip text-soft" title="" data-original-title="The amount (58.00 USD) may locked or pending to adjust into your investment account."></em>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="nk-plan-details">
                            <ul className="nk-wgacc-list">
                                <li>
                                    <div className="sub-text">Term duration</div>
                                    <div className="lead-text">{investmentData.termDays} Months</div>
                                </li>
                                <li>
                                    <div className="sub-text">Term start at</div>
                                    <div className="lead-text">{moment(investmentData.fund_created_at).format('MMMM D YYYY, h:mm a')}</div>
                                </li>
                                <li>
                                    <div className="sub-text">Term end at</div>
                                    <div className="lead-text">{moment(investmentData.fund_created_at).add(30, 'days').format('MMMM D, YYYY h:mm a')}</div>
                                </li>
                            </ul>
                            <ul className="nk-wgacc-list">

                            </ul>
                            <ul className="nk-wgacc-list">
                                <li>
                                    <div className="sub-text">Interest (daily)</div>
                                    <div className="lead-text">{investmentData.dailyInterest}%</div>
                                </li>
                                <li>
                                    <div className="sub-text">Total net profit</div>
                                    <div className="lead-text"><span className="currency">USD</span> {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(profit)}</div>
                                </li>
                                <li>
                                    <div className="sub-text">Daily profit (inc. cap)</div>
                                    <div className="lead-text"><span className="currency">USD</span> {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(dailyProfit)}</div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>


                <div className="nk-block nk-block-lg">
                    <div className="nk-block-head">
                        <h5 className="nk-block-title">Transactions</h5>
                    </div>
                    <div className="card card-bordered">
                        <table className="nk-plan-tnx table">
                            <thead className="thead-light">
                                <tr>
                                    <th className="tb-col-type"><span className="overline-title">Details</span></th>
                                    <th className="tb-col-date tb-col-sm"><span className="overline-title">Date</span></th>
                                    <th className="tb-col-amount tb-col-end"><span className="overline-title">Amount</span></th>
                                    <th className="tb-col-paid tb-col-end" style={{ width: "20px" }}><em className="icon ni ni-info nk-tooltip small text-soft" title="" data-original-title="The profit transfered into account balance or not."></em></th>
                                </tr>
                            </thead>
                            <tbody>

                                <tr>
                                    <td className="tb-col-type"><span className="sub-text">Investment</span></td>
                                    <td className="tb-col-date tb-col-sm">
                                        <span className="sub-text">{moment(investmentData.fund_created_at).format('ll')}</span>
                                    </td>
                                    <td className="tb-col-amount tb-col-end"><span className="lead-text text-danger">- {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount)}</span></td>
                                    <td className="tb-col-paid tb-col-end"><span className="sub-text"><em className="icon ni ni-info nk-tooltip text-soft" title="" data-original-title="Received from Main Account"></em></span></td>
                                </tr>

                                {/* <tr>
                                    <td className="tb-col-type"><span className="sub-text">Profit Earn - 1.5%</span></td>
                                    <td className="tb-col-date tb-col-sm">
                                        <span className="sub-text">Jun 16, 2021</span>
                                    </td>
                                    <td className="tb-col-amount tb-col-end"><span className="lead-text">+ $29.00</span></td>
                                    <td className="tb-col-paid tb-col-end">
                                        <span className="sub-text"><em className="icon ni ni-info nk-tooltip text-soft" title="" data-original-title="Batch #1623851279"></em> </span>
                                    </td>
                                </tr> */}
                               
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>



        </div>
    </div>
    )
}

export default InvestmentDetailPage