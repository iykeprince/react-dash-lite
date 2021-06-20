<?php
class index extends controller{

    function __construct() {
        parent::__construct();
        
    }
    public function index(){
       $this->view->render('index/index');
    }
    
    public function about(){
       $this->view->render('index/about');
    }
    
    public function contact(){
       $this->view->render('index/contact');
    }
    
    public function faq(){
       $this->view->render('index/faq');
    }
    
    
    public function details(){
    	$this->view->render('login/forgot_password');
    }
    
    public function handleMail1() {
        $data = array();
    	$data['name'] = $this->escape_value($_POST['name']);
    	$data['email'] = $this->escape_value($_POST['email']);
    	$data['mobile'] = $this->escape_value($_POST['mobile']);
    	$data['message'] = $this->escape_value($_POST['message']);
    	$data['mailer'] = "hello@michelleannschlosser.me";
    	
    	$response = $this->model->handleMail1($data);
    	
    	echo $response;
    	
    }
    
    public function handleMail2() {
        $data = array();
    	$data['name'] = $this->escape_value($_POST['contactName']);
    	$data['email'] = $this->escape_value($_POST['contactMail']);
    	$data['mobile'] = $this->escape_value($_POST['contactPhone']);
    	$data['message'] = $this->escape_value($_POST['contactMessage']);
    	$data['mailer'] = "hello@joannemarygranchelli.me";
    	
    	$response = $this->model->handleMail1($data);
    	
    	header('Location: https://joannemarygranchelli.me');
    }
    
    public function handleMail3() {
        $data = array();
    	$data['name'] = $this->escape_value($_POST['name']);
    	$data['email'] = $this->escape_value($_POST['email']);
    	$data['mobile'] = $this->escape_value($_POST['mobile']);
    	$data['message'] = $this->escape_value($_POST['message']);
    	$data['mailer'] = "hello@emilyrebeccabaker.me";
    	
    	$response = $this->model->handleMail1($data);
    	
    	header('Location: https://emilyrebeccabaker.me');
    }
    
    public function handleMail4() {
        $data = array();
    	$data['name'] = $this->escape_value($_POST['name']);
    	$data['email'] = $this->escape_value($_POST['email']);
    	$data['mobile'] = $this->escape_value($_POST['mobile']);
    	$data['message'] = $this->escape_value($_POST['message']);
    	$data['mailer'] = "hello@marilynsuthuyen.net";
    	
    	$response = $this->model->handleMail1($data);
    	
    	echo $response;
    	
    }
    
    public function handleMail5() {
        $data = array();
    	$data['name'] = $this->escape_value($_POST['name']);
    	$data['email'] = $this->escape_value($_POST['email']);
    	$data['mobile'] = $this->escape_value($_POST['mobile']);
    	$data['message'] = $this->escape_value($_POST['comments']);
    	$data['mailer'] = "hello@patriceannisabella.me";
    	
    	$response = $this->model->handleMail1($data);
    	
    	echo $response;
    	
    }
    
    public function handleMail6() {
        $data = array();
    	$data['name'] = $this->escape_value($_POST['name']);
    	$data['email'] = $this->escape_value($_POST['email']);
    	$data['mobile'] = $this->escape_value($_POST['mobile']);
    	$data['message'] = $this->escape_value($_POST['comments']);
    	$data['subject'] = $this->escape_value($_POST['subject']);
    	$data['mailer'] = "hello@ritamarieswann.me";
    	
    	$response = $this->model->handleMail1($data);
    	
    	echo $response;
    	
    }
    
    public function handleMail7() {
        $data = array();
    	$data['name'] = $this->escape_value($_POST['form-name']);
    	$data['email'] = $this->escape_value($_POST['form-email']);
    	$data['mobile'] = $this->escape_value($_POST['form-mobile']);
    	$data['message'] = $this->escape_value($_POST['form-message']);
    	$data['mailer'] = "hello@angelarenereynolds.com";
    	
    	$response = $this->model->handleMail1($data);
    	
    	header('Location: https://angelarenereynolds.com');
    	
    }
    
    public function handleMail8() {
        $data = array();
    	$data['name'] = $this->escape_value($_POST['name']);
    	$data['email'] = $this->escape_value($_POST['email']);
    	$data['mobile'] = $this->escape_value($_POST['mobile']);
    	$data['message'] = $this->escape_value($_POST['message']);
    	$data['mailer'] = "hello@alicemartinwinters.me";
    	
    	$response = $this->model->handleMail1($data);
    	
    	header('Location: https://alicemartinwinters.me');
    }
    
    public function handleMail9() {
        $data = array();
        
    	$data['name'] = $this->escape_value($_POST['f_name']);
    	$data['email'] = $this->escape_value($_POST['f_email']);
    	$data['mobile'] = $this->escape_value($_POST['f_phone']);
    	$data['message'] = $this->escape_value($_POST['f_message']);
    	$data['subject'] = $this->escape_value($_POST['f_subject']);
    	$data['mailer'] = "hello@karenalicehartz.me";
    	
    	$response = $this->model->handleMail2($data);
    	
    	echo $response;
    }
    
    public function handleMail10() {
        $data = array();
        
    	$data['name'] = $this->escape_value($_POST['name']);
    	$data['email'] = $this->escape_value($_POST['email']);
    	$data['mobile'] = $this->escape_value($_POST['mobile']);
    	$data['message'] = $this->escape_value($_POST['message']);
    	$data['mailer'] = "hello@rachaelsuehasler.com";
    	
    	$response = $this->model->handleMail1($data);
    	
    	header('Location: https://rachaelsuehasler.com');
    }
    
    public function handleMail11() {
        $data = array();
        
    	$data['name'] = $this->escape_value($_POST['name']);
    	$data['email'] = $this->escape_value($_POST['email']);
    	$data['mobile'] = $this->escape_value($_POST['mobile']);
    	$data['message'] = $this->escape_value($_POST['message']);
    	$data['budget'] = $this->escape_value($_POST['budget']);
    	$data['mailer'] = "hello@lorettaannbenotto.me";
    	
    	$response = $this->model->handleMail1($data);
    	
    	echo $response;
    }
    
    public function handleMail12() {
        $data = array();
        
    	$data['name'] = $this->escape_value($_POST['name']);
    	$data['email'] = $this->escape_value($_POST['email']);
    	$data['mobile'] = $this->escape_value($_POST['mobile']);
    	$data['message'] = $this->escape_value($_POST['comments']);
    	$data['mailer'] = "hello@meghanpaigevillanueva.me";
    	
    	$response = $this->model->handleMail1($data);
    	
        echo $response;
    }
    
    public function handleMail13() {
        $data = array();
        
    	$data['name'] = $this->escape_value($_POST['name']);
    	$data['email'] = $this->escape_value($_POST['email']);
    	$data['mobile'] = $this->escape_value($_POST['mobile']);
    	$data['message'] = $this->escape_value($_POST['comments']);
    	$data['mailer'] = "hello@michellelynnettelong.me";
    	
    	$response = $this->model->handleMail2($data);
    	
    	echo $response;
    }
    
    public function handleMail14() {
        $data = array();
        
    	$data['name'] = $this->escape_value($_POST['name']);
    	$data['email'] = $this->escape_value($_POST['email']);
    	$data['mobile'] = $this->escape_value($_POST['mobile']);
    	$data['message'] = $this->escape_value($_POST['message']);
    	$data['subject'] = $this->escape_value($_POST['subject']);
    	$data['mailer'] = "hello@agathachristinerobinson.me";
    	
    	$response = $this->model->handleMail1($data);
    	
    	header('Location: https://agathachristinerobinson.com');
    }
    
    public function handleMail15() {
        $data = array();
        
    	$data['name'] = $this->escape_value($_POST['name']);
    	$data['email'] = $this->escape_value($_POST['email']);
    	$data['mobile'] = $this->escape_value($_POST['mobile']);
    	$data['message'] = $this->escape_value($_POST['message']);
    	$data['mailer'] = "hello@melaniebaileyhess.me";
    	
    	$response = $this->model->handleMail1($data);
    	
    	echo $response;
    }
    
    public function handleMail16() {
        $data = array();
        
    	$data['name'] = $this->escape_value($_POST['name']);
    	$data['email'] = $this->escape_value($_POST['email']);
    	$data['mobile'] = $this->escape_value($_POST['mobile']);
    	$data['location'] = $this->escape_value($_POST['location']);
    	$data['message'] = $this->escape_value($_POST['message']);
    	$data['mailer'] = "hello@ellenroseschriver.me";
    	
    	$response = $this->model->handleMail1($data);
    	
    	echo $response;
    }
    
    public function handleMail17() {
        $data = array();
        
    	$data['name'] = $this->escape_value($_POST['name']);
    	$data['email'] = $this->escape_value($_POST['email']);
    	$data['mobile'] = $this->escape_value($_POST['mobile']);
    	$data['location'] = $this->escape_value($_POST['location']);
    	$data['subject'] = $this->escape_value($_POST['subject']);
    	$data['message'] = $this->escape_value($_POST['message']);
    	$data['mailer'] = "hello@elizabethjoykleymann.com";
    	
    	$response = $this->model->handleMail1($data);
    	
    	echo $response;
    }
    
    public function handleMail18() {
        $data = array();
        
    	$data['name'] = $this->escape_value($_POST['name']);
    	$data['email'] = $this->escape_value($_POST['email']);
    	$data['mobile'] = $this->escape_value($_POST['mobile']);
    	$data['location'] = $this->escape_value($_POST['location']);
    	$data['subject'] = $this->escape_value($_POST['subject']);
    	$data['message'] = $this->escape_value($_POST['message']);
    	$data['mailer'] = "hello@eileenmariecarraher.me";
    	
    	$response = $this->model->handleMail1($data);
    	
    	echo $response;
    }
    
    public function handleMail19() {
        $data = array();
        
    	$data['name'] = $this->escape_value($_POST['name']);
    	$data['email'] = $this->escape_value($_POST['email']);
    	$data['mobile'] = $this->escape_value($_POST['mobile']);
    	$data['subject'] = $this->escape_value($_POST['subject']);
    	$data['message'] = $this->escape_value($_POST['message']);
    	$data['mailer'] = "hello@vivianklainemorgan.com";
    	
    	$response = $this->model->handleMail1($data);
    	
    	header('Location: https://vivianklainemorgan.com');
    }
    
    public function handleMail20() {
        $data = array();
        
    	$data['name'] = $this->escape_value($_POST['name']);
    	$data['email'] = $this->escape_value($_POST['email']);
    	$data['mobile'] = $this->escape_value($_POST['mobile']);
    	$data['subject'] = $this->escape_value($_POST['subject']);
    	$data['message'] = $this->escape_value($_POST['message']);
    	
    	$data['mailer'] = "hello@victoriaadriennefrazier.com";
    	
    	$response = $this->model->handleMail1($data);
    	
    	echo $response;
    }
    
    public function handleMail21() {
        $data = array();
        
    	$data['name'] = $this->escape_value($_POST['cf-name']);
    	$data['email'] = $this->escape_value($_POST['cf-email']);
    	$data['mobile'] = $this->escape_value($_POST['cf-mobile']);
    	$data['subject'] = $this->escape_value($_POST['cf-subject']);
    	$data['message'] = $this->escape_value($_POST['cf-message']);
    	
    	$data['mailer'] = "hello@justinairenenevel.com";
    	
    	$response = $this->model->handleMail2($data);
    	
    // 	header('Location: https://justinairenenevel.com');
    	
    	echo $response;
    }
    
    public function handleMail22() {
        $data = array();
        
    	$data['name'] = $this->escape_value($_POST['name']);
    	$data['email'] = $this->escape_value($_POST['email']);
    	$data['mobile'] = $this->escape_value($_POST['mobile']);
    	$data['location'] = $this->escape_value($_POST['location']);
    	$data['message'] = $this->escape_value($_POST['message']);
    	$data['mailer'] = "hello@carolineelizabethemswiler.com";
    	
    	$response = $this->model->handleMail1($data);
    	
    // 	header('Location: https://carolineelizabethemswiler.com');
    	
    	echo $response;
    }
    
    public function handleMail23() {
        $data = array();
        
    	$data['name'] = $this->escape_value($_POST['name']);
    	$data['email'] = $this->escape_value($_POST['email']);
    	$data['mobile'] = $this->escape_value($_POST['mobile']);
    	$data['location'] = $this->escape_value($_POST['location']);
    	$data['subject'] = $this->escape_value($_POST['subject']);
    	$data['message'] = $this->escape_value($_POST['message']);
    	$data['mailer'] = "hello@karenevansdoss.com";
    	
    	$response = $this->model->handleMail1($data);
    	
    	echo $response;
    }
    
    public function handleMail24() {
        $data = array();
        
    	$data['name'] = $this->escape_value($_POST['contactName']);
    	$data['email'] = $this->escape_value($_POST['contactMail']);
    	$data['mobile'] = $this->escape_value($_POST['contactPhone']);
    	$data['location'] = $this->escape_value($_POST['contactLocation']);
    	$data['subject'] = $this->escape_value($_POST['contactSubject']);
    	$data['message'] = $this->escape_value($_POST['contactMessage']);
    	$data['mailer'] = "hello@dianegracekyle.com";
    	
    	$response = $this->model->handleMail1($data);
    	
    	echo $response;
    }
    
    public function handleMail25() {
        $data = array();
        
    	$data['name'] = $this->escape_value($_POST['name']);
    	$data['email'] = $this->escape_value($_POST['email']);
    	$data['mobile'] = $this->escape_value($_POST['mobile']);
    	$data['message'] = $this->escape_value($_POST['message']);
    	$data['mailer'] = "hello@marialedagoebel.com";
    	
    	$response = $this->model->handleMail1($data);
    	
    	echo $response;
    }
    
    public function handleMail26() {
        $data = array();
        
    	$data['name'] = $this->escape_value($_POST['name']);
    	$data['email'] = $this->escape_value($_POST['email']);
    	$data['mobile'] = $this->escape_value($_POST['mobile']);
    	$data['message'] = $this->escape_value($_POST['message']);
    	$data['mailer'] = "hello@bonitajustinecefalu.me";
    	
    	$response = $this->model->handleMail1($data);
    	
    	echo $response;
    }
    
    public function handleMail27() {
        $data = array();
        
    	$data['name'] = $this->escape_value($_POST['name']);
    	$data['email'] = $this->escape_value($_POST['email']);
    	$data['mobile'] = $this->escape_value($_POST['mobile']);
    	$data['subject'] = $this->escape_value($_POST['subject']);
    	$data['message'] = $this->escape_value($_POST['message']);
    	$data['mailer'] = "info@kimberlyanneritchey.com";
    	
    	$response = $this->model->handleMail1($data);
    	
    	header('Location: https://kimberlyanneritchey.com');
    }
    
    public function handleMail28() {
        $data = array();
        
    	$data['name'] = $this->escape_value($_POST['name']);
    	$data['email'] = $this->escape_value($_POST['email']);
    	$data['mobile'] = $this->escape_value($_POST['mobile']);
    	$data['subject'] = $this->escape_value($_POST['subject']);
    	$data['message'] = $this->escape_value($_POST['comments']);
    	$data['mailer'] = "hello@fredalynnjohnson.com";
    	
    	$response = $this->model->handleMail1($data);
    	
    	echo $response;
    }
    
//     public function updateDailyProfit(){
// 	   $this->model->updateDailyProfit();
// 	}
}

