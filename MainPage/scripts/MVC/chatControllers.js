class ChatController {
    constructor(user, mgsId, headId, userId, nameId, dateId, contentId, loadId, formId) {
        this._user = user;

        this._pageCount = 10;
        this._filterConfig = {};

        this._target = null;
        this._editId = null;

        this._messagesView = new MessagesView(mgsId);
        this._headerView = new HeaderView(headId);
        this._activeUsersView = new ActiveUsersView(userId);
/* ---------------------------------Begin screen state---------------------------------*/
        chatApi.messages(0, this._pageCount, this._filterConfig,
            this._user, this._messagesView)();

        chatApi.users(this._user, this._activeUsersView)();

        this._headerView.display(this._user);
/* ----------------------------------Short polling------------------------------------ */

        this._refresh = setInterval(chatApi.messages(0, this._pageCount, this._filterConfig,
            this._user, this._messagesView), 60000);

        this._userRefresh = setInterval(chatApi.users(this._user, this._activeUsersView), 60000);

        this._name = document.getElementById(nameId);
        this._date = document.getElementById(dateId);
        this._content = document.getElementById(contentId);

        this._sendForm = document.getElementById(formId);
    }

    _page() {
        if (this._date.value !== '') {
            this._filterConfig.dateFrom = new Date(`${this._date.value}T00:00:00`);
            this._filterConfig.dateTo = new Date(`${this._date.value}T23:59:59`);
        }
        if (this._name.value.trim() !== '') {
            this._filterConfig.author = this._name.value.trim();
        }
        if (this._content.value.trim() !== '') {
            this._filterConfig.text = this._content.value.trim();
        }

        clearInterval(this._refresh);

        chatApi.messages(0, this._pageCount, this._filterConfig,
            this._user, this._messagesView)();

        this._refresh = setInterval(chatApi.messages(0, this._pageCount, this._filterConfig,
            this._user, this._messagesView), 60000);
    }

    get loadButtonController() {
        return (event) => {
            if (event.target.closest('button')) {
                this._pageCount += 10;
                this._page();
            } else {
                event.stopPropagation();
            }
        };
    }

     get filterChangeController() {
        return (event) => {
            if (event.target.closest('input')) {
                this._pageCount = 10;
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
                this._pageCount = 10;
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
                 this._pageCount = 10;
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
                 this._pageCount = 10;
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
             if (textField.value !== '') {
                 const msg = { text: textField.value };
                 if (this._editId === null) {
                    msg.isPersonal = this._target !== null;
                    if (this._target !== null) {
                        msg.to = this._target;
                    }
                 }
                 chatApi.send(msg).then(() => {
                     chatApi.messages(0, this._pageCount, this._filterConfig,
                         this._user, this._messagesView)();
                 }).catch(console.error);
             }

             textField.value = '';
         };
    }

     // get editListController() {
         // return (event) => {
             // if (event.target.closest('button')) {
                 // const parentId = event.target.tagName === 'BUTTON'
                     // ? event.target.parentElement.id : event.target.parentElement
                        // .parentElement.id;
                 // const thisId = event.target.tagName === 'BUTTON'
                     // ? event.target.id : event.target.parentElement.id;
                 /* attempt to fix bug with i-tag (ico) */

                 // switch (thisId) {
                     // case 'delete-id':
                         // this._messageList.remove(parentId);
                         // localStorage.setItem('msgs', this._messageList.toJSON());
                         // this._messagesView
                             // .display(this._messageList
                                 // .getPage(this._pageCount), this._messageList.user);
                         // break;
                     // case 'edit-id':
                         // this._sendForm.querySelector('input').value = this
                            // ._messageList.get(parentId).text;
                         // this._editId = parentId;
                         // break;
                     // default:
                         // break;
                 // }
             // } else {
                 // event.stopPropagation();
             // }
         // };
    // }

    get exitController() {
        return (event) => {
            if (event.target.closest('button')) {
                clearInterval(this._refresh);
                clearInterval(this._userRefresh);
                chatApi.logout('footer-element-id');
            } else {
                event.stopPropagation();
            }
        };
    }
}
