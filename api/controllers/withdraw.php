<?php
require_once 'helpers/utility.php';

class withdraw extends controller{
	public function __construct(){
		parent::__construct();
    }

    public function getWithdrawAccounts(){
        $response = $this->model->getWithdrawAccounts();
        echo Utility::convertToJSON($response); 
    }

    public function createWithdrawAccount(){
        $input = json_decode(file_get_contents('php://input'));

        $data['wallet_name'] = $this->escape_value($input->walletName);
        $data['wallet_label'] = $this->escape_value($input->walletLabel);
        $data['wallet_address'] = $this->escape_value($input->walletAddress);

        $response = $this->model->createWithdrawAccount($data);
        echo Utility::convertToJSON($response);
    }

    public function requestWithdrawFund() {
        $input = json_decode(file_get_contents('php://input'));
  
        $data['crypto'] = $this->escape_value($input->crypto);
        $data['amountUSD'] = $this->escape_value($input->amountUSD);
        $data['amountCrypto'] = $this->escape_value($input->exchangedValue);
        $data['walletAddress'] = $this->escape_value($input->wallet_address);

        $response = $this->model->requestWithdrawFund($data);
        echo Utility::convertToJSON($response);
    }

}