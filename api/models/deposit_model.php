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
            'amount' => $amountUSD,
            'payment_method' => strtoupper($paymentMethod),
            'crypto_value' => $amountCrypto,
            'crypto_currency' => $currency,
            'crypto_hash' => $cryptoHash,
            'transaction_type' => 'DEPOSIT'
        ];
        $this->db->insert('tbl_transactions', $transactionData);
        $response['status'] = 200;
        $response['message'] = "Transaction was created";
        return $response;
    }

    public function confirmTransaction($data){
        $transactionHash = $data['transaction_id'];
        $result = $this->db->getItem("SELECT * FROM tbl_transactions WHERE crypto_hash={$transactionHash}");
        
        $response['status'] = 200;
        $response['message'] = "Transaction confirmed";
        $response['result'] = $result;
        return $response;
    }

    private function getUser(){
        return $this->db->getItem("SELECT * FROM tbl_users WHERE id={$this->id}");
    }
}