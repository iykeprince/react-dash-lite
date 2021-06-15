import { Modal } from 'react-bootstrap';

const MyInvestmentModal = ({ show, handleClose }) => {
 

    return (
        <Modal show={show} onHide={handleClose} dialogClassName="modal-90w" size="lg"> 
              <Modal.Body>
                <a onClick={handleClose} className="close" data-dismiss="modal" aria-label="Close">
                    <em className="icon ni ni-cross"></em>
                </a>
                <div className="modal-body" style={{width: '100%'}}>
                    <div className="nk-content-body" >
                        <div className="nk-block-head">
                            <div className="nk-block-head-content">
                                <div className="nk-block-head-sub"><a href="#" className="text-soft back-to"><em className="icon ni ni-arrow-left"> </em><span>My Investment</span></a></div>
                                <div className="nk-block-between-md g-4">
                                    <div className="nk-block-head-content">
                                        <h2 className="nk-block-title fw-normal">Silver - Daily 4.76% for 21 Days</h2>
                                        <div className="nk-block-des">
                                            <p>INV-498238 <span className="badge badge-outline badge-primary">Running</span></p>
                                        </div>
                                    </div>
                                    <div className="nk-block-head-content">
                                        <ul className="nk-block-tools gx-3">
                                            <li className="order-md-last"><a href="#" className="btn btn-danger"><em className="icon ni ni-cross"></em> <span>Cancel this plan</span> </a></li>
                                            <li><a href="#" className="btn btn-icon btn-light"><em className="icon ni ni-reload"></em></a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="nk-block">
                            <div className="card card-bordered">
                                <div className="card-inner">
                                    <div className="row gy-gs">
                                        <div className="col-md-6">
                                            <div className="nk-iv-wg3">
                                                <div className="nk-iv-wg3-group flex-lg-nowrap gx-4">
                                                    <div className="nk-iv-wg3-sub">
                                                        <div className="nk-iv-wg3-amount">
                                                            <div className="number">2,500.00</div>
                                                        </div>
                                                        <div className="nk-iv-wg3-subtitle">Invested Amount</div>
                                                    </div>
                                                    <div className="nk-iv-wg3-sub">
                                                        <span className="nk-iv-wg3-plus text-soft"><em className="icon ni ni-plus"></em></span>
                                                        <div className="nk-iv-wg3-amount">
                                                            <div className="number">1,643.76 <span className="number-up">4.76 %</span></div>
                                                        </div>
                                                        <div className="nk-iv-wg3-subtitle">Profit Earned</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6 col-lg-4 offset-lg-2">
                                            <div className="nk-iv-wg3 pl-md-3">
                                                <div className="nk-iv-wg3-group flex-lg-nowrap gx-4">
                                                    <div className="nk-iv-wg3-sub">
                                                        <div className="nk-iv-wg3-amount">
                                                            <div className="number">4,999.90 <span className="number-down">1017.14 <em className="icon ni ni-info-fill" data-toggle="tooltip" data-placement="right" title="tooltip text"></em></span></div>
                                                        </div>
                                                        <div className="nk-iv-wg3-subtitle">Total Return</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div id="schemeDetails" className="nk-iv-scheme-details">
                                    <ul className="nk-iv-wg3-list">
                                        <li>
                                            <div className="sub-text">Term</div>
                                            <div className="lead-text">21 Days</div>
                                        </li>
                                        <li>
                                            <div className="sub-text">Term start at</div>
                                            <div className="lead-text">Nov 4, 2019 05:42 AM</div>
                                        </li>
                                        <li>
                                            <div className="sub-text">Term end at</div>
                                            <div className="lead-text">Nov 25, 2019 05:42 AM</div>
                                        </li>
                                        <li>
                                            <div className="sub-text">Daily interest</div>
                                            <div className="lead-text">4.76%</div>
                                        </li>
                                    </ul>
                                    <ul className="nk-iv-wg3-list">
                                        <li>
                                            <div className="sub-text">Ordered date</div>
                                            <div className="lead-text">Nov 2, 2019 10:54 PM</div>
                                        </li>
                                        <li>
                                            <div className="sub-text">Approved date</div>
                                            <div className="lead-text">Nov 4, 2019 05:42 AM</div>
                                        </li>
                                        <li>
                                            <div className="sub-text">Payment method</div>
                                            <div className="lead-text">NioWallet</div>
                                        </li>
                                        <li>
                                            <div className="sub-text">Paid <small>(fee include)</small></div>
                                            <div className="lead-text"><span className="currency currency-usd">USD</span> 2,535.75</div>
                                        </li>
                                    </ul>
                                    <ul className="nk-iv-wg3-list">
                                        <li>
                                            <div className="sub-text">Captial invested</div>
                                            <div className="lead-text"><span className="currency currency-usd">USD</span> 2,500.00</div>
                                        </li>
                                        <li>
                                            <div className="sub-text">Daily profit</div>
                                            <div className="lead-text"><span className="currency currency-usd">USD</span> 119.10</div>
                                        </li>
                                        <li>
                                            <div className="sub-text">Net profit</div>
                                            <div className="lead-text"><span className="currency currency-usd">USD</span> 2,499.90</div>
                                        </li>
                                        <li>
                                            <div className="sub-text">Total return</div>
                                            <div className="lead-text"><span className="currency currency-usd">USD</span> 4,999.90</div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="nk-block nk-block-lg">
                            <div className="nk-block-head">
                                <h5 className="nk-block-title">Graph View</h5>
                            </div>
                            <div className="row g-gs">
                                <div className="col-lg-5">
                                    <div className="card card-bordered h-100">
                                        <div className="card-inner justify-center text-center h-100">
                                            <div className="nk-iv-wg5">
                                                <div className="nk-iv-wg5-head">
                                                    <h5 className="nk-iv-wg5-title">Overview</h5>
                                                </div>
                                                <div className="nk-iv-wg5-ck">
                                                    <input type="text" className="knob-half" value="68.9" data-fgColor="#6576ff" data-bgColor="#d9e5f7" data-thickness=".06" data-width="300" data-height="155" data-displayInput="false" />
                                                    <div className="nk-iv-wg5-ck-result">
                                                        <div className="text-lead">68.9%</div>
                                                        <div className="text-sub">112.54 / per day</div>
                                                    </div>
                                                    <div className="nk-iv-wg5-ck-minmax"><span>2,500.00</span><span>4,999.90</span></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg col-sm-6">
                                    <div className="card card-bordered h-100">
                                        <div className="card-inner justify-center text-center h-100">
                                            <div className="nk-iv-wg5">
                                                <div className="nk-iv-wg5-head">
                                                    <h5 className="nk-iv-wg5-title">Net Profit</h5>
                                                    <div className="nk-iv-wg5-subtitle">Earn so far <strong>1,643.76</strong> <span className="currency currency-usd">USD</span></div>
                                                </div>
                                                <div className="nk-iv-wg5-ck sm">
                                                    <input type="text" className="knob-half" value="68.9" data-fgColor="#33d895" data-bgColor="#d9e5f7" data-thickness=".07" data-width="240" data-height="125" data-displayInput="false" />
                                                    <div className="nk-iv-wg5-ck-result">
                                                        <div className="text-lead sm">4.76%</div>
                                                        <div className="text-sub">Daily profit</div>
                                                    </div>
                                                    <div className="nk-iv-wg5-ck-minmax"><span>0.00</span><span>2,999.90</span></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg col-sm-6">
                                    <div className="card card-bordered h-100">
                                        <div className="card-inner justify-center text-center h-100">
                                            <div className="nk-iv-wg5">
                                                <div className="nk-iv-wg5-head">
                                                    <h5 className="nk-iv-wg5-title">Day Remain</h5>
                                                    <div className="nk-iv-wg5-subtitle">Earn so far <strong>1,643.76</strong> <span className="currency currency-usd">USD</span></div>
                                                </div>
                                                <div className="nk-iv-wg5-ck sm">
                                                    <input type="text" className="knob-half" value="68.9" data-fgColor="#816bff" data-bgColor="#d9e5f7" data-thickness=".07" data-width="240" data-height="125" data-displayInput="false" />
                                                    <div className="nk-iv-wg5-ck-result">
                                                        <div className="text-lead sm">8 D</div>
                                                        <div className="text-sub">day remain</div>
                                                    </div>
                                                    <div className="nk-iv-wg5-ck-minmax"><span>0</span><span>21</span></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="nk-block nk-block-lg">
                            <div className="nk-block-head">
                                <h5 className="nk-block-title">Transactions</h5>
                            </div>
                            <div className="card card-bordered">
                                <table className="table table-iv-tnx">
                                    <thead className="thead-light">
                                        <tr>
                                            <th className="tb-col-type"><span className="overline-title">Type</span></th>
                                            <th className="tb-col-date"><span className="overline-title">Date</span></th>
                                            <th className="tb-col-time tb-col-end"><span className="overline-title">Amount</span></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="tb-col-type"><span className="sub-text">Investment</span></td>
                                            <td className="tb-col-date"><span className="sub-text">04 Nov, 2018</span></td>
                                            <td className="tb-col-time tb-col-end"><span className="lead-text text-danger">- 2,500.00</span></td>
                                        </tr>
                                        <tr>
                                            <td className="tb-col-type"><span className="sub-text">Profit - 4.76%</span></td>
                                            <td className="tb-col-date"><span className="sub-text">05 Nov, 2018</span></td>
                                            <td className="tb-col-time tb-col-end"><span className="lead-text">+ 119.10</span></td>
                                        </tr>
                                        <tr>
                                            <td className="tb-col-type"><span className="sub-text">Profit - 4.76%</span></td>
                                            <td className="tb-col-date"><span className="sub-text">06 Nov, 2018</span></td>
                                            <td className="tb-col-time tb-col-end"><span className="lead-text">+ 119.10</span></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

            </Modal.Body>
        </Modal>
    );
}

export default MyInvestmentModal;