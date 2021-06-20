<?php
class View {

	public function render($name, $noInclude=false){
		require 'views/' . $name . '.php';
	}
}