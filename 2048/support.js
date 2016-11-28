/*响应式布局参数的设定*/
var documentWidth=window.screen.availWidth;  //获取屏幕宽度
//alert(documentWidth);
var gridContainerWidth=0.92*documentWidth;
var cellBlockWidth=0.18*documentWidth;
var cellGap=0.04*documentWidth;
//console.log(documentWidth,gridContainerWidth,cellBlockWidth,cellGap)
function getPostLeft(i,j){
	return cellGap+(cellGap+cellBlockWidth)*j;                    //把i和J搞反了，上下就跑错了，！！！！！！！！！！！！！！！！！！！！fuck???????????;
};

function getPostTop(i,j){
	return cellGap+(cellGap+cellBlockWidth)*i;
};

function getNumberBackgroundColor( number ){
	switch ( number ){
		case 2:return "#eee4da";break;
        case 4:return "#ede0c8";break;
        case 8:return "#f2b179";break;
        case 16:return "#f59563";break;
        case 32:return "#f67c5f";break;
        case 64:return "#f65e3b";break;
        case 128:return "#edcf72";break;
        case 256:return "#edcc61";break;
        case 512:return "#9c0";break;
        case 1024:return "#33b5e5";break;
        case 2048:return "#09c";break;
        case 4096:return "#a6c";break;
        case 8192:return "#93c";break;
	};

	return "black";
};

function getNumberColor( number ){
	if(number<=4){
		return "#776e65";
	}
    return "white";
}

function getNumberText( number ){
	switch ( number ){
        case 2:return "赞";break;
        case 4:return "怒赞";break;
        case 8:return "狂赞";break;
        case 16:return "力赞";break;
        case 32:return "超赞";break;
        case 64:return "跳楼赞";break;
        case 128:return "无敌赞";break;
        case 256:return "吐血赞";break;
        case 512:return "全民赞";break;
        case 1024:return "莫名赞";break;
        case 2048:return "无限赞";break;
        case 4096:return "赞赞赞";break;
        case 8192:return "超神了";break;
	};

	return "无敌";
};


function noplace( numBlock ){
	for(var i=0;i<4;i++){
		for(var j=0;j<4;j++){
			if( numBlock[i][j]==0)   //如果对应的位子还有为0的，证明还有位子，还可以生成数字
				return false;
		}
	}
	return true;
};

function canmoveLeft( numBlock ){
	for(var i=0;i<4;i++){
		for(var j=1;j<4;j++){
			if(numBlock[i][j]!=0){           //存在元素
				if(numBlock[i][j-1]==0||numBlock[i][j]==numBlock[i][j-1])     //元素左边为空，或则跟自己相等就可以了
				return true;
			}
			
		}
	}

	return false;
}

function canmoveRight( numBlock ){
	for(var i=0;i<4;i++){
		for(var j=0;j<3;j++){
			if(numBlock[i][j]!=0){           //存在元素
				if(numBlock[i][j+1]==0||numBlock[i][j]==numBlock[i][j+1])     //元素右边为空，或则跟自己相等就可以了
				return true;
			}
			
		}
	}

	return false;
}

function canmoveUp( numBlock ){
	for(var i=1;i<4;i++){
		for(var j=0;j<4;j++){
			if(numBlock[i][j]!=0){           //存在元素
				if(numBlock[i-1][j]==0||numBlock[i][j]==numBlock[i-1][j])     //元素上边为空，或则跟自己相等就可以了
				return true;
			}
			
		}
	}

	return false;
}

function canmoveDown( numBlock ){
	for(var i=0;i<3;i++){
		for(var j=0;j<4;j++){
			if(numBlock[i][j]!=0){           //存在元素
				if(numBlock[i+1][j]==0||numBlock[i][j]==numBlock[i+1][j])     //元素下边为空，或则跟自己相等就可以了
				return true;
			}
			
		}
	}

	return false;
}

function nomove(numBlock){
	if( canmoveLeft( numBlock )||
		canmoveRight( numBlock )||
		canmoveUp( numBlock )||
		canmoveDown(numBlock) ){
		return false;
	};
	return true;

}


function noBlockHorizontal(row,col1,col2,numBlock){
	for(var i=col1+1;i<col2;i++){
		if(numBlock[row][i]!=0){
			return false;
		}		
	}
	return true;
}

function noBlockVertical(col,row1,row2,numBlock){
	for(var i=row1+1;i<row2;i++){
		if(numBlock[i][col]!=0){
			return false;
		}
	}
	return true;
}









