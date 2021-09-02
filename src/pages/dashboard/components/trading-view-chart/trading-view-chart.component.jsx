import React, {useState} from "react";
import { Link } from "react-router-dom";
import TradingViewWidget, { Themes } from "react-tradingview-widget";


import './trading-view-chart.styles.css';

const MARKET_TYPE_DATA = {
  "forex": "FX:EURUSD",
  "stock":"NYSE:PFSI",
  "crypto":"BITFINEX:BTCUSD",
  "indices": "NYSE:NYA",
  "oil-and-gas": "OANDA:BCOUSD"
}

const TradingViewChart = ({...otherProps}) => {
  const [marketType, setMarketType] = useState(MARKET_TYPE_DATA['forex'])

  return (
    <div className="widget-content widget-content-area p-2 pure-black">
      {/* <div id="mixed-chart" class=""></div> */}
      <div className="button-group">
        <Link
          to="?type=forex"
          onClick={(e) => {
            e.preventDefault();
            setMarketType(MARKET_TYPE_DATA["forex"]);
          }}
          className="btn btn-dark btn-flat"
        >
          Forex
        </Link>
        <Link
          to="?type=stock"
          onClick={(e) => {
            e.preventDefault();
            setMarketType(MARKET_TYPE_DATA["stock"]);
          }}
          className="btn btn-dark btn-flat"
        >
          Stock
        </Link>
        <Link
          to="?type=crypto"
          onClick={(e) => {
            e.preventDefault();
            setMarketType(MARKET_TYPE_DATA["crypto"]);
          }}
          className="btn btn-dark btn-flat"
        >
          Cryptocurrency
        </Link>
        <Link
          to="?type=indices"
          onClick={(e) => {
            e.preventDefault();
            setMarketType(MARKET_TYPE_DATA["indices"]);
          }}
          className="btn btn-dark btn-flat"
        >
          Indices
        </Link>
        <Link
          to="?type=oil-and-gas"
          onClick={(e) => {
            e.preventDefault();
            setMarketType(MARKET_TYPE_DATA["oil-and-gas"]);
          }}
          className="btn btn-dark btn-flat"
        >
          Oil &amp; Gas
        </Link>
      </div>
      <TradingViewWidget
        className="trading-view-widget"
        symbol={marketType}
        theme={Themes.LIGHT}
        locale="fr"
        interval="D"
        details
        {...otherProps}
      />
    </div>)
};

export default TradingViewChart;
