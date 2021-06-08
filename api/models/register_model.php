<?php
require_once 'helpers/utility.php';
class register_model extends model{
	private $table = 'tbl_users';

	public function __construct(){
		parent::__construct(); 
	}

	private function validateReferalCode($referal_code){
		$sql = "SELECT * FROM $this->table WHERE id_code='$referal_code'";
		return $this->db->getRowCounts($sql);
	}
	public function createUser($data){
		try{
			$referal_code = $data['referal_code'];
			$my_referal_code = $data['my_referal_code'];
			$fullname = $data['fullname'];
			$email = $data['email'];
			$password =  $data['password'];
			//get referal info
			$referal_info = $this->db->getItem("SELECT * FROM $this->table WHERE id_code='$referal_code' LIMIT 1");
			$referal_user_id = $referal_info['id'];//get the referal user id
			//validate referal code
			if($this->validateReferalCode($referal_code) <= 0){
				http_response_code(400);
				$response['code'] = "invalid_referal_code";
				$response['message'] = "The referal code entered is invalid";
				return $response;
			}
			//check if this user already exists
			$count = $this->db->getRowCounts("SELECT email FROM $this->table WHERE email = '$email'");
			if($count > 0){
				http_response_code(400);
				$response['code'] = "user_exists";
				$response['message'] = "User with the email already exist";
				return $response;
			}else{
				$data = array(
					'id_code'=>$my_referal_code,
					'fullname'=>$fullname,
					'email'=>$email,
					'password'=> $password,
					'status'=>'block',
					'amount_in_stock'=>0,
					'amount_of_tokens'=>0,
					'daily_profit'=>0,
					'available_profit'=>0,
				);
				$last_insert_user_id = $this->db->insert($this->table, $data);
					

				$gen_ref_link = "register/?referal=".$my_referal_code;
				$update_data = array(
					'referal_link'=>$gen_ref_link,
					'referal_bonus'=>0,
					'referal_user_id' => $referal_user_id
				);
				$where = "id='$last_insert_user_id'";
				$update_ref_link = $this->db->update($this->table, $update_data, $where);
				//update the referal user -> evangelism count
				$referal_evangelism = (int)$referal_info['evangelism'] + 1;
				$referal_data = [
				    'evangelism' => $referal_evangelism
				];
				$referal_where = "id='$referal_user_id'";
				$this->db->update($this->table, $referal_data, $referal_where);
				//logs
				$this->db->insert('tbl_logs', [
					'user_id' => $last_insert_user_id,
					'action' => 'Created Account',
				]);
				//send mail to the newly registered contestant
				/**REMOVE COMMENT */
        		// $mail = new PHPMailer;

        		// $mail->isSMTP();                                      // Set mailer to use SMTP
        		// $mail->Host = 'tradinary.com';  // Specify main and backup SMTP servers
        		// $mail->SMTPAuth = true; // Enable SMTP authentication
        		// $mail->Username = 'support@tradeferry.io';// SMTP username
        		// $mail->Password = 'TradeSupport';// SMTP password
        		// $mail->SMTPSecure = 'ssl'; // Enable TLS encryption, `ssl` also accepted (if you have ssl use ssl else use false)
        		// $mail->Port = 465; // TCP port to connect to
        
        		// $mail->setFrom("support@tradeferry.io", "Tradeferry Support");
        
        		// $mail->addAddress($email,$fullname);     // Add a recipient
        		// //$mail->addReplyTo($email, $name);
        
        		// $mail->isHTML(true);                                  // Set email format to HTML
        
        		// $mail->Subject = 'Tradeferry Support';
        		// $mail->Body    = '
        		// 	<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
        		// 	<html xmlns="http://www.w3.org/1999/xhtml">
        		// 	<head>
        		// 	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        		
        		// 	<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        		// 	<link href="https://fonts.googleapis.com/css?family=Barlow" rel="stylesheet">
        		// 	<style>
        		// 		.bg_body {
        		// 			font-family: \'Barlow\', sans-serif;
        		// 			padding: 20px 15px; 
        		// 			font-size: 13px;
        		// 		}
        		// 		.bg_a {
        		// 			background-color:#41b3f9; 
        		// 			border: 1px solid #41b3f9; 
        		// 			padding: 10px 16px;
        		// 			border-radius: 4px;
        		// 			font-family: \'Barlow\', sans-serif; 
        		// 			font-size: 18px;
        		// 			color: #FFF;
        		// 		}
        		// 	</style>
        		// 	</head>
        		// 	<body>
        		// 		<table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
        		// 		<tr>
        		// 		<td align="center" bgcolor="#fff" style="padding: 40px 0 30px 0; border-radius: 10px 10px 0px 0px;">
        		// 		 <img src="https://tradeferry.io//public/assets/images/logo/newlogo.png" alt="Logo" width="300" style="display: block;" />
        		// 		</td>
        		// 		</tr>
        		// 		<tr>
        		// 		<td bgcolor="#ffffff" style="padding: 40px 30px 40px 30px;">
        		// 			<table border="0" cellpadding="0" cellspacing="0" width="100%">
        		// 			<tr>
        		// 			<td align="center" class="bg_body">
        		// 			<p>Hello '.$fullname.', Welcome to a world of hourly crypto earnings. <br>Join today and get up to 20% hourly of your Investment within a short while.<br>We have Crypto Experts that take on the risks and trade hourly on the high-stake markets, all you need to do is relax and enjoy the benefits of investing with us. <br> Click on the Button or copy out the link below to activate your account.</p>.
        		// 			</td>
        		// 			</tr>
        		// 			<tr>
        		// 			<td align="center" style="padding: 10px 5px; ">
        		// 			<a width="120" style="text-decoration:none; color: #FFF;" href="https://www.tradeferry.io/register/activate/'.$my_referal_code.'" height="40" class="bg_a">Activate</a>
        		// 			</td>
        		// 			</tr>
        		// 			<tr>
        		// 			<td align="center">
        		// 			<h4>https://www.tradeferry.io/register/activate/'.$my_referal_code.'</h4>
        		// 			</td>
        		// 			</tr>
        		// 			</table>
        		// 		</td>
        		// 		</tr>
        		// 		<tr>
        		// 		<td bgcolor="#41b3f9" align="center" style="padding: 10px 5px; border-radius: 0px 0px 10px 10px; color: #FFF;">
        		// 		 2020 &copy; Tradeferry 
        		// 		</td>
        		// 		</tr>
        		// 		</table>
        		// 	</body>
        		// 	</html>
        		// ';
        		// //$mail->AltBody = $message."<br>".' Phone number: '.$phone;
        
        		// $mail->send();
				/**REMOVE COMMENT */
				http_response_code(200);
				$payload = [
					"data" => [
						"user_id" => $user['id'],
						"user_role" => $user['role'],
						"user_login" => true,
					],
					"iss" => "localhost",
					"iat" => time(),
					"exp" => time() + 1800,
				];
				$token = Utility::encodeJWT($payload);
				$response['isLoggedIn'] = true;
				$response['token'] = $token;
				return $response;
			}
			
		}catch(PDOException $ex){
			http_response_code(401);
			$response['code'] = 'error_message';
			$response["message"] = $ex->getMessage();
			return $response;
		}
	}
	public function activate($code){
		$sth = $this->db->prepare("SELECT * FROM tbl_users WHERE id_code='$code'");
		$sth->execute();
		if($sth->rowCount() > 0){
			$result = $sth->fetch();
			$user_id = $result['id'];
			$activate_sth = $this->db->prepare("UPDATE tbl_users SET status='active' WHERE id='$user_id'");
			$activate_sth->execute();
			return "ok";
		}else{
			return "failed";
		}
	}

}
		