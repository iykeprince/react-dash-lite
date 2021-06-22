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

	public function getDeposits(){
		$result = $this->db->getAssoc("SELECT * FROM tbl_fund WHERE user_id={$this->id} AND payment_confirmation='1'");
		return $result;
	}

	public function getWithdraws(){
		$result = $this->db->getAssoc("SELECT * FROM tbl_withdraw WHERE user_id={$this->id} AND confirmation='1'");
		return $result;
	}
	
	public function getPendingTransactions(){
		$deposits = $this->db->getAssoc("SELECT * FROM tbl_fund WHERE user_id={$this->id} AND payment_confirmation='0'");
		$withdraws = $this->db->getAssoc("SELECT * FROM tbl_withdraw WHERE user_id={$this->id} AND confirmation='0'");

		if(!$deposits){
			$deposits = array();
		}
		if(!$withdraws){
			$withdraws = array();
		}

		$result = array_merge($deposits, $withdraws);
		return $result;
	}

}