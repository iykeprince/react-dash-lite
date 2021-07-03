<?php
require_once 'helpers/utility.php';

class dashboard extends controller{
	public function __construct(){
		parent::__construct();

	} 
	public function index(){ 
		$userInfo = $this->model->userInfo();

		$data = [
			"wallet_balance" => $userInfo['wallet_balance']
		];

		echo Utility::convertToJSON($data);
	}

	public function getUser(){
		$userInfo = $this->model->userInfo();
		echo Utility::convertToJSON($userInfo);
	}

	public function getUserPlan(){
		$response = $this->model->getUserPlan();
		
		echo Utility::convertToJSON($response);
	}

	public function getTransactions(){
		$transactions = $this->model->transactions();
		echo Utility::convertToJSON($transactions);
	}

	public function getWithdrawalStatement(){
		$transactions = $this->model->transactions();
		$userInfo = $this->model->userInfo();
		$withdrawals = $this->model->getAllWithdrawals();
		$totalInvestment = 0;
		$totalWithdrawals = 0;
		foreach($transactions as $key => $value){
			$totalInvestment += $value['plan_amount'];
		}

		foreach($withdrawals as $key => $value){
			$totalWithdrawals += $value['amount'];
		}

		$response = [
			'total_investment' => $totalInvestment,
			'profit' => $userInfo['available_profit'],
			'withdrawals' => $totalWithdrawals
		];
		echo Utility::convertToJSON($response);
	}

	

	public function updateUserInstance(){
		$obj = json_decode(file_get_contents('php://input'));
		
		$data['fullname'] = $this->escape_value($obj->fullname);
    	$data['mobile'] = $this->escape_value($obj->phone);
    	$data['address'] = $this->escape_value($obj->address);
    	$data['zip_code'] = $this->escape_value($obj->zipCode);
    	$data['city'] = $this->escape_value($obj->city);
    	$data['country'] = $this->escape_value($obj->country);
    	
    	$data['wallet_address'] = $this->escape_value($obj->walletAddress);

    	$data['linkedIn'] = $this->escape_value($obj->linkedIn);
    	$data['facebook'] = $this->escape_value($obj->facebook);
    	$data['twitter'] = $this->escape_value($obj->twitter);
    	$data['instagram'] = $this->escape_value($obj->instagram);

		$data['bio'] = $this->escape_value($obj->bio);
		$data['dob'] = $this->escape_value($obj->dob);
		
    	$response = $this->model->updateUserInstance($data);
		echo Utility::convertToJSON($response);
	}

	public function plans(){
		$plans = $this->model->getAllPlans();
		echo Utility::convertToJSON($plans);
	}

	public function withdrawAccount(){
		$object = json_decode(file_get_contents('php://input'));
        $data['address'] = $this->escape_value($object->walletAddress);
        $data['type'] = $this->escape_value($object->withdrawMethod);
        $data['amount'] = $this->escape_value($object->amount);
        
        $response = $this->model->withdrawAccount($data);
		echo Utility::convertToJSON($response);
	}

	public function changePassword(){
        $obj = json_decode(file_get_contents('php://input'));
        $data['oldpassword'] = $this->escape_value($obj->currentPassword);
        $data['newpassword'] = $this->escape_value($obj->newPassword);
        $data['confirmpassword'] = $this->escape_value($confirmPassword);
        
        $response = $this->model->changePassword($data);
		echo Utility::convertToJSON($response);
    }

	public function logs(){
		$response = $this->model->logs();
		echo Utility::convertToJSON($response);
	}

	public function uploadImage(){
		$date_uploaded = date('d/m/Y', strtotime('now'));
		$time_uploaded = date('h:ia', strtotime('now'));

		$data['date_uploaded'] = $date_uploaded;
		$data['time_uploaded'] = $time_uploaded;
		$data['file'] = $_FILES['file'];
		
		$response = $this->model->uploadImage($data);
		echo Utility::convertToJSON($response);
	}

	public function referals(){
		$response = $this->model->referal_list();
		echo Utility::convertToJSON($response);
	}

	public function createSyncAccounts(){
		$obj = json_decode(file_get_contents('php://input'));
        $data['stockTradeEmail'] = $this->escape_value($obj->stockTradeEmail);
        $data['stockTradePassword'] = $this->escape_value($obj->stockTradePassword);
        $data['forexTradeEmail'] = $this->escape_value($obj->forexTradeEmail);
        $data['forexTradePassword'] = $this->escape_value($obj->forexTradePassword);
        $data['digitalTradeEmail'] = $this->escape_value($obj->digitalTradeEmail);
        $data['digitalTradePassword'] = $this->escape_value($obj->digitalTradePassword);

		$response = $this->model->createSyncAccounts($data);
		echo Utility::convertToJSON($response);
	}

	public function getSyncAccount(){
		$response = $this->model->getSyncAccount();
		echo Utility::convertToJSON($response);
	}

	
	public function wallet($arg = false){
		$this->view->link = 'transactions';
		$this->view->userInfo = $this->model->userInfo(Session::get('user_id'));
		$this->view->bool_merge_receive = $this->model->check_gh_merge_exist(Session::get('user_id'));

		if($this->model->check_gh_merge_exist(Session::get('user_id'))){
			$this->view->merge_to_receive_list = $this->model->merge_to_receive(Session::get('user_id'));
		}
		$this->view->load_all_fund_transaction = $this->model->load_all_fund_transaction(Session::get('user_id'));
		$this->view->prefInfo = $this->model->prefInfo();
		
		$this->view->render('dashboard/wallet');
	}

	public function invest($arg = false){
		$this->view->link = 'invest';
		$this->view->userInfo = $this->model->userInfo(Session::get('user_id'));
		$this->view->fundInfo = $this->model->fundInfo(Session::get('user_id'));
		$this->view->prefInfo = $this->model->prefInfo();
		$this->view->bool_merge_receive = $this->model->check_gh_merge_exist(Session::get('user_id'));

		if($this->model->check_gh_merge_exist(Session::get('user_id'))){
			$this->view->merge_to_receive_list = $this->model->merge_to_receive(Session::get('user_id'));
		}
		$this->view->load_all_fund_transaction = $this->model->load_all_fund_transaction(Session::get('user_id'));
		$this->view->plans = $this->model->getAllPlans();
		
		
		$this->view->render('dashboard/invest');
	}
	public function checkout_pm($arg = false){
		$this->view->link = 'invest';
		$this->view->userInfo = $this->model->userInfo(Session::get('user_id'));
		$this->view->fundInfo = $this->model->fundInfo(Session::get('user_id'));
		$this->view->prefInfo = $this->model->prefInfo();
		$this->view->bool_merge_receive = $this->model->check_gh_merge_exist(Session::get('user_id'));

		if($this->model->check_gh_merge_exist(Session::get('user_id'))){
			$this->view->merge_to_receive_list = $this->model->merge_to_receive(Session::get('user_id'));
		}
		$this->view->load_all_fund_transaction = $this->model->load_all_fund_transaction(Session::get('user_id'));
		$this->view->plans = $this->model->getAllPlans();
		
		$this->view->render('dashboard/checkout_pm');
	}
	public function checkout_btc($arg = false){
		$this->view->link = 'invest';
		$this->view->userInfo = $this->model->userInfo(Session::get('user_id'));
		$this->view->fundInfo = $this->model->fundInfo(Session::get('user_id'));
		$this->view->prefInfo = $this->model->prefInfo();
		$this->view->bool_merge_receive = $this->model->check_gh_merge_exist(Session::get('user_id'));

		if($this->model->check_gh_merge_exist(Session::get('user_id'))){
			$this->view->merge_to_receive_list = $this->model->merge_to_receive(Session::get('user_id'));
		}
		$this->view->load_all_fund_transaction = $this->model->load_all_fund_transaction(Session::get('user_id'));
		$this->view->plans = $this->model->getAllPlans();
		// $this->view->receiver_payment_count = $this->model->receiver_payment_count(Session::get('user_id'));
		
		$this->view->render('dashboard/checkout_btc');
	}
	public function checkout_visa($arg = false){
		$this->view->link = 'invest';
		$this->view->userInfo = $this->model->userInfo(Session::get('user_id'));
		$this->view->fundInfo = $this->model->fundInfo(Session::get('user_id'));
		$this->view->prefInfo = $this->model->prefInfo();
		$this->view->bool_merge_receive = $this->model->check_gh_merge_exist(Session::get('user_id'));

		if($this->model->check_gh_merge_exist(Session::get('user_id'))){
			$this->view->merge_to_receive_list = $this->model->merge_to_receive(Session::get('user_id'));
		}
		$this->view->load_all_fund_transaction = $this->model->load_all_fund_transaction(Session::get('user_id'));
		$this->view->plans = $this->model->getAllPlans();
		// $this->view->receiver_payment_count = $this->model->receiver_payment_count(Session::get('user_id'));
		
		$this->view->render('dashboard/checkout_visa');
	}
	public function checkout_bank($arg = false){
		$this->view->link = 'invest';
		$this->view->userInfo = $this->model->userInfo(Session::get('user_id'));
		$this->view->fundInfo = $this->model->fundInfo(Session::get('user_id'));
		$this->view->prefInfo = $this->model->prefInfo();
		$this->view->bool_merge_receive = $this->model->check_gh_merge_exist(Session::get('user_id'));

		if($this->model->check_gh_merge_exist(Session::get('user_id'))){
			$this->view->merge_to_receive_list = $this->model->merge_to_receive(Session::get('user_id'));
		}
		$this->view->load_all_fund_transaction = $this->model->load_all_fund_transaction(Session::get('user_id'));
		$this->view->plans = $this->model->getAllPlans();
		
		
		$this->view->render('dashboard/checkout_bank');
	}

	public function invest_history($arg = false){
		$this->view->link = 'invest';
		$this->view->userInfo = $this->model->userInfo(Session::get('user_id'));
		$this->view->fundInfo = $this->model->fundInfo(Session::get('user_id'));
		$this->view->prefInfo = $this->model->prefInfo();
		$this->view->current_plan = $this->model->get_current_plan(Session::get("user_id"));
		$this->view->bool_merge_receive = $this->model->check_gh_merge_exist(Session::get('user_id'));

		if($this->model->check_gh_merge_exist(Session::get('user_id'))){
			$this->view->merge_to_receive_list = $this->model->merge_to_receive(Session::get('user_id'));
		}
		$this->view->load_all_fund_transaction = $this->model->load_all_fund_transaction(Session::get('user_id'));
		
		
		$this->view->render('dashboard/invest_history');
	}
	public function invest_confirm($arg = false){
		$this->view->link = 'invest';
		$this->view->userInfo = $this->model->userInfo(Session::get('user_id'));
		$this->view->fundInfo = $this->model->fundInfo(Session::get('user_id'));
		$this->view->prefInfo = $this->model->prefInfo();
		$this->view->bool_merge_receive = $this->model->check_gh_merge_exist(Session::get('user_id'));

		if($this->model->check_gh_merge_exist(Session::get('user_id'))){
			$this->view->merge_to_receive_list = $this->model->merge_to_receive(Session::get('user_id'));
		}
		$this->view->load_all_fund_transaction = $this->model->load_all_fund_transaction(Session::get('user_id'));
		
		
		$this->view->render('dashboard/invest_confirm');
	}
	public function payout($arg = false){
		$this->view->link = 'payout';
		$this->view->userInfo = $this->model->userInfo(Session::get('user_id'));
		$this->view->bool_merge_receive = $this->model->check_gh_merge_exist(Session::get('user_id'));

		if($this->model->check_gh_merge_exist(Session::get('user_id'))){
			$this->view->merge_to_receive_list = $this->model->merge_to_receive(Session::get('user_id'));
		}
		
		$this->view->prefInfo = $this->model->prefInfo();
		$this->view->myBoughtTokens = $this->model->getBoughtTokens(Session::get("user_id"));
		$this->view->render('dashboard/payout');
	}
	public function payout_history($arg = false){
		$this->view->link = 'payout';
		$this->view->userInfo = $this->model->userInfo(Session::get('user_id'));
		$this->view->bool_merge_receive = $this->model->check_gh_merge_exist(Session::get('user_id'));

		if($this->model->check_gh_merge_exist(Session::get('user_id'))){
			$this->view->merge_to_receive_list = $this->model->merge_to_receive(Session::get('user_id'));
		}
		$this->view->prefInfo = $this->model->prefInfo();
		$this->view->load_all_withdraw_transaction = $this->model->load_all_withdraw_transaction(Session::get('user_id'));
		
		$this->view->myBoughtTokens = $this->model->getBoughtTokens(Session::get("user_id"));
		$this->view->render('dashboard/payout_history');
	}
	public function change_pass(){
		$this->view->link = 'profile';
		$this->view->userInfo = $this->model->userInfo(Session::get('user_id'));
		$this->view->referal_count = $this->model->referal_count(Session::get('user_id'));
		$this->view->referal_list = $this->model->referal_list(Session::get('user_id'));
		$this->view->current_plan = $this->model->get_current_plan(Session::get("user_id"));
		$this->view->auto_manual_mode = $this->model->auto_manual_pref();
        $this->view->render('dashboard/change_pass');
    }
    public function payment_profile(){
	    $this->view->link = 'profile';
		$this->view->userInfo = $this->model->userInfo(Session::get('user_id'));
		$this->view->referal_count = $this->model->referal_count(Session::get('user_id'));
		$this->view->referal_list = $this->model->referal_list(Session::get('user_id'));
		$this->view->current_plan = $this->model->get_current_plan(Session::get("user_id"));
		$this->view->auto_manual_mode = $this->model->auto_manual_pref();
		$this->view->render('dashboard/payment_profile');
		
	}

	public function fund_wallet($arg = false){
		$this->view->link = 'wallet';
		$this->view->userInfo = $this->model->userInfo(Session::get('user_id'));
		$this->view->fundInfo = $this->model->fundInfo(Session::get('user_id'));
		$this->view->fundInfoPaid = $this->model->fundInfoPaid(Session::get('user_id'));
		$this->view->fundInfoConfirm = $this->model->fundInfoConfirm(Session::get('user_id'));
		$this->view->fundPmInfo = $this->model->fundPmInfo(Session::get('user_id'));
		$this->view->fundPmInfoPaid = $this->model->fundPmInfoPaid(Session::get('user_id'));
		$this->view->fundPmInfoConfirm = $this->model->fundPmInfoConfirm(Session::get('user_id'));
		$this->view->bool_merge_receive = $this->model->check_gh_merge_exist(Session::get('user_id'));

		if($this->model->check_gh_merge_exist(Session::get('user_id'))){
			$this->view->merge_to_receive_list = $this->model->merge_to_receive(Session::get('user_id'));
		}
		$this->view->prefInfo = $this->model->prefInfo();
		$this->view->notify_to_fund = $this->model->notify_to_fund(Session::get('user_id'));
		$this->view->notify_of_funds = $this->model->notify_of_funds(Session::get('user_id'));
		$this->view->notify_to_fundPm = $this->model->notify_to_fundPm(Session::get('user_id'));
		$this->view->notify_of_fundsPm = $this->model->notify_of_fundsPm(Session::get('user_id'));
		$this->view->notify_of_profit = $this->model->notify_of_profit(Session::get('user_id'));
		$this->view->auto_manual_mode = $this->model->auto_manual_pref();
		$this->view->plans = $this->model->getAllPlans();
		$this->view->randomOrderId = RandomGenerator::getToken(6);
		$this->view->render('dashboard/fund_wallet');
	}
	

	public function buy_token($arg = false){
		$this->view->link = 'tokens';
		$this->view->userInfo = $this->model->userInfo(Session::get('user_id'));
		$this->view->bool_merge_receive = $this->model->check_gh_merge_exist(Session::get('user_id'));

		if($this->model->check_gh_merge_exist(Session::get('user_id'))){
			$this->view->merge_to_receive_list = $this->model->merge_to_receive(Session::get('user_id'));
		}
		
		// shows bought tokens
		$this->view->myBoughtTokens = $this->model->getBoughtTokens(Session::get("user_id"));
		$this->view->render('dashboard/buy_token');
	}
	public function sell_token($arg = false){
		$this->view->link = 'tokens';
		$this->view->userInfo = $this->model->userInfo(Session::get('user_id'));
		$this->view->bool_merge_receive = $this->model->check_gh_merge_exist(Session::get('user_id'));

		if($this->model->check_gh_merge_exist(Session::get('user_id'))){
			$this->view->merge_to_receive_list = $this->model->merge_to_receive(Session::get('user_id'));
		}
		$this->view->prefInfo = $this->model->prefInfo();
		$this->view->myBoughtTokens = $this->model->getBoughtTokens(Session::get("user_id"));
		$this->view->render('dashboard/sell_token');
	}
	public function payment($arg = false){
		$this->view->userInfo = $this->model->userInfo(Session::get('user_id'));
		$this->view->bool_merge_receive = $this->model->check_gh_merge_exist(Session::get('user_id'));

		if($this->model->check_gh_merge_exist(Session::get('user_id'))){
			$this->view->merge_to_receive_list = $this->model->merge_to_receive(Session::get('user_id'));
		}
		
		$this->view->render('dashboard/payment');
	}
	public function referral($arg = false){
		$this->view->link = 'referral';
		$this->view->userInfo = $this->model->userInfo(Session::get('user_id'));
		$this->view->referal_count = $this->model->referal_count(Session::get('user_id'));
		$this->view->referal_list = $this->model->referal_list(Session::get('user_id'));
		$this->view->current_plan = $this->model->get_current_plan(Session::get("user_id"));
		$this->view->prefInfo = $this->model->prefInfo();
		$this->view->render('dashboard/referral');
	}

	// public function plans($arg = false){
	// 	$this->view->userInfo = $this->model->userInfo(Session::get('user_id'));
	// 	$this->view->referal_count = $this->model->referal_count(Session::get('user_id'));
	// 	$this->view->cycle_count = $this->model->cycle_count(Session::get('user_id'));
	// 	$this->view->current_plan = $this->model->get_current_plan(Session::get("user_id"));
	// 	$this->view->package_list = $this->model->get_all_subscription();
		
	// 	$this->view->auto_manual_mode = $this->model->auto_manual_pref();
	// 	$this->view->render('dashboard/plans');
	// }
	public function faq($arg = false){
		$this->view->userInfo = $this->model->userInfo(Session::get('user_id'));
		$this->view->referal_count = $this->model->referal_count(Session::get('user_id'));
		$this->view->referal_list = $this->model->referal_list(Session::get('user_id'));
		$this->view->current_plan = $this->model->get_current_plan(Session::get("user_id"));
		
		$this->view->render('dashboard/faq');
	}
	public function testimonies($arg = false){
		$this->view->userInfo = $this->model->userInfo(Session::get('user_id'));
		$this->view->referal_count = $this->model->referal_count(Session::get('user_id'));
		$this->view->referal_list = $this->model->referal_list(Session::get('user_id'));
		$this->view->current_plan = $this->model->get_current_plan(Session::get("user_id"));
		
		$this->view->auto_manual_mode = $this->model->auto_manual_pref();
		$this->view->render('dashboard/testimonies');
	}
	public function create_testimony($id){
		$data = array();
		$data['user_id'] = $id;
		$data['testimony'] = $this->escape_value($_POST['testimony_input']);
	}
	public function ph_i_have_paid($depositor_id){
		$ph_payment_status = $this->model->ph_i_have_paid($depositor_id);
		if($ph_payment_status == true){
			$gh_not_confirmed_res = base64_encode('true');
			header('location: '.URL.'dashboard/index/?gh_confirmation='.$gh_not_confirmed_res);
		}
	}
	
	public function match(){
		$this->view->link = 'admin';
		$this->view->load_get_help_list = $this->model->load_get_help();
		$this->view->provide_help_list = $this->model->do_the_merging();
		$this->view->get_help_request_list = $this->model->view_get_help();
		$this->view->userInfo = $this->model->userInfo(Session::get('user_id'));
		$this->view->referal_count = $this->model->referal_count(Session::get('user_id'));
		$this->view->referal_list = $this->model->referal_list(Session::get('user_id'));
		$this->view->current_plan = $this->model->get_current_plan(Session::get("user_id"));
		
		$this->view->auto_manual_mode = $this->model->auto_manual_pref();
		$this->view->render('dashboard/match');
	}
	public function ticket_read($ticket_id){
		$this->view->userInfo = $this->model->userInfo(Session::get('user_id'));
		$this->view->referal_count = $this->model->referal_count(Session::get('user_id'));
		$this->view->referal_list = $this->model->referal_list(Session::get('user_id'));
		$this->view->current_plan = $this->model->get_current_plan(Session::get("user_id"));
		$this->view->ticket_read = $this->model->ticket_read($ticket_id);
		
		$this->view->auto_manual_mode = $this->model->auto_manual_pref();
		$this->view->render('dashboard/ticket_read');
	}
	public function ticket_manager(){
		$this->view->userInfo = $this->model->userInfo(Session::get('user_id'));
		$this->view->referal_count = $this->model->referal_count(Session::get('user_id'));
		$this->view->referal_list = $this->model->referal_list(Session::get('user_id'));
		$this->view->current_plan = $this->model->get_current_plan(Session::get("user_id"));
		$this->view->inbox_list = $this->model->inbox(Session::get('user_id'),Session::get('user_role'));
		
		$this->view->auto_manual_mode = $this->model->auto_manual_pref();
		$this->view->render('dashboard/ticket_manager');
	}
	public function ticket_inbox(){

	}
	public function open_ticket(){
		$data = array();
		$data['user_id'] = Session::get('user_id');
		$data['subject'] = $this->escape_value($_POST['subject']);
		$data['message'] = $this->escape_value($_POST['message']);
		$this->model->open_ticket($data);
		header('location: '.URL.'dashboard/ticket_manager?msg=success');
	}
	public function block_user($user_id){
		$this->model->block_user($user_id);
		header('location: '.URL.'dashboard/admin_users?user=block');
	}
	public function un_block_user($user_id){
		$this->model->un_block_user($user_id);
		header('location: '.URL.'dashboard/admin_users?user=unblock');
	}
	public function delete_user($user_id){
		$this->model->delete_user($user_id);
		header('location: '.URL.'dashboard/admin_users?user=deleted');
	}
	public function confirm_payment($user_id){
		$this->model->confirm_payment($user_id);
		header('location: '.URL.'dashboard/admin_payment?payment=confirmed');
	}
	public function delete_payment($user_id){
		$this->model->delete_payment($user_id);
		header('location: '.URL.'dashboard/admin_payment?delete=confirmed');
	}
	public function confirm_withdraw($user_id){
		$this->model->confirm_withdraw($user_id);
		header('location: '.URL.'dashboard/admin_payout?withdraw=confirmed');
	}
	public function delete_withdraw($user_id){
		$this->model->delete_withdraw($user_id);
		header('location: '.URL.'dashboard/admin_payout?delete=confirmed');
	}
	public function block_admin($user_id){
		$this->model->block_admin($user_id);
		header('location: '.URL.'dashboard/admin');
	}
	public function un_block_admin($user_id){
		$this->model->un_block_admin($user_id);
		header('location: '.URL.'dashboard/admin');
	}
	
	public function change_state($id){
		$this->model->change_state($id);
		header('location: '.URL.'dashboard/index');
	}

	public function users(){
		require_once 'helpers/pagination.php';
		$this->view->userInfo = $this->model->userInfo(Session::get('user_id'));
		$this->view->referal_count = $this->model->referal_count(Session::get('user_id'));
		$this->view->referal_list = $this->model->referal_list(Session::get('user_id'));
		$this->view->current_plan = $this->model->get_current_plan(Session::get("user_id"));
		$this->view->load_level_list = $this->model->get_all_level();
		$current_page = isset($_GET['pg']) ? (int)$_GET['pg'] : 1; 
		$per_page = 50;
		$total_page = $this->model->get_all_users_count();
		$this->view->pagination = new Pagination($total_page,$per_page,$current_page);
		$offset = $this->view->pagination->offset();
		$this->view->load_user_list = $this->model->get_all_users($per_page, $offset);
		$this->view->prefInfo = $this->model->prefInfo();
		$this->view->receiver_payment_count = $this->model->receiver_payment_count(Session::get('user_id'));
		$this->view->auto_manual_mode = $this->model->auto_manual_pref();
		$this->view->render('dashboard/users');
	}
	public function admin_users(){
		require_once 'helpers/pagination.php';
		$this->view->userInfo = $this->model->userInfo(Session::get('user_id'));
		$this->view->referal_count = $this->model->referal_count(Session::get('user_id'));
		$this->view->referal_list = $this->model->referal_list(Session::get('user_id'));
		$this->view->current_plan = $this->model->get_current_plan(Session::get("user_id"));
		$this->view->load_level_list = $this->model->get_all_level();
		$current_page = isset($_GET['pg']) ? (int)$_GET['pg'] : 1; 
		$per_page = 100;
		$total_page = $this->model->get_all_users_count();
		$this->view->pagination = new Pagination($total_page,$per_page,$current_page);
		$offset = $this->view->pagination->offset();
		$this->view->load_user_list = $this->model->get_all_users($per_page, $offset);
		$this->view->prefInfo = $this->model->prefInfo();
		$this->view->auto_manual_mode = $this->model->auto_manual_pref();
		$this->view->render('dashboard/admin_users');
	}

	public function admin_invest(){
		require_once 'helpers/pagination.php';
		$this->view->userInfo = $this->model->userInfo(Session::get('user_id'));
		$this->view->referal_count = $this->model->referal_count(Session::get('user_id'));
		$this->view->referal_list = $this->model->referal_list(Session::get('user_id'));
		$this->view->current_plan = $this->model->get_current_plan(Session::get("user_id"));
		$this->view->load_level_list = $this->model->get_all_level();
		$current_page = isset($_GET['pg']) ? (int)$_GET['pg'] : 1; 
		$per_page = 100;
		$total_page = $this->model->get_all_users_count();
		$this->view->pagination = new Pagination($total_page,$per_page,$current_page);
		$offset = $this->view->pagination->offset();
		$this->view->load_user_list = $this->model->get_all_users($per_page, $offset);
		$this->view->prefInfo = $this->model->prefInfo();
		$this->view->auto_manual_mode = $this->model->auto_manual_pref();
		$this->view->render('dashboard/admin_invest');
	}

	public function admin_payment(){
		require_once 'helpers/pagination.php';
		$this->view->userInfo = $this->model->userInfo(Session::get('user_id'));
		$this->view->referal_count = $this->model->referal_count(Session::get('user_id'));
		$this->view->referal_list = $this->model->referal_list(Session::get('user_id'));
		$this->view->current_plan = $this->model->get_current_plan(Session::get("user_id"));
		$this->view->load_level_list = $this->model->get_all_level();
		$current_page = isset($_GET['pg']) ? (int)$_GET['pg'] : 1; 
		$per_page = 100;
		$total_page = $this->model->get_all_users_count();
		$this->view->pagination = new Pagination($total_page,$per_page,$current_page);
		$offset = $this->view->pagination->offset();
		$this->view->load_payment_list = $this->model->get_all_payment();
		$this->view->prefInfo = $this->model->prefInfo();

		$this->view->render('dashboard/admin_payment');
	}

	public function admin_payout(){
		require_once 'helpers/pagination.php';
		$this->view->userInfo = $this->model->userInfo(Session::get('user_id'));
		$this->view->referal_count = $this->model->referal_count(Session::get('user_id'));
		$this->view->referal_list = $this->model->referal_list(Session::get('user_id'));
		$this->view->current_plan = $this->model->get_current_plan(Session::get("user_id"));
		$this->view->load_level_list = $this->model->get_all_level();
		$current_page = isset($_GET['pg']) ? (int)$_GET['pg'] : 1; 
		$per_page = 100;
		$total_page = $this->model->get_all_users_count();
		$this->view->pagination = new Pagination($total_page,$per_page,$current_page);
		$offset = $this->view->pagination->offset();
		$this->view->load_withdraw_list = $this->model->get_all_withdrawals();
		$this->view->prefInfo = $this->model->prefInfo();
		$this->view->render('dashboard/admin_payout');
	}

	

	public function admin(){
		require_once 'helpers/pagination.php';
		$this->view->userInfo = $this->model->userInfo(Session::get('user_id'));
		$this->view->referal_count = $this->model->referal_count(Session::get('user_id'));
		$this->view->referal_list = $this->model->referal_list(Session::get('user_id'));
		$this->view->current_plan = $this->model->get_current_plan(Session::get("user_id"));
		$this->view->load_level_list = $this->model->get_all_level();
		$current_page = isset($_GET['pg']) ? (int)$_GET['pg'] : 1; 
		$per_page = 100;
		$total_page = $this->model->get_all_admins_count();
		$this->view->pagination = new Pagination($total_page,$per_page,$current_page);
		$offset = $this->view->pagination->offset();
		$this->view->load_admin_list = $this->model->get_all_admins($per_page, $offset);
		$this->view->prefInfo = $this->model->prefInfo();
		$this->view->render('dashboard/admin');
	}
	public function createAdmin(){
		$data = array();
    	$data['fullname'] = $this->escape_value($_POST['fullname']);
    	$data['email'] = $this->escape_value($_POST['email']);
    	// $data['password'] = $this->escape_value($_POST['password']);
    	$data['mobile'] = $this->escape_value($_POST['mobile']);
    	$data['bank_name'] = $this->escape_value($_POST['bank_name']);
    	$data['bank_acc_name'] = $this->escape_value($_POST['bank_acc_name']);
    	$data['bank_acc_number'] = $this->escape_value($_POST['bank_acc_number']);
    	$data['level'] = $this->escape_value($_POST['level']);
    	$data['role'] = $this->escape_value($_POST['role']);
    	if($this->model->createAdmin($data) == 'success' ){
             header('location: '.URL.'dashboard/?user='.rand().'&register=s');
        }else if($this->model->createAdmin($data) == 'info_exist'){
            header('location: '.URL.'register/?register=e');
        }else{
            header('location: '.URL.'register/?register=f');
        }
	}
	public function merge_to_pay($user_id){
		$this->view->userInfo = $this->model->userInfo(Session::get('user_id'));
	}
	public function do_merging(){
		$data = array();
		$data['ph_id'] = $this->escape_value($_POST['ph_id']);
		$data['gh_id'] = $this->escape_value($_POST['gh_id']);
		$this->model->do_merging($data);
	}
	public function upload_confirmation(){
		$this->view->userInfo = $this->model->userInfo(Session::get('user_id'));
		$this->view->referal_count = $this->model->referal_count(Session::get('user_id'));
		$this->view->referal_list = $this->model->referal_list(Session::get('user_id'));
		$this->view->current_plan = $this->model->get_current_plan(Session::get("user_id"));
		$this->view->load_teller_img = $this->model->load_teller_image(Session::get('user_id'));
		$this->view->receiver_payment_count = $this->model->receiver_payment_count(Session::get('user_id'));
		$this->view->auto_manual_mode = $this->model->auto_manual_pref();
		$this->view->render('dashboard/upload_confirmation');
	}
	
	

	public function activate_payment(){
		$data = array();
// 		$data['invoice_email'] = $_GET['invoice_email'];
// 		$value_in_satoshi = $_GET['value'];
// 		$data['transaction_hash'] = $_GET['transaction_hash'];
// 		$data['value_in_btc'] = $value_in_satoshi / 100000000;
// 		$response = $this->model->activate_payment($data);
// 		echo $response;

		$orderId = $_GET['order_id'];
		$orderInfo = $this->getPaybearAddressInfoByOrderId($orderId);
        $data['address'] = $orderInfo['address'];
        $data = file_get_contents('php://input');
         if ($data) {
             $params = json_decode($data);
             $invoice = $params->invoice;
             $amount = $params->inTransaction->amount;
             if ($params->confirmations>=$params->maxConfirmations) {
                //compare $amount with order total
                if($orderInfo['amount_in_usd'] != $amount){
                    $response['status'] = false;
                    $response['message'] = "expected amount paid doesn't match amount to pay";
                }
                //compare $invoice with one saved in the database to ensure callback is legitimate
                if($orderInfo['invoice'] != $invoice){
                    $response['status'] = false;
                    $response['message'] = "Issues with payment confirmation because Invoice receipt don't match";
                }
                //mark the order as paid
    				// echo $invoice; //stop further callbacks
    				$response = $this->model->activate_payment($result);
             } else {
                $response = "waiting for confirmations";
    			}
    			echo $response;
          }
	}
	
	public function updateInvest($id){
		$data = array();
		$data['user_id'] = $id;
    	$data['top_up'] = $this->escape_value($_POST['top_up']);
    	$data['status'] = $this->escape_value($_POST['status']);
    	
    	$response = $this->model->updateInvest($data) ;
        echo $response;
	}
	
	
	public function activate_pmb_payment(){
	    $data = array();
        $data['PAYEE_ACCOUNT'] = $_POST['PAYEE_ACCOUNT'];
        $data['PAYMENT_AMOUNT'] = $_POST['PAYMENT_AMOUNT'];
        $data['PAYMENT_UNITS'] = $_POST['PAYMENT_UNITS'];
        $data['PAYMENT_BATCH_NUM'] = $_POST['PAYMENT_BATCH_NUM'];
        $data['PAYER_ACCOUNT'] = $_POST['PAYER_ACCOUNT'];
        $data['TIMESTAMPGMT'] = $_POST['TIMESTAMPGMT'];
        $data['ORDER_NUM'] = $_POST['ORDER_NUM'];
        $data['CUST_NUM'] = $_POST['CUST_NUM'];
        $data['V2_HASH'] = $_POST['V2_HASH'];
        $data['user_id'] = $_POST['user_id'];
        $data['order_id'] = $_POST['order_id'];
        $data['plan_id'] = $_POST['plan_id'];
    
        $response = $this->model->activate_pmb_payment($data) ;
        echo $response;
	}
	
	public function getPaybearAddressInfoByOrderId($orderId){
	   $result = $this->model->getPaybearAddressInfoByOrderId($orderId);
	   return $result;
	} 
	
	public function decline_payment($depositor_id){
		// $receiver_id = $this->escape_value($_GET['receiver_id']);
		$this->model->decline_payment($depositor_id);
		header('location: '.URL.'dashboard/index/?payment_declined=true');
	}
	public function decline_payment_without($depositor_id){
		// $receiver_id = $this->escape_value($_GET['receiver_id']);
		$this->model->decline_payment_without($depositor_id);
		header('location: '.URL.'dashboard/index/?payment_declined=true');
	}
	public function decline_payment_for_js($depositor_id){
		// $receiver_id = $this->escape_value($_POST['receiver_id']);
		$this->model->decline_payment($depositor_id);
	}
	public function profile(){
	    $this->view->link = 'profile';
		$this->view->userInfo = $this->model->userInfo(Session::get('user_id'));
		$this->view->referal_count = $this->model->referal_count(Session::get('user_id'));
		$this->view->referal_list = $this->model->referal_list(Session::get('user_id'));
		$this->view->current_plan = $this->model->get_current_plan(Session::get("user_id"));
		$this->view->render('dashboard/profile');
		
	}

	public function editSave($id){
		$data = array();
		$data['id'] = $id;
		$data['bitcoin_address'] = $this->escape_value($_POST['bitcoin_address']);
		$response = $this->model->editSaveUser($data);

    
		if($response = true){
			header('location: '.URL.'dashboard/?edit=success');
		}else{
			header('location: '.URL.'dashboard/?edit=fail');
		}
	} 
	
	public function updateWallet($id){
		$data = array();
		$data['id'] = $id;
		$data['bitcoin_address'] = $this->escape_value($_POST['address']);
		$response = $this->model->updateWallet($data);

    
		if($response = true){
			header('location: '.URL.'dashboard/payment_profile?edit=success');
		}else{
			header('location: '.URL.'dashboard/payment_profile?edit=fail');
		}
	} 
	
	public function updateBank($id){
		$data = array();
		$data['id'] = $id;
		$data['bank_name'] = $this->escape_value($_POST['bankName']);
		$data['acc_name'] = $this->escape_value($_POST['accountName']);
		$data['acc_num'] = $this->escape_value($_POST['accountNumber']);
		$data['rout_num'] = $this->escape_value($_POST['routNumber']);
		
		$response = $this->model->updateBank($data);

		if($response = true){
			header('location: '.URL.'dashboard/payment_profile?edit=success');
		}else{
			header('location: '.URL.'dashboard/payment_profile?edit=fail');
		}
	} 
	
	
	public function updateProfile($id){
		$data = array();
		
		$data['id'] = $id;
		$data['mobile'] = $this->escape_value($_POST['mobile']);
		$data['city'] = $this->escape_value($_POST['city']);
		$data['zip'] = $this->escape_value($_POST['zip']);
		$data['country'] = $this->escape_value($_POST['country']);
		
		$response = $this->model->updateProfile($data);

		if($response = true){
			header('location: '.URL.'dashboard/profile?edit=success');
		}else{
			header('location: '.URL.'dashboard/profile?edit=fail');
		}
	} 
	
	public function editPass($id){
		$data = array();

		$data['id'] = Session::get('user_id');
		$data['new_password'] = $this->escape_value($_POST['new_password']);
       
    	$response = $this->model->editPass($data) ;
		if($data['new_password'] != $this->escape_value($_POST['re_new_password'])){
            header('location: '.URL.'dashboard/profile/?editPass=pass_mismatch');
        }else {
            if ($response == 'true') {
            	header('location: '.URL.'dashboard/profile/?editPass=success');
            }  else {
            	header('location: '.URL.'dashboard/profile/?editPass=fail');
            }
        }
	} 
	
	
	/**
	 * Paybear
	 */
	public function getCurrencies(){
		
		$currencies = $this->payBear->getCurrencies();
		echo json_encode($currencies);
	}

	// public function createPayment(){
	// 	$callback_url = URL."dashboard/paybearCallbackHandler";
	// 	$response = $this->payBear->createPayment('btc',$callback_url);
	// 	echo json_encode($response);
	// }
	
	public function createPayment(){
	    $data['crypto'] = 'btc';

		$callback_url = "http://www.bitterio.com/dashboard/activate_payment?order_id=".$data['order_id'];
	
		//initialize paybear
		$payBear = new PayBear(PAYBEAR_SECRET_KEY);
		$result = $payBear->createPayment($data['crypto'], $callback_url);
		echo $result;
	}

	public function fundAccount(){
		$data['id'] = $this->escape_value($_POST['user_id']);
		$data['email'] = $this->escape_value($_POST['email']);
		$data['plan_amount'] = $this->escape_value($_POST['amount']);
		$data['plan_id'] = '';
		
		if ($data['plan_amount'] < 10000) {
		    $data['plan_id'] = 1;
		} elseif ($data['plan_amount'] >= 10000 && $data['plan_amount'] < 20000) {
		    $data['plan_id'] = 2;
		} elseif ($data['plan_amount'] >= 20000 && $data['plan_amount'] < 50000) {
		    $data['plan_id'] = 3;
		} elseif ($data['plan_amount'] >= 50000 && $data['plan_amount'] < 100000) {
		    $data['plan_id'] = 4;
		} elseif ($data['plan_amount'] >= 100000 && $data['plan_amount'] < 250000) {
		    $data['plan_id'] = 5;
		} elseif ($data['plan_amount'] >= 250000 && $data['plan_amount'] < 500000) {
		    $data['plan_id'] = 6;
		}elseif ($data['plan_amount'] >= 500000 && $data['plan_amount'] < 1000000) {
		    $data['plan_id'] = 7;
		}elseif ($data['plan_amount'] >= 1000000 && $data['plan_amount'] < 5000000) {
		    $data['plan_id'] = 8;
		}elseif ($data['plan_amount'] >= 5000000) {
		    $data['plan_id'] = 9;
		}else {
		    $data['plan_id'] = 0;
		} 
		
		$data['billing_method'] = $this->escape_value($_POST['billing_method']);

		$response = $this->model->fundAccount($data);
		if ($response == 'exists') {
        	header('location: '.URL.'dashboard/checkout_btc?fund=e');
        }  
        elseif ($response == 'visa') {
        	header('location: '.URL.'dashboard/checkout_visa?fund=s');
        }
        elseif ($response == 'bank') {
        	header('location: '.URL.'dashboard/checkout_bank?fund=s');
        }
        elseif ($response == 'btc') {
        	header('location: '.URL.'dashboard/checkout_btc?fund=s');
        }
        elseif ($response == 'pm') {
        	header('location: '.URL.'dashboard/checkout_pm?fund=s');
        } else {
        	header('location: '.URL.'dashboard/invest?fund=fail');
        }
	
	} 

    
    
    public function withdrawBonus(){
    	$data['userId'] = $this->escape_value($_POST['user_id']);
        $data['address'] = $this->escape_value($_POST['address']);
        $data['type'] = $this->escape_value($_POST['type']);
        $data['amount'] = $this->escape_value($_POST['amount']);
        
        $response = $this->model->withdrawAccount($data);
        
        if ($response == 'success') {
        	header('location: '.URL.'dashboard/payout?bonus=s');
        } elseif ($response == 'exists') {
        	header('location: '.URL.'dashboard/payout?bonus=e');
        } elseif ($response == 'insufficient') {
        	header('location: '.URL.'dashboard/payout?bonus=i');
        }  else {
        	header('location: '.URL.'dashboard/payout?bonus=f');
        }
    }

    public function withdrawCapital(){
    	$data['userId'] = $this->escape_value($_POST['user_id']);
        $data['address'] = $this->escape_value($_POST['address']);
        $data['type'] = $this->escape_value($_POST['type']);
        $data['amount'] = $this->escape_value($_POST['amount']);
        
        $response = $this->model->withdrawAccount($data);
        
        if ($response == 'success') {
        	header('location: '.URL.'dashboard/payout?capital=s');
        } elseif ($response == 'exists') {
        	header('location: '.URL.'dashboard/payout?capital=e');
        } elseif ($response == 'insufficient') {
        	header('location: '.URL.'dashboard/payout?capital=i');
        }  else {
        	header('location: '.URL.'dashboard/payout?capital=f');
        }
    }
    
    public function payCharge($userId){
	   	$data['userId'] = $userId;

        $response = $this->model->payCharge($data);
        
        if ($response == 'success') {
        	header('location: '.URL.'dashboard/checkout_btc?fund=s');
        } 
	}

	public function checkConfirmation(){
		$data['orderId'] = $_GET['order_id'];
      $data = file_get_contents('php://input');
      if ($data) {
         $params = json_decode($data);
         $result['invoice'] = $params->invoice;
         $result['amount'] = $params->inTransaction->amount;
         if ($params->confirmations>=$params->maxConfirmations) {
            //compare $amount with order total
            //compare $invoice with one saved in the database to ensure callback is legitimate
            //mark the order as paid
				// echo $invoice; //stop further callbacks
				$response = $this->model->checkConfirmation($result);
         } else {
            $response = "waiting for confirmations";
			}
			echo $response;
      }
	}

	public function purchaseToken($id){
		$data['user_id'] = $id;
		$data['token_amount'] = $this->escape_value($_POST['token_amount']);
		$data['trans_id'] = "PBX" . ($id + (0.02 * $data['token_amount'])) . "TR";
		if($data['token_amount'] > 35){
    		$response = $this->model->purchaseToken($data);
    		if($response){
    			header('location: '.URL.'dashboard/buy_token?purchase=success');
    		}else{
    			header('location: '.URL.'dashboard/buy_token?purchase=fail');
    		}
		}else{
		    header('location: '.URL.'dashboard/buy_token?purchase=min');
		}
	} 
	
	public function updateDailyProfit(){
	   $this->model->updateDailyProfit();
	}
	
	public function showInfo($id){
		echo $this->model->showInfo($id);
	}

    public function update_new_password(){
    	$data = array();
        $data['oldpassword'] = $this->escape_value($_POST['oldpassword']);
        $data['newpassword'] = $this->escape_value($_POST['newpassword']);
        $data['confirmpassword'] = $this->escape_value($_POST['confirmpassword']);
        $data['user_id'] = Session::get('user_id');
        $this->model->update_new_password($data);
    }
	public function logout(){
		Session::destroy();
		setcookie('login_cookie', time() - 3600);
		header('location: login');
	}
	//plan subscription controller....
	public function ph($level_id){
		//auto set plan and outcome
		$data = array();
		$data['user_id'] = Session::get('user_id');
		$response = $this->model->provide_help($level_id, $data);
		if($response == "exists"){
			header('location: '.URL.'dashboard/index?ph=exists');
		}else if($response == "pending"){
			header('location: '.URL.'dashboard/index?ph=pending');
		}else if($response == "matched"){
			header('location: '.URL.'dashboard/index?ph=matched');
		}
	}

	// public function merge(){
	// 	$this->model->do_merge();
	// }

	private function add_to_gh($id){
		$data = array();
		$this->view->gh = $this->model->get_help($data);
	}
	
		
	
	private function set_plan_mode($amount_pledged,$plan_percentage){
		$amount_to_get = ($amount_pledged/100) * $plan_percentage;
		return $amount_to_get;
	}

	public function auto_manual_mode(){
		$flag = $this->model->auto_manual_mode();
		if($flag){
			echo "1";
		}else{
			echo "0";
		}
	}

	/**ADMINISTRATOR */
	public function getAllUsers(){
		$response = $this->model->getAllUsers();
		echo Utility::convertToJSON($response);
	}

	public function verifyUser(){
		$object = json_decode(file_get_contents('php://input'));
		$data['user_id'] = $this->escape_value($object->userId);
		$response = $this->model->verifyUser($data);
		echo Utility::convertToJSON($response);
	}

	public function toggleUserStatus(){
		$object = json_decode(file_get_contents('php://input'));
		$data['user_id'] = $this->escape_value($object->userId);

		$response = $this->model->toggleUserStatus($data);
		echo Utility::convertToJSON($response);
	}	

	public function deleteUser(){
		$object = json_decode(file_get_contents('php://input'));
		$data['user_id'] = $this->escape_value($object->userId);
		$response = $this->model->deleteUser($data);
		echo Utility::convertToJSON($response);
	}

	public function updateUserData(){
		$object = json_decode(file_get_contents('php://input'));
		$data['user_id'] = $this->escape_value($object->userId);
		$data['capital'] = $this->escape_value($object->capital);
		$data['available_profit'] = $this->escape_value($object->availableProfit);
		$data['available_bonus'] = $this->escape_value($object->availableBonus);

		$response = $this->model->updateUserData($data);
		echo Utility::convertToJSON($response);
	}
}
//time format => d/m/y h:ia