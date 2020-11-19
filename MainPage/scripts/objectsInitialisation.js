const userList = new UserList(
    ['Иванов Иван',
        'Петров Петр',
        'Васильев Василий',
        'Сидоров Сидр'],
    [
        'Иванов Иван',
        'Петров Петр',
        'Васильев Василий'],
);

const messagesList = new MessageList(
    [new Message('0', 'Привет!', userList.users[0], new Date('2020-10-12T12:00:00'), userList.users[1]),
        new Message('1', 'Как дела?', userList.users[0], new Date('2020-10-12T12:30:00')),
        new Message('2', 'Привет', userList.users[1], new Date('2020-10-12T13:00:00'), userList.users[0]),
        new Message('3', 'Нормально', userList.users[1], new Date('2020-10-12T13:10:00')),
        new Message('4', 'А у тебя как?', userList.users[1], new Date('2020-10-12T14:00:00')),
        new Message('5', 'Хорошо)', userList.users[0], new Date('2020-10-12T14:00:00')),
        new Message('6', 'Спасибо, что спросил', userList.users[0], new Date('2020-10-12T14:50:00')),
        new Message('7', 'Сегодня хорошая погода', userList.users[1], new Date('2020-10-12T15:00:00')),
        new Message('8', 'Не знаю, не знаю', userList.users[2], new Date('2020-10-12T15:10:00'), userList.users[1]),
        new Message('9', 'Передавали дожди', userList.users[2], new Date('2020-10-12T15:30:00')),
        new Message('10', 'Я прогноз смотрел.', userList.users[2], new Date('2020-10-12T15:40:00')),
        new Message('11', 'О, а вот и ты! Привет!', userList.users[0], new Date('2020-10-14T00:40:00'), userList.users[2]),
        new Message('12', 'Доброго времени суток', userList.users[2], new Date('2020-10-14T01:40:00'), userList.users[0]),
        new Message('13', 'Что', userList.users[2], new Date('2020-10-14T02:40:00')),
        new Message('14', 'Делаешь', userList.users[2], new Date('2020-10-14T02:40:00')),
        new Message('15', 'Так поздно', userList.users[2], new Date('2020-10-14T02:41:00')),
        new Message('16', 'В этом чате?)', userList.users[2], new Date('2020-10-14T02:41:00')),
        new Message('17', 'Да так', userList.users[0], new Date('2020-10-14T03:14:00'), userList.users[2]),
        new Message('18', 'Не спиться что-то', userList.users[0], new Date('2020-10-14T03:14:00')),
        new Message('19', 'Всем доброе утро', userList.users[1], new Date('2020-10-15T07:25:00'))],
);

const headerView = new HeaderView('header-id');
const messagesView = new MessagesView('messages-list-id');
const activeUsersView = new ActiveUsersView('active-users-list-id');
