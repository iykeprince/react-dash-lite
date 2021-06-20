<?php
class change_password extends controller{

	public function __construct(){
		parent::__construct();
// 		$this->view->js = array('login/js/default.js');
	} 
	
	public function index(){
	    $this->view->render('change_password/index');
	}
	
}