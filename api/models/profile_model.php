<?php
require_once 'helpers/utility.php';

class profile_model extends model{
	public function __construct(){ 
		parent::__construct(); 
		$this->id = Utility::getPayLoad()->data->user_id;
	}

    public function getPreference(){
        $result = $this->db->getItem("SELECT * FROM tbl_preference WHERE id=1");
        return $result;
    }

    public function updatePersonalProfile($data){
		$fullname = $data['fullname'];
		$nickname = $data['nickname'];
		$phone = $data['phone'];
		$telegram = $data['telegram'];
		$dob = $data['dob'];
		
		$db_data = [
			'fullname' => $fullname,
			'nickname' => $nickname,
			'mobile' => $phone,
			'telegram' => $telegram,
			'dob' => $dob
		];
		$db_where = "id={$this->id}";
		$this->db->update('tbl_users', $db_data, $db_where);
		$response['status'] = 200;
		$response['message'] = "updated personal profile";
		return $response;
 	}

	public function updateAddressProfile($data){
		$address1 = $data['address1'];
		$address2 = $data['address2'];
		$state = $data['state'];
		$country = $data['country'];

		$db_data = [
			'address' => $address1,
			'address1' => $address2,
			'city' => $state,
			'country' => $country 
		];
		$db_where = "id={$this->id}";
		$this->db->update('tbl_users', $db_data, $db_where);
		$response['status'] = 200;
		$response['message'] = "updated address profile";
		return $response;
	}

    public function changeEmail($data){
        $email = $data['email'];
        $password = $data['password'];

        $result = $this->db->getItem("SELECT * FROM tbl_users WHERE id={$this->id} ");
        if(!$result){
            $response['status'] = 404;
            $response['message'] = "Invalid email address specified";
            return $response;
        }

        //send email before updating
        if($password === $result['password']){
            $db_data = [
                'email' => $email
            ];
            $where = "id={$this->id}";
            $this->db->update('tbl_users', $db_data, $where);
            $response['status'] = 200;
            $response['message'] = "Email updated successful"; 
        }else{
            $response['status'] = 400;
            $response['message'] = "password mismatch";
        }
        return $response;
    }

    public function changePassword($data){
        $oldPassword = $data['oldPassword'];
        $newPassword = $data['newPassword'];

        $result = $this->db->getItem("SELECT `password` FROM tbl_users WHERE `id`={$this->id}");
        if(!$result){
            $response['status'] = 404;
            $response['message'] = "Invalid old password specied";
            return $response;
        }
        if($result['password'] !== $newPassword){
            $response['status'] = 400;
            $response['message'] = "The current password you entered does not match the password we have on our server.";
            return $response;
        }
        $db_data = [
            'password' => $newPassword
        ];
        $where = "id={$this->id}";
        $this->db->update("tbl_users", $db_data, $where);
        $response['status'] = 200;
        $response['message'] = "Password updated successful"; 
        return $response;
    }

}