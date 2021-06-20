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
}