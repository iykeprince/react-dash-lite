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
        $data['email'] = $email = $this->escape_value($_POST['email']);
        $data['new_password'] = $this->escape_value($_POST['new_password']);
        $data['confirm_password'] = $this->escape_value($_POST['confirm_password']);
    
        if($data['new_password'] != $data['confirm_password'] ){
            header('location: '.URL.'change_password?password-reset=lim');
        }else if(strlen($data['new_password']) < 6){
            header('location: '.URL.'change_password?email='.$email.'&password-reset=mmh');
        }else{
            $response = $this->model->changePassword($data);
            if($response == 200){
                header('location: '.URL.'change_password?email='.$email.'&password-reset=chg');
            }else{
                header('location: '.URL.'change_password?email='.$email.'&password-reset=inv');
            }
        }
    }
   
    public function login(){
    	$input = json_decode(file_get_contents('php://input'));
    	$data['email'] = $this->escape_value($input->email);
        $data['password'] = $this->escape_value($input->password);
     
        $response = $this->model->login($data);
        echo $response;
    }

    public function reset_password(){
        $data = array();
        $data['email'] = $this->escape_value($_POST['reset_email']);
        $this->view->forgot_password_msg = $this->model->reset_password($data);
    }
}