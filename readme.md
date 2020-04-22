# modal.js Guidance

[![Build Status]( https://www.travis-ci.org/BEE-JN/modal-jngcs.svg?branch=master&status=passed )](https://www.travis-ci.org/github/BEE-JN/modal-jngcs)

[![](https://img.shields.io/badge/home-jngcs-blue)]( http://jngcs.top/common/modal/modal-jngcs.html ) 

modal.js is a mobile-browser plugin build with HTML CSS  and JavaScript.

It provide the ability to show the model in your mobile-browser, and listen the basic events.

You can also make your own style modal whether the plugin's style.

The modal.js rely on pure js,you can run it without any frame.



## Quick Start

1. import js

   ```html
   <!-- v0.x.x -->
   <script src="https://jngcs.top/common/modalv0/modal.min.js"></script>
   <!-- v1.x.x -->
   <script src="https://jngcs.top/common/modalv1/modal.min.js"></script>
   ```

2. import css

   ```html
   <link href="https://jngcs.top/common/modal/modal.min.css" rel="stylesheet" />
   ```

3. if you use *modalv0*, copy code below, then paste under the `<body>` element and must under the `<body>`

   if you use *modalv1*, you needn't copy the html.

   ```html
   <!-- modal -->
   <div id="mask" style="display: none;"></div>
   <div id="modal" style="display: none;">
       <div class="modal-content">
   	<div class="modal-title"></div>
   	    <div class="modal-msg">哈哈哈</div>
   	</div>
   	<div class="modal-button"></div>
   </div>
   ```



## Function

* `Modal.set()`

   Initialize  the modal.

* `Modal.set().show()`

  show the modal. must call `set()` before `show()` like `Modal.set().show();`

* `Modal.hide()`

  hide the modal.



## Options

#### function `set()`

| Property      | Type   | Default value | Description                     |
| ------------- | ------ | ------------- | ------------------------------- |
| type          | string | toast         | modal type.                     |
| content_title | string | none          | modal title.                    |
| content_msg   | string |               | modal content message.          |
| cancel_text   | string | 取消          | text of cancel button.          |
| confirm_text  | string | 确定          | text of confirm button.         |
| need_rebuild  | number | 0             | is modal need rebuild.          |
| toast_time    | number | 1500          | show time while type = 'toast'. |
| animation     | string | fade          | animation.                      |

* legal value of `type`

  | Value   | Description                                  |
  | ------- | :------------------------------------------- |
  | toast   | no button, timeout with 1500ms.              |
  | alert   | with only confirm button, no timeout.        |
  | confirm | with cancel and confirm buttons, no timeout. |

* legal value of `content_title`

  | Value | Description            |
  | ----- | ---------------------- |
  | none  | don't need modal title |
  
* legal value of `need_rebuild`

  | Value | Description                                          |
  | ----- | ---------------------------------------------------- |
  | 0     | use modal default style.                             |
  | 1     | rebuild your style modal, you can rewrite HTML, CSS. |

* legal value of `animation`

  | Value | Description                        |
  | ----- | ---------------------------------- |
  | fade  | modal fade slowly.                 |
  | pop   | modal pop up and fall down slowly. |

#### function `show()`

| Property | Type     | Default value | Description            |
| -------- | -------- | ------------- | ---------------------- |
| success  | function |               | callback after success |
| fail     | function |               | callback after fail    |



## How To Listen

If you use the default style, modal.js provider the className for you.

#### alert type

modal.js provide className `.modal-btn-confirm` in confirm button.

#### confirm type

modal.js provide classNmae `.modal-btn-cancel` and `.modal-btn-confirm` .

 You can listen the events by className in your business logic like this:

```javascript
var confirmBtn = document.getElementsByClassName('modal-btn-confirm')[0];
confirmBtn.addEventListener('click', function() {
    // DO SOMETHING HERE
    Modal.hide();
})
```

If you use mui to listen like this:

```javascript
mui('#modal').on('tap', '.modal-btn-cancel', function() {
	console.log('cancel');
	Modal.hide();
});
```

Remember to use `mui().off()`to cancel the listener after your work, or the code in listener will be called many times.



## Example

```javascript
// 在业务逻辑中显示模态框
Modal.set({
	type: 'alert',
	content_title: 'title',
	content_msg: 'message',
    animation: 'fade'
}).show({
	success: function(res) {
		console.log(res);
        var confirmBtn = document.getElementsByClassName('modal-btn-confirm')[0];
		confirmBtn.addEventListener('click', function() {
    		// DO SOMETHING HERE
    		Modal.hide();
		})
	},
    fail: function(res) {
        console.log(res);
    }
});

// 监听模态框事件，在业务逻辑中关闭模态框
Modal.hide();
```




##  Attention ☆

* The Id and className modal.js used:

  ```html
  #mask
  #modal
  .modal-content
  .modal-title
  .modal-msg
  .modal-button
  .modal-btn-cancel
  .modal-btn-confirm
  @keyframes fade
  @keyframes pop
  @keyframes mask-show
  ```

  make sure **not** to use them in other place.

* If you use the default style, **don't** modify the html ans css in *Quict Start*.

* Call function `set()` **before** use `show()`,  otherwise the modal will not work.

* If you use mui to listen, remember to use `mui().off()`to cancel the listener, or the code in listener will be called many times.



## FAQ

1. Q: The animation didn't work?

   A:  modal.js is still in Alpha edition, something maybe is testing.

2. Q: How to rebuild?

   A: Use the property `need_rebuild: 1` in `set()`. Then you can modify html and css you like.



## Update Notes

v0.0.2 Alpha(13/3/2020): 

* 新增错误捕获功能
* 删除`show()`函数的默认成功回调函数内部功能

------

v0.0.3 Alpha(13/3/2020): 

* 新增链式调用顺序要求

------

v0.1.1 Alpha(14/3/2020):

* 新增动画效果
* 修复同一页面下存在有或无标题的两种模态框情况下，导致消息高度变化的问题

------

v0.1.2 Alpha(15/3/2020):

* 修复mask动画短暂黑屏的问题
* 修复由于未对对象进行深度复制导致内容异常的问题
* 优化`show()`函数成功后回调函数的执行顺序

------

v0.1.3 Alpha(18/3/2020)

* 新增modal离场动画
* 优化modal圆角尺寸
* 删除`hide()`函数的回调函数

------

v0.1.4 Alpha(19/3/2020)

* 修复真机情况下modal离场动画不起效的问题

------

v0.2.0 Beta(22/3/2020)

* 修复了`show()`函数中回调函数深度复制后出错的问题
* 版本迭代到Beta版

------

v1.0.0 Beta (22/4/2020)

* 新增页面dom监听，动态插入modal元素，不用再粘贴html代码。
* 由于dom的监听事件，不再支持IE8以下浏览器。
* 1.0.0版本为大版本更新，不向前兼容。