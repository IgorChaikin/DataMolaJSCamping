class Message {
    constructor(id, text, author, createdAt = null, to = null, isPersonal = null) {
        this.text = text;
        this._author = author;
        this._id = id;
        this._createdAt = typeof createdAt === 'string' ? new Date(createdAt)
            : createdAt instanceof Date ? createdAt
                : new Date();
        this.to = to;
        this.isPersonal = isPersonal ?? !!to;
    }

    get id() {
        return this._id;
    }

    get author() {
        return this._author;
    }

    get createdAt() {
        return this._createdAt;
    }

    get createdAtString() {
        return `${this._createdAt.toDateString() !== new Date().toDateString() ? `${this._createdAt.getDate()}.${
         this._createdAt.getMonth() + 1}.${
         this._createdAt.getFullYear()} ` : ' '}
         
         ${this._createdAt.getHours().toString().padStart(2, '0')}:${
         this._createdAt.getMinutes().toString().padStart(2, '0')}`;
    } /* no date string if createdAt is today */

    get createdAtFormatString() {
        return `${this._createdAt.getFullYear()}-${this._createdAt.getMonth() + 1}-${this._createdAt.getDate()}T${
            this._createdAt.getHours().toString().padStart(2, '0')}:${
            this._createdAt.getMinutes().toString().padStart(2, '0')}:${
            this._createdAt.getSeconds().toString().padStart(2, '0')}`;
    }
}

class MessageList {
    constructor(msgs = []) {
        this._messages = [...msgs];
        this._counter = msgs.length;
        this._user = undefined;
    }

    get user() {
        return this._user;
    }

    set user(user) {
        this._user = user;
    }

    get length() {
        return this._messages.length;
    }

    _isAuthenticated() {
        return !!this._user;
    }

    _isAuthor(msg) {
        return !!msg.author && (msg.author !== this._user);
    }

    static validate(msg) {
        return (typeof msg.id === 'string') && (typeof msg.text === 'string')
            && (typeof msg.author === 'string')
            && (typeof msg.isPersonal === 'boolean')
            && (msg.createdAt instanceof Date) && (
                (msg.isPersonal && (typeof msg.to === 'string'))
                || (!msg.isPersonal && !msg.to)
            );/* both parameters (isPersonal & to) should exist in personal message */
    }

    getPage(count = 10, filterConfig) {
        const matchAuthor = (msg) => !filterConfig.author
            || msg.author.indexOf(filterConfig.author) !== -1;
        const matchText = (msg) => !filterConfig.text || msg.text.indexOf(filterConfig.text) !== -1;
        const matchFrom = (msg) => !filterConfig.dateFrom || msg.createdAt >= filterConfig.dateFrom;
        const matchTo = (msg) => !filterConfig.dateTo || msg.createdAt <= filterConfig.dateTo;
        const visible = (msg) => !msg.isPersonal || msg.to === this._user
            || msg.author === this._user;
        /* only destination user and author can see personal messages for him */

        return this._messages.filter((msg) => visible(msg) && (!filterConfig || (
            matchAuthor(msg)
            && matchText(msg)
            && matchFrom(msg)
            && matchTo(msg))
        )).sort((a, b) => a.createdAt - b.createdAt).slice(-count);
    }

    get(id) {
        return this._messages.find((element) => element.id === id);
    }

    add(msg) {
        if (!this._isAuthenticated()) {
            return false;
        } /* only authenticated user can send messages */

        const { text, to, isPersonal } = msg;
        const added = new Message((this._counter++).toString(),
            text, this._user, new Date(), to, isPersonal);
        const isValid = MessageList.validate(added);
        if (isValid) {
            this._messages.push(added);
        }
        return isValid;
    }

    edit(id, msg) {
        const index = this._messages.findIndex((element) => element.id === id);
        if (index < 0) {
            return false;
        }

        const edited = new Message(
            this._messages[index].id,
            this._messages[index].text,
            this._messages[index].author,
            this._messages[index].createdAt,
            this._messages[index].to,
            this._messages[index].isPersonal,
        );

        if (this._isAuthor(edited)) {
            return false;
        } /* only author can edit his messages */

        const { text, isPersonal, to } = msg;
        if (typeof text !== 'undefined') {
            edited.text = text;
        }
        if (typeof isPersonal !== 'undefined') {
            edited.isPersonal = isPersonal;
        }
        if (typeof to !== 'undefined') {
            edited.to = to;
        }
        /* only isPersonal, to & text can be changed */

        const isValid = MessageList.validate(edited);
        if (isValid) {
            this._messages[index] = edited;
        }
        return isValid;
    }

    remove(id) {
        const index = this._messages.findIndex((element) => element.id === id);
        if (index < 0) {
            return false;
        }

        if (this._isAuthor(this._messages[index])) {
            return false;
        } /* only author can delete his messages */

        this._messages.splice(index, 1);
        return true;
    }

    addAll(msgs) {
        const valid = msgs.filter((msg) => MessageList.validate(msg));
        const invalid = msgs.filter((msg) => !MessageList.validate(msg));
        this._messages = [...this._messages, ...valid];
        this._counter += valid.length;
        return invalid;
    }

    clear() {
        this._messages = [];
        this._counter = 0;
    }

    toJSON() {
        return JSON.stringify(this._messages.map((msg) => ({
            id: msg.id,
            text: msg.text,
            createdAt: msg.createdAtFormatString,
            author: msg.author,
            isPersonal: msg.isPersonal,
            to: msg.to,
        })));
    }
}

/* ---------------------------------------New UserList class-----------------------------------*/

class UserList {
    constructor(users, activeUsers) {
        this._users = users;
        this._activeUsers = activeUsers;
    }

    get users() {
        return this._users;
    }

    get activeUsers() {
        return this._activeUsers;
    }
}
