/* -----------------------------------Global values-----------------------------------*/
let pageCount = 10;
let target = null;
let editId = null;
/* -----------------------------------Model objects-----------------------------------*/
const messageList = new MessageList();
messageList.user = JSON.parse(localStorage.getItem('currentUser') ?? '');
messageList.addAll(JSON.parse(localStorage.getItem('msgs') ?? '[]')
    .map((msg) => new Message(msg.id, msg.text, msg.author, msg.createdAt, msg.to)));
const userList = new UserList(JSON.parse(localStorage.getItem('users')),
    JSON.parse(localStorage.getItem('activeUsers')));
/* -----------------------------------View objects-----------------------------------*/
const messagesView = new MessagesView('messages-list-id');
const headerView = new HeaderView('header-id');
const activeUsersView = new ActiveUsersView('active-users-list-id');
/* -----------------------------------DOM components-----------------------------------*/
const usersList = document.getElementById('active-users-list-id');

const loadButton = document.getElementById('load-button-id');
const messages = document.getElementById('messages-list-id');
const sendForm = document.getElementById('send-form-id');

const filters = document.getElementById('filters-id');

const nameButton = document.getElementById('name-button-id');
const dateButton = document.getElementById('date-button-id');
const contentButton = document.getElementById('content-button-id');

const name = document.getElementById('name');
const date = document.getElementById('date');
const content = document.getElementById('content');

/* -----------------------------------Get page controllers-----------------------------------*/
function page(count = 10) {
    pageCount = count;
    const filterConfig = {};
    if (date.value !== '') {
        filterConfig.dateFrom = new Date(`${date.value}T00:00:00`);
        filterConfig.dateTo = new Date(`${date.value}T23:59:59`);
    }
    if (name.value.trim() !== '') {
        filterConfig.author = name.value.trim();
    }
    if (content.value.trim() !== '') {
        filterConfig.text = content.value.trim();
    }
    const msgs = messageList.getPage(pageCount, filterConfig);
    messagesView.display(msgs, messageList.user);
    loadButton.hidden = pageCount > messageList.getPage(messageList.length, filterConfig).length;
}

function loadButtonController(event) {
    if (event.target.closest('button')) {
        pageCount += 10;
        page(pageCount);
    } else {
        event.stopPropagation();
    }
}

function filterChangeController(event) {
    if (event.target.closest('input')) {
        page();
    } else {
        event.stopPropagation();
    }
}

function deleteNameController(event) {
    if (event.target.closest('button')) {
        name.value = '';
        page();
    } else {
        event.stopPropagation();
    }
}

function deleteDateController(event) {
    if (event.target.closest('button')) {
        date.value = '';
        page();
    } else {
        event.stopPropagation();
    }
}

function deleteContentController(event) {
    if (event.target.closest('button')) {
        content.value = '';
        page();
    } else {
        event.stopPropagation();
    }
}

/* -----------------------------------Edit messages controllers-----------------------------------*/
function selectUser(event) {
    if (event.target.closest('button')) {
        for (el of event.target.parentElement.querySelectorAll('button')) {
            el.classList.remove('selected');
        }
        if (event.target.innerText === target) {
            target = null;
            event.target.classList.remove('selected');
        } else {
            target = event.target.innerText;
            event.target.classList.add('selected');
        }
    } else {
        event.stopPropagation();
    }
}

function send(event) {
    const textField = event.target.querySelector('input');
    event.preventDefault();
    if (editId === null && textField.value !== '') {
        messageList.add(
            {
                text: textField.value,
                to: target,
            },
        );
    } else {
        messageList.edit(editId, { text: textField.value });
        editId = null;
    }
    localStorage.setItem('msgs', messageList.toJSON());
    textField.value = '';
    const msgs = messageList.getPage(pageCount);
    messagesView.display(msgs, messageList.user);
}

function editListController(event) {
    if (event.target.closest('button')) {

        const parentId = event.target.tagName === 'BUTTON'
            ? event.target.parentElement.id : event.target.parentElement.parentElement.id;
        const thisId = event.target.tagName === 'BUTTON'
            ? event.target.id : event.target.parentElement.id;
        /* attempt to fix bug with i-tag (ico) */

        switch (thisId) {
            case 'delete-id':
                messageList.remove(parentId);
                localStorage.setItem('msgs', messageList.toJSON());
                messagesView.display(messageList.getPage(pageCount), messageList.user);
                break;
            case 'edit-id':
                sendForm.querySelector('input').value = messageList.get(parentId).text;
                editId = parentId;
                break;
            default:
                break;
        }
    } else {
        event.stopPropagation();
    }
}

loadButton.addEventListener('click', loadButtonController);
messages.addEventListener('click', editListController);
sendForm.addEventListener('submit', send);

filters.addEventListener('input', filterChangeController);
nameButton.addEventListener('click', deleteNameController);
dateButton.addEventListener('click', deleteDateController);
contentButton.addEventListener('click', deleteContentController);
usersList.addEventListener('click', selectUser);

/* -----------------------------------Begin state of screen-----------------------------------*/
activeUsersView.display(userList.activeUsers, messageList.user);
messagesView.display(messageList.getPage(), messageList.user);
headerView.display(messageList.user);
