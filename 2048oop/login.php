<html>   
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>登录页面</title>
<link rel="stylesheet" href="styles/login.css">
<script src="js/jquery-1.11.1.min.js" type="text/javascript"></script>
</head>    
<body>
    <div class="top_div"></div>
    <form action="doLogin.php" method="POST">
	    <div style="background: rgb(255, 255, 255); margin: -100px auto auto; border: 1px solid rgb(231, 231, 231); border-image: none; width: 400px; height: 200px; text-align: center;">
	        <div style="width: 165px; height: 96px; position: absolute;">
	            <div class="tou"></div>
	            <div class="initial_left_hand" id="left_hand"></div>
	            <div class="initial_right_hand" id="right_hand"></div>
	        </div>
	        <p style="padding: 30px 0px 10px; position: relative;">
	            <span class="u_logo"></span>
	            <input class="ipt" type="text" name="username" placeholder="请输入江湖名号" value="" />
	        </p>
	        <p style="position: relative;">
	            <span class="p_logo"></span>
	            <input class="ipt" id="password" name="password" type="password" placeholder="密码请输入666666" value=""/>
	        </p>
	        <div style="height: 50px; line-height: 50px; margin-top: 30px; border-top-color: rgb(231, 231, 231); border-top-width: 1px; border-top-style: solid;">
	            <p style="margin: 0px 35px 20px 45px;">
	                <span style="float: left;">
	                    <a style="color: rgb(204, 204, 204);" href="#">忘记密码?</a>
	                </span>
	                <span style="float: right;">
	                    <a style="color: rgb(204, 204, 204); margin-right: 10px;" href="#">注册</a>
	                    <input type="submit" value="登录" style="background: rgb(0, 142, 173); padding: 7px 10px; border-radius: 4px; border: 1px solid rgb(26, 117, 152); border-image: none; color: rgb(255, 255, 255); font-weight: bold;">
	                </span>
	            </p>
	        </div>
	    </div>
	</form>
    <div style="text-align:center;"></div>

	<script type="text/javascript">
	    $(function() {
	        //得到焦点
	        $("#password").focus(function() {
	            $("#left_hand").animate({
	                left: "150",
	                top: " -38"
	            },
	            {
	                step: function() {
	                    if (parseInt($("#left_hand").css("left")) > 140) {
	                        $("#left_hand").attr("class", "left_hand");
	                    }
	                }
	            },
	            2000);
	            $("#right_hand").animate({
	                right: "-64",
	                top: "-38px"
	            },
	            {
	                step: function() {
	                    if (parseInt($("#right_hand").css("right")) > -70) {
	                        $("#right_hand").attr("class", "right_hand");
	                    }
	                }
	            },
	            2000);
	        });
	        //失去焦点
	        $("#password").blur(function() {
	            $("#left_hand").attr("class", "initial_left_hand");
	            $("#left_hand").attr("style", "left:100px;top:-12px;");
	            $("#right_hand").attr("class", "initial_right_hand");
	            $("#right_hand").attr("style", "right:-112px;top:-12px");
	        });
	    });
	</script>
</body>
</html>