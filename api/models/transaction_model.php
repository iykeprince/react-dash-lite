<?php
require_once 'helpers/utility.php';

class transaction_model extends model{
	public function __construct(){ 
		parent::__construct(); 
		$this->id = Utility::getPayLoad()->data->user_id;
	}

    public function getTransactions(){
        return $this->db->getAssoc("SELECT * FROM tbl_transactions WHERE user_id={$this->id}");
    }

}