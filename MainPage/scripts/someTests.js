setCurrentUser('Петров Петр');

setCurrentUser('Some User'); /* false, there is no this
user in userList.users and in userList.activeUsers */

showActiveUsers();
