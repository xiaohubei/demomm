<?php
$inAjax = $_GET['inAjax'] || true;
$do = $_GET['do'] || "numblock";
$do = $do ? $do : "default";
if( !$inAjax )
	return false;
include_once 'db.class.php';
//require_once("db.class.php");

switch ( $do ){
	case "numblock":
		$sql = "SELECT * FROM  numblock";
		$data = $dbObj->getOne($sql);
		$result->data = $data;
		$result->code = 200;
		//$result = $dbObj->query($sql);
		//$result = $dbObj->fetchArray($result,"MYSQL_ASSOC");
		echo ( !empty($result) ) ? json_encode($result) : "null";
		break;
	case "default":
		die("nothing");
		break;
}
