import moment from 'moment';
import { Link } from 'react-router-dom';

const InvestmentItem = ({investment}) => {
    let percentageProfit = parseFloat((investment.totalReturns/100) * investment.amount);
    percentageProfit += parseFloat(investment.amount);

    return (<div className="nk-plan-item">
        <div className="nk-plan-icon is-running">
            <em className="icon ni ni-update"></em>
        </div>
        <div className="nk-plan-info w-max-275px">
            <div className="nk-plan-name">{investment.title} </div>
            <div className="nk-plan-desc">Invested: <span className="amount">{new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(investment.amount)} USD</span></div>
        </div>
        <div className="nk-plan-term">
            <div className="nk-plan-start nk-plan-order">
                <span className="nk-plan-label text-soft">Start Date</span>
                <span className="nk-plan-value date">{moment(investment.fund_created_at).format('ll')}</span>
            </div>
            <div className="nk-plan-end nk-plan-order">
                <span className="nk-plan-label text-soft">End Date</span>
                <span className="nk-plan-value date">{moment(investment.fund_created_at).add(30, 'days').format('ll')}</span>
            </div>
        </div>
        <div className="nk-plan-amount">
            <div className="nk-plan-amount-a nk-plan-order">
                <span className="nk-plan-label text-soft">Total Return</span>
                <span className="nk-plan-value amount">{new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(percentageProfit)} USD</span>
            </div>
            <div className="nk-plan-amount-b nk-plan-order">
                <span className="nk-plan-label text-soft">
                    Net Profit
                </span>
                <span className="nk-plan-value amount">{new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format((investment.totalReturns/100) * investment.amount)} USD</span>
            </div>
        </div>
        <div className="nk-plan-more">
            <Link className="btn btn-icon btn-lg btn-round btn-trans" to={`/investment/${investment.depositor_id}`}><em className="icon ni ni-forward-ios"></em></Link>
        </div>
        <div className="nk-plan-progress">
            <div className="progress-bar" data-progress="20" style={{ width: "20%" }}></div>
        </div>
    </div>)
}

export default InvestmentItem