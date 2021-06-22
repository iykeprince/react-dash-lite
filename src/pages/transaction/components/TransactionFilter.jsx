const TransactionFilter = () => (<ul className="nk-block-tools gx-2">
<li>
    <a href="#" className="search-toggle toggle-search btn btn-icon btn-trigger" data-target="search"><em className="icon ni ni-search"></em></a>
</li>
<li>
    <div className="dropdown">
        <a href="#" className="btn btn-trigger btn-icon dropdown-toggle" data-toggle="dropdown">
            <div className="dot dot-primary"></div>
            <em className="icon ni ni-filter-alt"></em>
        </a>

        <div className="filter-wg dropdown-menu dropdown-menu-lg dropdown-menu-right">
            <div className="dropdown-head">
                <span className="sub-title dropdown-title">Filter Transaction</span>
            </div>
            <form action="https://investorm.xyz/transactions" method="GET">
                {/* <input type="hidden" name="filter" value="true" /> */}
                <div className="dropdown-body dropdown-body-rg">
                    <div className="row gx-6 gy-3">
                        <div className="col-6">
                            <div className="form-group">
                                <label className="overline-title overline-title-alt">Type</label>
                                <select name="type" className="form-select form-select-sm select2-hidden-accessible" data-select2-id="1" tabIndex="-1" aria-hidden="true">
                                    <option value="any" data-select2-id="3">Any Type</option>
                                    <option value="bonus">Bonus</option>
                                    <option value="charge">Charge</option>
                                    <option value="deposit">Deposit</option>
                                    <option value="withdraw">Withdraw</option>
                                    <option value="investment">Investment</option>
                                    <option value="referral">Referral</option>
                                </select>
                                <span className="select2 select2-container select2-container--default" dir="ltr" data-select2-id="2" style={{width: 'auto'}}>
                                    <span className="selection">
                                        <span className="select2-selection select2-selection--single" role="combobox" aria-haspopup="true" aria-expanded="false" tabIndex="0" aria-disabled="false" aria-labelledby="select2-type-3v-container">
                                            <span className="select2-selection__rendered" id="select2-type-3v-container" role="textbox" aria-readonly="true" title="Any Type">Any Type</span>
                                            <span className="select2-selection__arrow" role="presentation"><b role="presentation"></b></span>
                                        </span>
                                    </span>
                                    <span className="dropdown-wrapper" aria-hidden="true"></span>
                                </span>
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="form-group">
                                <label className="overline-title overline-title-alt">Status</label>
                                <select name="status" className="form-select form-select-sm select2-hidden-accessible" data-select2-id="4" tabIndex="-1" aria-hidden="true">
                                    <option value="any" data-select2-id="6">Any Status</option>
                                    <option value="cancelled">Cancelled</option>
                                    <option value="failed">Failed</option>
                                    <option value="completed">Completed</option>
                                </select>
                                <span className="select2 select2-container select2-container--default" dir="ltr" data-select2-id="5" style={{width: 'auto'}}>
                                    <span className="selection">
                                        <span className="select2-selection select2-selection--single" role="combobox" aria-haspopup="true" aria-expanded="false" tabIndex="0" aria-disabled="false" aria-labelledby="select2-status-18-container">
                                            <span className="select2-selection__rendered" id="select2-status-18-container" role="textbox" aria-readonly="true" title="Any Status">Any Status</span>
                                            <span className="select2-selection__arrow" role="presentation"><b role="presentation"></b></span>
                                        </span>
                                    </span>
                                    <span className="dropdown-wrapper" aria-hidden="true"></span>
                                </span>
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="form-group">
                                <label className="overline-title overline-title-alt">From</label>
                                <input className="form-control date-picker" name="date[from]" type="text" value="" readOnly />
                            </div>
                        </div>

                        <div className="col-6">
                            <div className="form-group">
                                <label className="overline-title overline-title-alt">To</label>
                                <input className="form-control date-picker" name="date[to]" type="text" value=""  readOnly/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="dropdown-foot between">
                    <button type="submit" className="btn btn-secondary">Filter</button>
                    <a href="#" className="clickable">Reset Filter</a>
                </div>
            </form>
        </div>
    </div>
</li>
</ul>)

export default TransactionFilter