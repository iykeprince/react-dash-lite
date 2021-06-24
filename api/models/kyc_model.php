<?php
require_once 'helpers/utility.php';

class kyc_model extends model{
	public function __construct(){ 
		parent::__construct(); 
		$this->id = Utility::getPayLoad()->data->user_id;
	}

    public function getKyc(){
        $result = $this->db->getItem("SELECT * FROM tbl_kyc WHERE user_id={$this->id}");
        return $result;
    }

    public function create($data){
        $input = $data['postData'];
        $idFile = $data['idfile'];

        $fileResult = $this->uploadKYC($this->id, $idFile);
        if($fileResult === 200){
            $target_dir = "uploaded_files/";
		    $target_file = $target_dir . basename($idFile["name"]);
            //save the kyc
            $query = $this->db->getItem("SELECT * FROM tbl_kyc WHERE user_id={$this->id}");

            $formdata = [
                "user_id" => $this->id,
                "firstname" => $this->escape_value($input['firstName']),
                "lastname" => $this->escape_value($input["lastName"]),
                "email" => $this->escape_value($input["email"]),
                "phone" => $this->escape_value($input["phoneNumber"]),
                "dob" => $this->escape_value($input["dateOfBirth"]),
                "telegram" => $this->escape_value($input["telegramUsername"]),
                "address1" => $this->escape_value($input["address1"]),
                "address2" => $this->escape_value($input["address2"]),
                "city" => $this->escape_value($input["city"]),
                "state" => $this->escape_value($input["state"]),
                "nationality" => $this->escape_value($input["nationality"]),
                "zipcode" => $this->escape_value($input["zipCode"]),
                "idproof" => $this->escape_value($input["idProof"]),
                "idfile" => $target_file
            ];

            if(!$query){    
                $this->db->insert('tbl_kyc', $formdata);
                $response['status'] = 200;
                $response['message'] = "Kyc created successfully!";
            }else{
                $formWhere = "user_id={$this->id}";
                $this->db->update('tbl_kyc', $formdata, $formWhere);
                $response['status'] = 201;
                $response['message'] = "Kyc updated successfully!";
            }
        }else{
            $response['status'] = 400;
            $response['message'] = $fileResult;
        }
        return $response;
    }

    private function uploadKYC($id, $file){
        // Check if file was uploaded without errors
        if(isset($file) && $file["error"] == 0){
            $allowed = array("jpg" => "image/jpg", "jpeg" => "image/jpeg", "gif" => "image/gif", "png" => "image/png");
            $filename = $file["name"];
            $filetype = $file["type"];
            $filesize = $file["size"];
    
            $target_dir = "uploaded_files/";
		    $target_file = $target_dir . basename($file["name"]);

            // Verify file extension
            $ext = pathinfo($filename, PATHINFO_EXTENSION);
            if(!array_key_exists($ext, $allowed)) return ("Error: Please select a valid file format.");
        
            // Verify file size - 5MB maximum
            $maxsize = 5 * 1024 * 1024;
            if($filesize > $maxsize) return("Error: File size is larger than the allowed limit.");
        
            // Verify MYME type of the file
            if(in_array($filetype, $allowed)){
                // Check whether file exists before uploading it
                if(file_exists("upload/" . $filename)){
                    return $filename . " is already exists.";
                } else{
                    $uploadFileName = uniqid().".$ext";
                    if(move_uploaded_file($file["tmp_name"], $target_file))
                    return 200;
                    else return "Error: failed to upload file";
                } 
            } else{
                return "Error: There was a problem uploading your file. Please try again."; 
            }
        } else{
            return "Error: " . $file["error"];
        }
    }

    private function escape_value($value){
    	$value = trim($value);
    	$value = htmlspecialchars($value);
    	$value = stripslashes($value);
    	return $value;
    }
}