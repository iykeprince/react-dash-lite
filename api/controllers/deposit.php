
<?php
require_once 'helpers/utility.php';

class deposit extends controller{
	public function __construct(){
		parent::__construct();
    }

    public function updateWallet(){
		  $input = json_decode(file_get_contents('php://input'));
		
        $data['currency'] = $this->escape_value($input->currency);
        $data['amountUSD'] = $this->escape_value($input->amountUSD);
        $data['amountCrypto'] = $this->escape_value($input->amountCrypto);
        $data['paymentMethod'] = $this->escape_value($input->paymentMethod);
        $data['cryptoHash'] = $this->escape_value($input->hashValue);

        $response = $this->model->updateWallet($data);
        echo Utility::convertToJSON($response); 
	}

  public function confirmTransaction(){
    $input = json_decode(file_get_contents('php://input'));
		
    $data['transaction_id'] = $this->escape_value($input->transactionId);

    $response = $this->model->confirmTransaction($data);
    echo Utility::convertToJSON($response); 
  }
  
}