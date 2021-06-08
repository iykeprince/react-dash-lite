<?php
date_default_timezone_set('Africa/Accra');
require_once 'depositor.php'; 
require_once 'receiver.php';
require_once 'helpers/utility.php';

class dashboard_model extends model{
	public function __construct(){ 
		parent::__construct(); 
		// $payLoad = Utility::getPayLoad();
		$this->id = Utility::getPayLoad()->data->user_id;
	} 
	public function auto_manual_mode(){
		//false indicates manual mode
		$flag = $this->stmt_handler("SELECT auto_manual_flag FROM tbl_preference");
		if($flag["auto_manual_flag"] == 0){
			$this->executable("UPDATE tbl_preference SET auto_manual_flag=1 WHERE 1");
			return true;
		}else{
			$this->executable("UPDATE tbl_preference SET auto_manual_flag=0 WHERE 1");
			return false;
		}
	}
	public function auto_manual_pref(){
		return $this->stmt_handler("SELECT * FROM tbl_preference WHERE 1");
	}
	private function stmt_handler_count($sql){
		try{
			$sth =  $this->db->prepare($sql);
			$sth->setFetchMode(PDO::FETCH_ASSOC);
			$sth->execute();
			if($sth->rowCount() > 0){
				return 1;
			}
			return 0;
		}catch(PDOException $ex){
			return $ex->getMessage();
		}
	}
	private function stmt_all_handler($sql){
		try{
			$sth = $this->db->prepare($sql);
			$sth->setFetchMode(PDO::FETCH_ASSOC);
			$sth->execute();
			return $sth->fetchAll();
		}catch(PDOException $ex){
			return $ex->getMessage();
		}
	}
	private function stmt_handler($sql){
		try{
			$sth = $this->db->prepare($sql);
			$sth->setFetchMode(PDO::FETCH_ASSOC);
			$sth->execute();
			return $sth->fetch();
		}catch(PDOException $ex){
			return $ex->getMessage();
		}
	}
	private function executable($sql){
		try{
			$sth = $this->db->prepare($sql);
			return $sth->execute();
		}catch(PDOException $ex){
			return $ex->getMessage();
		}
	}
	public function userInfo(){
		$id = $this->id;
		
		try{
			$data = $this->db->getItem("SELECT * FROM `tbl_users` WHERE id = {$id} ");
		
			return $data ;
		}catch(PDOException $ex){
			return $ex->getMessage();
		}
	}

	public function createSyncAccounts($data){
		$id = $this->id;
		$stockTradeEmail = $data['stockTradeEmail'];
        $stockTradePassword = $data['stockTradePassword'];
        $forexTradeEmail = $data['forexTradeEmail'];
        $forexTradePassword = $data['forexTradePassword'];
        $digitalTradeEmail = $data['digitalTradeEmail'];
        $digitalTradePassword = $data['digitalTradePassword'];

		// $query = "SELECT * FROM tbl_sync WHERE stock_trade_email='$stockTradeEmail' OR forex_trade_email='$forexTradeEmail' OR digital_trade_email='$digitalTradeEmail'";
		// $result = $this->db->getItem($query);
		// if(!$result){
			
		// }

		// $response['status'] = 400;
		// $response['message'] = "It seems your account has already been synchronized";
		// return $response;
		$db_data = [
			"user_id" => $id,
			"stock_trade_email" => $stockTradeEmail,
			"stock_trade_password" => $stockTradePassword,
			"forex_trade_email" => $forexTradeEmail,
			"forex_trade_password" => $forexTradePassword,
			"digital_trade_email" => $digitalTradeEmail,
			"digital_trade_password" => $digitalTradePassword
		];
		$lastInsertedId = $this->db->insert('tbl_sync', $db_data);

		$response['status'] = 200;
		$response['message'] = "Account synchronization was successful";
		return $response;
	}

	public function getSyncAccount(){
		$id = $this->id;
		$result = $this->db->getItem("SELECT * FROM tbl_sync WHERE `user_id`='$id'");
		return $result;
	}

	public function getUserPlan(){
		$id = $this->id;
		$result = $this->db->getItem("SELECT * FROM tbl_users INNER JOIN tbl_plans ON tbl_users.plan_id=tbl_plans.plan_id WHERE tbl_users.id=$id");
		return $result;
	}
	
	public function transactions(){
		try{
			$id = $this->id;
			$result = $this->db->getAssoc("SELECT * FROM `tbl_fund` 
				INNER JOIN `tbl_users` ON `tbl_fund`.`user_id`=tbl_users.id 
				INNER JOIN `tbl_plans` ON tbl_fund.plan_id=tbl_plans.plan_id 
				WHERE tbl_fund.user_id=$id ORDER BY tbl_fund.`date_time_pledged` DESC");
			return $result;
		}catch(PDOException $ex){
			return $ex->getMessage();
		}
	}
	public function fundInfo(){
		try{
			$sth = $this->db->prepare('SELECT * FROM `tbl_fund` WHERE user_id = :id ORDER BY `date_time_pledged` DESC');
			$sth->setFetchMode(PDO::FETCH_ASSOC);
			$sth->execute(array(':id'=>$this->id));
			return $data = $sth->fetch() ;
		}catch(PDOException $ex){
			return $ex->getMessage();
		}
	}

	

	public function withdrawInfo($id){
		try{
			$sth = $this->db->prepare('SELECT * FROM `tbl_withdraw` WHERE user_id = :id ORDER BY `date_pledged` DESC');
			$sth->setFetchMode(PDO::FETCH_ASSOC);
			$sth->execute(array(':id'=>$id));
			return $data = $sth->fetch() ;
		}catch(PDOException $ex){
			return $ex->getMessage();
		}
	}
	
	public function withdrawalInfo($id){
		try{
			$sth = $this->db->prepare('SELECT * FROM `tbl_withdraw` WHERE withdraw_id = :id ORDER BY `date_pledged` DESC');
			$sth->setFetchMode(PDO::FETCH_ASSOC);
			$sth->execute(array(':id'=>$id));
			return $data = $sth->fetch() ;
		}catch(PDOException $ex){
			return $ex->getMessage();
		}
	}

	public function prefInfo(){
		try{
	        $result = $this->stmt_handler("SELECT * FROM tbl_preference");
	        return $result;
		}catch(PDOException $ex){
			return $ex->getMessage();
		}
	}
	public function fundInfoPaid($id){
		try{
			$sth = $this->db->prepare("SELECT * FROM tbl_fund WHERE user_id='$id' AND payment_confirmation='1'");
			$sth->setFetchMode(PDO::FETCH_ASSOC);
			$sth->execute(array(':id'=>$id));
			return $data = $sth->fetch() ;
		}catch(PDOException $ex){
			return $ex->getMessage();
		}
	}
	public function fundInfoConfirm($id){
		try{
			$sth = $this->db->prepare('SELECT * FROM `tbl_fund` WHERE user_id = :id AND payment_confirmation=0');
			$sth->setFetchMode(PDO::FETCH_ASSOC);
			$sth->execute(array(':id'=>$id));
			return $data = $sth->fetch() ;
		}catch(PDOException $ex){
			return $ex->getMessage();
		}
	}
	public function fundPmInfo($id){
		try{
			$sth = $this->db->prepare('SELECT * FROM `tbl_fundPm` WHERE user_id = :id');
			$sth->setFetchMode(PDO::FETCH_ASSOC);
			$sth->execute(array(':id'=>$id));
			return $data = $sth->fetch() ;
		}catch(PDOException $ex){
			return $ex->getMessage();
		}
	}
	public function fundPmInfoPaid($id){
		try{
			$sth = $this->db->prepare("SELECT * FROM tbl_fundPm WHERE user_id='$id' AND payment_confirmation='1'");
			$sth->setFetchMode(PDO::FETCH_ASSOC);
			$sth->execute(array(':id'=>$id));
			return $data = $sth->fetch() ;
		}catch(PDOException $ex){
			return $ex->getMessage();
		}
	}
	public function fundPmInfoConfirm($id){
		try{
			$sth = $this->db->prepare('SELECT * FROM `tbl_fundPm` WHERE user_id = :id AND payment_confirmation=0');
			$sth->setFetchMode(PDO::FETCH_ASSOC);
			$sth->execute(array(':id'=>$id));
			return $data = $sth->fetch() ;
		}catch(PDOException $ex){
			return $ex->getMessage();
		}
	}
	public function referal_list(){ 
		try{
			$id = $this->id;
			$result = $this->db->getAssoc("SELECT * FROM tbl_users WHERE referal_user_id='$id'");
			return $result;
		}catch(PDOException $ex){
			return $ex->getMessage();
		}
	}

	public function logs(){
		$id = $this->id;
		$result = $this->db->getAssoc("SELECT * FROM tbl_logs");
		return $result;
	}
	
	public function referal($user_id){
		$user = $this->userInfo($user_id);
		$referal_user_id = $user["referal_user_id"];
		return $this->userInfo($referal_user_id) ;
	}
	public function depositorInfo($id){
		try{
			$sth = $this->db->prepare('SELECT * FROM `tbl_ph` WHERE user_id = :id');
			$sth->setFetchMode(PDO::FETCH_ASSOC);
			$sth->execute(array(':id'=>$id));
			return $data = $sth->fetch() ;
		}catch(PDOException $ex){
			return $ex->getMessage();
		}
	}
	public function depositorPhInfo($id){
		try{
			$sth = $this->db->prepare('SELECT * FROM `tbl_ph` WHERE user_id = :id AND amount_to_pay > 0');
			$sth->setFetchMode(PDO::FETCH_ASSOC);
			$sth->execute(array(':id'=>$id));
			return $data = $sth->fetch() ;
		}catch(PDOException $ex){
			return $ex->getMessage();
		}
	}
	
	public function changePassword($data){
		$id = $this->id;
		$oldPassword = $data['oldPassword'];
		$newPassword = $data['newPassword'];
		$confirmPassword = $data['confirmPassword'];

		$result = $this->db->getCount("SELECT * FROM tbl_users WHERE `password` LIKE %$oldPassword%");
		if($result == null){
			return ['code' => 'wrong_password', 'message' => 'Wrong password entered'];
		}else{
			if($newPassword != $confirmPassword){	
				return ['code' => 'password_mismatch', 'message' => 'new password and confirm password do not match'];
			}else {
				$this->db->update('tbl_users', ['password' => $newPassword], "id=$id");
				return ['code' => 'success', 'message'=> 'Password update was successful.'];
			}
		}
	}
	
	public function receiverInfo($id){
		try{
			$sth = $this->db->prepare('SELECT * FROM `tbl_gh` WHERE user_id = :id');
			$sth->setFetchMode(PDO::FETCH_ASSOC);
			$sth->execute(array(':id'=>$id));
			return $data = $sth->fetch() ;
		}catch(PDOException $ex){
			return $ex->getMessage();
		}
	}
	public function timeLeft($id){
		try{
			$sth = $this->db->prepare("SELECT * FROM tbl_ph WHERE user_id='$id' AND payment_confirmation=0");
			$sth->setFetchMode(PDO::FETCH_ASSOC);
			$sth->execute();
			$sth_row = $sth->fetch();
			if($sth->rowCount() > 0){
				$current_depositor_id = $sth_row["depositor_id"];
				$match_sth = $this->db->prepare("SELECT * FROM tbl_merge WHERE depositor_id='$current_depositor_id' AND transaction_completed=0");
				$match_sth->execute();
				$match_sth_row = $match_sth->fetch();
				$date_time_expires = $match_sth_row["date_time_expires"];
				return $date_time_expires;
			}
		}catch(PDOException $ex){
			return $ex->getMessage();
		}
	}
	public function receiver_payment_count($id){
		return count($this->merge_to_receive(Session::get('user_id')));
	}
	public function checkUser($id){
		try{
			$sth = $this->db->prepare('SELECT role FROM tbl_users WHERE id=:id');
			$sth->execute(array(':id'=>$id));
			return $sth->fetch();
		}catch(PDOException $ex){
			echo $ex->getMessage();
		}
	}
	public function editSave($data){
		try{
			$sth = $this->db->prepare('UPDATE tbl_users SET fullname = :fullname, email = :email, bitcoin_address = :bitcoin_address WHERE id = :id');
			$res = $sth->execute(array(
				':fullname'=>$data['fullname'],
				':email'=>$data['email'],
				':bitcoin_address'=>$data['bitcoin_address'],
				':id'=>$data['id']
				) );
			if($res){
				return true;
			}
		}catch(PDOException $ex){
			return $ex->getMessage();
		}
	}
	public function updateDailyProfit(){
	    $current_date_time = (new DateTime('now'))->format('Y-m-d H:i:s');
	    $btokenStmt = $this->stmt_all_handler("SELECT * FROM tbl_btoken");
	    foreach($btokenStmt as $key => $value){
	        if($value['payment_confirmation'] == 0){
	            $planInfo = $this->getPlan($value['plan_id']);
	            if($value['hours_accumulated'] < $planInfo['plan_trading_hours']){
	                $user_id = $value['user_id'];
        	        $total_earnings = $value['daily_profit'] + $value['total_earnings'];
        	        
        	        $start_date = (new DateTime($value['start_date']))->format('Y-m-d H:i:s');
        			$hours_accumulated = $value['hours_accumulated'] + 1;
        	        //$days = round($planTradingHours/24);
        	        $bTokenData = [
        	            'total_earnings' => $total_earnings,
        	            'hours_accumulated' => $hours_accumulated,
        	            'payment_confirmation' => $payment_confirmation
        	        ];
        	        $bTokenWhere = "user_id='$user_id'";
        	        $this->db->update('tbl_btoken', $bTokenData, $bTokenWhere);
	            } else {
	                $user_id = $value['user_id'];
    			    $payment_confirmation = 1;
    			    $bTokenData = [
        	            'payment_confirmation' => $payment_confirmation
        	        ];
        	        $bTokenWhere = "user_id='$user_id'";
        	        $this->db->update('tbl_btoken', $bTokenData, $bTokenWhere);
    			}
	        }
	    }
	    //update user
	    $userStmt = $this->stmt_all_handler("SELECT * FROM tbl_users");
	    foreach($userStmt as $key=>$value){
	        $user_id = $value['id'];
	        
	        //update the referal bonus
	        if($value['level'] != 0){
	            $planInfo = $this->getPlan($value['level']);
	            if($value['reset_plan_flag'] < $planInfo['plan_trading_hours']){
    	            if($value['referal_user_id'] != 0) {
                        $planReferalBonus = $planInfo['plan_ref_bonus'] * $value['amount_of_tokens'];
    	            
            			$referalInfo = $this->userInfo($value['referal_user_id']);
            			$referalId = $referalInfo['id'];
            			$referalBonus = $referalInfo['referal_bonus'] + $planReferalBonus;
            					
            			$referalBonusData = [ "referal_bonus" => $referalBonus ];
            			$referalBonusWhere = "id='$referalId'";
            			$this->db->update('tbl_users', $referalBonusData, $referalBonusWhere);
    				}
	                

        			
        			$total_available_profit = $value['daily_profit'] + $value['available_profit'];
        	        $reset_plan_flag = $value['reset_plan_flag'] + 1;
        	        $userData = [ 
        	            "available_profit" => $total_available_profit,
        	            "reset_plan_flag" => $reset_plan_flag
        	        ];
        	        $userWhere = "id='$user_id'";
        	        $this->db->update('tbl_users', $userData, $userWhere);
	            } elseif($value['reset_plan_flag'] == $planInfo['plan_trading_hours']){
    			 //   $profit_tracker = $value['profit_tracker'] + 1;
    			    $profit_status = 0;
        	        $userData = [ 
        	           // 'profit_tracker' => $profit_tracker,
        	            'profit_status' => $profit_status
        	        ];
        	        $userWhere = "id='$user_id'";
        	        $this->db->update('tbl_users', $userData, $userWhere);
    			}
	        
	        }
	        
	    }
	    return true;
	}
	
	
	public function updateInvest($data){
	   try {
	       $userId = $data['user_id'];
    	   $top_up = $data['top_up'];
    	   $status = $data['status'];
    	   
    	   // if ($status == 'completed') {
    	   //     $this->db->update('tbl_fund', [ 'payment_confirmation'=>1], "user_id='$userId'");
    	   //     $this->db->update('tbl_users', [ 'profit_status'=>1], "id='$userId'");
    	   // } else {
    	   //     $this->db->update('tbl_fund', [ 'payment_confirmation'=>0], "user_id='$userId'");
    	   //     $this->db->update('tbl_users', [ 'profit_status'=>0], "id='$userId'");
    	   // }
    	   
    	    $userInfo = $this->userInfo($userId);//get the user information
	
		    $available_profit = $userInfo['available_profit'];
    	 
    
	       $transactAmount = $available_profit + $top_up;

	       $this->db->update('tbl_users', [ 'available_profit'=>$transactAmount], "id='$userId'");
	 
    	   
    	   $response['status'] = 200;
    	   $response['message'] = "Transaction successful";
    	   return json_encode($response);
	   } catch(PDOException $ex){
	       return $ex->getMessage();
	   }
	}
	
	
	public function fundAccount($data){
	  	
	    $userId = $data['id'];
	    $userInfo = $this->userInfo($userId);
	    $email = $data['email'];
	    $planId = $data['plan_id'];
	    $plan_amount = $data['plan_amount'];
	    $plan_details = $this->get_subscribe_package($planId);
		$plan_profit = $plan_details['plan_profit'];
		$plan_ref_bonus = $plan_details['plan_ref_bonus'];
	    $billing_method = $data['billing_method'];
		$date_time_pledged = (new DateTime('now'))->format('Y-m-d, H:i:s');
		$trans_id = 'TR/' . rand(0,9) * $userInfo['id'];
		$existing_available_profit = $userInfo['available_profit'];
		$existing_daily_profit = $userInfo['daily_profit'];
		$existing_amount = $userInfo['amount_in_stock'];
		

		$daily_profit = $plan_profit * $plan_amount;
		$available_profit = $daily_profit;
		$referral_bonus = $plan_ref_bonus * $plan_amount;
		
		
		$final_available_profit = $existing_available_profit + $available_profit;
		$final_daily_profit = $existing_daily_profit + $daily_profit;
		$final_amount = $existing_amount + $plan_amount;
		
	
		try{
			
			$fund_sth = $this->db->prepare('SELECT * FROM tbl_fund WHERE user_id = :id AND payment_confirmation = :pay_confirm');
			$fund_sth->execute(array(':id'=>$userId,
								':pay_confirm'=>0));

			if($fund_sth->rowCount() > 0){
				return 'exists';
			}else{
               
				$fundTable = "tbl_fund";
				$fundData = [
					'user_id'=>$userId ,
					'trans_id'=>$trans_id,
					'email'=>$email,
					'plan_id' => $planId,
					'plan_amount'=>$plan_amount,
					'billing_method'=> $billing_method,
					'date_time_pledged'=>$date_time_pledged,	
					'payment_confirmation'=>0
				];
				$this->db->insert($fundTable, $fundData);
				
				$updateUserData = [ 'level' => $planId,
									'amount_in_stock' => $final_amount,
									'daily_profit' => $final_daily_profit,
									'available_profit' => $final_available_profit
				 ];
				$updateUserWhere = "id='$userId'";
				$this->db->update('tbl_users', $updateUserData, $updateUserWhere);
				

				$referalId = $userInfo['referal_user_id'];
    			$referalInfo = $this->userInfo($referalId);
    			$referalBonus = (int) $referalInfo['referal_bonus'] + $referral_bonus;
    					
    			$referalBonusData = [ "referal_bonus" => $referalBonus ];
    			$referalBonusWhere = "id='$referalId'";
    			$this->db->update('tbl_users', $referalBonusData, $referalBonusWhere);


    			if ($billing_method == 'visa') {
    				return 'visa';
    			} elseif ($billing_method == 'btc') {
    				return 'btc';
    			} elseif ($billing_method == 'pm') {
    				return 'pm';
    			} elseif ($billing_method == 'bank') {
    				return 'bank';
    			} else {
    				return false;
    			}
				
			}
		}catch(PDOException $ex){
			return $ex->getMessage();
		}
	}
	
	public function withdrawAccount($data){
	   try {
	       $userId = $this->id;
	       $userInfo = $this->userInfo($userId);
    	   $email = $userInfo['email'];
    	   $available = $userInfo['available_profit'];
    	   $amount = $data['amount'];
    	   $withdraw_method = 'btc';
    	   $date_pledged = (new DateTime('now'))->format('Y-m-d, H:i:s');
    	   // $referalBonus = $data['referal_bonus'];
	        
	   	   $wallet_address = $data['address'];
	   	   $type = $data['type'];

	   	   if ($amount > $available) {
	   	   		return ['message' => 'insufficient'];
	   	   } else {
	   	   		// $remainAmount = $available - $amount;

		       // $this->db->update('tbl_users', [ 'available_profit'=>$remainAmount], "id='$userId'");

	   	   		$withdraw_sth = $this->db->prepare('SELECT * FROM tbl_withdraw WHERE user_id = :id AND `type` = :type AND confirmation = :pay_confirm');
				$withdraw_sth->execute(array(':id'=>$userId,
				                            ':type'=>$type,
											':pay_confirm'=>0));

				if($withdraw_sth->rowCount() > 0){
					return ['message' => 'Exist! Please wait your previous withdraw request has not been approved yet.'];
				}else{

		       		$insertData = [
		    	       'user_id' => $userId,
		    	       'email' => $email,
		    	       'amount' => $amount,
		    	       'withdraw_method' => $withdraw_method,
		    	       'btc_address' => $wallet_address,
		    	       'type' => $type,
		    	       'date_pledged' => $date_pledged,
		    	       'confirmation' => 0
		    	   ];
		    	   	$this->db->insert('tbl_withdraw', $insertData);
	    	   	
	    	   		return ['message' => 'Your withdrawal request was successful'];

		       }
	   	   }

	   } catch(PDOException $ex){
	       return $ex->getMessage();
	   }
	}


	public function payCharge($data){

		$user_id = $data['userId'];
		$userInfo = $this->userInfo($user_id);
	    $email = $userInfo['email'];
	    $planId = $userInfo['level'];
		
	    $billing_method = 'btc';
		$date_time_pledged = (new DateTime('now'))->format('Y-m-d, H:i:s');
		$trans_id = 'TR/' . rand(0,9) * $userInfo['id'];
		
		$withdrawInfo = $this->withdrawInfo($user_id);
		$amount = $withdrawInfo['amount'];

		$charge = 0.1 * $amount;
		
		try{
			   
			$fundTable = "tbl_fund";
			$fundData = [
				'user_id'=>$user_id,
				'trans_id'=>$trans_id,
				'email'=>$email,
				'plan_id' => $planId,
				'plan_amount'=>$charge,
				'billing_method'=> $billing_method,
				'date_time_pledged'=>$date_time_pledged,	
				'payment_confirmation'=>0
			];
			$this->db->insert($fundTable, $fundData);

			return 'success';
			
		}catch(PDOException $ex){
			return $ex->getMessage();
		}
	}

	public function checkConfirmation($result){
		$orderId = $result['orderId'];
		$invoice = $result['invoice'];
		$amount = $result['amount'];
		
		$query = "SELECT * FROM tbl_paybear_addresses WHERE order_id='$orderId'";
		$checkResult = $this->db->getItem($query);
		
		$dbInvoice = $checkResult['invoice'];
		if($invoice !== $dbInvoice){
			$update_data = [ 'payment_confirmation' => 1 ];
		}else{

		}
		return $response;
	}

	public function purchaseToken($data){
		$current_date_time = (new DateTime('now'))->format('Y-m-d, H:i:s');
		$userInfo = $this->userInfo($data['user_id']);
		$user_id = $data['user_id'];
		$referal_user_id = $userInfo['referal_user_id'];
		$amount_in_stock = $userInfo['amount_in_stock'];
		$planId = $data['plan_id'];
		
		try{
			$trans_id = $data['trans_id'];
			$amount_in_usd = $data['token_amount'];
			$token_requested = $data['token_amount'];
			$planInfo = $this->getPlan($planId);
			$planProfit = $planInfo['plan_profit'];
			$planTradingHours = $planInfo['plan_trading_hours'];
			$days = round($planTradingHours/24);
			
			$daily_profit = (int) $token_requested * $planProfit;
			$total_earnings = 0;
			$available_profit = $userInfo['available_profit'];
			
			$start_date = $current_date_time;
			$date_time_pledged = $current_date_time;
			$expiry_date = (new DateTime('now'))->modify('+'.$days.' days')->format('Y-m-d, H:i:s');
			$hours_accumulated = 0;
			$payment_confirmation = 0;

			if($token_requested > $amount_in_stock){
				return false;
			}else{
				$sth = $this->db->prepare('INSERT INTO tbl_btoken(
					`user_id`,trans_id,plan_id,amount_in_usd,tokens_bought,daily_profit,total_earnings,date_time_pledged,`start_date`,`expiry_date`,hours_accumulated,payment_confirmation) VALUES(:user_id,:trans_id,:plan_id,:amount_in_usd,:tokens_bought,:daily_profit,:total_earnings,:date_time_pledged,:start_date,:expiry_date,:hours_accumulated,:payment_confirmation)');
	
				$res = $sth->execute(array(
					':user_id'=>$user_id,
					':trans_id'=>$trans_id,
					':plan_id' => $planId,
					':amount_in_usd'=>$amount_in_usd,
					':tokens_bought'=>$token_requested,
					':daily_profit'=>$daily_profit,
					':total_earnings' => $total_earnings,
					':date_time_pledged'=> $date_time_pledged,
					':start_date'=>$start_date,
					':expiry_date'=>$expiry_date,
					':hours_accumulated' => $hours_accumulated,
					':payment_confirmation' => $payment_confirmation
					));
					$this->executable("
					       UPDATE tbl_users 
					       SET amount_of_tokens='$token_requested',
					            available_profit='$available_profit',
					            daily_profit='$daily_profit',
					            profit_status=1
					       WHERE id='$user_id'");
					       
					//update the referal bonus
					$planReferalBonus = $planInfo['plan_ref_bonus'] * $token_requested;
					$referalInfo = $this->userInfo($referal_user_id);
					$referalId = $referalInfo['id'];
					$referalBonus = $referalInfo['referal_bonus'] + $planReferalBonus;
					
					$referalBonusData = [ "referal_bonus" => $referalBonus ];
					$referalBonusWhere = "id='$referalId'";
					$this->db->update('tbl_users', $referalBonusData, $referalBonusWhere);
					
					return true;
			}
		}catch(PDOException $ex){
			return $ex->getMessage();
		}
	}
	public function getBoughtTokens($user_id){
		$sql = "SELECT * FROM tbl_btoken WHERE user_id='$user_id'";
		return $this->stmt_all_handler($sql);
	}
	public function editSaveUser($data){
		try{
			$sth = $this->db->prepare('UPDATE tbl_users SET bitcoin_address = :bitcoin_address WHERE id = :id');
			$res = $sth->execute(array(
				':bitcoin_address'=>$data['bitcoin_address'],
				':id'=>$data['id']
				) );
			if($res){
				return true;
			}
		}catch(PDOException $ex){
			return $ex->getMessage();
		}
	}
	
	public function updateWallet($data){
		try{
			$sth = $this->db->prepare('UPDATE tbl_users SET bitcoin_address = :bitcoin_address WHERE id = :id');
			$res = $sth->execute(array(
				':bitcoin_address'=>$data['bitcoin_address'],
				':id'=>$data['id']
				) );
			if($res){
				return true;
			}
		}catch(PDOException $ex){
			return $ex->getMessage();
		}
	}
	
	public function updateBank($data){
	    
	  
		$id = $data['id'];
		$bank_name = $data['bank_name'];
		$acc_name = $data['acc_name'];
		$acc_num = $data['acc_num'];
		$rout_num = $data['rout_num'];

		try{
			$this->executable("
					       UPDATE tbl_users 
					       SET bank_name='$bank_name',
					            rout_num='$rout_num',
					            acc_name='$acc_name',
					            acc_num='$acc_num'
					       WHERE id='$id'");
			return true;
		}catch(PDOException $ex){
			return $ex->getMessage();
		}
	}
	
		
	public function updateProfile($data){

		$id = $data['id'];
		$mobile = $data['mobile'];
		$city = $data['city'];
		$zip = $data['zip'];
		$country = $data['country'];

		try{
			$this->executable("
					       UPDATE tbl_users 
					       SET mobile='$mobile',
					            zip_code='$zip',
					            city='$city',
					            country='$country'
					       WHERE id='$id'");
			return true;
		}catch(PDOException $ex){
			return $ex->getMessage();
		}
	}

	public function updateUserInstance($data){

		$id = $this->id;
		$fullname = $data['fullname'];
		$mobile = $data['mobile'];
		$zip_code = $data['zip_code'];
		$address = $data['address'];
		$city = $data['city'];
		$country = $data['country'];

		$wallet_address = $data['wallet_address'];

		$linkedIn = $data['linkedIn'];
		$facebook = $data['facebook'];
		$twitter = $data['twitter'];
		$instagram = $data['instagram'];

		$bio = $data['bio'];
		$dob = $data['dob'];

		try{
			$this->db->update('tbl_users', [
				'fullname' => $fullname,
				'mobile' => $mobile,
				'bitcoin_address' => $wallet_address,
				'zip_code' => $zip_code,
				'address' => $address,
				'city' => $city,
				'country' => $country,
				'linkedIn' => $linkedIn,
				'facebook' => $facebook,
				'twitter' => $twitter,
				'instagram' => $instagram,
				'bio' => $bio,
				'dob' => $dob
			], "id='$id'");
	
			return ['message' => 'Profile was successfully updated.'];
		}catch(PDOException $ex){
			return $ex->getMessage();
		}
	}

    public function editPass($data){
		try{
			$sth = $this->db->prepare('UPDATE tbl_users SET password = :password WHERE id = :id');
			$res = $sth->execute(array(
				':password'=>$data['new_password'],
				':id'=>$data['id']
				) );
			if($res){
				return true;
			}
		}catch(PDOException $ex){
			return $ex->getMessage();
		}
	}
	public function load_gh_transaction($user_id){
		try{
			
			$gh_sth_row = $this->stmt_handler("SELECT * FROM tbl_gh WHERE user_id='$user_id'");
			$receiver_id = $gh_sth_row['receiver_id'];
			$merge_sth_row = $this->stmt_handler("SELECT * FROM tbl_merge WHERE receiver_id='$receiver_id' AND transaction_completed=1");
			return $merge_sth_row;
		}catch(PDOException $ex){
			return $ex->getMessage();
		}
	}
	public function load_ph_transaction($user_id){
		try{
			$ph_sth_row = $this->stmt_handler("SELECT * FROM tbl_ph WHERE user_id='$user_id' ");
			$depositor_id = $ph_sth_row['depositor_id'];
			$merge_sth_row = $this->stmt_handler("SELECT * FROM tbl_merge WHERE depositor_id='$depositor_id' AND transaction_completed=1");
			return $merge_sth_row;
		}catch(PDOException $ex){
			return $ex->getMessage();
		}
	}
	//
	public function load_all_gh_transaction(){
		try{
			
			$gh_sth_row = $this->stmt_all_handler("SELECT * FROM tbl_stoken INNER JOIN tbl_users ON tbl_users.id=tbl_stoken.user_id ORDER BY `date_time` DESC LIMIT 10");
			return $gh_sth_row;
		}catch(PDOException $ex){
			return $ex->getMessage();
		}
	}
	public function load_all_ph_transaction(){
		try{
			$ph_sth_row = $this->stmt_all_handler("SELECT * FROM tbl_btoken INNER JOIN tbl_users ON tbl_users.id=tbl_btoken.user_id ORDER BY `date_time_pledged` DESC LIMIT 10");
			return $ph_sth_row;
		}catch(PDOException $ex){
			return $ex->getMessage();
		}
	}
	public function load_all_fund_transaction($user_id){
		try{
			$fund_sth_row = $this->stmt_all_handler("SELECT * FROM tbl_fund INNER JOIN tbl_users ON tbl_users.id=tbl_fund.user_id JOIN tbl_plans ON tbl_fund.plan_id=tbl_plans.plan_id WHERE user_id='$user_id' ");
			return $fund_sth_row;
		}catch(PDOException $ex){
			return $ex->getMessage();
		}
	}
	public function load_all_withdraw_transaction($user_id){
		try{
			$withdraw_sth_row = $this->stmt_all_handler("SELECT * FROM tbl_withdraw INNER JOIN tbl_users ON tbl_users.id=tbl_withdraw.user_id WHERE user_id='$user_id' ");
			return $withdraw_sth_row;
		}catch(PDOException $ex){
			return $ex->getMessage();
		}
	}
	public function activate_payment($data){
	    require_once "helpers/abachamailer.php";
	   // $transaction_hash = $data['transaction_hash'];
	   // $email = $data['invoice_email'];
	   // $value_in_btc = $data['value_in_btc'];
	    $wallet_address = $data['address'];
	    
	    $userInfo = $this->stmt_handler("SELECT fullname FROM tbl_users WHERE email='$email'");
	    $fullname = $userInfo['fullname'];
	    
	    $userTransaction = $this->stmt_handler("SELECT * FROM tbl_fund WHERE wallet_address='$wallet_address'");
	    $planId = $userTransaction['plan_id'];
	    $amountInBTC = $userTransaction['amount_in_btc'];
	    $amountInUSD = $userInfo['amount_in_stock'] + $userTransaction['amount_in_usd'];
	    if($value_in_btc >= $amountInBTC){
    	    $sql = "UPDATE tbl_fund SET payment_confirmation=1 WHERE email='$email'";
    	    $this->executable($sql);
    	    
    	    $addressSql = "UPDATE tbl_paybear_addresses SET completed=1 WHERE address='$wallet_address'";
    	    $this->executable($addressSql);
    	    
    	    $userSql = "UPDATE tbl_users SET amount_in_stock='$amountInUSD', level='$plan_id' WHERE email='$email'";
    	    $this->executable($userSql);
    	    
    	    
    	    $data['token_amount'] = $userTransaction['amount_in_usd'];
    	    $data['user_id'] = $userTransaction['user_id'];
    	    $data['trans_id'] = $userTransaction['trans_id']; 
    	    $data['plan_id'] = $userTransaction['plan_id'];
    	    $this->purchaseToken($data);
    	    
    	    $abachaMailer = new AbachaMailer('mail.bitterio.com','info@bitterio.com','Bitterio.com');
    	    $abachaMailer->setFrom("info@bitterio.com", "Bitterio Support");
    	    $abachaMailer->setTo($email, $fullname);
    	    $abachaMailer->setSubject( 'Bitterio Support');
    	    $abachaMailer->sendMail();
    	    return "ok";
	    }
	}
	
	public function activate_pmb_payment($data){
	    require_once "helpers/abachamailer.php";
	    try {
	        $userInfo = $this->userInfo($data['user_id']);
	    
    	    $user_id = $data['user_id'];
            $order_id = $data['order_id'];
            $plan_id = $data['plan_id'];
    	    $payee_account = $data['PAYEE_ACCOUNT'];
            $payment_amount = $data['PAYMENT_AMOUNT'] ;
            $payment_unit = $data['PAYMENT_UNITS'];
            $payment_batch_num = $data['PAYMENT_BATCH_NUM'];
            $payer_account = $data['PAYER_ACCOUNT'];
            $timestamp = $data['TIMESTAMPGMT'];
            $order_num = $data['ORDER_NUM'];
            $cust_num = $data['CUST_NUM'];
            $v2_hash = $data['V2_HASH'];
            
            
    		$sth = $this->db->prepare('INSERT INTO tbl_fundPm(
    			user_id,plan_id,order_id,order_num,cust_num,payment_batch_num,payment_amount,payment_unit,payee_account,payer_account,date_of_payment,v2_hash,payment_confirmation) VALUES(:user_id,:plan_id,:order_id,:order_num,:cust_num,:payment_batch_num,:payment_amount,:payment_unit,:payee_account,:payer_account,:date_of_payment,:v2_hash,:payment_confirmation)');
    
    		$res = $sth->execute(array(
    			':user_id'=> $user_id,
    			':plan_id' => $plan_id,
    			':order_id' => $order_id,
    			':order_num'=>$order_num,
    			':cust_num'=>$cust_num,
    			':payment_batch_num'=>$payment_batch_num,
    			':payment_amount' => $payment_amount,
    			':payment_unit'=> $payment_unit,
    			':payee_account'=>$payee_account,
    			':payer_account'=>$payer_account,
    			':date_of_payment' => $timestamp,
    			':v2_hash' => $v2_hash,
    			':payment_confirmation' => 0
    			));
    			$this->executable("
    			       UPDATE tbl_users 
    			       SET amount_in_stock='$payment_amount', level='$plan_id'
    			       WHERE id='$user_id'");
    			       
        	    
        	    $data['token_amount'] = $payment_amount;
        	    $data['user_id'] = $user_id;
        	    $data['trans_id'] = $order_id; 
        	    $data['plan_id'] = $plan_id;
        	    $this->purchaseToken($data);
        	    
        	    $email = $userInfo['email'];
        	    $fullname = $userInfo['fullname'];
        	    $abachaMailer = new AbachaMailer('mail.bitterio.com','info@bitterio.com','Bitterio.com');
        	    $abachaMailer->setFrom("info@bitterio.com", "Bitterio Support");
        	    $abachaMailer->setTo($email, $fullname);
        	    $abachaMailer->setSubject( 'Bitterio Support');
        	    $abachaMailer->sendMail();
        	    return "ok";
        	    
	    }catch(PDOException $ex){
			return $ex->getMessage();
	    }
    	    
	}
	
	public function getPaybearAddressInfoByOrderId($orderId){
	    $query = "SELECT * FROM tbl_paybear_addresses WHERE order_id='$orderId'";
	    $result = $this->db->getItem($query);
	    return $result;
	}
	
	private function check_if_receiver_has_been_fully_paid($receiver_id,$expected_amount){
		$total_money_paid=0;
		$gh_merge_sel = $this->db->prepare("SELECT * FROM tbl_merge WHERE receiver_id=:receiver_id AND transaction_completed=1");
				$gh_merge_sel->execute(array(':receiver_id'=>$receiver_id));

		while($gh_merge_sel_row = $gh_merge_sel->fetch()){//loop to add up the total amount being paid by depositor
			$total_money_paid += $gh_merge_sel_row['depositor_pay'];
		}
		if($total_money_paid == $expected_amount){
			return true;
		}
		return false;
	}
	private function add_to_get_help($user_id,$receiver_obj){
		try{
			$sth = $this->db->prepare('SELECT * FROM tbl_gh WHERE user_id=:user_id ');
			$sth->setFetchMode(PDO::FETCH_ASSOC);
			$sth->execute(array(':user_id'=>$user_id));
			$count = $sth->rowCount();
			if($count > 0){
				$sth = $this->db->prepare('UPDATE tbl_gh SET level_id=:level_id,amount_to_receive=:amount_to_receive,
											amount_received=:amount_received,date_gh=:date_gh,time_gh=:time_gh
											WHERE user_id=:user_id');
				$sth->execute(array(
									':user_id'=>$user_id,
									':level_id'=>$receiver_obj->getLevelId(),
									':amount_to_receive'=>$receiver_obj->getAmountToReceive(),
									':amount_received'=>$receiver_obj->getAmountReceived(),
									':date_gh'=>$receiver_obj->getDateGH(),
									':time_gh'=>$receiver_obj->getTimeGH()
									));
			}else{
				$sth = $this->db->prepare('INSERT INTO tbl_gh(user_id, level_id,amount_to_receive, amount_received, date_gh,time_gh) 
											VALUES(:user_id, :level_id, :amount_to_receive, :amount_received, :date_gh, :time_gh)');
				$sth->execute(array(
								':user_id'=>$user_id,
								':level_id'=>$receiver_obj->getLevelId(),
								':amount_to_receive'=>$receiver_obj->getAmountToReceive(),
								':amount_received'=>$receiver_obj->getAmountReceived(),
								':date_gh'=> $receiver_obj->getDateGH(),
								':time_gh'=>$receiver_obj->getTimeGH()
								));
			}
		}catch(PDOException $ex){
			return $ex->getMessage();	
		}
	}
	public function decline_payment_without($depositor_id){
		try{
			$depositor = new Depositor();
			$receiver = new Receiver();
			$amount_to_receive = 0;
			$new_those_to_pay_me='';

			$decline_sth = $this->db->prepare("SELECT * FROM tbl_ph WHERE depositor_id='$depositor_id'");
			$decline_sth->execute();
			$ph_row = $decline_sth->fetch();
			$user_id = $ph_row['user_id'];

			$merge_sth = $this->db->prepare("SELECT * FROM tbl_merge WHERE depositor_id='$depositor_id'");
			$merge_sth->execute();
			
			while($merge_row = $merge_sth->fetch()){
				$depositor_pay = $merge_row['depositor_pay'];
				$receiver_id=$merge_row['receiver_id'];

				$gh_sth = $this->db->prepare('SELECT * FROM tbl_gh WHERE receiver_id=:receiver_id');
				$gh_sth->execute(array(':receiver_id'=>$receiver_id));
				$gh_sth_row = $gh_sth->fetch();

				$amount_to_receive = $gh_sth_row['amount_to_receive'] + $depositor_pay;
				$amount_received = $gh_sth_row['amount_received'] - $depositor_pay;
				$those_to_pay_me = explode(',', $gh_sth_row['those_to_pay_me']);
				foreach ($those_to_pay_me as $key => $value) {
					if($value != $user_id){
						$new_those_to_pay_me .= $value.',';
					}
				}
				$new_those_to_pay_me = substr($new_those_to_pay_me, 0, -1);
				$update_gh_sth = $this->db->prepare('UPDATE tbl_gh SET amount_to_receive=:amount_to_receive,amount_received=:amount_received,those_to_pay_me=:those_to_pay_me WHERE receiver_id=:receiver_id');
				$update_gh_sth->execute(array(':amount_to_receive'=>$amount_to_receive,
											  ':amount_received'=>$amount_received,
											  ':those_to_pay_me'=>$new_those_to_pay_me,
											  ':receiver_id'=>$receiver_id));
			}

			$this->executable("DELETE FROM tbl_merge WHERE depositor_id='$depositor_id'");

			$this->executable("DELETE FROM tbl_ph WHERE depositor_id='$depositor_id'");
			return true;
		}catch(PDOException $ex){
			return  $ex->getMessage();
		}
	}
	public function decline_payment($depositor_id){
		try{
			$depositor = new Depositor();
			$receiver = new Receiver();
			$amount_to_receive = 0;
			$new_those_to_pay_me='';

			$decline_sth = $this->db->prepare("SELECT * FROM tbl_ph WHERE depositor_id='$depositor_id'");
			$decline_sth->execute();
			$ph_row = $decline_sth->fetch();
			$user_id = $ph_row['user_id'];

			$merge_sth = $this->db->prepare("SELECT * FROM tbl_merge WHERE depositor_id='$depositor_id'");
			$merge_sth->execute();
			
			while($merge_row = $merge_sth->fetch()){
				$depositor_pay = $merge_row['depositor_pay'];
				$receiver_id=$merge_row['receiver_id'];

				$gh_sth = $this->db->prepare('SELECT * FROM tbl_gh WHERE receiver_id=:receiver_id');
				$gh_sth->execute(array(':receiver_id'=>$receiver_id));
				$gh_sth_row = $gh_sth->fetch();

				$amount_to_receive = $gh_sth_row['amount_to_receive'] + $depositor_pay;
				$amount_received = $gh_sth_row['amount_received'] - $depositor_pay;
				$those_to_pay_me = explode(',', $gh_sth_row['those_to_pay_me']);
				foreach ($those_to_pay_me as $key => $value) {
					if($value != $user_id){
						$new_those_to_pay_me .= $value.',';
					}
				}
				$new_those_to_pay_me = substr($new_those_to_pay_me, 0, -1);
				$update_gh_sth = $this->db->prepare('UPDATE tbl_gh SET amount_to_receive=:amount_to_receive,amount_received=:amount_received,those_to_pay_me=:those_to_pay_me WHERE receiver_id=:receiver_id');
				$update_gh_sth->execute(array(':amount_to_receive'=>$amount_to_receive,
											  ':amount_received'=>$amount_received,
											  ':those_to_pay_me'=>$new_those_to_pay_me,
											  ':receiver_id'=>$receiver_id));
			}

			$this->executable("DELETE FROM tbl_merge WHERE depositor_id='$depositor_id'");

			$this->executable("DELETE FROM tbl_ph WHERE depositor_id='$depositor_id'");
			$this->executable("UPDATE tbl_users SET status='block' WHERE id='$user_id'");
			return true;
		}catch(PDOException $ex){
			return  $ex->getMessage();
		}
	}
	public function check_reset_plan_flag($id){
		$userInfo = $this->userInfo($id);
		if($userInfo['reset_plan_flag'] == 1){
			return "show_reset_plan_dialog";
		}
	}
	public function recycle_plan($id){
		$userInfo = $this->userInfo($id);
		$level_id = $userInfo['level'];
		$data = array();
		$data['user_id'] = $userInfo['id'];
		$this->provide_help($level_id, $data);
	}
	//Automatic merging algorithm...
	public function provide_help($level_id,$data){
		$user_id = $data['user_id'];
		$date_ph = (new DateTime('now'))->format('Y-m-d');
		$time_ph = (new DateTime('now'))->format('H:i:s');
		$depositor = new Depositor();
		$receiver = new Receiver();
		$user_logged_ph_id = $data['user_id'];
		$plan_package = $this->get_subscribe_package($level_id);
		$package_income = $plan_package['level_income'];
		$userInfo = $this->userInfo($user_id);//get the user information
		$auto_manual_flag = $this->auto_manual_pref();
		//$current_available_unit = $userInfo['available_unit'];
 
		try{ 
			$ph_sth = $this->db->prepare('SELECT * FROM tbl_ph WHERE user_id = :id AND payment_confirmation = :pay_confirm');
			$ph_sth->execute(array(':id'=>$data['user_id'],
								':pay_confirm'=>0));

			$gh_sth = $this->db->prepare('SELECT * FROM tbl_gh WHERE user_id = :id AND payment_confirmation = :pay_confirm');
			$gh_sth->execute(array(':id'=>$data['user_id'],
								':pay_confirm'=>0));

			if($ph_sth->rowCount() > 0 || $gh_sth->rowCount() > 0){
				return 'exists';
			}else{
				$ph_insert_sth = $this->db->prepare('INSERT INTO tbl_ph(user_id,level_id,amount_to_pay,amount_has_paid,date_pledged,time_pledged,payment_confirmation)
															 VALUES(:user_id,:level_id,:amount_to_pay,:amount_has_paid,:date_pledged,:time_pledged,:payment_confirmation)');
				$ph_insert_sth->execute(array(':user_id'=>$data['user_id'],
												  ':level_id'=>$level_id,
												  ':amount_to_pay'=>$package_income,
												  ':amount_has_paid'=>0,
												  ':date_pledged'=>$date_ph,
												  ':time_pledged'=>$time_ph,
												  ':payment_confirmation'=>0));
				$this->executable("UPDATE tbl_users SET level='$level_id',reset_plan_flag=0 WHERE id='$user_id'");
				//update the referal bonus
				if($userInfo["referal_user_id"] != 0) {
                    $ten_pacent = (10/100) * $package_income;
                    $referal_id = $userInfo["referal_user_id"];
                    $referal_user = $this->userInfo($referal_id);
                    $prev_referal_bonus = (int) $referal_user['referal_bonus'] + $ten_pacent;
                    $update_ref_sth = $this->db->prepare("UPDATE tbl_users SET referal_bonus='$prev_referal_bonus' WHERE
                    id='$referal_id'");
                    $update_ref_sth->execute();
				}
				//fetch the depositor info
				if($auto_manual_flag["auto_manual_flag"] == 1 ){
					$sel_sth = $this->db->prepare("SELECT * FROM tbl_ph WHERE user_id='$user_id' AND payment_confirmation=0");
					$sel_sth->execute();
					$ph_row = $sel_sth->fetch();

					$receive_sth = $this->db->prepare("SELECT * FROM tbl_gh WHERE level_id='$level_id' AND payment_confirmation=0 AND amount_to_receive > 0");
					$receive_sth->execute();
					$gh_row=$receive_sth->fetch();
					if($receive_sth->rowCount() > 0){
						$receiver->id = $gh_row['receiver_id'];
						$receiver->user_id = $gh_row['user_id'];
						$receiver->level = $gh_row['level_id'];
						$receiver->date_gh = $gh_row['date_gh'];
						$receiver->time_gh = $gh_row['time_gh'];
						$receiver->amount_to_receive = $gh_row['amount_to_receive'];
						$receiver->amount_received = $gh_row['amount_received'];
						$receiver->those_to_pay_me = $gh_row['those_to_pay_me'];

						$depositor->id = $ph_row['depositor_id'];
						$depositor->user_id = $ph_row['user_id'];
						$depositor->level = $ph_row['level_id'];
						$depositor->date_pledged = $ph_row['date_pledged'];
						$depositor->time_pledged = $ph_row['time_pledged'];
						$depositor->amount_to_pay = $ph_row['amount_to_pay'];
						$depositor->amount_has_paid = $ph_row['amount_has_paid'];
						$depositor->those_to_pay = $ph_row['those_to_pay'];
					
						$this->merging($receiver, $depositor, $package_income);
						return 'matched';
					}
					return 'pending';
				}else{
					return 'pending';
				}
		}
//			$this->search_to_merge();
		}catch(PDOException $ex){
			return $ex->getMessage();
		}

	}
	private function merging($receiver,$depositor,$amount_exchanged){
		$date_time_merge = (new DateTime('now'))->format('Y-m-d H:i:s');
		$date_time_expires = (new DateTime('now'))->modify('+ 12 hours')->format('Y-m-d H:i:s');
		$those_to_pay=$depositor->those_to_pay;
		$those_to_pay_me=$receiver->those_to_pay_me;
		$receiver_user_id = $receiver->user_id;
		$depositor_pays = 0;
        $receiver_collects = 0;
		// $check_if_status_is_active_sth = $this->userInfo($receiver_user_id);
		//this merges a depositor to the receiver if and only if the receiver has an active status...
			try{
				if($amount_exchanged < $receiver->amount_to_receive){
					$receiver->amount_to_receive -= $amount_exchanged;
					$receiver->amount_received += $amount_exchanged;
					$depositor->amount_has_paid += $amount_exchanged;
					$depositor_pays = $amount_exchanged;
                    $receiver_collects = $amount_exchanged;
					$depositor->amount_to_pay = 0;
				}else if($amount_exchanged > $receiver->amount_to_receive){
					$receiver->amount_received += $receiver->amount_to_receive;
                    $depositor->amount_to_pay -= $receiver->amount_to_receive;;
                    $depositor->amount_has_paid += $receiver->amount_to_receive;
                    $depositor_pays = $receiver->amount_to_receive;
                    $receiver_collects = $receiver->amount_to_receive;
                    $receiver->amount_to_receive = 0;
				}else{
				    $receiver->amount_received += $amount_exchanged;
                    $depositor->amount_has_paid += $amount_exchanged;
                    $depositor_pays = $amount_exchanged;
                    $receiver_collects = $amount_exchanged;
                    $receiver->amount_to_receive = 0;
                    $depositor->amount_to_pay = 0;
				}
				if(empty($those_to_pay)){
					$those_to_pay = $receiver->user_id;
				}else{
					$those_to_pay .= ",".$receiver->user_id;
				}
				if(empty($those_to_pay_me)){
					$those_to_pay_me = $depositor->user_id;
				}else{
					$those_to_pay_me .= ",".$depositor->user_id;
				}
				$merge_sth = $this->db->prepare("INSERT INTO tbl_merge(depositor_id,receiver_id,depositor_pay,receiver_collects,date_time_merge,date_time_expires,transaction_completed)
													 VALUES('$depositor->id','$receiver->id','$depositor_pays','$receiver_collects','$date_time_merge','$date_time_expires','0')");
					$merge_sth->execute();
					$update_ph_sth = $this->db->prepare('UPDATE tbl_ph SET amount_to_pay=:amount_to_pay,amount_has_paid=:amount_has_paid,those_to_pay=:those_to_pay WHERE depositor_id=:depositor_id');
					$update_ph_sth->execute(array(':amount_to_pay'=>$depositor->amount_to_pay,
												 ':amount_has_paid'=>$depositor->amount_has_paid,
												 ':those_to_pay'=>$those_to_pay,
												 ':depositor_id'=>$depositor->id));
					$update_gh_sth = $this->db->prepare('UPDATE tbl_gh SET amount_to_receive=:amount_to_receive,amount_received=:amount_received,those_to_pay_me=:those_to_pay_me WHERE receiver_id=:receiver_id');
					$update_gh_sth->execute(array(':amount_to_receive'=>$receiver->amount_to_receive,
												  ':amount_received'=>$receiver->amount_received,
												  ':those_to_pay_me'=>$those_to_pay_me,
												  ':receiver_id'=>$receiver->id));
		}catch(PDOException $ex){
			return $ex->getMessage();
		}
	}
	private function search_to_merge(){
		$receiver = new Receiver();
		$depositor = new Depositor();
		try{
			$search_ph_sth = $this->db->prepare('SELECT * FROM tbl_gh WHERE payment_confirmation=0 AND amount_to_receive > 0');
			$search_ph_sth->execute();
			$search_ph_sth_row = $search_ph_sth->fetch();
			$receiver->id = $search_ph_sth_row['id'];
			$receiver->user_id = $search_ph_sth_row['user_id'];
			$receiver->level = $search_ph_sth_row['level_id'];
			$receiver->date_gh = $search_ph_sth_row['date_pledged'];
			$receiver->time_gh = $search_ph_sth_row['time_pledged'];
			$receiver->amount_to_receive = $search_ph_sth_row['amount_to_receive'];
			$receiver->amount_received = $search_ph_sth_row['amount_received'];
			$receiver->those_to_pay_me = $search_ph_sth_row['those_to_pay_me'];


			$search_gh_sth = $this->db->prepare('SELECT * FROM tbl_ph WHERE payment_confirmation=0 AND amount_to_pay > 0');
			$search_gh_sth->execute();
			$search_gh_sth_row = $search_gh_sth->fetch();
			$depositor->id = $search_gh_sth_row['id'];
			$depositor->user_id = $search_gh_sth_row['user_id'];
			$depositor->level = $search_gh_sth_row['level_id'];
			$depositor->date_gh = $search_gh_sth_row['date_gh'];
			$depositor->time_gh = $search_gh_sth_row['time_gh'];
			$depositor->amount_to_pay = $search_gh_sth_row['amount_to_pay'];
			$depositor->amount_has_paid = $search_gh_sth_row['amount_has_paid'];
			$depositor->those_to_pay = $search_gh_sth_row['those_to_pay'];

			foreach ($search_gh_sth_row as $gh_key => $gh_value) {
				foreach ($search_ph_sth_row as $ph_key => $ph_value) {
					if($gh_value['level_id'] == $ph_value['level_id'] && $gh_value['amount_to_receive'] > 0 && $ph_value['amount_to_pay'] > 0){
						$level_income = $this->get_subscribe_package($gh_value['level_id']);
						$this->merging($receiver,$depositor,$level_income['level_income']);
					}
				}
			}
		}catch(PDOException $ex){
			echo $ex->getMessage();
		}
	}
	public function get_help($id){
		$date_gh = (new DateTime('now'))->format('Y-m-d');
		$time_gh = (new DateTime('now'))->format('H:i:s');
		try{
			$sth = $this->db->prepare("SELECT * FROM tbl_ph WHERE receiver_id=:id AND payment_confirmation='confirmed'");
			$sth->setFetchMode(PDO::FETCH_ASSOC);
			$sth->execute(array('id'=>$id));
			$data = $sth->fetch();
			if($sth->rowCount() > 0){
				return false;
			}else{
				$sth = $this->db->prepare("INSERT INTO tbl_gh(user_id,expected_amount,date_gh,time_gh,payment_status) 
					VALUES(:user_id,:expected_amount,:date_gh,:time_gh,:payment_status)");
				$sth->execute(array(':user_id'=>$id,
									':expected_amount'=>$data['expected_amount'],
									':date_gh'=>$date_gh,
									':time_gh'=>$time_gh,
									':payment_status'=>$data['payment_status']));
				$del_sth = $this->db->prepare('DELETE FROM tbl_gh WHERE id = :id');
				$del_sth->execute();
				return true;
			}
		}catch(PDOException $ex){
			return $ex->getMessage();
		}
	}
	
	public function check_if_ph_user_exist($user_id){
		try{
			$sth = $this->db->prepare('SELECT * FROM tbl_ph WHERE user_id=:user_id');
			$sth->execute(array(':user_id'=>$user_id));
			if($sth->rowCount() > 0){
				return true;
			}else{
				return false;
			}
		}catch(PDOException $ex){
			return $ex->getMessage();
		}
	}
	public function check_ph_merge_exist($user_id){
		try{
			$sth = $this->db->prepare('SELECT * FROM tbl_ph WHERE user_id=:user_id AND payment_confirmation=0');
			$sth->execute(array(':user_id'=>$user_id));
			$sth_row = $sth->fetch();
			$depositor_id = $sth_row['depositor_id'];

			$chk_merge_sth = $this->db->prepare('SELECT * FROM tbl_merge WHERE depositor_id=:depositor_id AND transaction_completed=0');
			$chk_merge_sth->execute(array(':depositor_id'=>$depositor_id));
			if($chk_merge_sth->rowCount() > 0){
				return true;
			}else{
				return false;
			}
		}catch(PDOException $ex){
			return $ex->getMessage();
		}
	}
	public function check_gh_merge_exist($user_id){
		try{
			$sth = $this->db->prepare('SELECT * FROM tbl_gh WHERE user_id=:user_id AND payment_confirmation=0');
			$sth->execute(array(':user_id'=>$user_id));
			$sth_row = $sth->fetch();
			$receiver_id = $sth_row['receiver_id'];
			//check select from the 'get_help_table' where the user_id = user_logged_in
			//extract the receiver_id of the user_logged_in
			//use the receiver_id to check the merge table if the user has been merged
			$chk_merge_sth = $this->db->prepare('SELECT * FROM tbl_merge WHERE receiver_id=:receiver_id AND transaction_completed=0');
			$chk_merge_sth->execute(array(':receiver_id'=>$receiver_id));
			if($chk_merge_sth->rowCount() > 0){//check if the gher is merged to receive payment
				return true;//if he/she name appear in the gh table and merged is true then display the receiver to pay
			}else{
				return false;//if he/she's name appearr in the gh table and does not appear on merged table then he/she has not been merged!
			} 
		}catch(PDOException $ex){
			return $ex->getMessage(); 
		}
	}
	public function merge_to_pay($user_id){
		$merge_to_pay_list = array();
		try{
			$ph_sth = $this->db->prepare('SELECT * FROM tbl_ph WHERE user_id=:user_id AND payment_confirmation=0');
			$ph_sth->setFetchMode(PDO::FETCH_ASSOC);
			$ph_sth->execute(array(':user_id'=>$user_id));
			$fetch_ph = $ph_sth->fetch();
			//check select from the 'get_help_table' where the user_id = user_logged_in
			
			//extract the receiver_id of the user_logged_in
			//use the receiver_id to check the merge table if the user has been merged
			if($ph_sth->rowCount() > 0){
				if($fetch_ph['those_to_pay'] != ""){

					$depositor_id = $fetch_ph['depositor_id'];
					$those_to_pay = $fetch_ph['those_to_pay'];
					// echo 'ya this guy has pledge '.$depositor_id;
					$those_to_pay_array = explode(",", $those_to_pay);//explode to pay to in array since it's a comma separated string
					
					foreach ($those_to_pay_array as $key => $value) {//loop through each those to pay array
						$those_to_pay_id = $value;
						if($value != $user_id){
							$rec_sth = $this->db->prepare('SELECT * FROM tbl_gh WHERE user_id=:user_id ');
							$rec_sth->setFetchMode(PDO::FETCH_ASSOC);
							$rec_sth->execute(array(':user_id'=>$those_to_pay_id));
							$rec_sth_row = $rec_sth->fetch();
							$receiver_user_id = $rec_sth_row['user_id'];//get the user id of those to pay to!


							$merge_sth = $this->db->prepare('SELECT * FROM tbl_users JOIN tbl_gh ON tbl_users.id=tbl_gh.user_id
															JOIN tbl_merge ON tbl_merge.receiver_id=tbl_gh.receiver_id 
															WHERE tbl_users.id=:receiver_user_id 
															AND tbl_merge.transaction_completed=0');
							$merge_sth->setFetchMode(PDO::FETCH_ASSOC);
							$merge_sth->execute(array(':receiver_user_id'=>$receiver_user_id));
							$merge_to_pay_list[] = $merge_sth->fetch();
						}
					}
				}
				return $merge_to_pay_list;
			}
		}catch(PDOException $ex){
			echo $ex->getMessage();
		}
	}

	public function merge_to_receive($user_id){
		$merge_to_receive_list = array();
		try{
			$gh_sth = $this->db->prepare("SELECT * FROM tbl_gh INNER JOIN tbl_merge ON tbl_gh.receiver_id=tbl_merge.receiver_id
											 WHERE tbl_gh.user_id=:user_id AND tbl_merge.transaction_completed=0");
			$gh_sth->setFetchMode(PDO::FETCH_ASSOC);
			$gh_sth->execute(array(':user_id'=>$user_id));
			$gh_sth_row = $gh_sth->fetch();
			if($gh_sth->rowCount() > 0){
				$receiver_id = $gh_sth_row['receiver_id'];
				$those_to_pay_me = $gh_sth_row['those_to_pay_me'];

				$those_to_pay_me_array = explode(",", $those_to_pay_me);
				foreach ($those_to_pay_me_array as $key => $value) {
					$those_to_pay_me_id = $value;
					if($value != $user_id){
					$ph_sth = $this->db->prepare('SELECT * FROM tbl_ph INNER JOIN tbl_merge ON 
													tbl_ph.depositor_id=tbl_merge.depositor_id WHERE tbl_ph.user_id=:user_id AND 
													tbl_merge.transaction_completed=0');
					$ph_sth->setFetchMode(PDO::FETCH_ASSOC);
					$ph_sth->execute(array(':user_id'=>$those_to_pay_me_id));
					$ph_sth_row = $ph_sth->fetch();
					$depositor_user_id = $ph_sth_row['user_id'];
					// $merge_to_receive_list[] = $ph_sth_row;

					$merge_sth = $this->db->prepare('SELECT * FROM tbl_users JOIN tbl_ph ON 
													tbl_users.id=tbl_ph.user_id JOIN tbl_merge ON
													 tbl_merge.depositor_id=tbl_ph.depositor_id
													 WHERE tbl_users.id=:depositor_user_id
													AND tbl_merge.transaction_completed=0');
					$merge_sth->setFetchMode(PDO::FETCH_ASSOC);
					$merge_sth->execute(array(':depositor_user_id'=>$depositor_user_id));
					$merge_to_receive_list[] = $merge_sth->fetch();
					}
				}
				// print_r($merge_to_receive_list);
				return $merge_to_receive_list;
			}else{
				return NULL;
			}
		}catch(PDOException $ex){
			return $ex->getMessage();
		}
	}

	public function if_ph_not_merged($user_id){
		try{
			$sth = $this->db->prepare("SELECT * FROM tbl_ph WHERE user_id='$user_id'");
			$sth->execute();
			$sth_row = $sth->fetch();
			if($sth_row['those_to_pay']=""){
				return true;
			}
		}catch(PDOException $ex){
			return $ex->getMessage();
		}
	}
	//later implement view payment
	public function load_get_help(){
		try{
			$sth = $this->db->prepare('SELECT * FROM tbl_gh INNER JOIN tbl_users WHERE tbl_gh.user_id=tbl_users.id 
										AND amount_to_receive <> 0 AND tbl_gh.payment_confirmation=0');
			$sth->setFetchMode(PDO::FETCH_ASSOC);
			$sth->execute();
			return $sth->fetchAll();
		}catch(PDOException $ex){
			return $ex->getMessage();
		}
	}
	public function load_provide_help(){
		try{
			$sth = $this->db->prepare('SELECT * FROM tbl_ph INNER JOIN tbl_users WHERE tbl_ph.user_id=tbl_users.id AND amount_to_pay <> 0');
			$sth->setFetchMode(PDO::FETCH_ASSOC);
			$sth->execute();
			return $sth->fetchAll();
		}catch(PDOException $ex){
			return $ex->getMessage();
		}
	}
	public function load_ph_help(){
		try{
			$sth = $this->db->prepare('SELECT * FROM tbl_ph INNER JOIN tbl_users WHERE tbl_ph.user_id=tbl_users.id AND tbl_ph.amount_to_pay > 0 AND tbl_ph.payment_confirmation=0');
			$sth->setFetchMode(PDO::FETCH_ASSOC);
			$sth->execute();
			return $sth->fetchAll();
		}catch(PDOException $ex){
			return $ex->getMessage();
		}
	}
	public function do_merging($data){
		$date_ph = (new DateTime('now'))->format('Y-m-d');
		$time_ph = (new DateTime('now'))->format('H:i:s');
		$date_time_merge = $date_ph.' '.$time_ph;
		$depositor = new Depositor();
		$receiver = new Receiver();
		$amount_has_paid = 0;
		$amount_received = 0;
		$amount_to_pay =0;
		$those_to_pay = "";
		$those_to_pay_me = ""; 

		try{ 
			$ph_sth = $this->db->prepare('SELECT * FROM tbl_ph WHERE depositor_id=:depositor_id');
			$ph_sth->setFetchMode(PDO::FETCH_ASSOC);
			$ph_sth->execute(array(':depositor_id'=>$data['ph_id']));
			$ph_row = $ph_sth->fetch();

			$gh_sth = $this->db->prepare('SELECT * FROM tbl_gh WHERE receiver_id=:receiver_id');
			$gh_sth->setFetchMode(PDO::FETCH_ASSOC);
			$gh_sth->execute(array(':receiver_id'=>$data['gh_id']));
			$gh_row = $gh_sth->fetch();
		
			if($gh_sth->rowCount() > 0){
				$receiver->id = $gh_row['receiver_id'];
				$receiver->user_id = $gh_row['user_id'];
				$receiver->level = $gh_row['level_id'];
				$receiver->date_gh = $gh_row['date_gh'];
				$receiver->time_gh = $gh_row['time_gh'];
				$receiver->amount_to_receive = $gh_row['amount_to_receive'];
				$receiver->amount_received = $gh_row['amount_received'];
				$receiver->those_to_pay_me = $gh_row['those_to_pay_me'];

				$depositor->id = $ph_row['depositor_id'];
				$depositor->user_id = $ph_row['user_id'];
				$depositor->level = $ph_row['level_id'];
				$depositor->date_pledged = $ph_row['date_pledged'];
				$depositor->time_pledged = $ph_row['time_pledged'];
				$depositor->amount_to_pay = $ph_row['amount_to_pay'];
				$depositor->amount_has_paid = $ph_row['amount_has_paid'];
				$depositor->those_to_pay = $ph_row['those_to_pay'];

				$this->merging($receiver, $depositor, $depositor->amount_to_pay);
			}
			// if($depositor->getAmountToPay() != 0  && $receiver->getAmountToReceive() != 0){
			// 	$amount_exchanged = 0;
			// 	if($depositor->getAmountToPay() < $receiver->getAmountToReceive()){
			// 		$amount_exchanged = $depositor->getAmountToPay();
			// 		$amount_has_paid = $depositor->getAmountHasPaid();
			// 		$amount_has_paid += $depositor->getAmountToPay();
			// 		$depositor->setAmountHasPaid($amount_has_paid);

			// 		$amount_received = $receiver->getAmountReceived();
			// 		$amount_received += $depositor->getAmountToPay();
			// 		$receiver->setAmountReceived($amount_received);
			// 		$amount_to_receive = $receiver->getAmountToReceive();
			// 		$amount_to_receive -=$depositor->getAmountToPay();
			// 		$receiver->setAmountToReceive($amount_to_receive);
			// 		$depositor->setAmountToPay(0);

			// 	}else if($depositor->getAmountToPay() > $receiver->getAmountToReceive()){
			// 		$amount_exchanged = $receiver->getAmountToReceive();
			// 		$amount_received = $receiver->getAmountReceived();
			// 		$amount_received += $receiver->getAmountToReceive();
			// 		$receiver->setAmountReceived($amount_received);


			// 		$amount_has_paid = $depositor->getAmountHasPaid();
			// 		$amount_has_paid += $receiver->getAmountToReceive();
			// 		$depositor->setAmountHasPaid($amount_has_paid);

			// 		$amount_to_pay = $depositor->getAmountToPay();
			// 		$amount_to_pay -= $receiver->getAmountToReceive();
			// 		$depositor->setAmountToPay($amount_to_pay);
			// 		$receiver->setAmountToReceive(0);

					
			// 	}else{
			// 		$amount_exchanged = $depositor->getAmountToPay();
			// 		$amount_to_pay = $depositor->getAmountToPay();
			// 		$amount_to_receive = $receiver->getAmountToReceive();
			// 		$amount_has_paid = $amount_to_pay + $depositor->getAmountHasPaid();
			// 		$amount_received = $amount_to_receive + $receiver->getAmountReceived();


			// 		$depositor->setAmountHasPaid($amount_has_paid);
			// 		$receiver->setAmountReceived($amount_received);
			// 		$receiver->setAmountToReceive(0);
			// 		$depositor->setAmountToPay(0);
			// 	}

			// 	//should to one and only one person twice instead merge to two or more different people to pay one person
			// 	if(empty($those_to_pay)){
			// 		$those_to_pay = $gh_row['user_id'];
			// 	}else{
			// 		$those_to_pay .= ",".$gh_row['user_id'];
			// 	}
			// 	if(empty($those_to_pay_me)){
			// 		$those_to_pay_me = $ph_row['user_id'];
			// 	}else{
			// 		$those_to_pay_me .= ",".$ph_row['user_id'];
			// 	}

			// 	$merge_sth = $this->db->prepare('INSERT INTO tbl_merge(depositor_id, receiver_id,depositor_pay,receiver_collects,date_time_merge,transaction_completed) 
			// 													VALUES(:depositor_id,:receiver_id,:depositor_pay,:receiver_collects,:date_time_merge,:transaction_completed) ');
			// 		$merge_sth->execute(array(	':depositor_id'=>$depositor->getDepositorId(),
			// 									':receiver_id'=>$receiver->getReceiverId(),
			// 									':depositor_pay'=>$amount_exchanged,
			// 									':receiver_collects'=>$amount_exchanged,
			// 									':date_time_merge'=>$date_time_merge,
			// 									':transaction_completed'=>0));
			// 		//update the depositor repository
			// 		$update_depo_sth = $this->db->prepare("UPDATE tbl_ph SET amount_to_pay = :amount_to_pay, amount_has_paid=:amount_has_paid,those_to_pay=:those_to_pay WHERE depositor_id=:depositor_id");
			// 		$update_depo_sth->execute(array(':amount_to_pay'=>$depositor->getAmountToPay(),
			// 										':amount_has_paid'=>$depositor->getAmountHasPaid(),
			// 										':those_to_pay'=>$those_to_pay,
			// 										':depositor_id'=>$depositor->getDepositorId()));
			// 		//update the receiver repository
			// 		$update_rec_sth = $this->db->prepare("UPDATE tbl_gh SET amount_to_receive=:amount_to_receive,amount_received=:amount_received,those_to_pay_me=:those_to_pay_me WHERE receiver_id=:receiver_id");
			// 		$update_rec_sth->execute(array(
			// 								':amount_to_receive'=> $receiver->getAmountToReceive(),
			// 								':amount_received'=>$receiver->getAmountReceived(),
			// 								':those_to_pay_me'=>$those_to_pay_me,
			// 								':receiver_id'=>$receiver->getReceiverId()
			// 								));
			// 		//update those to pay column on the ph table

			// }else{

			// }
		}catch(PDOException $ex){
			return $ex->getMessage();
		}
	}
    public function getAllPlans(){
        $query = 'SELECT * FROM tbl_plans';
        $result = $this->db->getAssoc($query);
        return $result;
    }

    public function getPlan($plan_id){
        $query = "SELECT * FROM tbl_plans WHERE plan_id='$plan_id'";
        $result = $this->db->getItem($query);
        return $result;
    }
	public function get_all_subscription(){
		try{
			$sth = $this->db->prepare('SELECT * FROM tbl_plans');
			$sth->setFetchMode(PDO::FETCH_ASSOC);
			$sth->execute();
			return $sth->fetchAll();
		}catch(PDOException $ex){
			return $ex->getMessage();	
		}
	}
	public function get_subscribe_package($plan_id){
		
			$result = $this->db->getItem("SELECT * FROM tbl_plans WHERE plan_id='$plan_id'");
			return $result;
	}
	public function get_current_plan($id){
		$userInfo = $this->userInfo($id);
		$user_level = $userInfo['level'];
		$levelInfo = $this->get_subscribe_package($user_level);
		return $levelInfo;
	}
	public function get_current_ph_plan($id){
		$userInfo = $this->userInfo($id);
		$level = $userInfo['level'];
		$depositorlevelInfo = $this->get_subscribe_package($level);
		return $depositorlevelInfo;
	}
	public function do_the_merging(){
		try{
			$sth = $this->db->prepare("SELECT * FROM tbl_ph INNER JOIN tbl_users WHERE tbl_users.id=tbl_ph.user_id AND tbl_ph.amount_to_pay > 0");
			$sth->setFetchMode(PDO::FETCH_ASSOC);
			$sth->execute();
			return $sth->fetchAll();
		}catch(PDOException $ex){
			return $ex->getMessage();	
		}
	}
	public function view_get_help(){
		try{
			$sth = $this->db->prepare("SELECT * FROM tbl_gh INNER JOIN tbl_users WHERE tbl_users.id=tbl_gh.user_id AND tbl_gh.amount_to_receive > 0");
			$sth->setFetchMode(PDO::FETCH_ASSOC);
			$sth->execute();
			return $sth->fetchAll();
		}catch(PDOException $ex){
			return $ex->getMessage();	
		}
	}
	public function block_user($user_id){
		try{
			$sth = $this->db->prepare("UPDATE tbl_users SET status='block' WHERE id='$user_id'");
			$sth->execute();
		}catch(PDOException $ex){
			return $ex->getMessage();	
		}
	}
	public function un_block_user($user_id){
		try{
			$sth = $this->db->prepare("UPDATE tbl_users SET status='active' WHERE id='$user_id'");
			$sth->execute();
		}catch(PDOException $ex){
			return $ex->getMessage();	
		}
	}
	public function delete_user($user_id){
		try{
			$sth = $this->db->prepare("DELETE FROM tbl_users WHERE id='$user_id'");
			$sth->execute();
		}catch(PDOException $ex){
			return $ex->getMessage();	
		}
	}
	public function confirm_payment($user_id){
		try{
			$sth = $this->db->prepare("UPDATE tbl_fund SET payment_confirmation=1 WHERE depositor_id='$user_id'");
			$sth->execute();
		}catch(PDOException $ex){
			return $ex->getMessage();	
		}
	}
	public function delete_payment($user_id){
		try{
			$sth = $this->db->prepare("DELETE FROM tbl_fund WHERE depositor_id='$user_id'");
			$sth->execute();
		}catch(PDOException $ex){
			return $ex->getMessage();	
		}
	}
	public function confirm_withdraw($user_id){
		try{
		    $withdraw_id = $user_id;
		    $withdrawInfo = $this->withdrawalInfo($withdraw_id);
		    $userId = $withdrawInfo['user_id'];
		    $amount = $withdrawInfo['amount'];
		    $type = $withdrawInfo['type'];
		    
		    $userInfo = $this->userInfo($userId);
		    $available = $userInfo['available_profit'];
		    $trade_bonus = $userInfo['trade_bonus'];
		    $amount_in_stock = $userInfo['amount_in_stock'];
		    
		    if($type == 'bonus'){
		       $new_amount = $trade_bonus - $amount;
		       $sth = $this->db->prepare("UPDATE tbl_users SET trade_bonus='$new_amount' WHERE id='$userId'");
			    $sth->execute();
		    } elseif($type == 'capital'){
		       $new_amount = $amount_in_stock - $amount;
		       $sth = $this->db->prepare("UPDATE tbl_users SET amount_in_stock='$new_amount' WHERE id='$userId'");
			    $sth->execute();
			} else {
		       $new_amount = $available - $amount;
		       $sth = $this->db->prepare("UPDATE tbl_users SET available_profit='$new_amount' WHERE id='$userId'");
			    $sth->execute();
		    }
		    
		    $sth = $this->db->prepare("UPDATE tbl_users SET user_rating=0 WHERE id='$userId'");
			$sth->execute();
		    
			$sth = $this->db->prepare("UPDATE tbl_withdraw SET confirmation=1 WHERE withdraw_id='$user_id'");
			$sth->execute();
			
			return 'success';
		}catch(PDOException $ex){
			return $ex->getMessage();	
		}
	}
	
	public function delete_withdraw($user_id){
		try{
		    $withdraw_id = $user_id;
		    
			$sth = $this->db->prepare("DELETE FROM tbl_withdraw WHERE withdraw_id='$withdraw_id'");
			$sth->execute();
			
			return 'success';
		}catch(PDOException $ex){
			return $ex->getMessage();	
		}
	}
	
	public function block_admin($user_id){
		try{
			$sth = $this->db->prepare("UPDATE tbl_users SET status='block' WHERE id='$user_id'");
			$sth->execute();
		}catch(PDOException $ex){
			return $ex->getMessage();	
		}
	}
	public function un_block_admin($user_id){
		try{
			$sth = $this->db->prepare("UPDATE tbl_users SET status='active' WHERE id='$user_id'");
			$sth->execute();
		}catch(PDOException $ex){
			return $ex->getMessage();	
		}
	}
	
	public function change_state($id){
		try{
			$sth = $this->db->prepare("UPDATE tbl_users SET reset_plan_flag='2' WHERE id='$id'");
			$sth->execute();
		}catch(PDOException $ex){
			return $ex->getMessage();	
		}
	}
	
	public function get_all_pledges(){
		try{
			$sth = $this->db->prepare('SELECT * FROM tbl_ph');
			$sth->setFetchMode(PDO::FETCH_ASSOC);
			$sth->execute();
			return $sth->fetchAll();
		}catch(PDOException $ex){
			return $ex->getMessage();	
		}
	}
	public function get_all_active_users(){
		$sth = $this->db->prepare("SELECT COUNT(*) FROM tbl_users WHERE status='active'");
		$sth->setFetchMode(PDO::FETCH_ASSOC);
		$sth->execute();
		$count  = $sth->fetch();
		return array_shift($count);
	}
	public function get_all_blocked_users(){
		$sth=$this->db->prepare("SELECT COUNT(*) FROM tbl_users WHERE status='block'");
		$sth->setFetchMode(PDO::FETCH_ASSOC);
		$sth->execute();
		$count_fetch = $sth->fetch();
		return array_shift($count_fetch);
	}
	public function get_all_users_count(){
		$sth=$this->db->prepare("SELECT COUNT(*) AS num FROM tbl_users WHERE role='user'");
		$sth->setFetchMode(PDO::FETCH_ASSOC);
		$sth->execute();
		$count_fetch = $sth->fetch();
		return array_shift($count_fetch);
	}
	public function get_all_users($per_page, $offset){
		$sth = $this->db->prepare("SELECT * FROM tbl_users WHERE role='user' LIMIT {$per_page} OFFSET {$offset}");
		$sth->setFetchMode(PDO::FETCH_ASSOC);
		$sth->execute();
		return $sth->fetchAll();
	}
	public function get_all_payment(){
		$sth = $this->db->prepare("SELECT * FROM tbl_fund INNER JOIN tbl_users WHERE tbl_users.id=tbl_fund.user_id");
		$sth->setFetchMode(PDO::FETCH_ASSOC);
		$sth->execute();
		return $sth->fetchAll();
	}
	public function getAllWithdrawals(){
		$result = $this->db->getAssoc("SELECT * FROM tbl_withdraw INNER JOIN tbl_users WHERE tbl_users.id=tbl_withdraw.user_id");
		return $result;
	}
	public function get_all_admins_count(){
		$sth=$this->db->prepare("SELECT COUNT(*) AS num FROM tbl_users WHERE role='admin'");
		$sth->setFetchMode(PDO::FETCH_ASSOC);
		$sth->execute();
		$count_fetch = $sth->fetch();
		return array_shift($count_fetch);
	}
	public function get_all_admins($per_page, $offset){
		try{
			$admin_sth = $this->db->prepare("SELECT * FROM tbl_users WHERE role='admin' LIMIT {$per_page} OFFSET {$offset}");
			$admin_sth->setFetchMode(PDO::FETCH_ASSOC);
			$admin_sth->execute();
			return $admin_sth->fetchAll();
		}catch(PDOException $ex){
			return $ex->getMessage();
		}
	}
	public function get_all_level(){
		try{
			$admin_sth = $this->db->prepare("SELECT * FROM tbl_level ");
			$admin_sth->setFetchMode(PDO::FETCH_ASSOC);
			$admin_sth->execute();
			return $admin_sth->fetchAll();
		}catch(PDOException $ex){
			return $ex->getMessage();
		}
	}

	
	
	//confirmation logic
	public function ph_i_have_paid($depositor_id){
		// try{
		// $sth = $this->db->prepare("SELECT * FROM tbl_ph WHERE depositor_id='$depositor_id'");
		// $sth->execute();
		// $sth_row = $sth->fetch();

		// 	//check if the payment has been confirmed USING THE PRIVATE FUNCTIONS!
					
		// 	if($this->ph_merge_payment_status($depositor_id) == 0){
		// 		return 'payment_not_confirmed_by_gh';
		// 	}else{
		// 		return 'payment_confirmed';
		// 	}
		// }catch(PDOException $ex){
		// 	return $ex->getMessage();
		// }
		return true;
	}

	private function ph_merge_payment_status($depositor_id){
		try{
			$merge_sth = $this->db->prepare("SELECT * FROM tbl_merge WHERE depositor_id=:depositor_id");
			$merge_sth->execute(array(':depositor_id'=>$depositor_id));
			$merge_row = $merge_sth->fetch();
			$transaction_process = $merge_row['transaction_completed'];
			return $transaction_process;
		}catch(PDOException $ex){
			return $ex->getMessage();
		}
	}

	//get the user date time pledged
	public function getPledgeDateTime($user_id){
		try{
			$sth = $this->db->prepare("SELECT * FROM tbl_ph WHERE user_id=:user_id");
			$sth->execute(array(':user_id'=>$user_id));
			$sth_row = $sth->fetch();
			$date = $sth_row['date_pledged'];
			$time = $sth_row['time_pledged'];
			$date_time = $date.' '.$time;
			return $date_time; 
		}catch(PDOException $ex){
			return $ex->getMessage();
		}
	}
	public function total_pher(){
		try{
			$sth = $this->db->prepare("SELECT COUNT(*) FROM tbl_ph WHERE payment_confirmation=0");
			$sth->execute();
			$sth_row = $sth->fetch();
			return array_shift($sth_row); 
		}catch(PDOException $ex){
			return $ex->getMessage();
		}
	}
	public function total_users(){
		try{
			$sth = $this->db->prepare("SELECT COUNT(*) FROM tbl_users");
			$sth->execute();
			$sth_row = $sth->fetch();
			return array_shift($sth_row); 
		}catch(PDOException $ex){
			return $ex->getMessage();
		}
	}
	public function total_gher(){
		try{
			$sth = $this->db->prepare("SELECT COUNT(*) FROM tbl_gh");
			$sth->execute();
			$sth_row = $sth->fetch();
			return array_shift($sth_row); 
		}catch(PDOException $ex){
			return $ex->getMessage();
		}
	}
	public function junzing_admin(){
		$date_gh = (new DateTime('now'))->format('Y-m-d');
		$time_gh = (new DateTime('now'))->format('H:i:s');

		$date_gh = (new DateTime('now'))->format('Y-m-d');
		$time_gh = (new DateTime('now'))->format('H:i:s');
		$package_plan = 0;
		$package_id = 0;
		$package_outcome=0;
	
		try{
			$admin_sel = $this->db->prepare("SELECT * FROM tbl_users WHERE role='admin'");
			$admin_sel->setFetchMode(PDO::FETCH_ASSOC);
			$admin_sel->execute();
			
			$index = 0;
			while ($admin_sel_row = $admin_sel->fetch()) {
				$admin_user_id = $admin_sel_row['id'];
				// echo '<br> id '.$admin_user_id.' name: '.$admin_sel_row["fullname"].'<br>';
				switch ($index%4+1) {
					case 1:
						$package_plan = $this->get_subscribe_package(1);
						$package_id =  $package_plan["package_id"];
						$package_outcome = $package_plan["package_outcome"];
						
						break;
					case 2:
						$package_plan = $this->get_subscribe_package(2);
						$package_id =  $package_plan["package_id"];
						$package_outcome = $package_plan["package_outcome"];
						break;
					case 3:
						$package_plan = $this->get_subscribe_package(3);
						$package_id =  $package_plan["package_id"];
						$package_outcome = $package_plan["package_outcome"];
						break;
				}
				//select gh table and check if the admin already exists
				$select_1 = $this->db->prepare("SELECT * FROM tbl_gh WHERE user_id='$admin_user_id' AND payment_confirmation=0");
				$select_1->execute();
				$select_1_row = $select_1->fetch();
				//update the whole informations of the administrator including "those_to_pay_me" columns!
				if($select_1_row->rowCount() > 0){
					$gh_those_to_pay_me = $select_1_row['those_to_pay_me'];
					$update_1 = $this->db->prepare("UPDATE tbl_gh SET those_to_pay_me='$gh_those_to_pay_me' WHERE user_id='$admin_user_id'");
					$update_1->execute();
				}else{
				//else insert 
					$insert_1 = $this->db->prepare("INSERT INTO tbl_gh(user_id,level_id,amount_to_receive,amount_received,date_gh,time_gh,payment_confirmation) 
										VALUES('$admin_user_id','$package_id','$package_outcome','0','$date_gh','$time_gh','0')");
					$insert_1->execute();
				}
				++$index;
			}		
		}catch(PDOException $ex){
			echo $ex->getMessage(); 
		}
	}

    public function referal_count($user_id){
		try{
			$referal_count_sth = $this->db->prepare("SELECT COUNT(*) FROM tbl_users WHERE referal_user_id='$user_id'");
			$referal_count_sth->execute();
			$referal_count_fetch = $referal_count_sth->fetch();
			return array_shift($referal_count_fetch);
		}catch(PDOException $ex){
			return $ex->getMessage();
		}
	}
	
	public function news_update(){
		try{
			$news_list_sth = $this->db->prepare("SELECT * FROM tbl_news");
			$news_list_sth->setFetchMode(PDO::FETCH_ASSOC);
			$news_list_sth->execute();
			$news_list_fetch = $news_list_sth->fetchAll();
			return $news_list_fetch;
		}catch(PDOException $ex){
			return $ex->getMessage();
		}
	}
	public function cycle_count($user_id){
		try{
			$cycle_count_sth = $this->db->prepare("SELECT no_of_cycle FROM tbl_users WHERE id='$user_id'");
			$cycle_count_sth->execute();
			$cycle_count_fetch = $cycle_count_sth->fetch();
			return $cycle_count_fetch["no_of_cycle"];
		}catch(PDOException $ex){
			return $ex->getMessage();
		}
	}
	//check if not matched and payment confirmation is 0 and amount received =0
	public function notify_new_gher($user_id){
		try{
			$user_sth = $this->db->prepare("SELECT * FROM tbl_users WHERE id='$user_id' AND role='user'");
			$user_sth->execute();
			if($user_sth->rowCount() > 0){
				$notify_sth = $this->db->prepare("SELECT * FROM tbl_gh WHERE user_id='$user_id' AND those_to_pay_me='' AND amount_received=0 AND payment_confirmation=0");
				$notify_sth->execute();
				if($notify_sth->rowCount() > 0){
					return 'eligible';
				}
			}
		}catch(PDOException $ex){
			return $ex->getMessage();
		}
	}
	//check for every normal active user that has not been merge but has payment confirmation = 0 and "those_to_pay_me" field is empty! 
	public function notify_payment_confirmation($user_id){
		try{
			$user_sth = $this->db->prepare("SELECT * FROM tbl_users WHERE id='$user_id' AND role='user'");
			$user_sth->execute();
			if($user_sth->rowCount() > 0){
				$notify_sth = $this->db->prepare("SELECT * FROM tbl_gh WHERE user_id='$user_id' ");
				$notify_sth->execute();
				$notify_sth_row = $notify_sth->fetch();
				return $notify_sth_row;
			}else{
				//this means the logged in user is an 'admin' and we don't want to notify admin that payment has been confirmed 
				//since they can never be found in the PH table...
			}
		}catch(PDOException $ex){
			return $ex->getMessage();
		}
	}
	//notify if merge receive
	public function notify_if_merge_to_receive($user_id){
		try{
			$notify_sth = $this->db->prepare("SELECT * FROM tbl_gh WHERE user_id='$user_id' AND payment_confirmation='0'");
			$notify_sth->execute();
			$notify_sth_row = $notify_sth->fetch();
			$receiver_id = $notify_sth_row["receiver_id"];
			$check_if_merge_sth = $this->db->prepare("SELECT * FROM tbl_merge WHERE receiver_id='$receiver_id' AND transaction_completed='0'");
			$check_if_merge_sth->execute();
			if($check_if_merge_sth->rowCount() > 0 ){
				return "ok";
			}
		}catch(PDOException $ex){
			return $ex->getMessage();	
		}
	}
	public function notify_to_fund($id){
		try{
			$notify_sth = $this->db->prepare("SELECT * FROM tbl_fund WHERE user_id='$id' AND payment_confirmation='0'");
			$notify_sth->execute();
			if($notify_sth->rowCount() > 0 ){
				return "ok";
			}
		}catch(PDOException $ex){
			return $ex->getMessage();	
		}
	}
	public function notify_to_fundPm($id){
		try{
			$notify_sth = $this->db->prepare("SELECT * FROM tbl_fundPm WHERE user_id='$id' AND payment_confirmation='0'");
			$notify_sth->execute();
			if($notify_sth->rowCount() > 0 ){
				return "ok";
			}
		}catch(PDOException $ex){
			return $ex->getMessage();	
		}
	}
	
	public function notify_of_profit($id){
		try{
			$notify_sth = $this->db->prepare("SELECT * FROM tbl_users WHERE id='$id' AND profit_status='1'");
			$notify_sth->execute();
			if($notify_sth->rowCount() > 0 ){
				return "ok";
			}
		}catch(PDOException $ex){
			return $ex->getMessage();	
		}
	}
	
	
	public function notify_of_funds($id){
		try{
			$notify_sth = $this->db->prepare("SELECT * FROM tbl_fund WHERE user_id='$id' AND payment_confirmation='1'");
			$notify_sth->execute();
			if($notify_sth->rowCount() > 0 ){
				return "ok";
			}
		}catch(PDOException $ex){
			return $ex->getMessage();	
		}
	}
	public function notify_of_fundsPm($id){
		try{
			$notify_sth = $this->db->prepare("SELECT * FROM tbl_fundPm WHERE user_id='$id' AND payment_confirmation='1'");
			$notify_sth->execute();
			if($notify_sth->rowCount() > 0 ){
				return "ok";
			}
		}catch(PDOException $ex){
			return $ex->getMessage();	
		}
	}
	
	public function total_count_cyber(){
		try{
			$sth=$this->db->prepare("SELECT COUNT(*) as num FROM tbl_users");
			$sth->setFetchMode(PDO::FETCH_ASSOC);
			$sth->execute();
			$row = $sth->fetchAll();
			$item = array_shift($row);
			return $item['num'];
		}catch(PDOException $ex){
			return $ex->getMessage();
		}
	}
	public function load_cyber(){
		try{
			$sth = $this->db->prepare("SELECT * FROM tbl_users");
			$sth->setFetchMode(PDO::FETCH_ASSOC);
			$sth->execute();
			$sth_row = $sth->fetchAll();
			return $sth_row;
		}catch(PDOException $ex){
			return $ex->getMessage();
		}
	}
	public function count_cyber($per_page,$offset){
		try{
			$sth=$this->db->prepare("SELECT * FROM tbl_users LIMIT {$per_page} OFFSET {$offset}");
			$sth->setFetchMode(PDO::FETCH_ASSOC);
			$sth->execute();
			$row = $sth->fetchAll();
			return $row;
		}catch(PDOException $ex){
			return $ex->getMessage();
		}
	}
	public function del_cyber($cyber_id){
		$depositor = new Depositor();
		$receiver = new Receiver();
		$new_those_to_pay_me = '';
		$new_those_to_pay = '';
		$amount_to_receive=0;
		$amount_to_pay=0;
		try{
			$sth_ph = $this->db->prepare("SELECT * FROM tbl_ph WHERE user_id='$cyber_id'");
			$sth_ph->execute();
			$sth_ph_row = $sth_ph->fetch();

			$sth_gh = $this->db->prepare("SELECT * FROM tbl_gh WHERE user_id='$cyber_id'");
			$sth_gh->execute();
			$sth_gh_row = $sth_gh->fetch();

			if($sth_ph->rowCount() > 0 ){
				$depositor->id = $sth_ph_row['depositor_id'];
				$depositor->user_id = $sth_ph_row['user_id'];
				$depositor->level = $sth_ph_row['level_id'];
				$depositor->date_gh = $sth_ph_row['date_pledged'];
				$depositor->time_gh = $sth_ph_row['time_pledged'];
				$depositor->amount_to_pay = $sth_ph_row['amount_to_pay'];
				$depositor->amount_has_paid = $sth_ph_row['amount_has_paid'];
				$depositor->those_to_pay = $sth_ph_row['those_to_pay'];

				$new_those_to_pay = explode(',',$depositor->those_to_pay);
				foreach ($new_those_to_pay as $value) {
					$sel_gh_those_to_pay_me_sth = $this->db->prepare("SELECT * FROM tbl_gh WHERE user_id='$value' AND payment_confirmation=0");
					$sel_gh_those_to_pay_me_sth->execute();
					$sel_gh_those_row = $sel_gh_those_to_pay_me_sth->fetch();
					
					$receiver->id = $sel_gh_those_row['receiver_id'];
					$receiver->user_id = $sel_gh_those_row['user_id'];
					$receiver->level = $sel_gh_those_row['level_id'];
					$receiver->date_gh = $sel_gh_those_row['date_gh'];
					$receiver->time_gh = $sel_gh_those_row['time_gh'];
					$receiver->amount_to_receive = $sel_gh_those_row['amount_to_receive'];
					$receiver->amount_received = $sel_gh_those_row['amount_received'];
					$receiver->those_to_pay_me = $sel_gh_those_row['those_to_pay_me'];

					//receiver info
					$receiver->amount_to_receive += $depositor->amount_has_paid;
					$receiver->amount_received -= $depositor->amount_has_paid;
					
					foreach(explode(',',$receiver->those_to_pay_me) as $those_to_pay_me){
						if($those_to_pay_me != $cyber_id){
							if(empty($receiver->those_to_pay_me)){
								$new_those_to_pay_me = $those_to_pay_me;
							}else{
								$new_those_to_pay_me .= ",".$those_to_pay_me;
							}
						}
					}
					//update the gher with the subtracted amount info and remove the cyber id from tbl_gh and remove the depositorid form merge
					$update_gh_sth = $this->db->prepare("UPDATE tbl_gh SET amount_to_receive='$receiver->amount_to_receive',amount_received='$receiver->amount_received',those_to_pay_me='$new_those_to_pay_me' WHERE user_id='$value'");
					$update_gh_sth->execute();
				}
				$del_merge = $this->db->prepare("DELETE FROM tbl_merge WHERE depositor_id='$depositor->id'");
				$del_merge->execute();

				$del_ph = $this->db->prepare("DELETE FROM tbl_ph WHERE user_id='$cyber_id'");
				$del_ph->execute();
			} else if($sth_gh->rowCount() > 0){
				$receiver->id = $sth_gh_row['receiver_id'];
				$receiver->user_id = $sth_gh_row['user_id'];
				$receiver->level = $sth_gh_row['level_id'];
				$receiver->date_gh = $sth_gh_row['date_gh'];
				$receiver->time_gh = $sth_gh_row['time_gh'];
				$receiver->amount_to_receive = $sth_gh_row['amount_to_receive'];
				$receiver->amount_received = $sth_gh_row['amount_received'];
				$receiver->those_to_pay_me = $sth_gh_row['those_to_pay_me'];

				$new_those_to_pay_me =explode(',', $receiver->those_to_pay_me);
				foreach ($new_those_to_pay_me as $value) {
					$sel_ph_sth = $this->db->prepare("SELECT * FROM tbl_ph WHERE user_id='$value' AND payment_confirmation=0");
					$sel_ph_sth->execute();
					$sel_ph_sth_row = $sel_ph_sth->fetch();

					$depositor->id = $sth_ph_row['depositor_id'];
					$depositor->user_id = $sth_ph_row['user_id'];
					$depositor->level = $sth_ph_row['level_id'];
					$depositor->date_gh = $sth_ph_row['date_pledged'];
					$depositor->time_gh = $sth_ph_row['time_pledged'];
					$depositor->amount_to_pay = $sth_ph_row['amount_to_pay'];
					$depositor->amount_has_paid = $sth_ph_row['amount_has_paid'];
					$depositor->those_to_pay = $sth_ph_row['those_to_pay'];

					$package_plan = $this->get_subscribe_package($receiver->level);
					$package_plan_outcome = $package_plan['package_outcome'];
					$package_plan_id = $package_plan['package_id'];
					$package_plan_income = $package_plan['package_income'];

					$depositor->amount_to_pay = $package_plan_income;
					if($depositor->amount_has_paid != 0){
						$depositor->amount_has_paid -= $package_plan_income;
					}else{
						$depositor->amount_has_paid = 0;
					}
					$new_those_to_pay = explode(',', $depositor->those_to_pay);
					foreach ($new_those_to_pay as $those_to_pay) {
						if($those_to_pay != $cyber_id){
							if(empty($depositor->those_to_pay)){
								$new_those_to_pay = $those_to_pay;
							}else{
								$new_those_to_pay .= ",".$those_to_pay;
							}
						}
					}
					//update the pher with the subtracted amount info and remove the cyber id from tbl_ph and remove the receiver id form merge
					$update_ph_sth = $this->db->prepare("UPDATE tbl_ph SET amount_to_pay='$depositor->amount_to_pay',amount_has_paid='$depositor->amount_has_paid',those_to_pay='$depositor->those_to_pay' WHERE user_id='$value'");
					$update_ph_sth->execute();
				}
				$del_merge = $this->db->prepare("DELETE FROM tbl_merge WHERE receiver_id='$receiver->id'");
				$del_merge->execute();
				$del_gh = $this->db->prepare("DELETE FROM tbl_gh WHERE user_id='$cyber_id'");
				$del_gh->execute();
			}

			$user_del = $this->db->prepare("DELETE FROM tbl_users WHERE id='$cyber_id'");
			$user_del->execute();
			return true;
		}catch(PDOException $ex){
			return $ex->getMessage();
		}
	}

	//for winnersteam, remove the user entirely from the system...
	public function purge_payment($data){
		try{
			$depositor = new Depositor();
			$receiver = new Receiver();
			$amount_to_receive = 0;
			$new_those_to_pay_me='';
			$depositor_id = $data['depositor_id'];
			$receiver_id = $data['receiver_id'];

			$check_if_teller_upload = $this->db->prepare("SELECT * FROM tbl_merge WHERE depositor_id='$depositor_id' AND receiver_id='$receiver_id' AND transaction_completed=0 AND pop_upload_status=1");
			$check_if_teller_upload->execute();
			if($check_if_teller_upload->rowCount() > 0){
				return false;
			}else{
				$decline_sth = $this->db->prepare("SELECT * FROM tbl_ph WHERE depositor_id='$depositor_id'");
				$decline_sth->execute();
				$ph_row = $decline_sth->fetch();
				$user_id = $ph_row['user_id'];

				$merge_sth = $this->db->prepare("SELECT * FROM tbl_merge WHERE depositor_id='$depositor_id'");
				$merge_sth->execute();
				// $merge_row = $merge_sth->fetch();
				// $receiver_id = $merge_row['receiver_id'];
				while($merge_row = $merge_sth->fetch()){
					$depositor_pay = $merge_row['depositor_pay'];
					$receiver_id=$merge_row['receiver_id'];
					echo '<br> before '.$depositor_pay;

					$gh_sth = $this->db->prepare('SELECT * FROM tbl_gh WHERE receiver_id=:receiver_id');
					$gh_sth->execute(array(':receiver_id'=>$receiver_id));
					$gh_sth_row = $gh_sth->fetch();

					$amount_to_receive = $gh_sth_row['amount_to_receive'] + $depositor_pay;
					$amount_received = $gh_sth_row['amount_received'] - $depositor_pay;
					$those_to_pay_me = explode(',', $gh_sth_row['those_to_pay_me']);
					foreach ($those_to_pay_me as $key => $value) {
						if($value != $user_id){
							$new_those_to_pay_me .= $value.',';
						}
					}
					$new_those_to_pay_me = substr($new_those_to_pay_me, 0, -1);
					$update_gh_sth = $this->db->prepare('UPDATE tbl_gh SET amount_to_receive=:amount_to_receive,
																				amount_received=:amount_received,
																				those_to_pay_me=:those_to_pay_me 
																		WHERE receiver_id=:receiver_id');
					$update_gh_sth->execute(array(':amount_to_receive'=>$amount_to_receive,
												  ':amount_received'=>$amount_received,
												  ':those_to_pay_me'=>$new_those_to_pay_me,
												  ':receiver_id'=>$receiver_id));
				}

				$del_sth = $this->db->prepare("DELETE FROM tbl_merge WHERE depositor_id='$depositor_id'");
				$del_sth->execute();

				$del_ph_sth = $this->db->prepare("DELETE FROM tbl_ph WHERE depositor_id='$depositor_id'");
				$del_ph_sth->execute();

				$del_user_sth = $this->db->prepare("UPDATE tbl_users SET status='block' WHERE id='$user_id'");
				$del_user_sth->execute();
				return true;
			}
		}catch(PDOException $ex){
			return  $ex->getMessage();
		}
	} 
	public function purge_status($user_id){
		try{
			$sth_gh = $this->db->prepare("SELECT * FROM tbl_gh WHERE user_id='$user_id' AND payment_confirmation=0");
			$sth_gh->execute();
			$sth_gh_row = $sth_gh->fetch();
			$receiver_id = $sth_gh_row['receiver_id'];
			//check tbl_merge
			$sth_merge = $this->db->prepare("SELECT * FROM tbl_merge WHERE receiver_id='$receiver_id' AND transaction_completed=0");
			$sth_merge->execute();
			$sth_merge_row = $sth_merge->fetch();
			return $sth_merge_row['pop_upload_status'];
		}catch(PDOException $ex){
			return $ex->getMessage();
		}	
	}
	public function uploadImage($data){
		$result = $this->getTellerFile($data['file']);
		$file = $result['file'];
		$message = $result['message'];
		$id = $this->id;
		try{
			
			$this->db->update('tbl_users', ['avatar' => $file], "id='$id'");
			$result = $this->db->getItem("SELECT * FROM tbl_users WHERE id='$id'");
			
			$response['result'] = $result;
			$response['message'] = $message;
			return $response;
		}catch(PDOException $ex){
			return $ex->getMessage();
		}
	}
	public function pop_receiver_view($user_id){
		try{
			$user_sth = $this->db->prepare("SELECT * FROM tbl_gh WHERE user_id='$user_id' AND payment_confirmation=0");
			$user_sth->execute();
			$user_sth_row = $user_sth->fetch();
			$receiver_id = $user_sth_row['receiver_id'];

			$pop_sth = $this->db->prepare("SELECT * FROM tbl_merge WHERE receiver_id='$receiver_id' AND transaction_completed=0");
			$pop_sth->execute();
			$pop_sth_row = $pop_sth->fetch();
			return $pop_sth_row;
		}catch(PDOException $ex){
			return $ex->getMessage();
		}
	}
	public function load_teller_image($user_id){
		try{
			$sel_sth = $this->db->prepare("SELECT * FROM tbl_ph WHERE user_id='$user_id'");
			$sel_sth->execute();
			$sel_sth_row = $sel_sth->fetch();
			if($sel_sth->rowCount() > 0){
				$depositor_id = $sel_sth_row['depositor_id'];
				$sth = $this->db->prepare("SELECT * FROM tbl_merge WHERE depositor_id='$depositor_id' AND transaction_completed=0");
				$sth->execute();
				$sth_row = $sth->fetch();
				return $sth_row['pop_upload'];
			}
		}catch(PDOException $ex){
			return $ex->getMessage();
		}
	}
	private function getTellerFile($file){
		$target_dir = "uploaded_files/";
		$target_file = $target_dir . basename($file["name"]);
		$uploadOk = 1;
		$imageFileType = pathinfo($target_file,PATHINFO_EXTENSION);
		$message = '';
		// Check if image file is a actual image or fake image

		// Check if file already exists
		// if (file_exists($target_file)) {
		//     echo "Sorry, file already exists.";
		//     $uploadOk = 0;
		// }
		// Check file size
		if ($file["size"] > 500000000) {
		    $message .= " Sorry, your file is too large.";
		    $uploadOk = 0;
		}
		// Allow certain file formats
		if($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg"
		&& $imageFileType != "gif" ) {
		    $message .= " Sorry, only JPG, JPEG, PNG & GIF files are allowed.";
		    $uploadOk = 0;
		}
		// Check if $uploadOk is set to 0 by an error
		if ($uploadOk == 0) {
		    $message .= " Sorry, your file was not uploaded.";
		// if everything is ok, try to upload file
		} else {
		    if (move_uploaded_file($file["tmp_name"], $target_file)) {
		        $message .= " The file ". basename( $file["name"]). " has been uploaded.";
		    } else {
		        $message .= " Sorry, there was an error uploading your file.";
		    }
		}
		// $check = getimagesize($file["tmp_name"]);
		//     if($check !== false) {
		//         echo "File is an image - " . $check["mime"] . ".";
		//         $uploadOk = 1;
		//     } else {
		//         echo "File is not an image.";
		//         $uploadOk = 0;
		//     }
		$response['message'] = $message;
		$response['file'] = $target_file;
		return $response;
	}

	/**ADMINISTRATOR */
	public function getAllUsers(){
		$result = $this->db->getAssoc("SELECT * FROM tbl_users");
		return $result;
	}

	public function verifyUser($data){
		$id = $data['user_id'];

		$db_data = ["synced" => 1];
		$where = "id='$id'";
		$this->db->update('tbl_users', $db_data, $where);

		$result = $this->db->getItem("SELECT * FROM tbl_users WHERE $where");
		$response['status'] = 200;
		$response['result'] = $result;
		$response['message'] = "Account was verified successful";
		return $response;
	}

	public function toggleUserStatus($data){
		$id = $data['user_id'];

		$result = $this->db->getItem("SELECT * FROM tbl_users WHERE id='$id'");
		$status = $result['status'] == 'block' ? 'active' : 'block';

		$db_data = ["status" => $status];
		$where = "id='$id'";
		$this->db->update('tbl_users', $db_data, $where);

		$response['status'] = 200;
		$response['message'] = "$status";
		return $response;
	}

	

	public function deleteUser($data){
		$id = $data['user_id'];

		
		$where = "id='$id'";
		$this->db->delete('tbl_users', $where);

		$response['status'] = 200;
		$response['id'] = $id;
		$response['message'] = "Account was deleted";
		return $response;
	}

	public function updateUserData($data){
		$userId = $data['user_id'];
		$capital = $data['capital'];
		$availableProfit = $data['available_profit'];
		$availableBonus = $data['available_bonus'];

		$result = $this->db->getItem("SELECT * FROM tbl_users WHERE id=$userId");
		$amountInStock = (int)$result['amount_in_stock'] + $capital;
		$profit = (int)$result['available_profit'] + $availableProfit;
		$bonus = (int)$result['trade_bonus'] + $availableBonus;

		$db_data = [
			'amount_in_stock' => $amountInStock,
			'available_profit' => $profit,
			'trade_bonus' => $bonus
		];
		$where = "id=$userId";
		$this->db->update('tbl_users', $db_data, $where);
		$res = $this->db->getItem("SELECT * FROM tbl_users WHERE id=$userId");
		$response['status'] = 200;
		$response['message'] = "update user data";
		$response['result'] = $res;
		return $response;
	}
}