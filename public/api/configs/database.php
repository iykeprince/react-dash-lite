<?php
/**
 * HEROKU CLEARDB DEPLOYMENT REQUIREMENT
 */
$url = parse_url(getenv("CLEARDB_DATABASE_URL"));

define('DB_TYPE', 'mysql');
define('DB_HOST', $url["host"]);
define('DB_NAME', substr($url["path"], 1));
define('DB_USER', $url["user"]);
define('DB_PASS', $url["pass"]);

/**
 * define('DB_TYPE', 'mysql');
*define('DB_HOST', 'localhost');
*define('DB_NAME', 'bitfetter_db');
*define('DB_USER', 'root');
*define('DB_PASS', '');
 */

/**
 * 
 * DATABASE NAME greencoi_sandbox_bitfetters
 * DATABASE USER greencoi_sandbox_bitfetters_user
 * DATABASE PASS _IH$TetYN@B^
 */