# modal.js Guidance

modal.js is a mobile-browser plugin build with HTML CSS  and JavaScript.

It provide the ability to show the model in your mobile-browser, and listen the basic events.

You can also make your own style modal whether the plugin's style.

The modal.js rely on pure js,you can run it without any frame.



## Quick Start

1. import js

   ```html
   <script src="http://jngcs.top/common/modal/modal.min.js"></script>
   ```

2. import css

   ```html
   <link href="http://jngcs.top/common/modal/modal.min.css" rel="stylesheet" />
   ```

3. copy code below in your html, then paste under the `<body>` element and must under the `<body>`

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
| content_title | string |               | modal title.                    |
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
var cancelBtn = document.getElementsByClassName[0];
cancelBtn.addEventListener('click', function() {
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
	type: 'confirm',
	content_title: 'title',
	content_msg: 'message',
    animation: 'fade'
}).show({
	success: function(res) {
		console.log(res);
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

