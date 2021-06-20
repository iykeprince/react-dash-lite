<?php
require_once 'helpers/utility.php';

class plan_model extends model{
	public function __construct(){ 
		parent::__construct(); 
		$this->id = Utility::getPayLoad()->data->user_id;
	}

    public function getPlans(){
        return $this->db->getAssoc('SELECT * FROM tbl_plans');
    }

    public function createInvestmentPlan($data){
        $planId= $data['plan_id'];
        $amount = $data['amount'];
        $cryptoCurrency = $data['cryptocurrency'];
        $exchangePrice = $data['exchangePrice'];
        
        $amountCrypto = $amount/$exchangePrice;

        $user = $this->db->getItem("SELECT * FROM tbl_users WHERE id={$this->id}");

        $fundData = [
            "plan_id" => $planId,
            "plan_amount" => $amount,
            "user_id" => $this->id,
            "billing_method" => 'CRYPTO-WALLET',

        ];

        $this->db->insert('tbl_fund', $fundData);
        $transactionData = [
            'user_id' => $this->id,
            'amount_usd' => $amount,
            'payment_method' => 'CRYPTO-WALLET',
            'crypto_value' => $amountCrypto,
            'crypto_currency' => $cryptoCurrency,
            'crypto_hash' => '----',
            'transaction_type' => 'INVEST'
        ];
        $this->db->insert('tbl_transactions', $transactionData);
        $response['status'] = 200;
        $response['message'] = "Fund created";
        return $response;
    }

}