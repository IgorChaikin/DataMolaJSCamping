messages = [
    {
        id: '1',
        text: 'Привет!',
        createdAt: new Date('2020-10-12T12:00:00'),
        author: 'Иванов Иван',
        isPersonal: true,
        to: 'Петров Петр'
    },
    {
        id: '2',
        text: 'Как дела?',
        createdAt: new Date('2020-10-12T12:30:00'),
        author: 'Иванов Иван',
        isPersonal: false
    },
    {
        id: '3',
        text: 'Привет',
        createdAt: new Date('2020-10-12T13:00:00'),
        author: 'Петров Петр',
        isPersonal: true,
        to: 'Иванов Иван'
    },
    {
        id: '4',
        text: 'Нормально',
        createdAt: new Date('2020-10-12T13:10:00'),
        author: 'Петров Петр',
        isPersonal: false
    },
    {
        id: '5',
        text: 'А у тебя как?',
        createdAt: new Date('2020-10-12T14:00:00'),
        author: 'Петров Петр',
        isPersonal: false
    },
    {
        id: '6',
        text: 'Хорошо)',
        createdAt: new Date('2020-10-12T14:00:00'),
        author: 'Иванов Иван',
        isPersonal: false
    },
    {
        id: '7',
        text: 'Спасибо, что спросил',
        createdAt: new Date('2020-10-12T14:50:00'),
        author: 'Иванов Иван',
        isPersonal: false
    },
    {
        id: '8',
        text: 'Сегодня хорошая погода',
        createdAt: new Date('2020-10-12T15:00:00'),
        author: 'Петров Петр',
        isPersonal: true,
        to: "Иванов Иван"
    },
    {
        id: '9',
        text: 'Не знаю, не знаю',
        createdAt: new Date('2020-10-12T15:10:00'),
        author: 'Васильев Василий',
        isPersonal: true,
        to: "Петров Петр"
    },
    {
        id: '10',
        text: 'Передавали дожди',
        createdAt: new Date('2020-10-12T15:30:00'),
        author: 'Васильев Василий',
        isPersonal: false
    },
    {
        id: '11',
        text: 'Я прогноз смотрел.',
        createdAt: new Date('2020-10-12T15:40:00'),
        author: 'Васильев Василий',
        isPersonal: false
    },
    {
        id: '12',
        text: 'О, а вот и ты! Привет!',
        createdAt: new Date('2020-10-14T00:40:00'),
        author: 'Иванов Иван',
        isPersonal: true,
        to: 'Васильев Василий'
    },
    {
        id: '13',
        text: 'Доброго времени суток',
        createdAt: new Date('2020-10-14T01:40:00'),
        author: 'Васильев Василий',
        isPersonal: true,
        to: 'Иванов Иван'
    },
    {
        id: '14',
        text: 'Что',
        createdAt: new Date('2020-10-14T02:40:00'),
        author: 'Васильев Василий',
        isPersonal: false,
    },
    {
        id: '15',
        text: 'Делаешь',
        createdAt: new Date('2020-10-14T02:40:00'),
        author: 'Васильев Василий',
        isPersonal: false,
    },
    {
        id: '16',
        text: 'Так поздно',
        createdAt: new Date('2020-10-14T02:41:00'),
        author: 'Васильев Василий',
        isPersonal: false,
    },
    {
        id: '17',
        text: 'В этом чате?)',
        createdAt: new Date('2020-10-14T02:41:00'),
        author: 'Васильев Василий',
        isPersonal: false,
    },
    {
        id: '18',
        text: 'Да так',
        createdAt: new Date('2020-10-14T03:14:00'),
        author: "Иванов Иван",
        isPersonal: true,
        to: "Васильев Василий"
    },
    {
        id: '19',
        text: 'Не спиться что-то',
        createdAt: new Date('2020-10-14T03:14:00'),
        author: "Иванов Иван",
        isPersonal: false
    },
    {
        id: '20',
        text: 'Всем доброе утро',
        createdAt: new Date('2020-10-15T07:25:00'),
        author: "Петров Петр",
        isPersonal: false
    },
];

/*--------------------------------------------------------------------------------------------------------------------*/

function messagesModule() {
    return {
        getMessages: function (skip = 0, top = 10, filterConfig) {
            return messages.sort((a, b) => a.createdAt - b.createdAt)
                .slice(skip, skip + top)
                .filter(
                    message =>
                        !filterConfig || ( /*filter can be empty*/
                            (!filterConfig.author || message.author.indexOf(filterConfig.author) !== -1) &&
                            (!filterConfig.text || message.text.indexOf(filterConfig.text) !== -1) &&
                            (!filterConfig.dateFrom || message.createdAt >= filterConfig.dateFrom) &&
                            (!filterConfig.dateTo || message.createdAt <= filterConfig.dateTo)
                        )
                );
        },

        getMessage: function (id) {
            return messages.find(element => element.id === id);
        },

        validateMessage: function (msg) {
            let {id, text, createdAt, author, isPersonal, to} = msg;
            return (typeof id === 'string') &&
                (typeof text === 'string') &&
                (typeof author === 'string') &&
                (typeof isPersonal === 'boolean') &&
                (createdAt instanceof Date) && (
                    (isPersonal && (typeof to === 'string')) ||
                    (!isPersonal && !to)
                )/*both parameters (isPersonal & to) should exist in personal message*/
        },

        addMessage: function (msg) {
            let isValid = this.validateMessage(msg);
            if (isValid) {
                if (messages.find(element => element.id === msg.id)) {
                    return false/*id is unique!*/
                }
                messages.push(msg);
            }
            return isValid;
        },

        editMessage: function (id, msg) {
            let index = messages.findIndex(element => element.id === id);
            if (index < 0) {
                return false;
            }
            let edited = Object.assign({}, messages[index]);
            edited.createdAt = messages[index].createdAt

            let {text, isPersonal, to} = msg;
            if (text) {
                edited.text=text;
            }
            if (isPersonal) {
                edited.isPersonal=isPersonal;
            }
            if (to) {
                edited.to=to;
            }
            /*only isPersonal, to & text can be changed*/

            let isValid = this.validateMessage(edited);
            if (isValid)
                messages[index] = edited
            return isValid;
        },

        removeMessage: function (id) {
            let index = messages.findIndex(element => element.id === id);
            if (index < 0) {
                return false;
            }
            messages.splice(index, 1);
            return true;
        }

    }
}

/*--------------------------------------------------------------------------------------------------------------------*/

mM = messagesModule();

console.log('-----getting messages-----');

console.log(mM.getMessages());
console.log(mM.getMessages(10, 5));
console.log(mM.getMessages(0, 3,
    {
        text: 'Привет',
        dateFrom: new Date('2020-10-12T12:00:00'),
        dateTo: new Date('2020-10-12T15:00:00')
    }));
console.log(mM.getMessages(0, 20,
    {text: 'Привет', author: 'Иванов Иван'}));

console.log(mM.getMessages(10, 10,
    {author: 'Иванов Иван'}));

console.log(mM.getMessages(0, 3,
    {
        dateFrom: new Date('2020-10-21T12:00:00')
    }));/*empty, dateFrom is too late*/

console.log('-----getting one message-----');
console.log(mM.getMessage('1'));
console.log(mM.getMessage('6'));
console.log(mM.getMessage('25'));/*undefined, no message with this id*/

console.log('-----validation-----');

console.log(mM.validateMessage({
    id: 1,
    text: {},
    createdAt: new Date('2020-10-12T12:00:00'),
    author: 'Иванов Иван',
    isPersonal: true,
    to: 'Петров Петр'
}));/*false, wrong types*/

console.log(mM.validateMessage({
    id: '1',
    text: 'Text',
    createdAt: new Date('2020-10-12T12:00:00'),
    author: 'Иванов Иван',
    isPersonal: false,
    to: 'Петров Петр'/*false, not personal, but has 'to'*/
}));

console.log(mM.validateMessage({
    id: '1',
    text: 'Text',
    createdAt: new Date('2020-10-12T12:00:00'),
    author: 'Иванов Иван',
    isPersonal: true
}));/*false, personal, but hasn't 'to'*/

console.log(mM.validateMessage({
    id: '1',
    text: 'Text',
    createdAt: new Date('2020-10-12T12:00:00'),
    author: 'Иванов Иван',
    isPersonal: false
}));/*true*/

console.log(mM.validateMessage({
    id: '1',
    text: 'Text',
    createdAt: new Date('2020-10-12T12:00:00'),
    author: 'Иванов Иван',
    isPersonal: true,
    to: 'Петров Петр'
}));/*true*/

console.log('-----adding-----');

console.log(mM.addMessage({
    id: 1,
    text: {},
    createdAt: new Date('2020-10-12T12:00:00'),
    author: 'Иванов Иван',
    isPersonal: true,
    to: 'Петров Петр'
}));/*false, wrong types*/
console.log(messages.length);

console.log(mM.addMessage({
    id: '1',
    text: 'Text',
    createdAt: new Date('2020-10-12T12:00:00'),
    author: 'Иванов Иван',
    isPersonal: true,
    to: 'Петров Петр'
}));/*false, id is not unique*/
console.log(messages.length);

console.log(mM.addMessage({
    id: '21',
    text: 'Text',
    createdAt: new Date('2020-10-12T12:00:00'),
    author: 'Иванов Иван',
    isPersonal: true,
    to: 'Петров Петр'
}));/*true*/
console.log(messages.length);

console.log('-----editing-----');

console.log(mM.editMessage('1', {text: 'Some text'}));
console.log(messages.find(element => element.id === '1'));/*true*/

console.log(mM.editMessage('2', {text: 'Some text', to: 'Васильев Василий'}));
console.log(messages.find(element => element.id === '2'));/*false, invalide message*/

console.log(mM.editMessage('9', {text: 'Another text', to: 'Иванов Иван'}));
console.log(messages.find(element => element.id === '9'));/*true*/

console.log('-----removing-----');

console.log(mM.removeMessage('21'));
console.log(messages.length);/*true*/

console.log(mM.removeMessage('30'));
console.log(messages.length);/*false, wrong id*/

console.log(mM.removeMessage('1'));
console.log(messages.length);/*true*/












