<?php
require_once 'helpers/utility.php';

class admin extends controller{
	public function __construct(){
		parent::__construct();
    }

    public function toggleUserStatus(){
        $obj = json_decode(file_get_contents('php://input'));
        $userId = $obj->userId;
        $response = $this->model->toggleUserStatus($userId);
        echo Utility::convertToJSON($response); 
    }

    public function updatePassword(){
        $obj = json_decode(file_get_contents('php://input'));
        $data['newPassword'] = $this->escape_value($obj->newPassword);
        $data['userId'] = $obj->userId;
        $response = $this->model->updatePassword($data);
        echo Utility::convertToJSON($response); 
    }

    public function users(){
        $users = $this->model->getAllUsers();
        echo Utility::convertToJSON($users); 
    }

    public function getUserTransactions($id){
        $transactions = $this->model->getUserTransactions($id);
        echo Utility::convertToJSON($transactions); 
    }

    public function withdrawals(){
        $withdrawals = $this->model->getAllWithdrawals();
        echo Utility::convertToJSON($withdrawals); 
    }

    public function deposits(){
        $deposits = $this->model->getAllDeposits();
        echo Utility::convertToJSON($deposits);
    }

    public function updateTopup(){
        $obj = json_decode(file_get_contents('php://input'));
     
        $response = $this->model->updateTopup($obj);
        echo Utility::convertToJSON($response);
    }

    public function activatePayment(){
        $obj = json_decode(file_get_contents('php://input'));
        $data['depositor_id'] = $obj->depositor_id;

        $response = $this->model->activatePayment($data);
        echo Utility::convertToJSON($response);
    }
    public function confirmWithdrawal(){
        $obj = json_decode(file_get_contents('php://input'));
        $data['withdraw_id'] = $obj->withdraw_id;

        $response = $this->model->confirmWithdrawal($data);
        echo Utility::convertToJSON($response);
    }

    public function deletePayment(){
        $obj = json_decode(file_get_contents('php://input'));
        $data['depositor_id'] = $obj->depositor_id;

        $response = $this->model->deletePayment($data);
        echo Utility::convertToJSON($response);
    }
    public function deleteWithdraw(){
        $obj = json_decode(file_get_contents('php://input'));
        $data['withdraw_id'] = $obj->withdraw_id;
        $response = $this->model->deleteWithdraw($data);
        echo Utility::convertToJSON($response);
    }

    public function accountSync() {
        $obj = json_decode(file_get_contents('php://input'));
        $response = $this->model->accountSync($obj);
        echo Utility::convertToJSON($response);
    }
}