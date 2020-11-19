function setCurrentUser(user) {
    const result = userList.users.indexOf(user) !== -1;

    /* only existing user can be selected as a current! */

    if (result) {
        messagesList.user = user;
        headerView.display(user);
    }
    return result;
}

function addMessage(msg) {
    const result = messagesList.add(msg);
    const msgs = messagesList.getPage(0, messagesList.length).slice(-10);

    /* only 10 or less last messages */

    const user = messagesList.user;
    messagesView.display(msgs, user);
    return result;
}

function editMessage(id, msg) {
    const result = messagesList.edit(id, msg);
    const msgs = messagesList.getPage(0, messagesList.length).slice(-10);

    /* only 10 or less last messages */

    const user = messagesList.user;
    messagesView.display(msgs, user);
    return result;
}

function removeMessage(id) {
    const result = messagesList.remove(id);
    const msgs = messagesList.getPage(0, messagesList.length).slice(-10);

    /* only 10 or less last messages */

    const user = messagesList.user;
    messagesView.display(msgs, user);
    return result;
}

function showMessages(skip, top, filterConfig) {
    const msgs = messagesList.getPage(skip, top, filterConfig);
    const user = messagesList.user;
    messagesView.display(msgs, user);
}

function showActiveUsers() {
    const users = userList.activeUsers;
    activeUsersView.display(users);
}
