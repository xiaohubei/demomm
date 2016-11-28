<?php 
header("content-type:text/html;charset=utf-8");
echo "登录中，请稍后...";
$username = $_POST['username'];
$password = $_POST['password'];
if(!$username){
	echo "<script>alert('请输入名号后在登录');</script>";
	echo "<script>window.location='login.php';</script>";
}
$password = crypt($password);
session_start();
setcookie("username",$username, time()+7*24*3600);
setcookie("password", $password, time()+7*24*3600);
$_SESSION['username'] = $username;
$_SESSION['password'] = $password;
$username = addslashes($username );
set_time_limit(0);
echo "<script>alert('登陆成功');</script>";
sleep(1);
echo "<script>window.location='index.php';</script>";
