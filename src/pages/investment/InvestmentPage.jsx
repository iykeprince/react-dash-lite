import Layout from "../../components/layout/layout/layout.component"
import { Link, useRouteMatch } from 'react-router-dom'
import { useSelector } from "react-redux"
import { Route } from "react-router-dom/cjs/react-router-dom.min"
import InvestmentMain from "./InvestmentMain"
import InvestmentDetailPage from "./InvestmentDetailPage"

const InvestmentPage = () => {
    
    const match = useRouteMatch();

    return (<Layout>
        <Route exact path={`${match.path}/`} render={props => <InvestmentMain {...props} />} />
        <Route path={`${match.path}/:detailId`} render={props => <InvestmentDetailPage {...props} />} />
    </Layout>)
}

export default InvestmentPage