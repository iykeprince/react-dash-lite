<?php
require_once 'helpers/utility.php';

class profile extends controller{
	public function __construct(){
		parent::__construct();
    }

	public function getPreference(){
		$response = $this->model->getPreference();
		echo Utility::convertToJSON($response);
	}

    public function updatePersonalProfile() {
		$obj = json_decode(file_get_contents('php://input'));
		
		$data['fullname'] = $this->escape_value($obj->fullname);
    	$data['nickname'] = $this->escape_value($obj->nickname);
    	$data['phone'] = $this->escape_value($obj->phone);
    	$data['telegram'] = $this->escape_value($obj->telegram);
    	$data['dob'] = $this->escape_value($obj->dob);
		
		$response = $this->model->updatePersonalProfile($data);
		echo Utility::convertToJSON($response);
	}

	public function updateAddressProfile() {
		$obj = json_decode(file_get_contents('php://input'));

		$data['address1'] = $this->escape_value($obj->address1);
		$data['address2'] = $this->escape_value($obj->address2);
		$data['state'] = $this->escape_value($obj->state);
		$data['country'] = $this->escape_value($obj->country);
		

		$response = $this->model->updateAddressProfile($data);
		echo Utility::convertToJSON($response);

	}

    public function changeEmail(){
        $input = json_decode(file_get_contents('php://input'));

        $data['email'] = $this->escape_value($input->email);
        $data['confirmEmail'] = $this->escape_value($input->confirmEmail);
        $data['password'] = $this->escape_value($input->password);
        
        $response = $this->model->changeEmail($data);
		echo Utility::convertToJSON($response);
    }

    public function changePassword(){
        $input = json_decode(file_get_contents('php://input'));

        $data['oldPassword'] = $this->escape_value($input->currentPassword);
        $data['newPassword'] = $this->escape_value($input->newPassword);

        $response = $this->model->changePassword($data);
		echo Utility::convertToJSON($response);
    }
}