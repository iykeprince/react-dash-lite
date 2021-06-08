<?php
require_once "helpers/randomgenerator.php";
require_once 'helpers/utility.php';

class register extends controller{
	public function __construct(){
		parent::__construct();
      
		$this->view->js = array('register/js/default.js');
	}
	public function index(){
       $this->view->render('register/index');
    }
    public function create_user(){
        $form = json_decode(file_get_contents('php://input'));
        $data = array();
        $data['my_referal_code'] = RandomGenerator::getToken();
        $data['referal_code'] = $this->escape_value($form->referal_code);
        if($data['referal_code'] == ''){
            $data['referal_code'] = "CB3Q41";
        }
    	$data['fullname'] = $this->escape_value($form->name);
    	$data['email'] = $this->escape_value($form->email);
    	$data['password'] = $this->escape_value($form->password);
        
        $response = $this->model->createUser($data) ;
        
    	echo Utility::convertToJSON($res);
    }

    public function activate($code){
        $response = $this->model->activate($code);
        if($response == "ok"){
            header('location: '.URL.'login/?register=a');
        }else{
            header('location: '.URL.'register?register=f');
        }
    }
}


        
