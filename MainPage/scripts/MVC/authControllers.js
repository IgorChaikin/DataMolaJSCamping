class AuthController {
    constructor(labelId, areaId, inputId, footerId, buttonId, changeId) {
        this._authLabel = document.getElementById(labelId); // 'auth-label-id'
        this._area = document.getElementById(areaId); // 'auth-area-id'
        this._authInput = document.getElementById(inputId); // 'auth-input-id'
        this._footer = document.getElementById(footerId);
        this._button = document.getElementById(buttonId);
        this._change = document.getElementById(changeId);

        this._mode = 'register';
    }

    _update(user) {
        const body = this._area.parentNode;
        body.removeChild(this._area);

        const header = document.createElement('header');
        header.className = 'header';
        header.setAttribute('id', 'header-element-id');
        header.innerHTML = '<span>\n'
            + '            <i class="fa fa-book" aria-hidden="true"></i>\n'
            + '            <span id = "header-id"></span>\n'
            + '        </span>\n'
            + '        <button class="exit-button" id="exit-id">Выйти</button>';

        body.insertBefore(header, this._footer);

        const main = document.createElement('div');
        main.className = 'main';
        main.setAttribute('id', 'main-element-id');
        main.innerHTML = '<div class="side-area">\n'
            + '            <div class="side-header">Активные пользователи</div>\n'
            + '            <div class="user-list" id = "active-users-list-id">\n'
            + '\n'
            + '            </div>\n'
            + '        </div>\n'
            + '        <div class="center-area">\n'
            + '            <div class="load-area">\n'
            + '                <button type="button" class="sup-button" id="load-button-id">\n'
            + '                    Загрузить ещё\n'
            + '                </button>\n'
            + '            </div>\n'
            + '            <div class="message-list" id ="messages-list-id">\n'
            + '\n'
            + '            </div>\n'
            + '\n'
            + '            <form class="send-form" id="send-form-id">\n'
            + '                <input class="send-field">\n'
            + '                <button type="submit" class="send-button" id="send-button">\n'
            + '                    Отправить\n'
            + '                    <i class="fa fa-check" aria-hidden="true"></i>\n'
            + '                </button>\n'
            + '            </form>\n'
            + '        </div>\n'
            + '\n'
            + '        <div class="side-area">\n'
            + '            <div class="side-header">Фильтровать сообщения по</div>\n'
            + '            <div class="filters-grid" id="filters-id">\n'
            + '                <label class="name-label" for="name">Автору</label>\n'
            + '                    <input type="text" id="name" class="name-field">\n'
            + '                <button type="button" class="name-delete-button" id="name-button-id">\n'
            + '                    <i class="fa fa-times"></i>\n'
            + '                </button>\n'
            + '                <label class="date-label" for="date">Дате</label>\n'
            + '                    <input type="date" id="date" class="date-field">\n'
            + '                <button type="button" class="date-delete-button" id="date-button-id">\n'
            + '                    <i class="fa fa-times"></i>\n'
            + '                </button>\n'
            + '                <label class="content-label" for="content">Содержанию</label>\n'
            + '                    <input type="text" id="content" class="content-field">\n'
            + '                <button type="button" class="content-delete-button" id="content-button-id">\n'
            + '                    <i class="fa fa-times"></i>\n'
            + '                </button>\n'
            + '            </div>\n'
            + '        </div>';

        body.insertBefore(main, this._footer);

        const chatController = new ChatController(
            user,
            'messages-list-id',
            'header-id',
            'active-users-list-id',
            'name',
            'date',
            'content',
            'load-button-id',
            'send-form-id',
        );
        /* -----------------------------------DOM components-----------------------------------*/
        const usersList = document.getElementById('active-users-list-id');

        const messages = document.getElementById('messages-list-id');

        const loadButton = document.getElementById('load-button-id');
        const filters = document.getElementById('filters-id');
        const sendForm = document.getElementById('send-form-id');

        const nameButton = document.getElementById('name-button-id');
        const dateButton = document.getElementById('date-button-id');
        const contentButton = document.getElementById('content-button-id');

        const exitButton = document.getElementById('exit-id');
        /* -----------------------------------Assign events-----------------------------------*/

        loadButton.addEventListener('click', chatController.loadButtonController);
        messages.addEventListener('click', chatController.editListController);
        sendForm.addEventListener('submit', chatController.send);
        filters.addEventListener('input', chatController.filterChangeController);
        nameButton.addEventListener('click', chatController.deleteNameController);
        dateButton.addEventListener('click', chatController.deleteDateController);
        contentButton.addEventListener('click', chatController.deleteContentController);
        usersList.addEventListener('click', chatController.selectUser);
        exitButton.addEventListener('click', chatController.exitController);
    }

    _register(event) {
        chatApi.register(event).then((res) => {
            if (res.status === 200) {
                this._authLabel.innerText = 'Регистрация прошла успешно, войдите';
            } else {
                this._authLabel.innerText = 'Неверные данные пользователя';
            }
        }).catch((err) => { console.log(err.json()); }); /* TO DO !!! */
    }

    _login(event) {
        chatApi.login(event).then((res) => {
            if (res.status === 200) {
                this._update(this._authInput.value);
            } else {
                this._authLabel.innerText = 'Неверные данные пользователя';
            }
            return res.json();
        }).then((data) => { chatApi.token = data.token; });
    }

    get authenticate() {
        return (event) => {
            event.preventDefault();
            if (event.target.closest('form')) {
                const user = this._authInput.value;
                switch (this._mode) {
                    case 'register': this._register(event); break;
                    case 'login': this._login(event); break;
                    default: break;
                }
            } else {
                event.stopPropagation();
            }
        };
    }

    get change() {
        return (event) => {
            if (event.target.closest('button')) {
                const tmp = this._button.innerText;
                this._button.innerText = this._change.innerText;
                this._change.innerText = tmp;

                this._mode = this._mode === 'register' ? 'login' : 'register';
            } else {
                event.stopPropagation();
            }
        };
    }
}

const authController = new AuthController('auth-label-id',
    'auth-area-id',
    'auth-input-id',
    'footer-element-id',
    'auth-button-id',
    'change-button-id');

const form = document.getElementById('auth-form-id');
const change = document.getElementById('change-button-id');

form.addEventListener('submit', authController.authenticate);
change.addEventListener('click', authController.change);
