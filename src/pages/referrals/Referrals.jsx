import { useSelector } from "react-redux"
import Layout from "../../components/layout/layout/layout.component"

const ReferralsPage = () => {
    const user = useSelector(state => state.auth.user);

    return (<Layout>
        <div class="nk-content nk-content-fluid">
            <div class="container-xl wide-lg">
                <div class="nk-content-body">
                    <div class="nk-block-head nk-block-head-sm">
                        <div class="nk-block-head-sub"><span>Referrals</span></div>
                        <div class="nk-block-between-md g-4">
                            <div class="nk-block-head-content">
                                <h2 class="nk-block-title fw-normal">Referral Activity</h2>
                                <div class="nk-block-des">
                                    <p>See who you've referred and statistic of your referrals.</p>
                                </div>
                            </div>
                            <span className="btn btn-primary">Referal Bonus ${user.referal_bonus}</span>
                        </div>
                    </div>



                    <div class="nk-block nk-block-lg">
                        <div class="nk-block-head">
                            <h5 class="nk-block-title">Referral Commissions</h5>
                        </div>
                        <div class="card card-bordered">
                            <table class="nk-plan-tnx table">
                                <thead class="thead-light">
                                    <tr>
                                        <th class="tb-col-type w-50"><span class="overline-title">Details</span></th>
                                        <th class="tb-col-date tb-col-md"><span class="overline-title">Date</span></th>
                                        <th class="tb-col-status tb-col-sm"><span class="overline-title">Status</span></th>
                                        <th class="tb-col-amount tb-col-end"><span class="overline-title">Earning</span></th>
                                    </tr>
                                </thead>
                                <tbody>


                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div class="nk-block">
                        <div class="nk-block">
                            <div class="card card-bordered">
                                <div class="card-inner">

                                    <div class="nk-refwg-invite">
                                        <div class="nk-refwg-head g-3">
                                            <div class="nk-refwg-title">
                                                <h5 class="title">Refer Us &amp; Earn</h5>
                                                <div class="title-sub">Use the below link to invite your friends.</div>
                                            </div>
                                        </div>
                                        <div class="nk-refwg-url">
                                            <div class="form-control-wrap">
                                                <div class="form-clip clipboard-init" data-clipboard-target="#ref-url" data-success="Copied" data-text="Copy Link"><em class="clipboard-icon icon ni ni-copy"></em> <span class="clipboard-text">Copy Link</span></div>
                                                <div class="form-icon">
                                                    <em class="icon ni ni-link-alt"></em>
                                                </div>
                                                <input type="text" class="form-control copy-text" id="ref-url" value={`https://app.bitfetter.com/${user && user.referal_link}`} readOnly />
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>


                </div>
            </div>
        </div>
    </Layout>)
}

export default ReferralsPage