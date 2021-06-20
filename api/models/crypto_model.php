<?php
class crypto_model extends model{
    public function __construct(){
        parent::__construct();
    }

    public function createFakeInvoiceURL($data){
        $dataObj = json_decode(file_get_contents('php://input'));

        $amountUSD = $data['amount'];
        $crypto = $data['crypto'];
        $userId = $data['user_id'];

        try{
			
			$fund_sth = $this->db->prepare('SELECT * FROM tbl_fund WHERE user_id=$userId AND payment_confirmation=1');
			

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

    public function callback($data){
        // e.
        if (isset($data["status"]) && in_array($data["status"], array("payment_received", "payment_received_unrecognised")) &&
                $data["box"] && is_numeric($data["box"]) && $data["box"] > 0 && $data["amount"] && is_numeric($data["amount"]) && $data["amount"] > 0 && $valid_key)
        {

            foreach ($data as $k => $v)
            {
                if ($k == "datetime") 						$mask = '/[^0-9\ \-\:]/';
                elseif (in_array($k, array("err", "date", "period")))		$mask = '/[^A-Za-z0-9\.\_\-\@\ ]/';
                else								$mask = '/[^A-Za-z0-9\.\_\-\@]/';
                if ($v && preg_replace($mask, '', $v) != $v) 	$data[$k] = "";
            }

            if (!$data["amountusd"] || !is_numeric($data["amountusd"]))	$data["amountusd"] = 0;
            if (!$data["confirmed"] || !is_numeric($data["confirmed"]))	$data["confirmed"] = 0;


            $dt			= gmdate('Y-m-d H:i:s');
            $obj 		= run_sql("select paymentID, txConfirmed from crypto_payments where boxID = ".intval($data["box"])." && orderID = '".addslashes($data["order"])."' && userID = '".addslashes($data["user"])."' && txID = '".addslashes($data["tx"])."' && amount = ".floatval($data["amount"])." && addr = '".addslashes($data["addr"])."' limit 1");


            $paymentID		= ($obj) ? $obj->paymentID : 0;
            $txConfirmed	= ($obj) ? $obj->txConfirmed : 0;

            // Save new payment details in local database
            if (!$paymentID)
            {
                $sql = "INSERT INTO crypto_payments (boxID, boxType, orderID, userID, countryID, coinLabel, amount, amountUSD, unrecognised, addr, txID, txDate, txConfirmed, txCheckDate, recordCreated)
                        VALUES (".intval($data["box"]).", '".addslashes($data["boxtype"])."', '".addslashes($data["order"])."', '".addslashes($data["user"])."', '".addslashes($data["usercountry"])."', '".addslashes($data["coinlabel"])."', ".floatval($data["amount"]).", ".floatval($data["amountusd"]).", ".($data["status"]=="payment_received_unrecognised"?1:0).", '".addslashes($data["addr"])."', '".addslashes($data["tx"])."', '".addslashes($data["datetime"])."', ".intval($data["confirmed"]).", '$dt', '$dt')";

                $paymentID = run_sql($sql);

                /**save to tbl_fund to fund the user's wallet */
                // $userInfo = $this->getUserInfo($data["user"]);

                // $db_data = [
                //     "user_id" => $data["user"],
                //     ""
                // ];

                $box_status = "cryptobox_newrecord";
            }
            // Update transaction status to confirmed
            elseif ($data["confirmed"] && !$txConfirmed)
            {
                $sql = "UPDATE crypto_payments SET txConfirmed = 1, txCheckDate = '$dt' WHERE paymentID = ".intval($paymentID)." LIMIT 1";
                run_sql($sql);

                $box_status = "cryptobox_updated";
            }
            else
            {
                $box_status = "cryptobox_nochanges";
            }


            /**
             *  User-defined function for new payment - cryptobox_new_payment(...)
             *  For example, send confirmation email, update database, update user membership, etc.
             *  You need to modify file - cryptobox.newpayment.php
             *  Read more - https://gourl.io/api-php.html#ipn
                 */

            if (in_array($box_status, array("cryptobox_newrecord", "cryptobox_updated")) && function_exists('cryptobox_new_payment')) cryptobox_new_payment($paymentID, $data, $box_status);
        }

        else
            $box_status = "Only POST Data Allowed";


        $response['box_status'] = $box_status;
        return $response; // don't delete it     
    }

    private function getUserInfo($id){
        $result = $this->db->getItem("SELECT * FROM tbl_users WHERE id=$id");
        return $result;
    }
}