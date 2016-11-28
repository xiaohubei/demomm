cb.views.register("NumBlockGameController", function (controllerName){
	var view = function (widgets){
        cb.views.BaseView.call(this, widgets);
	};
	view.prototype = new cb.views.BaseView();
	view.prototype.controllerName = controllerName;
	view.prototype.init = function (){
		//记录每个格子被操作的情况
		this.numBlockData = new Array();
		//随时记录每一个位置的状态——是否在一次事件中碰撞过，也就是只能每一个只能碰撞一次
		this.collisionRecordData = new Array();
		this.score = 0;
		this.newGame();
	};
	view.prototype.newGame = function(){
		this.initGame();
		this.generateOneNum();
		this.generateOneNum();
	};
	view.prototype.initGame = function(){
		//动态设置16个背景格子的位置
		for(var i=0;i<4;i++){
			for(var j=0;j<4;j++){
				var gridCell=$('#grid-cell-'+i+"-"+j);
				gridCell.css({
					'left': this.getPostLeft(i,j),
					'top': this.getPostTop(i,j)
				});
			};
		};
		//生成一个2维数组，初始化为0
		for(var i = 0; i<4; i++){
			this.numBlockData[i] = new Array();
			this.collisionRecordData[i] = new Array();
			for(var j = 0; j<4; j++){
				this.numBlockData[i][j] = 0;
				this.collisionRecordData[i][j] = false; //默认下，每一个数字都是没碰撞过的
			};
		};
		//初始化游戏后要更新分数
		this.score = 0;
		$('#score').text(this.score);

		//每次初始化时候，更新画面
		this.updateBoardView();
		this.everntRegister();
	};
	view.prototype.updateBoardView = function(){
		$('.number-cell').remove(); //去掉他就给你呈现一个乱码版的2048
		//动态添加我们要滑动的数字格
		for( var i = 0; i<4; i++ ){
			for( var j = 0; j<4; j++ ){
				//动态的添加16个数字格
				$('#grid-container').append('<div class="number-cell" id="number-cell-'+i+'-'+j+'"></div>')
				var numCell=$('#number-cell-'+i+'-'+j);
				//设置16数字格的位置
				if( this.numBlockData[i][j] == 0 ){
					//如果对应的位置没有数字，他们他应该是隐藏的,放到中间位置,不应该被显示出来,
					numCell.css({
						'width':'0px',
						'height':'0px',
						'left':this.getPostLeft(i,j)+50,
						'top':this.getPostTop(i,j)+50,
						'font-size':'20px'
					});
				}else{
					//如果对应的数组位置有数字，他们他应该是显示出来，对应的背景，字体颜色
					numCell.css({
						'width':'100px',
						'height':'100px',
						'left':this.getPostLeft(i,j),
						'top':this.getPostTop(i,j),
						'background-color':this.getNumberBackgroundColor( this.numBlockData[i][j] ),
						'color':this.getNumberColor( this.numBlockData[i][j] ),
						'font-size':'20px'
					});
	                //numCell.text( getNumberText( this.numBlockData[i][j] ) );
	                numCell.text(  this.numBlockData[i][j]  );
				}
				this.collisionRecordData[i][j]=false;// 每次事件过后，他都要是没碰撞的状态
			}
		}
	};
	view.prototype.generateOneNum = function(){
		//还有没有能够生成数字的地方
		if( this.noplace(this.numBlockData) ) return false;
		//随机生成一个位置
		var randmX = parseInt(Math.floor(Math.random()*4));
		var randmY = parseInt(Math.floor(Math.random()*4));
		var num = 0;
		//判断找到的位置是不是满足要求，如果不满足就接着生成，
		//但是从性能优化角度，不能找的过多，如果找不到我们直接给他找一个位置
		while(num<40){
			if( this.numBlockData[randmX][randmY] == 0 )
			break;
			randmX = parseInt(Math.floor(Math.random()*4));
			randmY = parseInt(Math.floor(Math.random()*4));
			num++;
		};
		if(num==40){
			for(var i=0; i<4; i++){
				for(var j=0; j<4; j++){
					if(this.numBlockData[i][j]==0){
						randmX = i;
						randmY = j;
					};
				};
			};
		};
		//随机生成一个数字2或者4
		var randomNum = Math.random() < 0.5 ? 2 : 4;
		//在 随机的位置 随机生成一个数字
		this.numBlockData[randmX][randmY]= randomNum;
		//然后漂亮的展示出来
		this.showNumWithAnimation( randmX,randmY,randomNum );
		return true;
	};
	view.prototype.isgameover = function(){
		if(this.noplace(this.numBlockData) && this.nomove(this.numBlockData) ){
			alert('U,gameover');
		};
	};
	view.prototype.everntRegister = function (){
		var self = this;
		var afterMove = function (ev){
			setTimeout(function (){
				self.updateBoardView()
			},200);
			setTimeout(function(){
				self.generateOneNum()
			},210) ;
			setTimeout(function(){
				self.isgameover()
			},300) ;
			ev.preventDefault();
		};		
		$(document).keydown(function(ev){
			var ev = ev||event;	
			switch( ev.keyCode ){
				case 37:
					if( self.moveLeft() ){
						afterMove(ev);
					};
					break;
				case 38:
					if( self.moveUp() ){
						afterMove(ev);
					};
					break;
				case 39:
					if( self.moveRight() ){
						afterMove(ev);
					};
					break;
				case 40:
					if( self.moveDown() ){
						afterMove(ev);
					};
					break;
			};
		});
		$("#newgamebtn").click(function (){
			self.newGame();
		});
	};
	//向左移动，要最左的开始移动；
	//向右移动, 要最右的开始移动；
	//向上移动，要最上的开始移动；
	//向下移动，要最下的开始移动；
	view.prototype.moveLeft = function (){
		if(!this.canmoveLeft(this.numBlockData)){
			return false;
		};
		for( var i = 0; i < 4; i++ ){
			for( var j = 1; j < 4; j++ ){			//第0列的元素都不用移动
				if( this.numBlockData[i][j] != 0 ){          //找到所有可移动的元素
					for( var k = 0; k < j; k++ ){   //对找到元素左边元素进行操作
						if( this.numBlockData[i][k] == 0 && this.noBlockHorizontal( i, k, j, this.numBlockData ) ){
							//当左边有空位 而且他们之间没有障碍物，可以移动了
							this.showMoveAnimation( i, j, i, k )
							this.numBlockData[i][k] = this.numBlockData[i][j];
							this.numBlockData[i][j] = 0;
							continue;
						}else if( this.numBlockData[i][k] == this.numBlockData[i][j] && this.noBlockHorizontal(i,k,j,this.numBlockData) && !this.collisionRecordData[i][j] ){
							//当左边有位置的数字跟自己相等 而且没有障碍物, 而且没有碰撞过, 可以移动了
							this.showMoveAnimation(i,j,i,k)
							this.numBlockData[i][k] += this.numBlockData[i][j];
							this.numBlockData[i][j] = 0;
							this.score += this.numBlockData[i][k];
							this.updateScore(this.score);
							this.collisionRecordData[i][j] = true;  
							//每次碰撞完，要告诉别人她是碰撞过的，所以不能发生碰撞，知道下次事件发生再去重置他，也就是在updateBoardView();
							continue;
						};
					};
				};
			};
		};
		return true;
	};
	view.prototype.moveRight = function (){  
		if(	!this.canmoveRight( this.numBlockData ) ) {
			return false;
		};
		for( var i = 0; i<4; i++ ){
			for( var j=2; j>=0; j-- ){ 	//最右边一列不用移动
				//此判断就会从最右边向右移动 //for(var j=0;j<3;j++)如果这么判断，就会从最左边向右挪动
				if( this.numBlockData[i][j] !=0 ){             //找到要向右移动的元素
					for( var k = 3; k>j; k-- ){			//判断该元素的右边位置能否移动
						if( this.numBlockData[i][k] == 0 && this.noBlockHorizontal( i, j, k, this.numBlockData ) ){
							//移动
							this.showMoveAnimation(i,j,i,k)
							this.numBlockData[i][k]=this.numBlockData[i][j];
							this.numBlockData[i][j]=0;
							continue;
						}else if( this.numBlockData[i][k] == this.numBlockData[i][j] && this.noBlockHorizontal(i, j, k, this.numBlockData) &&! this.collisionRecordData[i][j] ){
							//叠加
							this.showMoveAnimation(i,j,i,k)
							this.numBlockData[i][k] += this.numBlockData[i][j];
							this.numBlockData[i][j] = 0;
							this.score += this.numBlockData[i][k];
							this.collisionRecordData[i][j]=true;  
							this.updateScore(this.score);
							continue;
						}
					}
				}
			}
		}
		return true;
	};
	view.prototype.moveUp = function(){  
		if(	!this.canmoveUp( this.numBlockData ) ) {
			return false;
		};
		for(var i=1; i<4; i++ ){                
			for(var j=0; j<4;j++ ){ 	
				if( this.numBlockData[i][j]!=0 ){             
					for(var k=0; k<i; k++ ){			
						if( this.numBlockData[k][j] == 0 && this.noBlockVertical(j,  k, i, this.numBlockData) ){
							//可以移动
							this.showMoveAnimation(i,j,k,j)
							this.numBlockData[k][j]=this.numBlockData[i][j];
							this.numBlockData[i][j]=0;
							continue;
						}else if( this.numBlockData[k][j] == this.numBlockData[i][j] && this.noBlockVertical(j, k, i,  this.numBlockData) && !this.collisionRecordData[i][j] ){
							//可以叠加
							this.showMoveAnimation(i,j,k,j)
							this.numBlockData[k][j] += this.numBlockData[i][j];
							this.numBlockData[i][j] = 0;
							this.score += this.numBlockData[k][j];
							this.collisionRecordData[i][j] = true;  
							this.updateScore(this.score);
							continue;
						}
					}
				}
			}
		};
		return true;
	};
	view.prototype.moveDown = function(){  
		if(	!this.canmoveDown( this.numBlockData ) ) {
			return false;
		};
		for( var i=2; i >= 0; i-- ){                
			for( var j = 0; j < 4; j++ ){ 	
				if( this.numBlockData[i][j]!=0 ){             
					for( var k = 3; k > i; k-- ){			
						if( this.numBlockData[k][j] == 0 && this.noBlockVertical(j, i, k, this.numBlockData) ){
							//可以移动
							this.showMoveAnimation(i,j,k,j)
							this.numBlockData[k][j] = this.numBlockData[i][j];
							this.numBlockData[i][j] = 0;
							continue;
						}else if( this.numBlockData[k][j] == this.numBlockData[i][j] && this.noBlockVertical(j, i, k, this.numBlockData) && !this.collisionRecordData[i][j] ){
							//可以叠加
							this.showMoveAnimation(i,j,k,j)
							this.numBlockData[k][j] += this.numBlockData[i][j];
							this.numBlockData[i][j] = 0;
							this.score += this.numBlockData[k][j];
							this.collisionRecordData[i][j] = true;  
							this.updateScore(this.score);
							continue;
						}
					}
				}
			}
		}
		return true;
	};
	//每次移动，我们都希望他能移动到最远的地方，应该从远的地方算，否则每次他只会挪动一步
    return view;
});





