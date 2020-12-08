class ChatApiService {
    constructor(server) {
        this._prefix = `https://${server}/`;
        this._token = '';
    }

    set token(value) {
        this._token = value;
    }

    get token() {
        return this._token;
    }

    static _reqString(obj) {
        const args = [];
        for (const arg of Object.keys(obj)) {
            args.push(`${arg}=${obj[arg] instanceof Date
                ? obj[arg].getFullYear().toString()
                + (obj[arg].getMonth() + 1).toString().padStart(2, '0')
                + obj[arg].getDate().toString().padStart(2, '0') : obj[arg]
            }`);
        }
        return args.join('&');
    }

    _getHeaders() {
        const myHeaders = new Headers();
        myHeaders.append('Authorization', `Bearer ${this._token}`);
        myHeaders.append('Content-Type', 'application/json');
        return myHeaders;
    }

    messages(skip = 0, top = 10, filterConfig, user, view) {
        return () => {
            const req = `${this._prefix}messages?skip=${skip}&top=${top}&${
                ChatApiService._reqString(filterConfig)}&personalToFrom=${
                user}`;

            fetch(req, {
                method: 'GET',
                headers: this._getHeaders(),
            })
                .then((res) => res.json())
                .then((data) => { console.log(data); view.display(data, user); })
                .catch(console.error);
        };
    }

    users(user, view) {
        return () => {
            fetch(`${this._prefix}users`, {
                method: 'GET',
            })
                .then((res) => res.json())
                .then((data) => {
                    view.display(data.filter((el) => el.isActive).map((el) => el.name), user);
                })
                .catch(console.error);
        };
    }

    send(msg) {
        console.log(JSON.stringify(msg));

        const result = fetch(`${this._prefix}messages`, {
            method: 'POST',
            body: JSON.stringify(msg),
            headers: this._getHeaders(),
        });
        return result;
    }

    register(event) {
        event.preventDefault();

        const result = fetch(`${this._prefix}auth/register`, {
            method: 'POST',
            body: new FormData(event.target),
        });

        return result;
    }

    login(event) {
        event.preventDefault();

        const result = fetch(`${this._prefix}auth/login`, {
            method: 'POST',
            body: new FormData(event.target),
        });

        return result;
    }

    logout(footerId) {
        fetch(`${this._prefix}auth/logout`, {
            method: 'POST',
            headers: this._getHeaders(),
        }).then(() => {
            const footer = document.getElementById(footerId);
            const element = footer.parentNode;
            const header = document.getElementById('header-element-id');
            element.removeChild(header);
            const main = document.getElementById('main-element-id');
            element.removeChild(main);

            const area = document.createElement('div');
            area.className = 'auth-area';
            area.setAttribute('id', 'auth-area-id');
            area.innerHTML = '<div class="auth-container">\n'
                + '            <form method="post" class = "auth-form" id="auth-form-id">\n'
                + '                <label class="auth-label" id="auth-label-id">Авторизация</label>\n'
                + '                <label for="auth-input-id" class="input-label">Имя пользователя</label>\n'
                + '                <input name="name" class="auth-input" id="auth-input-id"/>\n'
                + '\n'
                + '                <label for="pass-input-id" class="input-label">Пароль</label>\n'
                + '                <input type="password" name="pass" class="auth-input" id="pass-input-id"/>\n'
                + '                <button type="submit" class="auth-button" id="auth-button-id">Зарегистрироваться</button>\n'
                + '            </form>\n'
                + '            <button type="button" class="change-button" id="change-button-id">Войти</button>\n'
                + '        </div>';

            element.insertBefore(area, footer);
        }).catch(console.error);
    }
}
