import Layout from "../../components/layout/layout/layout.component"
import { Link } from 'react-router-dom'

const InvestmentDetailPage = () => {

    return (<Layout>
        <div className="nk-content nk-content-fluid">
                    <div className="container-xl wide-lg">
                        

                        <div className="nk-content-body">
                            <div className="nk-block-head">
                                <div className="nk-block-head-sub"><Link to="./investments.html" className="text-soft back-to"><em className="icon ni ni-arrow-left"> </em><span>Investment</span></Link></div>
                                <div className="nk-block-between-md g-4">
                                    <div className="nk-block-head-content">
                                        <h3 className="nk-block-title fw-normal">Premium Plan </h3>
                                        <div className="nk-block-des">
                                            <p>INV-50050225 <span className="badge badge-primary ml-1">Active</span></p>
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
                                                                <div className="number">$600.00 <span className="fw-normal text-base">USD</span></div>
                                                            </div>
                                                            <div className="nk-wgacc-subtitle">Invested</div>
                                                        </div>
                                                        <div className="nk-wgacc-sub">
                                                            <span className="nk-wgacc-sign text-soft"><em className="icon ni ni-plus"></em></span>
                                                            <div className="nk-wgacc-amount">
                                                                <div className="number">$270.00</div>
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
                                                                    $232.00 <span className="fw-normal text-base">USD</span>
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
                                                <div className="lead-text">1 Months</div>
                                            </li>
                                            <li>
                                                <div className="sub-text">Term start at</div>
                                                <div className="lead-text">Jun 15, 2021 06:33 AM</div>
                                            </li>
                                            <li>
                                                <div className="sub-text">Term end at</div>
                                                <div className="lead-text">Jul 15, 2021 06:34 AM</div>
                                            </li>
                                        </ul>
                                        <ul className="nk-wgacc-list">
                                            
                                        </ul>
                                        <ul className="nk-wgacc-list">
                                            <li>
                                                <div className="sub-text">Interest (daily)</div>
                                                <div className="lead-text">1.5%</div>
                                            </li>
                                            <li>
                                                <div className="sub-text">Total net profit</div>
                                                <div className="lead-text"><span className="currency">USD</span> $270.00</div>
                                            </li>
                                            <li>
                                                <div className="sub-text">Daily profit (inc. cap)</div>
                                                <div className="lead-text"><span className="currency">USD</span> $29.00</div>
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
                                            <th className="tb-col-paid tb-col-end" style="width: 20px"><em className="icon ni ni-info nk-tooltip small text-soft" title="" data-original-title="The profit transfered into account balance or not."></em></th>
                                        </tr>
                                        </thead>
                                        <tbody>

                                        <tr>
                                            <td className="tb-col-type"><span className="sub-text">Investment</span></td>
                                            <td className="tb-col-date tb-col-sm">
                                                <span className="sub-text">Jun 15, 2021</span>
                                            </td>
                                            <td className="tb-col-amount tb-col-end"><span className="lead-text text-danger">- $600.00</span></td>
                                            <td className="tb-col-paid tb-col-end"><span className="sub-text"><em className="icon ni ni-info nk-tooltip text-soft" title="" data-original-title="Received from Main Account"></em></span></td>
                                        </tr>

                                                            <tr>
                                            <td className="tb-col-type"><span className="sub-text">Profit Earn - 1.5%</span></td>
                                            <td className="tb-col-date tb-col-sm">
                                                <span className="sub-text">Jun 16, 2021</span>
                                            </td>
                                            <td className="tb-col-amount tb-col-end"><span className="lead-text">+ $29.00</span></td>
                                            <td className="tb-col-paid tb-col-end">
                                                <span className="sub-text"><em className="icon ni ni-info nk-tooltip text-soft" title="" data-original-title="Batch #1623851279"></em> </span>
                                            </td>
                                        </tr>
                                                            <tr>
                                            <td className="tb-col-type"><span className="sub-text">Profit Earn - 1.5%</span></td>
                                            <td className="tb-col-date tb-col-sm">
                                                <span className="sub-text">Jun 17, 2021</span>
                                            </td>
                                            <td className="tb-col-amount tb-col-end"><span className="lead-text">+ $29.00</span></td>
                                            <td className="tb-col-paid tb-col-end">
                                                <span className="sub-text"><em className="icon ni ni-info nk-tooltip text-soft" title="" data-original-title="Batch #1623892278"></em> </span>
                                            </td>
                                        </tr>
                                                            <tr>
                                            <td className="tb-col-type"><span className="sub-text">Profit Earn - 1.5%</span></td>
                                            <td className="tb-col-date tb-col-sm">
                                                <span className="sub-text">Jun 18, 2021</span>
                                            </td>
                                            <td className="tb-col-amount tb-col-end"><span className="lead-text">+ $29.00</span></td>
                                            <td className="tb-col-paid tb-col-end">
                                                <span className="sub-text"><em className="icon ni ni-info nk-tooltip text-soft" title="" data-original-title="Batch #1624007921"></em> </span>
                                            </td>
                                        </tr>
                                                            <tr>
                                            <td className="tb-col-type"><span className="sub-text">Profit Earn - 1.5%</span></td>
                                            <td className="tb-col-date tb-col-sm">
                                                <span className="sub-text">Jun 19, 2021</span>
                                            </td>
                                            <td className="tb-col-amount tb-col-end"><span className="lead-text">+ $29.00</span></td>
                                            <td className="tb-col-paid tb-col-end">
                                                <span className="sub-text"><em className="icon ni ni-info nk-tooltip text-soft" title="" data-original-title="Batch #1624224555"></em> </span>
                                            </td>
                                        </tr>
                                                            <tr>
                                            <td className="tb-col-type"><span className="sub-text">Profit Earn - 1.5%</span></td>
                                            <td className="tb-col-date tb-col-sm">
                                                <span className="sub-text">Jun 20, 2021</span>
                                            </td>
                                            <td className="tb-col-amount tb-col-end"><span className="lead-text">+ $29.00</span></td>
                                            <td className="tb-col-paid tb-col-end">
                                                <span className="sub-text"><em className="icon ni ni-info nk-tooltip text-soft" title="" data-original-title="Batch #1624224555"></em> </span>
                                            </td>
                                        </tr>
                                                            <tr>
                                            <td className="tb-col-type"><span className="sub-text">Profit Earn - 1.5%</span></td>
                                            <td className="tb-col-date tb-col-sm">
                                                <span className="sub-text">Jun 21, 2021</span>
                                            </td>
                                            <td className="tb-col-amount tb-col-end"><span className="lead-text">+ $29.00</span></td>
                                            <td className="tb-col-paid tb-col-end">
                                                <span className="sub-text"><em className="icon ni ni-info nk-tooltip text-soft" title="" data-original-title="Batch #1624311651"></em> </span>
                                            </td>
                                        </tr>
                                                            <tr>
                                            <td className="tb-col-type"><span className="sub-text">Profit Earn - 1.5%</span></td>
                                            <td className="tb-col-date tb-col-sm">
                                                <span className="sub-text">Jun 22, 2021</span>
                                            </td>
                                            <td className="tb-col-amount tb-col-end"><span className="lead-text">+ $29.00</span></td>
                                            <td className="tb-col-paid tb-col-end">
                                                <span className="sub-text"></span>
                                            </td>
                                        </tr>
                                                            <tr>
                                            <td className="tb-col-type"><span className="sub-text">Profit Earn - 1.5%</span></td>
                                            <td className="tb-col-date tb-col-sm">
                                                <span className="sub-text">Jun 23, 2021</span>
                                            </td>
                                            <td className="tb-col-amount tb-col-end"><span className="lead-text">+ $29.00</span></td>
                                            <td className="tb-col-paid tb-col-end">
                                                <span className="sub-text"></span>
                                            </td>
                                        </tr>
                                        
                                        
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>



                    </div>
                </div>
    </Layout>)
}

export default InvestmentDetailPage