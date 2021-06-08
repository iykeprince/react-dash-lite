import { useEffect } from "react";
import { Line } from 'react-chartjs-2'


const options = {
    legend: {
        display: false
    },
    maintainAspectRatio: false,
    tooltips: {
        
        backgroundColor: '#eff6ff',
        titleFontSize: 13,
        titleFontColor: '#6783b8',
        titleMarginBottom: 6,
        bodyFontColor: '#9eaecf',
        bodyFontSize: 12,
        bodySpacing: 4,
        yPadding: 10,
        xPadding: 10,
        footerMarginTop: 0,
        displayColors: false
    },
    scales: {
        yAxes: [{
            ticks: {
                beginAtZero: false,
                fontSize: 12,
                fontColor: '#9eaecf',
                padding: 10
            },
            gridLines: {
                color: "#e5ecf8",
                tickMarkLength: 0,
                zeroLineColor: '#e5ecf8'
            }
        }],
        xAxes: [{
            ticks: {
                fontSize: 12,
                fontColor: '#9eaecf',
                source: 'auto',
                padding: 5
            },
            gridLines: {
                color: "transparent",
                tickMarkLength: 20,
                zeroLineColor: '#e5ecf8',
                offsetGridLines: true
            }
        }]
    }
};


const BalanceFlowChart = () => {
   
    var chart_data = [];

    useEffect(() => {
        for (var i = 0; i < 10; i++) {
            chart_data.push({
              label: `label-${i}`,
              tension: .4,
              backgroundColor: 'transparent',
              borderWidth: 2,
              borderColor: `#DD${i}489`,
              pointBorderColor: 'transparent',
              pointBackgroundColor: 'transparent',
              pointHoverBackgroundColor: "#fff",
              pointHoverBorderColor: `#A3${i}B99`,
              pointBorderWidth: 2,
              pointHoverRadius: 4,
              pointHoverBorderWidth: 2,
              pointRadius: 4,
              pointHitRadius: 4,
              data: [90, 9+i, 115, 70, 8-i, 95, 6+i, 90, 98, 115, 70, 87]
            });
          }
    }, [])

    return (
    <>
        <div className="card-head">
            <div className="card-title mb-0">
                <h5 className="title">Balance Flow</h5>
            </div>
            <div className="card-tools">
                <ul className="card-tools-nav">
                    <li><a href="#">This Month</a></li>
                    <li className="active"><a href="#">This Years</a></li>
                </ul>
            </div>
        </div>
        <div className="card card-bordered">
            <div className="card-inner">
                <div className="nk-wg4">
                    <div className="nk-wg4-group justify-center gy-3 gx-4">
                        <div className="nk-wg4-item">
                            <div className="sub-text">
                                <div className="dot dot-lg sq" data-bg="#5ce0aa"></div> <span>Profit</span>
                            </div>
                        </div>
                        <div className="nk-wg4-item">
                            <div className="sub-text">
                                <div className="dot dot-lg sq" data-bg="#798bff"></div> <span>Deposit</span>
                            </div>
                        </div>
                        <div className="nk-wg4-item">
                            <div className="sub-text">
                                <div className="dot dot-lg sq" data-bg="#f6ca3e"></div><span>Withdrawal</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="nk-ck3">
                    {/* <canvas className="chart-account-summary" id="summaryBalance"></canvas> */}
                    <Line options={options} data={chart_data} />
                </div>
            </div>
        </div>
    </>
); }

export default BalanceFlowChart