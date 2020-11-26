/* ------------------------------Filling of empty local storage----------------------------*/

if (!localStorage.getItem('activeUsers')) {
        localStorage.setItem('activeUsers', JSON.stringify([
                'Иванов Иван',
                'Петров Петр',
                'Васильев Василий']));
}

if (!localStorage.getItem('users')) {
        localStorage.setItem('users', JSON.stringify([
                    'Иванов Иван',
                    'Петров Петр',
                    'Васильев Василий',
                    'Сидоров Сидр']));
}

if (!localStorage.getItem('currentUser')) {
        localStorage.setItem('currentUser', JSON.stringify('Петров Петр'));
}
/* This should be released by authentication page.. sorry, next time :) */

const msgs = [
        {
                id: '0',
                text: 'Привет!',
                createdAt: '2020-10-12T12:00:00',
                author: 'Иванов Иван',
                isPersonal: true,
                to: 'Петров Петр',
        },
        {
                id: '1',
                text: 'Как дела?',
                createdAt: '2020-10-12T12:30:00',
                author: 'Иванов Иван',
                isPersonal: false,
        },
        {
                id: '2',
                text: 'Привет',
                createdAt: '2020-10-12T13:00:00',
                author: 'Петров Петр',
                isPersonal: true,
                to: 'Иванов Иван',
        },
        {
                id: '3',
                text: 'Нормально',
                createdAt: '2020-10-12T13:10:00',
                author: 'Петров Петр',
                isPersonal: false,
        },
        {
                id: '4',
                text: 'А у тебя как?',
                createdAt: '2020-10-12T14:00:00',
                author: 'Петров Петр',
                isPersonal: false,
        },
        {
                id: '5',
                text: 'Хорошо)',
                createdAt: '2020-10-12T14:00:00',
                author: 'Иванов Иван',
                isPersonal: false,
        },
        {
                id: '6',
                text: 'Спасибо, что спросил',
                createdAt: '2020-10-12T14:50:00',
                author: 'Иванов Иван',
                isPersonal: false,
        },
        {
                id: '7',
                text: 'Сегодня хорошая погода',
                createdAt: '2020-10-12T15:00:00',
                author: 'Петров Петр',
                isPersonal: true,
                to: 'Иванов Иван',
        },
        {
                id: '8',
                text: 'Не знаю, не знаю',
                createdAt: '2020-10-12T15:10:00',
                author: 'Васильев Василий',
                isPersonal: true,
                to: 'Петров Петр',
        },
        {
                id: '9',
                text: 'Передавали дожди',
                createdAt: '2020-10-12T15:30:00',
                author: 'Васильев Василий',
                isPersonal: false,
        },
        {
                id: '10',
                text: 'Я прогноз смотрел.',
                createdAt: '2020-10-12T15:40:00',
                author: 'Васильев Василий',
                isPersonal: false,
        },
        {
                id: '11',
                text: 'О, а вот и ты! Привет!',
                createdAt: '2020-10-14T00:40:00',
                author: 'Иванов Иван',
                isPersonal: true,
                to: 'Васильев Василий',
        },
        {
                id: '12',
                text: 'Доброго времени суток',
                createdAt: '2020-10-14T01:40:00',
                author: 'Васильев Василий',
                isPersonal: true,
                to: 'Иванов Иван',
        },
        {
                id: '13',
                text: 'Что',
                createdAt: '2020-10-14T02:40:00',
                author: 'Васильев Василий',
                isPersonal: false,
        },
        {
                id: '14',
                text: 'Делаешь',
                createdAt: '2020-10-14T02:40:00',
                author: 'Васильев Василий',
                isPersonal: false,
        },
        {
                id: '15',
                text: 'Так поздно',
                createdAt: '2020-10-14T02:41:00',
                author: 'Васильев Василий',
                isPersonal: false,
        },
        {
                id: '16',
                text: 'В этом чате?)',
                createdAt: '2020-10-14T02:41:00',
                author: 'Васильев Василий',
                isPersonal: false,
        },
        {
                id: '17',
                text: 'Да так',
                createdAt: '2020-10-14T03:14:00',
                author: 'Иванов Иван',
                isPersonal: true,
                to: 'Васильев Василий',
        },
        {
                id: '18',
                text: 'Не спиться что-то',
                createdAt: '2020-10-14T03:14:00',
                author: 'Иванов Иван',
                isPersonal: false,
        },
        {
                id: '19',
                text: 'Всем доброе утро',
                createdAt: '2020-10-15T07:25:00',
                author: 'Петров Петр',
                isPersonal: false,
        },
];

if (!localStorage.getItem('msgs')) {
        localStorage.setItem('msgs', JSON.stringify(msgs));
}
localStorage.setItem('currentUser', JSON.stringify('Петров Петр'));
