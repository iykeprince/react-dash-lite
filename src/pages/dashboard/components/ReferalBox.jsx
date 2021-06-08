import { useEffect } from "react";
import { Bar } from "react-chartjs-2";

const barOptions = {
    legend: {
        display: false,
    },
    maintainAspectRatio: false,
    tooltips: {
        enabled: true,
       
        backgroundColor: '#fff',
        titleFontSize: 13,
        titleFontColor: '#6783b8',
        titleMarginBottom: 6,
        bodyFontColor: '#9eaecf',
        bodyFontSize: 12,
        bodySpacing:4,
        yPadding: 10,
        xPadding: 10,
        footerMarginTop: 0,
        displayColors: false
    },
    scales: {
        yAxes: [{
            display: false,
            ticks: {
                beginAtZero: true
            },
        }],
        xAxes: [{
            display: false,
        }]
    }
};

const ReferalBox = () =>{ 
    var chart_data = [];
    useEffect(() => {
        for (var i = 0; i < 16; i++) {
            chart_data.push({
              label:  `label-${i}`,
              data: [i*10, i*32, i*5, i*20, i*22],
              // Styles
              backgroundColor: `#090${i}30`,
              borderWidth: 2,
              borderColor: 'transparent',
              hoverBorderColor: 'transparent',
              borderSkipped: 'bottom',
              barPercentage: .5,
              categoryPercentage: .7
            });
          }
    }, [])

    return (<div className="card card-bordered">
    <div className="nk-refwg">
        <div className="nk-refwg-invite card-inner">
            <div className="nk-refwg-head g-3">
                <div className="nk-refwg-title">
                    <h5 className="title">Refer Us & Earn</h5>
                    <div className="title-sub">Use the bellow link to invite your friends.</div>
                </div>
                <div className="nk-refwg-action">
                    <a href="#" className="btn btn-primary">Invite</a>
                </div>
            </div>
            <div className="nk-refwg-url">
                <div className="form-control-wrap">
                    <div className="form-clip clipboard-init" data-clipboard-target="#refUrl" data-success="Copied" data-text="Copy Link"><em className="clipboard-icon icon ni ni-copy"></em> <span className="clipboard-text">Copy Link</span></div>
                    <div className="form-icon">
                        <em className="icon ni ni-link-alt"></em>
                    </div>
                    <input type="text" className="form-control copy-text" id="refUrl" value="https://bitfetter.io/?ref=4945KD48" />
                </div>
            </div>
        </div>
        <div className="nk-refwg-stats card-inner bg-lighter">
            <div className="nk-refwg-group g-3">
                <div className="nk-refwg-name">
                    <h6 className="title">Referral Information</h6>
                </div>
                <div className="nk-refwg-info g-3">
                    <div className="nk-refwg-sub">
                        <div className="title">394</div>
                        <div className="sub-text">Total Joined</div>
                    </div>
                    <div className="nk-refwg-sub">
                        <div className="title">548.49</div>
                        <div className="sub-text">Referral Earn</div>
                    </div>
                </div>

            </div>
            <div className="nk-refwg-ck">
                {/* <canvas className="chart-refer-stats" id="refBarChart"></canvas> */}
                <Bar options={barOptions} data={chart_data} />
            </div>
        </div>
    </div>
</div>)}

export default ReferalBox