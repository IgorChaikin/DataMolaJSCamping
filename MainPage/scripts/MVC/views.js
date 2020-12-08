class MessagesView {
    constructor(id) {
        this._id = id;
    }

    display(msgs, user) {
        const messageList = document.getElementById(this._id);
        messageList.innerHTML = msgs.map((item) => `<div id = "${item.id}"
                class="${item.author === user ? 'out' : 'in'}-${item.isPersonal ? 'personal-' : ''}message-body">
                <!-- message body style defining in depend on author and isPersonal properties -->
                    <h6 class="message-header">
                        ${item.author}
                    </h6>
                    
                    <article class="message-text">
                        ${item.isPersonal ? `<span 
                            class="${item.author === user ? 'out' : 'in'}-appeal">${item.to},
                            </span>` : ''
                        }
                <!-- personal message appeal style defining in depend on compare 
                of author property and current user -->
                        
                        ${item.text}
                    </article>
                    
                    ${item.author === user
                    ? `<button class="redact-button" id="edit-id">
                            <i class="fa fa-pencil" aria-hidden="true"></i>
                       </button>
                       <button class="delete-button" id="delete-id">
                            <i class="fa fa-trash" aria-hidden="true"></i>
                       </button>` : ''}
                    <!-- delete and edit buttons enable only for author of this message -->
                    
                    <p class="date-text">
                        
                        ${new Date(item.createdAt).getFullYear()}-${
                        (new Date(item.createdAt).getMonth() + 1).toString().padStart(2, '0')}-${
                        new Date(item.createdAt).getDate().toString().padStart(2, '0')} ${
                        new Date(item.createdAt).getHours().toString().padStart(2, '0')}:${
                        new Date(item.createdAt).getMinutes().toString().padStart(2, '0')}
                        
                    </p>
                </div>`).reverse().join('\n');
    }
}

class HeaderView {
    constructor(id) {
        this._id = id;
    }

    display(userName) {
        const headerUserName = document.getElementById(this._id);
        headerUserName.innerText = userName;
    }
}

class ActiveUsersView {
    constructor(id) {
        this._id = id;
    }

    display(users, current) {
        const activeUsersList = document.getElementById(this._id);
        const result = [...users];
        const index = result.findIndex((el) => el === current);
        if (index > 0) {
            result.splice(index, 1);
        }
        activeUsersList.innerHTML = result.map((item) => `<button class="user-point">${item}</button>`).join('\n');
    }
}
