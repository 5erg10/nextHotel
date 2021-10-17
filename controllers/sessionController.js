const sessions = {};
let usersLength = 0;

function addNewUser(data) {
  data.timestamp = Date.now();
  sessions[data.userName] = data;
};

function removeUser(data){
  delete sessions[data.userName];
};

function recoverUsers(){
  return sessions;
};

function refreshUserPosition(data) {
  if(sessions[data.userName]) {
    sessions[data.userName].position = data.position;
  }
}

function expireSessions(io) {
  const keys = Object.keys(sessions);

  if (keys.length !== usersLength) {
    usersLength = keys.length;
    console.log('Connected users: ');
    console.log('\t' + Object.keys(sessions).join(' '));
  }
  setTimeout(() => expireSessions(io), 3000);
}

const list = () => Object.keys(sessions);

module.exports = {
  addNewUser,
  removeUser,
  expireSessions,
  refreshUserPosition,
  list,
  recoverUsers
}