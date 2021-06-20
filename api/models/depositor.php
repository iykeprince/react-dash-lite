<?php
class Depositor{
	public $id;
	public $user_id;
	public $level;
	public $date_pledged;
	public $time_pledged;
	public $person_to_pay_id;
	public $amount_to_pay;
	public $amount_has_paid=0;
	public $payment_confirmation;
	public $those_to_pay = '';

}