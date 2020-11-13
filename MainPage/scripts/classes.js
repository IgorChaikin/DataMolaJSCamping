class Message {
    constructor(id, text, author, createdAt = null, to = null, isPersonal = null) {
        this.text = text;
        this._author = author;
        this._id = id;
        this._createdAt = createdAt ?? new Date();
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

    getPage(skip = 0, top = 10, filterConfig) {
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
        )).sort((a, b) => a.createdAt - b.createdAt).slice(skip, skip + top);
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
}

/*------------------------------------------------------------------------------------------------*/

const m = [
    new Message('1', 'Привет!', 'Иванов Иван', new Date('2020-10-12T12:00:00'), 'Петров Петр'),
    new Message('2', 'Как дела?', 'Иванов Иван', new Date('2020-10-12T12:30:00')),
    new Message('3', 'Привет', 'Петров Петр', new Date('2020-10-12T13:00:00'), 'Иванов Иван'),
    new Message('4', 'Нормально', new Date('2020-10-12T13:10:00'), 'Петров Петр'),
    new Message('5', 'А у тебя как?', new Date('2020-10-12T14:00:00'), 'Петров Петр'),
    new Message('6', 'Хорошо)', 'Иван Иванов', new Date('2020-10-12T14:00:00')),
];

const mL = new MessageList(m);

console.log('-----getPage-----');

let testList = mL.getPage();
for (const el of testList) {
    console.log(el);
} /* 4: only destination user and author can see personal messages for him */

console.log('--------------');

testList = mL.getPage(0, 3,
    {
        dateFrom: new Date('2020-10-12T12:00:00'),
        dateTo: new Date('2020-10-12T13:00:00'),
    });
for (const el of testList) {
    console.log(el);
} /* 1: only destination user and author can see personal messages for him */

console.log('--------------');

mL.user = 'Петров Петр';

testList = mL.getPage();
for (const el of testList) {
    console.log(el);
} /* 6 */

console.log('--------------');

testList = mL.getPage(0, 3,
    {
        dateFrom: new Date('2020-10-12T12:00:00'),
        dateTo: new Date('2020-10-12T13:00:00'),
    }); /* 3 */
for (const el of testList) {
    console.log(el);
}

console.log('-----addAll-----');
const badMsg = mL.addAll(
    [
        new Message('7',
            'Спасибо, что спросил',
            'Иванов Иван',
            new Date('2020-10-12T14:50:00')),
        new Message('8',
            'Сегодня хорошая погода',
            'Петров Петр',
            new Date('2020-10-12T15:00:00'), 'Иванов Иван'),
        new Message(9,
            'Some text',
            'Петров Петр',
            new Date('2020-10-12T15:00:00'),
            'Иванов Иван'),
        new Message('10',
            'Some text',
            new Date('2020-10-12T15:00:00'),
            'Иванов Иван'),
    ],
);

console.log(mL.getPage().length); /* 8: 2 invalid */
console.log(badMsg);

console.log('-----get-----');

console.log(mL.get('1'));
console.log(mL.get('6'));
console.log(mL.get('25'));/* undefined, no message with this id */

console.log('-----validate-----');

console.log(MessageList.validate(new Message(
    '1',
    'Text',
    'Иванов Иван',
)));/* true */

console.log(MessageList.validate(new Message(
    1,
    {},
    'Иванов Иван',
)));/* false, wrong types */

console.log(MessageList.validate(new Message(
    '1',
    'Text',
    'Иванов Иван',
    new Date('2020-10-12T12:00:00'),
    'Петров Петр',
    false,
))); /* false, not personal, but has 'to' */

console.log('-----add-----');

console.log(mL.add({
    text: {},
    to: 'Иванов Иван',
}));/* false, wrong types */

mL.user = undefined;
console.log(mL.add({
    text: 'Text',
    to: 'Иванов Иван',
}));/* false, only authenticated user can send messages */

mL.user = 'Васильев Василий';
console.log(mL.add({
    text: 'Не знаю, не знаю',
    to: 'Пётр Петров',
}));/* true */

console.log('-----edit-----');

console.log(mL.edit('1', { text: 'Some text' }));/* false only author can edit his messages */
console.log(mL.get('1'));

console.log(mL.edit('9', { text: 'Some text' }));/* true */
console.log(mL.get('9'));

console.log('-----remove-----');

console.log(mL.remove('1'));/* false only author can edit his messages */
console.log(mL.get('1'));

console.log(mL.remove('9'));/* true */
console.log(mL.get('9'));/* undefined (was deleted) */
