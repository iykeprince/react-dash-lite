<?php
class index_model extends model{

    private $counter = 0;
	public function __construct(){
		parent::__construct(); 
	}
	public function updateDailyProfit(){
	    
	    $btokenStmt = $this->stmt_all_handler("SELECT * FROM tbl_btoken");
	    foreach($btokenStmt as $key => $value){
	        $user_id = $value['user_id'];
	        $total_earnings = $value['daily_profit'] + $value['total_earnings'];
	        $this->executable("UPDATE tbl_btoken SET total_earnings='$total_earnings' WHERE user_id='$user_id'");
	    }
	    //update user
	    $userStmt = $this->stmt_all_handler("SELECT * FROM tbl_users");
	    foreach($userStmt as $key=>$value){
	        $user_id = $value['id'];
	        $total_available_profit = $value['daily_profit'] + $value['available_profit'];
	        $this->executable("UPDATE tbl_users SET available_profit='$total_available_profit' WHERE id='$user_id'");
	    }
	    return true;
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
	
	public function handleMail1($data) {

		$name = $data['name'];
		$email = $data['email'];
		$mobile = $data['mobile'];
		$message = $data['message'];
		$subject = $data['subject'];
		$location = $data['location'];
		$budget = $data['budget'];
		
		$mailer = $data['mailer'];

		$mail = new PHPMailer;

        // $mail->isSMTP();  
        $mail->isSendMail();
		
		// Set mailer to use SMTP
		$mail->Host = 'tradeferry.io';  // Specify main and backup SMTP servers
		$mail->SMTPAuth = true; // Enable SMTP authentication
		$mail->Username = 'admin@tradeferry.io';// SMTP username
		$mail->Password = 'TradeSupport';// SMTP password
// 		$mail->SMTPSecure = 'ssl'; // Enable TLS encryption, `ssl` also accepted (if you have ssl use ssl else use false)
		$mail->Port = 465; // TCP port to connect to
        
		$mail->setFrom("admin@tradeferry.io","Website Admin");
		$mail->AddReplyTo($mailer);
		
		$headers = "MIME-Version: 1.0" . "\r\n";
        $headers .= "Content-type:text/html; charset=UTF-8" . "\r\n";

		$mail->addAddress($mailer);  // Add a recipient
	
		$mail->isHTML(true);                                 

		$mail->Subject = ($subject == '' ? 'Website Email' : $subject );
		$mail->Body  = '
			Name: '.$name.'<br>
			Email: '.$email.'<br>
			Mobile: '.$mobile.'<br>
			Message: '.$message.'<br>'.
			($budget == '' ? '' : $budget) .'<br>'.
			($location == '' ? '' : $location) ;
			
		if($mail->send()){
		    return 'success';
		} else {
		    return 'Mailer Error: ' . $mail->ErrorInfo;
		}

		
	}
	
	public function handleMail2($data) {

		$name = $data['name'];
		$email = $data['email'];
		$mobile = $data['mobile'];
		$message = $data['message'];
		$subject = $data['subject'];
		
		$mailer = $data['mailer'];
		

		$mail = new PHPMailer;

		$mail->isSMTP();                                      // Set mailer to use SMTP
		$mail->Host = 'tradeferry.io';  // Specify main and backup SMTP servers
		$mail->SMTPAuth = true; // Enable SMTP authentication
		$mail->Username = 'admin@tradeferry.io';// SMTP username
		$mail->Password = 'TradeSupport';// SMTP password
		$mail->SMTPSecure = 'ssl'; // Enable TLS encryption, `ssl` also accepted (if you have ssl use ssl else use false)
		$mail->Port = 465; // TCP port to connect to

		$mail->setFrom("admin@tradeferry.io", "Website Admin");

		$mail->addAddress($mailer);     // Add a recipient
	
		$mail->isHTML(true);                                 

		$mail->Subject = ($subject == '' ? 'Website Email' : $subject );
		$mail->Body  = '
			Name: '.$name.'<br>
			Email: '.$email.'<br>
			Mobile: '.$mobile.'<br>
			Message: '.$message;
		
		$mail->send();

		$response['status'] = 200;
    	$response['status_desc'] = "Your message was sent successfully. Thank you!";
    	return json_encode($response);
	}
}