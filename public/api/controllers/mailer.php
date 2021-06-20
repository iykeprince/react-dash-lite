<?php 

class mailer extends controller{
	public function __construct(){
		parent::__construct();
	}
	public function index(){
		echo $this->model->mailer();
	}
} 
?>