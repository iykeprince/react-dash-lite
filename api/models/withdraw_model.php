<?php
require_once 'helpers/utility.php';

class withdraw_model extends model{
	public function __construct(){ 
		parent::__construct(); 
		$this->id = Utility::getPayLoad()->data->user_id;
	} 

    public function getWithdrawAccounts(){
        $result =  $this->db->getAssoc("SELECT * FROM tbl_withdrawal_accounts WHERE user_id={$this->id}");
        return $result;
    }

    public function createWithdrawAccount($data){
        $walletName = $data['wallet_name'];
        $walletLabel = $data['wallet_label'];
        $walletAddress = $data['wallet_address'];

        $postData = [
            'user_id' => $this->id,
            'wallet_name' => $walletName,
            'wallet_label' => $walletLabel,
            'wallet_address' => $walletAddress
        ];
       
        $this->db->insert('tbl_withdrawal_accounts', $postData);
        $response['status'] = 200;
        $response['message'] = "Account was created";
        $response['result'] = $this->getWithdrawAccounts();
        return $response;
    }

    public function requestWithdrawFund($data){

        $crypto = $data['crypto'] ;
        $amountUSD = $data['amountUSD'] ;
        $amountCrypto = $data['amountCrypto'];
        $walletAddress = $data['walletAddress'];
        
        $user = $this->db->getItem("SELECT * FROM tbl_users WHERE id={$this->id}");
        $email = $user['email'];
        
        $withdrawData = [
            'user_id' => $this->id,
            'email' => $email,
            'amount' => $amountUSD,//amount in usd
            'withdraw_method' => $crypto,
            'btc_address' => $walletAddress,
            'type' => 'normal'
        ];
        $this->db->insert('tbl_withdraw', $withdrawData);
        //send mail if necessary

        $response['status'] = 200;
        $response['message'] = "Withdraw request has been sent!";
        // $response['test'] = $withdrawData;
        return $response;
    }
}