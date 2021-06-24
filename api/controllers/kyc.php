<?php
require_once 'helpers/utility.php';

class kyc extends controller{
	public function __construct(){
		parent::__construct();
    }

    public function getKyc(){
        $response = $this->model->getKyc();
        echo Utility::convertToJSON($response); 
    }

    public function create(){
        $data['postData'] = $_POST; 
        $data['idfile'] = $_FILES['idfile'];

        $response = $this->model->create($data);
        echo Utility::convertToJSON($response);
    }
}