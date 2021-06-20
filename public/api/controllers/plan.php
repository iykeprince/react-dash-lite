<?php
require_once 'helpers/utility.php';

class plan extends controller{
	public function __construct(){
		parent::__construct();
    }

    public function getPlans(){
        $response = $this->model->getPlans();
        echo Utility::convertToJSON($response); 
    }

    public function createInvestmentPlan(){
        $input = json_decode(file_get_contents('php://input'));
        
  
        $data['amount'] = $this->escape_value($input->amount);
        $data['plan_id'] = $this->escape_value($input->plan_id);
        $data['exchangePrice'] = $this->escape_value($input->price);
        $data['cryptocurrency'] = $this->escape_value($input->base);


        $response = $this->model->createInvestmentPlan($data);
        echo Utility::convertToJSON($response);
    }

}