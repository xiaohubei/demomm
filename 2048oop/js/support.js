
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
		this.documentWidth = window.screen.availWidth;
		this.gridContainerWidth = 0.92* this.documentWidth;
		this.cellBlockWidth = 0.18* this.documentWidth;
		this.cellGap = 0.04* this.documentWidth;
		var _data = { 
			view: $('[data-controller=' + this.controllerName +']')};
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
		return this.cellGap + (this.cellGap + this.cellBlockWidth)*j;
	};
	view.prototype.getPostTop = function (i,j){
		return this.cellGap + (this.cellGap + this.cellBlockWidth)*i;
	};
	view.prototype.getNumberBackgroundColor = function( number ){
		var data = {
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
		};
		switch ( number ){
			case 2:return data[2].color;break;
	        case 4:return data[4].color;break;
	        case 8:return data[8].color;break;
	        case 16:return data[16].color;break;
	        case 32:return data[32].color;break;
	        case 64:return data[64].color;break;
	        case 128:return data[128].color;break;
	        case 256:return data[256].color;break;
	        case 512:return data[512].color;break;
	        case 1024:return data[1024].color;break;
	        case 2048:return data[2048].color;break;
	        case 4096:return data[4096].color;break;
	        case 8192:return data[8192].color;break;
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
		var data = {
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
		};
		switch ( number ){
			case 2:return data[2].text;break;
	        case 4:return data[4].text;break;
	        case 8:return data[8].text;break;
	        case 16:return data[16].text;break;
	        case 32:return data[32].text;break;
	        case 64:return data[64].text;break;
	        case 128:return data[128].text;break;
	        case 256:return data[256].text;break;
	        case 512:return data[512].text;break;
	        case 1024:return data[1024].text;break;
	        case 2048:return data[2048].text;break;
	        case 4096:return data[4096].text;break;
	        case 8192:return data[8192].text;break;
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
		NumCell.css('font-size',this.cellGap)
	    NumCell.css('background-color',this.getNumberBackgroundColor( randomNum ) );
	    NumCell.css('color',this.getNumberColor(randomNum ) );
	    //每次将展现数字的时候，换成数字，其他的逻辑还是用数字去判断、相加,
	    randomNum = this.getNumberText(randomNum);
	    NumCell.text(  randomNum  );
	    NumCell.animate({
	    	'width':this.cellBlockWidth,
	    	'height':this.cellBlockWidth,
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
		var proxy = cb.rest.DynamicProxy.create({
            getNumBlockData: {url: '/PHP/2048oop/server.php?inAjax=true&do=numblock', method: 'GET',options:{token:true}}
        });
        proxy.getNumBlockData({}, function (err, suc){
        	//debugger;
        });
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
        var token = params.token || '';
        if (restUrl.indexOf('?') < 0) {
            restUrl += '?token=' + token;
        } else {
            restUrl += '&token=' + token;
        }
    }
    if (restUrl.indexOf('http://') < 0) {
        if (restUrl.substr(0, 1) !== '/')
            restUrl = '/' + restUrl;
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
cb.rest.DynamicProxy = function (config){
	if(this.init)
		this.init(config);
};
cb.rest.DynamicProxy.create = function (config){
	return new cb.rest.DynamicProxy(config);
};
cb.rest.DynamicProxy.prototype.init = function (config){
	if(!config) return;
	this.config = config;
	for( var attr in this.config ){
		this[attr] = (function (attr){
			return function (data, callback, context){
				return this.Do(attr, data, callback, null, context);
			};
		})(attr);
		this[attr + 'Sync'] = (function (attr){
			return function (data){
				return this.Do(attr, data, null, false);
			};
		})(attr);
	}
};
cb.rest.DynamicProxy.prototype.Do = function (op, data, callback, async, context){
	if(!this.config || !this.config[op] || !this.config[op].url )return;
	var config = this.config[op];
	var restUrl = config.url;
	var options = $.extend( {}, config.options);
	options.method = config.method || 'GET';
	if ( typeof data === 'function'){
		options.callback = data;
		options.context = context || options.context || this;
	}else{
		options.params = data;
	};
	if( callback ){
		options.callback = callback;
		options.context = context || options.context || this;
	};
	if( async === false){
		options.async = false;
	}
	return this.ajax( restUrl, options);
};
cb.rest.DynamicProxy.prototype.ajax = function (url, options){
	return cb.rest.ajax(url, options);
};
cb.rest.ajax = function (url, options){
	options.url = url;
	return cb.rest.AjaxRequestManager.doRequest(options);
};
cb.rest.AjaxRequestManager = {
	_xhrs : [],
	doRequest: function (options){
		var xhr = this.getXMLHttpRequest();
		if(!xhr)return;
		var method = options.method || 'GET';
		var url = cb.rest._getUrl(options.url, options);
		var queryJson = null;
		if(method.equalsIgnoreCase('get') || method.equalsIgnoreCase('delete')){
			url = cb.rest._getUrl(url, options.params);
		}else if( method.equalsIgnoreCase('post') || method.equalsIgnoreCase('put')){
			queryJson = cb.data.JsonSerializer.serialize( options.params );
		};
		xhr.open(method, url, options.async === false ? false : true );
		xhr.setRequestHeader('Content-Type', 'application/json; charset = utf-8 ');
		xhr.send(queryJson);
		if(options.async === false){
			return this.onreadystatechange(xhr, options);
		} else {
			xhr.onreadystatechange = function (){
				cb.rest.AjaxRequestManager.onreadystatechange(this, options);
			};
		};
		if( options.mask === true){
			cb.util.loadingControl.start();
		};
	},
	onreadystatechange: function(xhr, options){
		if(xhr.readyState !== 4) return;
		if(options.mask == true) cb.util.loadingControl.end();
		if(xhr.status === 200){
			var ajaxResult = cb.data.JsonSerializer.deserialize(xhr.responseText);
			cb.rest.AjaxRequestManager.processAjaxResult(ajaxResult, options.callback, options.context, options);
		};
		xhr.isBusy = false;
	},
	getXMLHttpRequest: function (){
		var xhr ;
		for (var i = 0, len = this._xhrs.length ; i < len; i++){
			if(!this._xhrs[i].isBusy){
				xhr = this._xhrs[i];
				break;
			};
		};
		if( !xhr ){
			xhr = this.createXMLHttpRequest();
			this._xhrs.push(xhr);
		};
		xhr.isBusy = true;
		return xhr;
	},
	createXMLHttpRequest: function (){
		var xhr = window.XMLHttpRequest 
		? new XMLHttpRequest() 
		: (window.ActiveXObject ? new ActiveXObject('Micorosoft.XMLHTTP') : null);
		return xhr;
	},
	processAjaxResult : function (ajaxResult, callback, context, options){
		if(!ajaxResult || !ajaxResult.code) return;
		if(ajaxResult.code == 200 ){
			if(callback)
				callback.call(context, null, ajaxResult.data);
		}else{
			if( ajaxResult.code === 900 && options && options.token && options.autoLogin !== false){
				cb.route.redirectLoginPage();
				return;
			};
			if(callback) callback.call(context, ajaxResult);
		}
	}
};

cb.data = {};
cb.data.JsonSerializer = {
    serialize: function (data) {
        if (!data) return null;
        if (window.JSON && JSON.stringify) {
            return JSON.stringify(data);
        } else {
            var type = typeof data;
            if (type === 'string' || type === 'number' || type === 'boolean') {
                return data;
            } else if (data.constructor === Array) {
                return this._innerSerialize(data);
            } else {
                return this._innerSerializeObj(data);
            }
        }
    },
    _innerSerializeObj: function (data) {
        var builder = [];
        for (var attr in data) {
            if (typeof data[attr] === 'function') continue;
            builder.push('"' + attr + '":' + this._innerSerialize(data[attr]));
        }
        return '{' + builder.join(',') + '}';
    },
    _innerSerialize: function (data) {
        if (cb.util.isEmpty(data)) return null;
        var type = typeof data;
        if (type === 'number' || type === 'boolean') {
            return data;
        } else if (data.constructor === Array) {
            var builder = [];
            data.forEach(function (item) {
                builder.push(this._innerSerialize(item));
            }, this);
            return '[' + builder.join(',') + ']';
        } else if (type === 'object') {
            return this._innerSerializeObj(data);
        } else {
            return '"' + data + '"';
        }
    },
    deserialize: function (data) {
        if (!data) return null;
        if (window.JSON && JSON.parse) {
            return JSON.parse(data);
        } else {
            return eval('(' + data.replace(/\r\n/g, '') + ')');
        }
    }
};
cb.data.SecurityParser = {
    encrypt: function (data, rsaPublicKey) {
        var serializedData = cb.data.JsonSerializer.serialize(data);
        var key = CryptoJS.enc.Utf8.parse(CryptoJS.MD5(serializedData)).toString();
        localStorage.setItem('AESKey', key);
        var encryptedKey = cryptico.encrypt(key, rsaPublicKey).cipher;
        var encryptedData = CryptoJS.AES.encrypt(serializedData, key).toString();
        return { encryptedKey: encryptedKey, encryptedData: encryptedData };
    },
    decrypt: function (encryptedToken) {
        var key = localStorage.getItem('AESKey');
        var bytes = CryptoJS.AES.decrypt(encryptedToken, key);
        var data = cb.data.JsonSerializer.deserialize(bytes.toString(CryptoJS.enc.Utf8));
        return data;
    },
    signature: function (data) {
        var items = [localStorage.getItem('AESKey'), cb.data.JsonSerializer.serialize(data)];
        var signature = CryptoJS.SHA1(items.join('')).toString();
        return signature;
    }
};

cb.data.CookieParser = {
    setCookie: function (name, value, expireDays) {
        if (expireDays == null) expireDays = 30;
        var exp = new Date();
        exp.setTime(exp.getTime() + expireDays * 24 * 60 * 60 * 1000);
        document.cookie = name + '=' + escape(value) + ';expires=' + exp.toGMTString();
    },
    getCookie: function (name) {
        var arr, reg = new RegExp('(^|)' + name + '=([^;]*)(;|$)');
        if (arr = document.cookie.match(reg)) {
            return unescape(arr[2]);
        } else {
            return null;
        }
    },
    delCookie: function (name) {
        var exp = new Date();
        exp.setTime(exp.getTime() - 1);
        var val = this.getCookie(name);
        if (val != null) {
            document.cookie = name + '=' + val + ';expires=' + exp.toGMTString();
        }
    }
};

cb.route = {
    redirectLoginPage: function () {
        location.href = '/login?returnUrl=' + encodeURIComponent(location.href);
    }
};

cb.util = {
    isEmpty: function (data) {
        return data === null || data === undefined;
    },
    isElementInViewport: function (el, threshold) {
        var width = window.innerWidth;
        var height = window.innerHeight;
        if (typeof width !== 'number') {
            if (document.compatMode === 'CSS1Compat') {
                width = document.documentElement.clientWidth;
                height = document.documentElement.clientHeight;
            } else {
                width = document.body.clientWidth;
                height = document.body.clientHeight;
            }
        }
        var rect = el.getBoundingClientRect();
        return (
            rect.top >= (0 - threshold) &&
            rect.left >= (0 - threshold) &&
            rect.top <= (height + threshold) &&
            rect.left <= (width + threshold)
        );
    },
    queryString: function (url) {
        this.query = {};

        this.init = function () {
            if (!url) url = location.search;
            var index1 = url.indexOf('?');
            var index2 = url.indexOf('#');
            if (index1 >= 0) {
                url = index2 < 0 ? url.substr(index1 + 1) : url.substring(index1 + 1, index2);
                if (url.length > 0) {
                    url = url.replace(/\+/g, ' ');
                    var params = url.split('&');
                    for (var i = 0, len = params.length; i < len; i++) {
                        var param = params[i].split('=');
                        var key = decodeURIComponent(param[0]);
                        var value = (param.length == 2) ? decodeURIComponent(param[1]) : key;
                        this.query[key] = value;
                    }
                }
            }
        };

        this.set = function (key, value) {
            this.query[key] = value;
        };

        this.get = function (key) {
            return this.query[key];
        };

        this.has = function (key) {
            return this.query[key] != null;
        };

        this.toStr = function () {
            var items = ['?'];
            for (var key in this.query) {
                items.push(encodeURIComponent(key));
                items.push('=');
                items.push(encodeURIComponent(this.query[key]));
                items.push('&');
            }
            if (items.length === 1) {
                return '';
            } else {
                items.removeAt(items.length - 1);
                return items.join('');
            }
        };

        this.init();
    },
    permutate: function (array, permutatedArray) {
        if (!permutatedArray) permutatedArray = [];
        if (array.length > 1) {
            var curItem = array.shift();
            this.permutate(array, permutatedArray);
            for (var i = 0, len = permutatedArray.length; i < len; i++) {
                var p = permutatedArray.shift();
                for (var j = 0, len1 = p.length; j <= len1; j++) {
                    var r = p.slice(0);
                    r.splice(j, 0, curItem);
                    permutatedArray.push(r);
                }
            }
        } else {
            permutatedArray.push([array[0]]);
        }
        return permutatedArray;
    },
    adjustImgSrc: function (src) {
        if (!src) return src;
        var newSrc = src.replace(/\\/g, '/');
        if (cb.rest.AppContext.ImageServer) {
            if (newSrc.substr(0, 1) === '/') {
                newSrc = cb.rest.AppContext.ImageServer + newSrc;
            } else {
                newSrc = cb.rest.AppContext.ImageServer + '/' + newSrc;
            }
        }
        return newSrc;
    },
    adjustAttachPath: function (path) {
        if (!path) return path;
        return path.replace(/\\/g, '/');
    },
    formatMoney: function (money) {
        if (!money) money = 0;
        if (typeof money !== 'number') money = parseFloat(money);
        return '￥' + money.toFixed(2);
    },
    browser: function () {
        if (navigator.userAgent.indexOf('MSIE') > 0)
            return 'IE';
        return null;
    },
    loadingControl: {
        _handler: document.querySelectorAll('.loadingControl'),
        start: function () {
            if (!this._handler.length && this._handler.tagName !== 'DIV') {
                this._handler = document.createElement('div');
                this._handler.setAttribute('class', 'loadingControl');
                this._handler.style.position = 'fixed';
                this._handler.style.top = 0;
                this._handler.style.right = 0;
                this._handler.style.bottom = 0;
                this._handler.style.left = 0;
                this._handler.style.zIndex = 10000;
                this._handler.style.background = 'url("./img/load.gif") no-repeat 50% 50%';
                document.body.appendChild(this._handler);
            }
            if (this._handler.style.display === 'none')
                this._handler.style.display = 'block';
        },
        end: function () {
            if (!this._handler) return;
            if (this._handler.style.display !== 'none')
                this._handler.style.display = 'none';
        }
    },
    clickTimeout: {
        _timeout: null,
        set: function (fn) {
            this.clear();
            this._timeout = setTimeout(fn, 300);
        },
        clear: function () {
            if (this._timeout)
                clearTimeout(this._timeout);
        }
    }
};

String.prototype.equalsIgnoreCase = function (str) {
    if (str == null) return false;
    return this.toLowerCase() === str.toLowerCase();
};
