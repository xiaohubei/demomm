var numBlock=new Array();
var score=0;
var hasConflicted=new Array();
//这是一个开关，这是一个bug的修复，随时记录每一个位置的状态——是否在一次事件中碰撞过，也就是只能每一个只能碰撞一次
$(document).ready(function(){
	newgame();

})
//开始一个新的游戏-------------------------------（游戏的逻辑）-----------------------------------------------
function newgame(){
	//初始化
	init();
	//随机生成一个数字
	generateOneNum();
	generateOneNum();

};

function init(){
	//动态生成16个格子的位置
	for(var i=0;i<4;i++){
		for(var j=0;j<4;j++){
			var gridCell=$('#grid-cell-'+i+"-"+j);
			gridCell.css('left',getPostLeft(i,j));
			gridCell.css('top',getPostTop(i,j));
		}
	};
	//生成一个2维数组，初始化为0
	for(var i=0;i<4;i++){
		numBlock[i]=new Array();
		hasConflicted[i]=new Array();
		for(var j=0;j<4;j++){
			numBlock[i][j]=0;
			hasConflicted[i][j]=false; //默认下，每一个数字都是没碰撞过的----------------
		}
	};
	//console.log(numBlock);

	//每次初始化时候，更新画面
	updateBoardView();

	//重新开始游戏后要更新分数
	score=0;
	$('#score').text(score);

};

//
function updateBoardView(){

	$('.number-cell').remove(); //去掉他就给你呈现一个乱码版的2048

	//动态添加我们要滑动的数字格
	for( var i=0;i<4;i++ ){
		for( var j=0;j<4;j++ ){

			//动态的添加16个数字格
			$('#grid-container').append('<div class="number-cell" id="number-cell-'+i+'-'+j+'"></div>')
			var TheNumCell=$('#number-cell-'+i+'-'+j); //变量不需要加引号？？？？ 忘了加#,找半天没效果

			//设置16数字格的位置
			if( numBlock[i][j]==0 ){
				//如果对应的位置没有数字，他们他应该是隐藏的，不应该被显示出来
				TheNumCell.css('width','0px')           //css()，可以不加px????????--------
				TheNumCell.css('height','0px')
				TheNumCell.css('left',getPostLeft(i,j)+50)
				TheNumCell.css('top',getPostTop(i,j)+50)
				TheNumCell.css('font-size','20px')

			}else{
				//如果对应的数组位置有数字，他们他应该是显示出来，对应的背景，字体颜色
				TheNumCell.css('width','100px')           
				TheNumCell.css('height','100px')
				TheNumCell.css('left',getPostLeft(i,j))
				TheNumCell.css('top',getPostTop(i,j))
				TheNumCell.css('font-size','20px')
                TheNumCell.css('background-color',getNumberBackgroundColor( numBlock[i][j] ) );
                TheNumCell.css('color',getNumberColor( numBlock[i][j] ) );
                //TheNumCell.text( getNumberText( numBlock[i][j] ) );
                TheNumCell.text(  numBlock[i][j]  );

			}
			hasConflicted[i][j]=false;// 每次事件过后，他都要是没碰撞的状态

		}
	}

}

//产生一个数字，这个要多次被调用-------------------------------------------------------------------------------
function generateOneNum(){

	//还有没有能够生成数字的地方
	if( noplace(numBlock) ) return false;

	//书记生成一个位置
	var randmX=parseInt(Math.floor(Math.random()*4));//var randmX=Math.floor(Math.random()*4); 可能有进度问题
	var randmY=parseInt(Math.floor(Math.random()*4));
	var num=0;

	//判断找到的位置是不是满足要求，如果不满足就接着生成，但是从性能优化角度，不能找的过多，如果找不到我们直接给他找一个位置
	while(num<40){
		if(numBlock[randmX][randmY]==0)
		break;
		var randmX=parseInt(Math.floor(Math.random()*4));
		var randmY=parseInt(Math.floor(Math.random()*4));
		num++;
	}

	if(num==40){
		for(var i=0;i<4;i++){
			for(var j=0;j<4;j++){
				if(numBlock[i][j]==0){
					randmX=i;
					randmY=j;
				}
			};
		}
	}

	//随机生成一个数字

	var randomNum=Math.random()<0.5?2:4;

	//在随机的位置随机生成一个数字
	numBlock[randmX][randmY]=randomNum;
	//console.log(randmX,randmY)
	//console.log(randomNum)
	//然后漂亮的展示出来
	showNumWithAnimation( randmX,randmY,randomNum );

	return true;
};

//-------------------------------------------到此处，2048初始化已经完成，略微兴奋中-----------------------------

//开始出现事件咯，也就是游戏的交互方面

$(document).keydown(function(ev){
	var ev=ev||event;
	
	switch( ev.keyCode ){        //keyCode要大写

		case 37:
			//
			if( moveLeft() ){
				//alert(ev.keyCode)
				
				setTimeout('generateOneNum()',210) ;
				setTimeout('isgameover()',300) ;
				ev.preventDefault()
			};
			break;

		case 38:
			if( moveUp() ){
				//alert(ev.keyCode)
				setTimeout('generateOneNum()',210) ;
				setTimeout('isgameover()',300) ;
				return false;
				//ev.preventDefault()
			};
			break;

		case 39:
			if( moveRight() ){
				//alert(ev.keyCode)
				setTimeout('generateOneNum()',210) ;
				setTimeout('isgameover()',300) ;
				ev.preventDefault()
			};
			break;

		case 40:
			if( moveDown() ){
				//alert(ev.keyCode)
				setTimeout('generateOneNum()',210) ;
				setTimeout('isgameover()',300) ;
				return false;
				//ev.preventDefault()
			};
			break;

		default:
		break;

	};
})

function isgameover(){
	if(noplace(numBlock)&&nomove(numBlock))
		gameover();
};

function gameover(){
	alert('U,gameover');
}
//向左移动，要最左的开始移动；向右移动要最右的开始移动；向上移动，要最上的开始移动；向下移动，要最下的开始移动；-----
function moveLeft(){
	if(!canmoveLeft(numBlock)){
		return false;
	}

	for(var i=0;i<4;i++){                       //3个for循环是所有游戏的关键所在!!!!!!!!!!!!!
		for(var j=1;j<4;j++){
			if(numBlock[i][j]!=0){            //找到所有可移动的元素

				for(var k=0;k<j;k++){		 //对找到元素左边元素进行操作
					if( numBlock[i][k]==0&&noBlockHorizontal(i,k,j,numBlock) ){
						//当左边有空位而且他们之间没有障碍物，可以移动了
						showMoveAnimation(i,j,i,k)
						numBlock[i][k]=numBlock[i][j];
						numBlock[i][j]=0;
						continue;
						//alert(canmoveLeft(numBlock))
					}else if(numBlock[i][k]==numBlock[i][j]&&noBlockHorizontal(i,k,j,numBlock)&&!hasConflicted[i][j] ){
						//当左边有位置的数字跟自己相等而且没有障碍物，（而且没有碰撞过），可以移动了
						showMoveAnimation(i,j,i,k)
						numBlock[i][k]+=numBlock[i][j];
						numBlock[i][j]=0;
						score+=numBlock[i][k];
						updateScore(score);
						hasConflicted[i][j]=true;  
						//每次碰撞完，要告诉别人她是碰撞过的，所以不能发生碰撞，知道下次事件发生再去重置他，也就是在updateBoardView();
						continue;
					}
				};

			}
		}
	}

	setTimeout('updateBoardView()',200); //让showMoveAnimation展示完再更新,要加引号

	return true;

}


function moveRight(){  
	if(	!canmoveRight( numBlock ) ) {
		return false;
	}

	for(var i=0;i<4;i++){                 //这里有一个大坑，差点找不出来！！！！！ for套for套for，
		for(var j=2;j>=0;j--){ 	//此判断就会从最右边向右移动 //for(var j=0;j<3;j++)如果这么判断，就会从最左边向右挪动！！！
			if(numBlock[i][j]!=0){             //找到要向右移动的元素
				for(var k=3;k>j;k--){			//判断该元素的右边位置能否移动
					if( numBlock[i][k]==0&&noBlockHorizontal(i, j, k, numBlock) ){
						//可以移动
						showMoveAnimation(i,j,i,k)
						numBlock[i][k]=numBlock[i][j];
						numBlock[i][j]=0;
						continue;

					}else if( numBlock[i][k]==numBlock[i][j]&&noBlockHorizontal(i, j, k, numBlock)&&!hasConflicted[i][j] ){
						//可以移动，而且可以叠加
						showMoveAnimation(i,j,i,k)
						numBlock[i][k]+=numBlock[i][j];
						numBlock[i][j]=0;
						score+=numBlock[i][k];
						hasConflicted[i][j]=true;  
						updateScore(score);
						continue;
					}
				}
			}
		}
	}
	setTimeout('updateBoardView()',200);                      //updateBoardView()掉了()，找了2小时，fuck??????????????
	return true;
}

/*function moveRight(){  //此方法逻辑没问题，但是任何一次移动，我们都希望他能移动到最远的地方，应该从远的地方算，否则每次他只会挪动一步
	if(	!canmoveRight(numBlock)	) return false;
	for(var i=0;i<4;i++){
		for(var j=0;j<3;j++){
			if(numBlock[i][j]!=0){             //找到要向右移动的元素
				for(var k=3;k>j;k--){			//判断该元素的右边位置能否移动
					if( numBlock[i][k]==0&&noBlockHorizontal(i, j, k, numBlock) ){
						//可以移动
						showMoveAnimation(i,j,i,k)
						numBlock[i][k]=numBlock[i][j];
						numBlock[i][j]=0;
						continue;

					}else if( numBlock[i][k]==numBlock[i][j]&&noBlockHorizontal(i, j, k, numBlock) ){
						//可以移动，而且可以叠加
						showMoveAnimation(i,j,i,k)
						numBlock[i][k]+=numBlock[i][j];
						numBlock[i][j]=0;
						score+=numBlock[i][k];
						updateScore(score);
						continue;
					}
				}
			}
		}
	}
	setTimeout('updateBoardView()',200);
	return true;
}*/


function moveUp(){  
	if(	!canmoveUp( numBlock ) ) {
		return false;
	}

	for(var i=1;i<4;i++){                
		for(var j=0;j<4;j++){ 	
			if(numBlock[i][j]!=0){             
				for(var k=0;k<i;k++){			
					if( numBlock[k][j]==0&&noBlockVertical(j,  k, i, numBlock) ){   //这里i 和k方法弄反了，就会有隔空取物的感觉？？？？
						//可以移动
						showMoveAnimation(i,j,k,j)
						numBlock[k][j]=numBlock[i][j];
						numBlock[i][j]=0;
						continue;
									//这里i 和k方法弄反了，就会有隔空取物的感觉？？？？
					}else if( numBlock[k][j]==numBlock[i][j]&&noBlockVertical(j, k, i,  numBlock)&&!hasConflicted[i][j] ){
						//可以移动，而且可以叠加
						showMoveAnimation(i,j,k,j)
						numBlock[k][j]+=numBlock[i][j];
						numBlock[i][j]=0;
						score+=numBlock[k][j];
						hasConflicted[i][j]=true;  
						updateScore(score);
						continue;
					}
				}
			}
		}
	}
	setTimeout('updateBoardView()',200);                      //updateBoardView()掉了()，找了2小时，fuck??????????????
	return true;
}

function moveDown(){  
	if(	!canmoveDown( numBlock ) ) {
		return false;
	}

	for(var i=2;i>=0;i--){                
		for(var j=0;j<4;j++){ 	
			if(numBlock[i][j]!=0){             
				for(var k=3;k>i;k--){			
					if( numBlock[k][j]==0&&noBlockVertical(j, i, k, numBlock) ){
						//可以移动
						showMoveAnimation(i,j,k,j)
						numBlock[k][j]=numBlock[i][j];
						numBlock[i][j]=0;
						continue;

					}else if( numBlock[k][j]==numBlock[i][j]&&noBlockVertical(j, i, k, numBlock)&&!hasConflicted[i][j] ){
						//可以移动，而且可以叠加
						showMoveAnimation(i,j,k,j)
						numBlock[k][j]+=numBlock[i][j];
						numBlock[i][j]=0;
						score+=numBlock[k][j];
						hasConflicted[i][j]=true;  
						updateScore(score);
						continue;
					}
				}
			}
		}
	}
	setTimeout('updateBoardView()',200);                      //updateBoardView()掉了()，找了2小时，fuck??????????????
	return true;
}



