<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

require_once 'libs/bootstrap.php';
require_once 'libs/controller.php';
require_once 'libs/model.php';
require_once 'libs/view.php';
//core transaction classess

//libraries
require 'libs/database.php';
require 'libs/session.php';
//mail libraries

//configurations
require_once 'configs/paths.php';
require_once 'configs/database.php';
require_once 'configs/key_constants.php';
//mail
require_once 'PHPMailer/PHPMailerAutoload.php';


$app = new Bootstrap();