/*!
 * Copyright (c) 2020 jngcs
 * Distributed under MIT license
 */
;
(function() {

	// 选项及默认设置
	const defaultOptions = {
		type: 'toast',  // 模态框类型，可选：alert|confirm|toast
		content_title: 'title',  // 标题内容，string|'none'
		content_msg: 'message',  // 消息内容
		cancel_text: '取消',  // 取消按钮文字，仅当type=confirm是有效
		confirm_text: '确定',  // 确认按钮文字，仅当type=alert|confirm时有效
		need_rebuild: 0,  // 是否需要订制并覆盖，1为订制，0为采用插件默认配置
		toast_time: 1500,  // toast显示市场，仅当type=toast时有效
		animation: 'fade'  // modal显示关闭动画
	};
	
	// 用于判断在调用show之前，是否已经调用set初始化，0代表没，1代表已经初始化
	var isSet = 0;

	// 暴露给浏览器的接口
	let api = {
		
		/**
		 * @param {Object} opts 选择modal的属性
		 * 初始化modal函数
		 */
		set: function(opts) {
			// 利用json的转换实现指针的转换从而进行深度克隆，但是性能消耗增加
			var options = JSON.parse(JSON.stringify(defaultOptions));

			// 选项设置
			for (var key in opts) {
				options[key] = opts[key];
			}
			
			// 如果开发者需要订制，直接返回参数不进行初始化
			if (options.need_rebuild === 1) {
				// isSet置1，modal初始化交给开发者处理
				isSet = 1;
				return this;
			}

			// dom元素获取
			var cancelBtnHtml = '<span class="modal-btn-cancel">' + options.cancel_text + '</span>';
			var confirmBtnHtml = '<span class="modal-btn-confirm">' + options.confirm_text + '</span>';
			var modal = document.getElementById('modal');
			var modalBtnRow = document.getElementsByClassName('modal-button')[0];
			var modalTitle = document.getElementsByClassName('modal-title')[0];
			var modalMsg = document.getElementsByClassName('modal-msg')[0];
	
			// 由于后续的初始化中代码较多，涉及多处判断及dom操作，所以不用try catch
			// 提前检测modal中btn，title，msg元素是否存在，不存在则抛出异常
			if (modalBtnRow === undefined || modalTitle === undefined || modalMsg === undefined) {
				console.error('element ".modal-button" ".modal-title" ".modal-msg" may not exist,check your HTML.');
				throw 'modal stop running';
			}
	
			// 判断是否需要标题，设置标题和消息的内容
			if (options.content_title === 'none') {
				modalTitle.style.height = '0px';
				modalMsg.style.lineHeight = '50px';
			} else {
				modalTitle.style.height = '32px';
				modalMsg.style.lineHeight = '35px';
				modalTitle.innerHTML = options.content_title;		
			}
			modalMsg.innerHTML = options.content_msg;

			// 清空按钮行，判断modal的类型，并进行界面初始化
			modalBtnRow.innerHTML = '';
			switch (options.type) {
				case 'toast':
					setTimeout(function() {
						api.hide();
					}, options.toast_time);
					break;
				case 'alert':
					modalBtnRow.innerHTML = confirmBtnHtml;
					break;
				case 'confirm':
					modalBtnRow.innerHTML = cancelBtnHtml + confirmBtnHtml;
					break;
				default:
					options.type = 'toast';
					setTimeout(function() {
						api.hide();
					}, options.toast_time);
			}
			
			// 根据选项参数设置显示动画
			switch (options.animation) {
				case 'fade':
					modal.style.animation = 'fade 0.3s ease';
					break;
				case 'pop':
					modal.style.animation = 'pop 0.3s ease';
					break;
				default:
					modal.style.animation = 'fade 0.3s ease';
			}
			
			// isSet置1，modal已经初始化
			isSet = 1;
			
			// 返回this，方便链式调用
			return this;
		},
		
		
		/**
		 * @param {Object} callbacks 开发者重写回调函数
		 * 显示modal函数
		 */
		show: function(callbacks) {
			
			// 如果没有调用set直接调用show则终止
			if (isSet === 0) {
				console.error('you shoud call function "set" before "show"');
				throw 'modal stop running';
			}
			
			// 换算无法用json转换，只能牺牲一点性能和空间了
			var callback = {
				success: function(res) {},
				fail: function(err) {console.error('fail callback：' + err);}
			}
			
			for (var key in callbacks) {
				callback[key] = callbacks[key];
			}

			// 修改display，显示模态框
			try{
				document.getElementById('mask').style.display = 'flex';
				document.getElementById('modal').style.display = 'flex';
			} catch(e) {
				//TODO handle the exception
				res = e.message;
				callback.fail(res);
				throw 'modal stop running';
			} finally {
				isSet = 0;  // 重新将isSet置为0，否则相同域其他modal可以不调用set直接show
			}
			callback.success('success');  // 如果上述代码无错误，则回调success
		},
		
		
		/**
		 * @param {Object} callbacks 开发者重写回调函数
		 * 关闭modal函数
		 */
		hide: function() {
			
			// 设置离场动画
			var animationName = document.getElementById('modal').style.animationName;
			var outAnimation = animationName + '-out 0.3s ease';
			document.getElementById('modal').style.animation = outAnimation;
			
			// 关闭模态框
			setTimeout(function() {
				document.getElementById('mask').style.display = 'none';
				document.getElementById('modal').style.display = 'none';
			}, 230);
		}
	};

	// 将接口暴露给浏览器
	this.Modal = api;
})();
