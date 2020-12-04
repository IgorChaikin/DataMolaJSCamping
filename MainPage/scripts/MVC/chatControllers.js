class ChatController {
    constructor(mgsId, headId, userId, nameId, dateId, contentId, loadId, formId) {
        this._pageCount = 10;
        this._target = null;
        this._editId = null;

        this._messageList = new MessageList();
        this._messageList.user = JSON.parse(localStorage.getItem('currentUser') ?? '');
        this._messageList.addAll(JSON.parse(localStorage.getItem('msgs') ?? '[]')
            .map((msg) => new Message(msg.id, msg.text, msg.author, msg.createdAt, msg.to)));

        this._messagesView = new MessagesView(mgsId);
        this._headerView = new HeaderView(headId);
        this._activeUsersView = new ActiveUsersView(userId);

        this._sendForm = document.getElementById(formId);

        this._userList = new UserList(JSON.parse(localStorage.getItem('users')),
            JSON.parse(localStorage.getItem('activeUsers')));

        this._name = document.getElementById(nameId);
        this._date = document.getElementById(dateId);
        this._content = document.getElementById(contentId);

        this._loadButton = document.getElementById(loadId);
    }

    get messageList() {
        return this._messageList;
    }

    get userList() {
        return this._userList;
    }

    get messagesView() {
        return this._messagesView;
    }

    get headerView() {
        return this._headerView;
    }

    get activeUsersView() {
        return this._activeUsersView;
    }

    _page(count = 10) {
        this._pageCount = count;
        const filterConfig = {};
        if (this._date.value !== '') {
            filterConfig.dateFrom = new Date(`${date.value}T00:00:00`);
            filterConfig.dateTo = new Date(`${date.value}T23:59:59`);
        }
        if (this._name.value.trim() !== '') {
            filterConfig.author = this._name.value.trim();
        }
        if (this._content.value.trim() !== '') {
            filterConfig.text = this._content.value.trim();
        }
        const msgs = this._messageList.getPage(this._pageCount, filterConfig);
        this._messagesView.display(msgs, this._messageList.user);
        this._loadButton.hidden = this._pageCount >= this._messageList
            .getPage(this._messageList.length, filterConfig).length;
    }

    get loadButtonController() {
        return (event) => {
            if (event.target.closest('button')) {
                this._pageCount += 10;
                this._page(this._pageCount);
            } else {
                event.stopPropagation();
            }
        };
    }

     get filterChangeController() {
        return (event) => {
            if (event.target.closest('input')) {
                this._page();
            } else {
                event.stopPropagation();
            }
        };
    }

     get deleteNameController() {
        return (event) => {
            if (event.target.closest('button')) {
                this._name.value = '';
                this._page();
            } else {
                event.stopPropagation();
            }
        };
    }

     get deleteDateController() {
         return (event) => {
             if (event.target.closest('button')) {
                 this._date.value = '';
                 this._page();
             } else {
                 event.stopPropagation();
             }
         };
    }

     get deleteContentController() {
         return (event) => {
             if (event.target.closest('button')) {
                 this._content.value = '';
                 this._page();
             } else {
                 event.stopPropagation();
             }
         };
    }

     get selectUser() {
         return (event) => {
             if (event.target.closest('button')) {
                 for (const el of event.target.parentElement.querySelectorAll('button')) {
                     el.classList.remove('selected');
                 }
                 if (event.target.innerText === this._target) {
                     this._target = null;
                     event.target.classList.remove('selected');
                 } else {
                     this._target = event.target.innerText;
                     event.target.classList.add('selected');
                 }
             } else {
                 event.stopPropagation();
             }
         };
    }

     get send() {
         return (event) => {
             const textField = event.target.querySelector('input');
             event.preventDefault();
             if (this._editId === null && textField.value !== '') {
                 this._messageList.add(
                     {
                         text: textField.value,
                         to: this._target,
                     },
                 );
             } else {
                 this._messageList.edit(this._editId, {text: textField.value});
                 this._editId = null;
             }
             localStorage.setItem('msgs', this._messageList.toJSON());
             textField.value = '';
             const msgs = this._messageList.getPage(this._pageCount);
             this._messagesView.display(msgs, this._messageList.user);
         };
    }

     get editListController() {
         return (event) => {
             if (event.target.closest('button')) {
                 const parentId = event.target.tagName === 'BUTTON'
                     ? event.target.parentElement.id : event.target.parentElement.parentElement.id;
                 const thisId = event.target.tagName === 'BUTTON'
                     ? event.target.id : event.target.parentElement.id;
                 /* attempt to fix bug with i-tag (ico) */

                 switch (thisId) {
                     case 'delete-id':
                         this._messageList.remove(parentId);
                         localStorage.setItem('msgs', this._messageList.toJSON());
                         this._messagesView
                             .display(this._messageList
                                 .getPage(this._pageCount), this._messageList.user);
                         break;
                     case 'edit-id':
                         this._sendForm.querySelector('input').value = this._messageList.get(parentId).text;
                         this._editId = parentId;
                         break;
                     default:
                         break;
                 }
             } else {
                 event.stopPropagation();
             }
         };
    }
}
