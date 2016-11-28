<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>2048-小湖北</title>
	<meta name="viewport" content=" width=device-width, height=device-height,initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0,user-scalable=no" />
	<link rel="stylesheet" href="styles/2048.css">
	<script src="js/jquery-1.11.1.min.js"></script>
	<script src="js/support.js"></script>
	<script src="js/index.js"></script>
</head>
<body>
<div class="container bg-fa" data-controller="NumBlockGameController">
	<header>
		<h1>2048-
		<?php 
			if(isset($_SESSION['username'])){
				echo $_SESSION['username'];
			}elseif(isset($_COOKIE['username'])){
				echo $_COOKIE['username'];
			};
		?>	
		</h1>;
		<a href="javascript:;" id="newgamebtn">NewGame</a>
		<img src="images/dizhu.jpg" width=100 alt="头像"><p>老板,你已身价:<span id="score">111110</span>万</p>
	</header>
	<div id="grid-container">
		<div class="grid-cell" id="grid-cell-0-0"></div>
        <div class="grid-cell" id="grid-cell-0-1"></div>
        <div class="grid-cell" id="grid-cell-0-2"></div>
        <div class="grid-cell" id="grid-cell-0-3"></div>

        <div class="grid-cell" id="grid-cell-1-0"></div>
        <div class="grid-cell" id="grid-cell-1-1"></div>
        <div class="grid-cell" id="grid-cell-1-2"></div>
        <div class="grid-cell" id="grid-cell-1-3"></div>

        <div class="grid-cell" id="grid-cell-2-0"></div>
        <div class="grid-cell" id="grid-cell-2-1"></div>
        <div class="grid-cell" id="grid-cell-2-2"></div>
        <div class="grid-cell" id="grid-cell-2-3"></div>

        <div class="grid-cell" id="grid-cell-3-0"></div>
        <div class="grid-cell" id="grid-cell-3-1"></div>
        <div class="grid-cell" id="grid-cell-3-2"></div>
        <div class="grid-cell" id="grid-cell-3-3"></div>
	</div>
	<!-- 小小tips -->
	<div id="tips">
			Tips:请使用键盘上、下、左、右按键游戏。
	</div>
	<div class="mask" id="mask"></div>
</div>
	<script>
		cb.init();
	</script>
</body>
</html>