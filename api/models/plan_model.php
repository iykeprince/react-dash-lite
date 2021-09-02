<?php
require_once 'helpers/utility.php';

class plan_model extends model{
	public function __construct(){ 
		parent::__construct(); 
		$this->id = Utility::getPayLoad()->data->user_id;
	}

    public function getPlans(){
        return $this->db->getAssoc('SELECT * FROM tbl_plans');
    }

    public function createInvestmentPlan($data){
        $idCode = $data['idCode'];
        $planId= $data['plan_id'];
        $amount = $data['amount'];
        $cryptoCurrency = $data['cryptocurrency'];
        $exchangePrice = $data['exchangePrice'];
        
        $amountCrypto = $amount/$exchangePrice;

        $user = $this->db->getItem("SELECT * FROM tbl_users WHERE id={$this->id}");
        if($idCode !== $user['id_code']){
            $response['status'] = 400;
            $response['message'] = "Invalid ID CODE specified.";
            return $response;
        }
        //Get the user and check the trading_wallet balance
        //return "INSUFFICIENT_FUND " response when the amount to invest is greater than the wallet balance
        //otherwise proceed
        if($amount > $user['trading_wallet']){
            $response['status'] = 400;
            $response['message'] = "Insufficient fund.";
            return $response;
        }
        
		$planResult = $this->db->getItem("SELECT * FROM tbl_plans WHERE plan_id=$planId");
		$investmentDuration = $planResult['termDays'];

        $fundData = [
            "plan_id" => $planId,
            "amount" => $amount,
            "user_id" => $this->id,
            "billing_method" => 'CRYPTO-WALLET',
			"fund_ended_at" => (new DateTime())->modify("+$investmentDuration days")->format('YYYY-mm-dd h:i:s'),
        ];
        $this->db->insert('tbl_fund', $fundData);
        $transactionData = [
            'user_id' => $this->id,
            'amount' => $amount,
            'payment_method' => 'CRYPTO-WALLET',
            'crypto_value' => $amountCrypto,
            'crypto_currency' => $cryptoCurrency,
            'crypto_hash' => '----',
            'transaction_type' => 'INVEST'
        ];
        $this->db->insert('tbl_transactions', $transactionData);
		$newTradingWallet = $user['trading_wallet'] - $amount;
        $updateData = [
            'trading_wallet' => $newTradingWallet,
            'profit_tracker' => 1    
        ];
        $updateWhere = "id={$this->id}";
        $this->db->update('tbl_users', $updateData, $updateWhere);
        $response['status'] = 200;
        $response['message'] = "Fund created";
        return $response;
    }

    
    public function sendIdCodeEmail($input) {
        $result = $this->db->getItem("SELECT * FROM tbl_users WHERE id={$this->id}");
        $fullname = $result['fullname'];
        $idCode = $result['id_code'];

        $title = $input->title;
        $dailyInterest = $input->dailyInterest;
        $maxDeposit = $input->maxDeposit;
        $minDeposit = $input->minDeposit;
        $totalReturns = $input->totalReturns;
        $isMax = $input->isMax;

        $mail = new PHPMailer;

        		$mail->isSendMail();         
        		
        		$mail->Host = 'mail.bitfetter.com';  // Specify main and backup SMTP servers
        		$mail->SMTPAuth = true; // Enable SMTP authentication
        		$mail->Username = 'systems@bitfetter.com';// SMTP username
        		$mail->Password = 'B1tF3tt3r.com';// SMTP password
        		$mail->SMTPSecure = 'ssl'; // Enable TLS encryption, `ssl` also accepted (if you have ssl use ssl else use false)
        		$mail->Port = 465; // TCP port to connect to
        
        		$mail->setFrom("systems@bitfetter.com", "Bitfetter Support");
        
        		$mail->addAddress($email);     // Add a recipient
        		//$mail->addReplyTo($email, $name);
        
        		$mail->isHTML(true);                                  // Set email format to HTML
        
        		$mail->Subject = 'Bitfetter Account Setup';
        		$mail->Body    = '
        			<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
        			<html xmlns="http://www.w3.org/1999/xhtml">
        			<head>
        			<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        			<title>BitFetter</title>
        			<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        			<link href="https://fonts.googleapis.com/css?family=Barlow" rel="stylesheet">
        			<style>
        				.bg_body {
        					font-family: \'Barlow\', sans-serif;
        					padding: 20px 15px; 
        					font-size: 13px;
        				}
        				.bg_a {
        					background-color:#798BFF; 
        					border: 1px solid #798BFF; 
        					padding: 10px 16px;
        					border-radius: 4px;
        					font-family: \'Barlow\', sans-serif; 
        					font-size: 18px;
        					color: #FFF;
        				}
        			</style>
        			</head>
        			<body>
        				<table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
        				<tr>
        				<td align="center" bgcolor="#fff" style="padding: 40px 0 30px 0; border-radius: 10px 10px 0px 0px;">
        				 <img src="https://app.bitfetter.com/assets/logos/brandmark_blue-sm.png" alt="Bitfetter Logo" width="300" style="display: block;" />
        				</td>
        				</tr>
        				<tr>
        				<td bgcolor="#ffffff" style="padding: 40px 30px 40px 30px;">
        					<table border="0" cellpadding="0" cellspacing="0" width="100%">
        					<tr>
        					<td align="center" class="bg_body">
        					<p>Hello '.$fullname.', Thank you! You are investing the amount of '.$amount.' USD on *'.$title.'*. Your investment details are shown below for your reference:</p>.
        					</td>
        					</tr>
        					<tr>
        					<td align="center" style="padding: 10px 5px; ">
        					<p>'.$title.' - Daily '.$dailyInterest.'% for '.$termDays.' Days</p>
                            <p>ID Code - '.$idCode.'</p>
        					</td>
        					</tr>
        					<tr>
        					<td align="center">
        					<p>Your investment plan will start as soon as you have entered the ID code above correctly. </p>
                            <p>Feel free to contact us if you have any questions.</p>
        					</td>
        					</tr>
        					</table>
        				</td>
        				</tr>
        				<tr>
        				<td bgcolor="#798BFF" align="center" style="padding: 10px 5px; border-radius: 0px 0px 10px 10px; color: #FFF;">
        				 2021 &copy; Bitfetter
        				</td>
        				</tr>
        				</table>
        			</body>
        			</html>
        		';
        		//$mail->AltBody = $message."<br>".' Phone number: '.$phone;
        
        		$mail->send();
        $response['message'] = "Mail sent";
        return $response;
    }

}