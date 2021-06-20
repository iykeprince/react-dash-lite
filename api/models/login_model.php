<?php
ini_set("SMTP","ssl://smtp.gmail.com");
ini_set("smtp_port","587");

require_once 'helpers/utility.php';

class login_model extends model{

	public function __construct(){
		parent::__construct();
	} 
	public function login($data){
		$email = $data['email'];
		$password = $data['password'];
		
		try{
			$user = $this->db->getItem("SELECT * FROM tbl_users WHERE email='$email' AND password='$password'");
			if($user != null){	
			    
			
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
					$response['status'] = 200;
					$response['isLoggedIn'] = true;
					$response['token'] = $token;
			
			}else{
				
				$response['isLoggedIn'] = false;
				$response['message'] = 'Invalid username/password';
				$response['token'] = null;
				$response['status'] = 400;
			}
			return json_encode($response);
		}catch(PDOException $ex){
			return $ex->getMessage();
		}
	}
	
	public function changePassword($data){
	    $code = $data['code'];
	    $newPassword = $data['password'];
	    
	    $query = "SELECT * FROM tbl_users WHERE id_code='$code'";
	    $user = $this->db->getItem($query);
	    $count = $this->db->getRowCounts($query);
	    if( $count == 0){
            $response['status'] = 404;
            $response['message'] = "Invalid ID_CODE. No User found!";
	        return $response;
	    }else{
	        $user_id = $user['id']; 
	        $data = [ 'password' => $newPassword ];
	        $where = "id='$user_id'";
	        $this->db->update('tbl_users', $data, $where );
	        
            $response['status'] = 200;
            $response['message'] = "Password was successfully changed!";
            return $response;
	    }
	    
	}
	
	public function recover_password($data){
			$data_email = $data['email'];
			
			$user = $this->db->getItem("SELECT * FROM tbl_users WHERE email='$data_email'");
			if($user){
				$response['status'] = 200;
				$response['message'] = 'Check your mailbox to follow instructions on how to reset your password';
				return $response;
			}
			$response['status'] = 404;
			$response['message'] = 'The email specified is not recognized';
			return $response;
			// if($count > 0){
			// 	while($row = $sth->fetch()){
			// 		$to_name = $row['fullname'];
			// 		$to = $row['email'];
			// 		$subject = "Password recovery";
			// 		//send mail
            // 		// $mail = new PHPMailer;
    
            // 		// $mail->isSMTP();                                      // Set mailer to use SMTP
            // 		// $mail->Host = 'mail.bitterio.com';  // Specify main and backup SMTP servers
            // 		// $mail->SMTPAuth = true; // Enable SMTP authentication
            // 		// $mail->Username = 'info@bitterio.com';// SMTP username
            // 		// $mail->Password = 'Bitterio.com';// SMTP password
            // 		// $mail->SMTPSecure = 'ssl'; // Enable TLS encryption, `ssl` also accepted (if you have ssl use ssl else use false)
            // 		// $mail->Port = 465; // TCP port to connect to
            
            // 		// $mail->setFrom("info@bitterio.com", "Bitterio Support");
            
            // 		// $mail->addAddress($data_email);     // Add a recipient
            // 		// //$mail->addReplyTo($email, $name);
            
            // 		// $mail->isHTML(true);                                  // Set email format to HTML
            
            // 		// $mail->Subject = 'Bitterio Support';
            // 		// $mail->Body    = '
            // 		// 	<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
            // 		// 	<html xmlns="http://www.w3.org/1999/xhtml">
            // 		// 	<head>
            // 		// 	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
            // 		// 	<title>Bitterio Trading</title>
            // 		// 	<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            // 		// 	<link href="https://fonts.googleapis.com/css?family=Barlow" rel="stylesheet">
            // 		// 	<style>
            // 		// 		.bg_body {
            // 		// 			font-family: \'Barlow\', sans-serif;
            // 		// 			padding: 20px 15px; 
            // 		// 			font-size: 13px;
            // 		// 		}
            // 		// 		.bg_a {
            // 		// 			background-color:#41b3f9; 
            // 		// 			border: 1px solid #41b3f9; 
            // 		// 			padding: 10px 16px;
            // 		// 			border-radius: 4px;
            // 		// 			font-family: \'Barlow\', sans-serif; 
            // 		// 			font-size: 18px;
            // 		// 			color: #FFF;
            // 		// 		}
            // 		// 	</style>
            // 		// 	</head>
            // 		// 	<body>
            // 		// 		<table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
            // 		// 		<tr>
            // 		// 		<td align="center" bgcolor="#fff" style="padding: 40px 0 30px 0; border-radius: 10px 10px 0px 0px;">
            // 		// 		 <img src="https://bitterio.com/public/assets/img/bit-logo.png" alt="Bitterio Logo" width="300" style="display: block;" />
            // 		// 		</td>
            // 		// 		</tr>
            // 		// 		<tr>
            // 		// 		<td bgcolor="#ffffff" style="padding: 40px 30px 40px 30px;">
            // 		// 			<table border="0" cellpadding="0" cellspacing="0" width="100%">
            // 		// 			<tr>
            // 		// 			<td align="center" class="bg_body">
            // 		// 			<p>Hello '.$fullname.', Welcome to a world of hourly crypto earnings.</p><p>Click on the button or copy the link below to reset your Password</p>.
            // 		// 			</td>
            // 		// 			</tr>
            // 		// 			<tr>
            // 		// 			<td align="center" style="padding: 10px 5px; ">
            // 		// 			<a width="120" style="text-decoration:none; color: #FFF;" href="www.bitterio.com/bitterio/change_password?email='.$to.'" height="40" class="bg_a">Reset Password</a>
            // 		// 			</td>
            // 		// 			</tr>
            // 		// 			<tr>
            // 		// 			<td align="center">
            // 		// 			<h4>https://www.bitterio.com/bitterio/change_password?email='.$to.'</h4>
            // 		// 			</td>
            // 		// 			</tr>
            // 		// 			</table>
            // 		// 		</td>
            // 		// 		</tr>
            // 		// 		<tr>
            // 		// 		<td bgcolor="#41b3f9" align="center" style="padding: 10px 5px; border-radius: 0px 0px 10px 10px; color: #FFF;">
            // 		// 		 2018 &copy; Bitterio 
            // 		// 		</td>
            // 		// 		</tr>
            // 		// 		</table>
            // 		// 	</body>
            // 		// 	</html>
            // 		// ';
            // 		// //$mail->AltBody = $message."<br>".' Phone number: '.$phone;
            
            // 		// $mail->send();
			// 		return "valid";
			// 	}
			// }else{
			// 	return "invalid";
			// }
		
	}

	
}