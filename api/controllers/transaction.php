<?php
require_once 'helpers/utility.php';

class transaction extends controller{
	public function __construct(){
		parent::__construct();
    }

    public function getTransactions() {
        $response = $this->model->getTransactions();
        echo Utility::convertToJSON($response); 
    }

    public function getDeposits(){
        $response = $this->model->getDeposits();
        echo Utility::convertToJSON($response);
    }

    public function getWithdraws() {
        $response = $this->model->getWithdraws();
        echo Utility::convertToJSON($response);
    }

    public function getPendingTransactions() {
        $response = $this->model->getPendingTransactions();
        echo Utility::convertToJSON($response);
    }
}