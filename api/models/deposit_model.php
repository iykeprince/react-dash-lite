<?php
require_once 'helpers/utility.php';

class deposit_model extends model{
	public function __construct(){ 
		parent::__construct(); 
		$this->id = Utility::getPayLoad()->data->user_id;
	} 

    public function updateWallet($data){
        $currency = $data['currency'];
        $amountUSD = $data['amountUSD'];
        $amountCrypto = $data['amountCrypto'];
        $paymentMethod = $data['paymentMethod'];
        $cryptoHash = $data['cryptoHash'];
        
        $user =$this->getUser();
        $tradingWalletBalance = $user['trading_wallet'];
        $tradingWalletBalance += $amountUSD;

        $this->db->update('tbl_users', ['trading_wallet' => $tradingWalletBalance], "id={$this->id}");

        //save transaction
        $transactionData = [
            'user_id' => $this->id,
            'amount_usd' => $amountUSD,
            'payment_method' => strtoupper($paymentMethod),
            'crypto_value' => $amountCrypto,
            'crypto_currency' => $currency,
            'crypto_hash' => $cryptoHash
        ];
        $this->db->insert('tbl_transactions', $transactionData);
        $response['status'] = 200;
        $response['message'] = "Transaction was created";
        return $response;
    }

    private function getUser(){
        return $this->db->getItem("SELECT * FROM tbl_users WHERE id={$this->id}");
    }
}