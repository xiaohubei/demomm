<?php
header("Content-type:text/html; charset=utf-8");
//require_once('response.php');
//require_once('db.php');

//$param = $_GET['q'];
/*{ 
	2:{color:"#eee4da", text:"赞"},
	4:{color:"#ede0c8", text:"怒赞"},
	8:{color:"#f2b179", text:"狂赞"},
	16:{color:"#f59563", text:"力赞"},
	32:{color:"#f67c5f", text:"超赞"},
	64:{color:"#f65e3b", text:"跳楼赞"},
	128:{color:"#edcf72", text:"无敌赞"},
	256:{color:"#edcc61", text:"吐血赞"},
	512:{color:"#9c0", text:"全民赞"},
	1024:{color:"#33b5e5", text:"莫名赞"},
	2048:{color:"#09c", text:"无限赞"},
	4096:{color:"#a6c", text:"非常赞"},
	8192:{color:"#93c", text:"超神了"},
};*/
/* $q = array(
    array('id'=>1, 'name'=>'Apple MacBook Air MD760CH/B 13.3英寸宽屏笔记本电脑2014年新款MacBook A'),
    array('id'=>2, 'name'=>'联想（Lenovo） G510AT 15.6英寸笔记本电脑（i5-4210M 4G 500G 2G独显 摄像头 '),
    array('id'=>3, 'name'=>'联想（Lenovo）小新V2000 Bigger版 15.6英寸笔记本电脑（i7-4510U 8G 1T 4G独'),
    array('id'=>4, 'name'=>'联想（Lenovo） G410AT 14.0英寸笔记本电脑（i5-4210M 4G 500G 2G独显 摄像头 '),
    array('id'=>5, 'name'=>'ThinkPad E431(62772E2) 14英寸笔记本电脑 (i5-3230M 4G 500G 2G独显 WIN8 '),
    array('id'=>6, 'name'=>'华硕（ASUS）FX50JK 15.6英寸游戏本（i5-4200H 4G 7200转500GB GTX850M 2'),
    array('id'=>7, 'name'=>'宏碁（acer） V3-572G 15.6英寸超薄本 （i5-4210U 4G 500G GeForce 840M 2G'),
);
$data->code = 200;
$data->data = $q; */
// 如果没有匹配值设置输出为 "no suggestion" 
// or to the correct values
if ($data == ""){
	$response="no suggestion";
}else{
	$response = $data;
}

//输出返回值
echo json_encode($response);

/*$servername = "localhost";
$username ="root";
$password = "xingguojie";*/

/*try {
	$conn = new PDO("mysql:host=$servername;dbname=mydb", $username, $password);
	echo "连接数据成功！<br>";
	//设置pdo的错误模式为异常
	$conn->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
	$sql = "SELECT * FROM 'numblock'";
	$result = mysql_query($sql, $conn);
	echo mysql_num_rows($result);
	var_dump($result);

	//使用exec()，因为没有返回结果
	$conn->exec($sql);
} catch (PDOException $e) {
	echo $sql."<br>".$e->getMessage();
}*/