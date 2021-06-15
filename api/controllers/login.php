<?php
require_once 'helpers/utility.php';
class Login extends controller{

	public function __construct(){
		parent::__construct();
	} 
	
  
    public function recover_password(){
        $data = array();
        $data['email'] = $this->escape_value($_POST['email']);
       
        $response = $this->model->recover_password($data);
        $email_hash = md5($data['email']);
        if($response == "valid"){
            header('location: '.URL.'login/forgot_password?token='.$email_hash.'&ini=mail_sent');
        }else{
        header('location: '.URL.'login/forgot_password?token='.$email_hash.'&ini=invalid');
        }
    }
    
    public function changePassword(){
        $input = json_decode(file_get_contents('php://input'));
        $data['code'] = $email = $this->escape_value($input->code); //code is gotten from query param
        $data['password'] = $this->escape_value($input->password);
    
        $response = $this->model->changePassword($data);
        echo json_encode($response);
    }
   
    public function login(){
    	$input = json_decode(file_get_contents('php://input'));
    	$data['email'] = $this->escape_value($input->email);
        $data['password'] = $this->escape_value($input->password);
     
        $response = $this->model->login($data);
        echo $response;
    }

    public function reset_password(){
        $input = json_decode(file_get_contents('php://input'));
        $data['email'] = $this->escape_value($input->email);
        $response = $this->model->recover_password($data);
        echo json_encode($response);
    }
}