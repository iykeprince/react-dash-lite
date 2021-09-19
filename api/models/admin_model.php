<?php
require_once 'helpers/utility.php';

class admin_model extends model{
	public function __construct(){ 
		parent::__construct(); 
		$this->id = Utility::getPayLoad()->data->user_id;
	} 

    public function getUserTransactions($id){
        return $this->db->getAssoc("SELECT * FROM tbl_transactions WHERE user_id={$id}");
    }

    public function getAllUsers(){
		$result = $this->db->getAssoc("SELECT * FROM tbl_users");
		return $result;
	}

    public function getAllWithdrawals(){
        $result = $this->db->getAssoc("SELECT * FROM tbl_withdraw INNER JOIN tbl_users ON tbl_withdraw.user_id=tbl_users.id");
        return $result;
    }

    public function getAllDeposits(){
        $result = $this->db->getAssoc("SELECT * FROM tbl_fund INNER JOIN tbl_users ON tbl_fund.user_id=tbl_users.id");
        return $result;
    }

    public function updateTopup($data){
        $investment = $data->investment;
        $profit = $data->profit;
        $tradeBonus = $data->tradeBonus;
        $referalBonus = $data->referalBonus;

        $user = $this->db->getItem("SELECT * FROM tbl_users WHERE id={$data->userId}");
        $fullname = $user['fullname'];
        $investment += (float) $user['amount_in_stock'];
        $profit += (float) $user['available_profit'];
        $tradeBonus += (float) $user['trade_bonus'] ;
        $referalBonus += (float) $user['referal_bonus'];
        $obj = [
            'amount_in_stock' => $investment,
            'available_profit' => $profit,
            'trade_bonus' => $tradeBonus,
            'referal_bonus' => $referalBonus
        ];
        
        $this->db->update('tbl_users', $obj, "id={$data->userId}");
        $response['status'] = 200;
        $response['message'] = "Topup was updated for {$fullname}";
        return $response;
    }

    public function confirmWithdrawal($data){
        $withdrawId = $data['withdraw_id'];
        $updateData = ['confirmation' => 1];
        $updateWhere = "withdraw_id='$withdrawId'";
        $this->db->update('tbl_withdraw', $updateData, $updateWhere);

        $userResult = $this->db->getItem("SELECT * FROM tbl_users INNER JOIN tbl_withdraw ON tbl_users.id=tbl_withdraw.user_id WHERE tbl_withdraw.withdraw_id='$withdrawId'");
       if($userResult){
            $withdrawUserId = $userResult['id'];
            $transaction = $this->db->getItem("SELECT * FROM tbl_transactions WHERE `user_id`='$withdrawUserId' AND transaction_type='WITHDRAW_FUND'");

            if($transaction){
                $transactionId = $transaction['transaction_id'];
                $this->db->update('tbl_transactions', ['transaction_status' => 1], "transaction_id={$transactionId}");
            }
       }

        $response['status'] = 200;
       $response['message'] = "Withdrawal confirmed";
       return $response;
    }

    public function activatePayment($data){
       $depositorId = $data['depositor_id'];
        
       $updateData = ['payment_confirmation' => 1];
       $updateWhere = "depositor_id='$depositorId'";
       $this->db->update('tbl_fund', $updateData, $updateWhere);
       
       $userResult = $this->db->getItem("SELECT * FROM tbl_users INNER JOIN tbl_fund ON tbl_users.id=tbl_fund.user_id WHERE tbl_fund.depositor_id='$depositorId'");
       if($userResult){
            $depositorUserId = $userResult['id'];
            $transaction = $this->db->getItem("SELECT * FROM tbl_transactions WHERE `user_id`='$depositorUserId' AND transaction_type='INVEST'");

            if($transaction){
                $transactionId = $transaction['transaction_id'];
                $this->db->update('tbl_transactions', ['transaction_status' => 1], "transaction_id={$transactionId}");
            }
       }
       $response['status'] = 200;
       $response['message'] = "Payment activated";
       return $response;
    }

    public function deletePayment($data){
        $depositorId = $data['depositor_id'];
         
        $updateWhere = "depositor_id='$depositorId'";
        $this->db->delete('tbl_fund', $updateWhere);
        
        $userResult = $this->db->getItem("SELECT * FROM tbl_users INNER JOIN tbl_fund ON tbl_users.id=tbl_fund.user_id WHERE tbl_fund.depositor_id='$depositorId'");
        if($userResult){
             $depositorUserId = $userResult['id'];
             $transaction = $this->db->getItem("SELECT * FROM tbl_transactions WHERE `user_id`='$depositorUserId' AND transaction_type='INVEST'");
 
             if($transaction){
                 $transactionId = $transaction['transaction_id'];
                 $this->db->delete('tbl_transactions', "transaction_id={$transactionId}");
             }
        }
        $response['status'] = 200;
        $response['message'] = "Payment deleted";
        return $response;
     }

    public function deleteWithdraw($data){
        $withdrawId = $data['withdraw_id'];
         
        $updateWhere = "withdraw_id='$withdrawId'";
        $this->db->delete('tbl_withdraw', $updateWhere);
        
        $userResult = $this->db->getItem("SELECT * FROM tbl_users INNER JOIN tbl_withdraw ON tbl_users.id=tbl_withdraw.user_id WHERE tbl_withdraw.withdraw_id='$withdrawId'");
        if($userResult){
             $withdrawUserId = $userResult['id'];
             $transaction = $this->db->getItem("SELECT * FROM tbl_transactions WHERE `user_id`='$withdrawUserId' AND transaction_type='WITHDRAW_FUND'");
 
             if($transaction){
                 $transactionId = $transaction['transaction_id'];
                 $this->db->delete('tbl_transactions', "transaction_id={$transactionId}");
             }
        }
        $response['status'] = 200;
        $response['message'] = "Withdraw deleted";
        return $response;
     }

    public function updatePassword($data){
        $newPassword= $data['newPassword'];
        $userId = $data['userId'];
        $db_data = [
            'password' => $newPassword
        ];
        $this->db->update('tbl_users', $db_data, "id=$userId");
        $response['status'] = 200;
        $response['message'] = "Password was changed";
        return $response;
    }

    public function toggleUserStatus($id){

		$result = $this->db->getItem("SELECT * FROM tbl_users WHERE id='$id'");
		$status = $result['status'] == 'block' ? 'active' : 'block';

		$db_data = ["status" => $status];
		$where = "id='$id'";
		$this->db->update('tbl_users', $db_data, $where);

		$response['status'] = 200;
		$response['message'] = "$status";
		return $response;
    }

    public function accountSync($data){
        $userId = $data->userId;
        $stockEmail = $data->stockEmail;
        $stockPassword = $data->stockPassword;
       $forexEmail = $data->forexEmail;
         $forexPassword = $data->forexPassword;
        $cryptoWalletId = $data->cryptoWalletId;
        $cryptoWalletPassword = $data->cryptoWalletPassword;

        $db_data = [
            'stock_email' => $stockEmail,
            'stock_password' => $stockPassword,
            'forex_email' => $forexEmail,
            'forex_password' => $forexPassword,
            'crypto_wallet_id' => $cryptoWalletId,
            'crypto_wallet_password' => $cryptoWalletPassword,
            'sync' => 1
        ];
        $where = "id=$userId";
        $this->db->update('tbl_users', $db_data, $where);

        $response['status'] = 200;
		$response['message'] = "Account synchronized";
		return $response;
    }

    
}