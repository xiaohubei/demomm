
var cb = {};
cb.events = {};
cb.events.on = function (name, callback, context) {
    if (!name || !callback) return;
    this._events || (this._events = {});
    var events = this._events[name] || (this._events[name] = []);
    events.push({ callback: callback, context: context });
};
cb.events.un = function (name, callback) {
    if (!name || !this._events || !this._events[name]) return;
    if (!callback) {
        delete this._events[name];
    } else {
        var index = this._events[name].findIndex(function (value) {
            if (value.callback === callback)
                return true;
        });
        if (index !== -1)
            this._events[name].removeData(this._events[name][index]);
    }
};
cb.events.hasEvent = function (name) {
    if (!name) return;
    return this._events && this._events[name] && this._events[name].length;
};
cb.events.execute = function (name) {
    if (!name) return;
    var events = this._events ? this._events[name] : null;
    if (!events) return true;
    var result = true;
    var args = Array.prototype.slice.call(arguments, 1);
    events.forEach(function (event) {
        result = event.callback.apply(event.context || this, args) === false ? false : result;
    }, this);
    return result;
};

cb.views = {};
cb.views.register = function (controllerName, func){
	cb.views[controllerName] = func(controllerName);
};
cb.views.register("BaseView", function(controllerName){
	var view = function (widgets){
		var _data = { view: $('[data-controller=' + this.controllerName +']'), widgets: widgets};
		this._get_data = function (attr){
			return _data[attr];
		};
		this._set_data = function (attr, val ){
			_data[attr] = val;
		};
	};
	view.prototype.controllerName = controllerName;
	//支撑逻辑
	view.prototype.getPostLeft = function (i,j){
		return 20+120*j;
	};
	view.prototype.getPostTop = function (i,j){
		return 20+120*i;
	};
	view.prototype.getNumberBackgroundColor = function( number ){
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
	view.prototype.getNumberColor = function( number ){
		if(number<=4){
			return "#776e65";
		}
	    return "white";
	};
	view.prototype.getNumberText = function( number ){
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
	        case 4096:return "非常赞";break;
	        case 8192:return "超神了!";break;
		};
		return "无敌了！";
	};
	view.prototype.noplace = function( numBlock ){
		for(var i=0;i<4;i++){
			for(var j=0;j<4;j++){
				//如果对应的位子还有为0的，证明还有位子，还可以生成数字
				if( numBlock[i][j]==0)   
					return false;
			}
		}
		return true;
	};
	view.prototype.canmoveLeft = function ( numBlock ){
		for(var i=0;i<4;i++){
			for(var j=1;j<4;j++){
				if(numBlock[i][j]!=0){           //存在元素
					if(numBlock[i][j-1]==0||numBlock[i][j]==numBlock[i][j-1])     //元素左边为空，或则跟自己相等就可以了
					return true;
				}
				
			}
		}
		return false;
	};
	view.prototype.canmoveRight = function( numBlock ){
		for(var i=0;i<4;i++){
			for(var j=0;j<3;j++){
				if(numBlock[i][j]!=0){           //存在元素
					if(numBlock[i][j+1]==0||numBlock[i][j]==numBlock[i][j+1])     //元素右边为空，或则跟自己相等就可以了
					return true;
				}			
			}
		}
		return false;
	};
	view.prototype.canmoveUp = function( numBlock ){
		for(var i=1;i<4;i++){
			for(var j=0;j<4;j++){
				if(numBlock[i][j]!=0){
					if(numBlock[i-1][j]==0||numBlock[i][j]==numBlock[i-1][j])
					return true;
				}				
			}
		}
		return false;
	};
	view.prototype.canmoveDown = function( numBlock ){
		for(var i=0;i<3;i++){
			for(var j=0;j<4;j++){
				if(numBlock[i][j]!=0){ //存在元素
					//元素下边为空，或则跟自己相等就可以了
					if(numBlock[i+1][j]==0||numBlock[i][j]==numBlock[i+1][j])     
					return true;
				}				
			}
		}
		return false;
	};
	view.prototype.nomove =function (numBlock){
		if( this.canmoveLeft( numBlock )||
			this.canmoveRight( numBlock )||
			this.canmoveUp( numBlock )||
			this.canmoveDown(numBlock) ){
			return false;
		};
		return true;
	};
	view.prototype.noBlockHorizontal = function (row,col1,col2,numBlock){
		for(var i=col1+1;i<col2;i++){
			if(numBlock[row][i]!=0){
				return false;
			}		
		}
		return true;
	};
	view.prototype.noBlockVertical = function(col,row1,row2,numBlock){
		for(var i=row1+1;i<row2;i++){
			if(numBlock[i][col]!=0){
				return false;
			}
		}
		return true;
	};
	//动画逻辑
	view.prototype.showNumWithAnimation = function( i,j,randomNum ){
		var NumCell=$('#number-cell-'+i+'-'+j);
		NumCell.css('font-size','20px')
	    NumCell.css('background-color',this.getNumberBackgroundColor( randomNum ) );
	    NumCell.css('color',this.getNumberColor(randomNum ) );
	    NumCell.text(  randomNum  );
	    NumCell.animate({
	    	'width':'100px',
	    	'height':'100px',
	    	'left':this.getPostLeft(i,j),
	    	'top':this.getPostTop(i,j),
	    },50);
	};
	view.prototype.showMoveAnimation = function( fromx,fromy,tox,toy ){
		var cellNum=$('#number-cell-'+fromx+'-'+fromy);
		cellNum.animate({
				left:this.getPostLeft(tox, toy),
				top:this.getPostTop(tox, toy),
				},200);
	};
	view.prototype.updateScore = function(score){
		$('#score').text(score);
	};
	return view;
});
$.extend(cb.views.BaseView.prototype, cb.events);
cb.init = function (){
	debugger;
	cb.rest.ContextBuilder.construct(cb.initInner);
};
cb.initInner = function (){
	var viewControllerTag = 'data-controller';
	var views = document.querySelectorAll('['+viewControllerTag+']');
	if(views.length !==1) return;
	var controllerName = views[0].getAttribute(viewControllerTag);
	var controllerConstructor = cb.views[controllerName];
	if(!controllerConstructor) return;
	var controller = new controllerConstructor();
    if (controller.init) controller.init();
};
cb.rest = {};
cb.rest.ContextBuilder = {
	construct: function ( callback ){
		//do some service request
		//about username, password
		callback();
	}
};

cb.rest._getUrl = function (restUrl, params) {
    var context = cb.rest.AppContext;
    if (cb.util.browser() === 'IE' || params && params.refresh) {
        var ts = new Date().valueOf();
        if (restUrl.indexOf('?') < 0) {
            restUrl += '?_=' + ts;
        } else {
            restUrl += '&_=' + ts;
        }
    }
    if (params && params.token) {
        var token = context.token || '';
        if (restUrl.indexOf('?') < 0) {
            restUrl += '?token=' + token;
        } else {
            restUrl += '&token=' + token;
        }
    }
    if (restUrl.indexOf('http://') < 0) {
        if (restUrl.substr(0, 1) !== '/')
            restUrl = '/' + restUrl;
        restUrl = context.serviceUrl + restUrl;
    }
    return restUrl;
};
cb.rest._appendUrl = function (restUrl, params) {
    if (!params) return restUrl;
    var queryStr = [];
    for (var attr in params) {
        queryStr.push(attr + '=' + params[attr]);
    }
    if (!queryStr.length) return restUrl;
    var queryString = queryStr.join('&');
    return restUrl.indexOf('?') >= 0 ? (restUrl + '&' + queryString) : (restUrl + '?' + queryString);
};

