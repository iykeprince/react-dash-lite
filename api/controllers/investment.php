<?php
require_once 'helpers/utility.php';

class investment extends controller{
	public function __construct(){
		parent::__construct();
    }

    public function getInvestments(){
        $response = $this->model->getInvestments();
        echo Utility::convertToJSON($response); 
    }

    public function getInvestmentInfo($id){
        $response= $this->model->getInvestmentInfo($id);
        echo Utility::convertToJSON($response); 
    }
}