<?php
require_once 'helpers/utility.php';

class investment_model extends model{
	public function __construct(){ 
		parent::__construct(); 
		$this->id = Utility::getPayLoad()->data->user_id;
	}

    public function getInvestments(){
        $result = $this->db->getAssoc("SELECT * FROM tbl_fund INNER JOIN tbl_plans ON tbl_fund.plan_id=tbl_plans.plan_id WHERE tbl_fund.user_id={$this->id}");
        $response['investments'] = $result;
        $amountInvested = 0;
        $amountInvestedCryptoValue = 0;
        $calculatedProfit = 0;
        foreach ($result as $key => $value) {
            $amountInvested += $value['amount'];
            $amountInvestedCryptoValue += $value['crypto_value'];

            $profit = ($value['totalReturns']/100)* $value['amount'];
            $calculatedProfit += $profit;
        }

        $response['amountInvested'] = $amountInvested;
        $response['amountInvestedCryptoValue'] = $amountInvestedCryptoValue;
        $response['calculatedProfit'] = $calculatedProfit;
        return $response;
    }

    public function getInvestmentInfo($id){
        $result = $this->db->getItem("SELECT * FROM tbl_fund INNER JOIN tbl_plans ON tbl_fund.plan_id=tbl_plans.plan_id WHERE depositor_id={$id}");
        return $result;
    }
}