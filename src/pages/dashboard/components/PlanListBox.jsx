import { useState } from "react";
import MyInvestmentModal from "./MyInvestmentModal";

const PlanListBox = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <div className="nk-iv-scheme-list">
                <div className="nk-iv-scheme-item">
                    <div className="nk-iv-scheme-icon is-running">
                        <em className="icon ni ni-update"></em>
                    </div>
                    <div className="nk-iv-scheme-info">
                        <div className="nk-iv-scheme-name">Silver - Daily 4.76% for 21 Days</div>
                        <div className="nk-iv-scheme-desc">Invested Amount - <span className="amount">$250</span></div>
                    </div>

                    <div className="nk-iv-scheme-amount">
                        <div className="nk-iv-scheme-amount-a nk-iv-scheme-order">
                            <span className="nk-iv-scheme-label text-soft">Total Return</span>
                            <span className="nk-iv-scheme-value amount">$ 499.99</span>
                        </div>
                        <div className="nk-iv-scheme-amount-b nk-iv-scheme-order">
                            <span className="nk-iv-scheme-label text-soft">Net Profit Earn</span>
                            <span className="nk-iv-scheme-value amount">$ 97.95 <span className="amount-ex">~ $152.04</span></span>
                        </div>
                    </div>
                    <div className="nk-iv-scheme-more">
                        <a className="btn btn-icon btn-lg btn-round btn-trans" onClick={handleShow}><em className="icon ni ni-forward-ios"></em></a>
                    </div>
                    <div className="nk-iv-scheme-progress">
                        <div className="progress-bar" data-progress="25"></div>
                    </div>
                </div>

            </div>
            <MyInvestmentModal show={show} handleClose={handleClose} />
        </>
    );
}

export default PlanListBox