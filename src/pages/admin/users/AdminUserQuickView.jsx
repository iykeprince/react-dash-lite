import React from 'react';

const AdminUserQuickView = () => {
    return (
        <div className="modal-body">
            <div className="nk-block-head">
                <div className="nk-block-head-content">
                    <div className="nk-block-head-sub"><a href="#" className="text-soft back-to"><em className="icon ni ni-arrow-left"> </em><span>Quick View</span></a></div>
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
        </div>
    )
}

export default AdminUserQuickView;