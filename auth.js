// This is a mock authentication system. In a real application, this would be handled by a server.

let users = JSON.parse(localStorage.getItem('users')) || [];

function saveUsers() {
    localStorage.setItem('users', JSON.stringify(users));
}

function register(username, password) {
    if (users.find(user => user.username === username)) {
        return { success: false, message: 'Username already exists' };
    }
    const isAdmin = username === 'admin';
    users.push({ username, password, savedVideos: [], isAdmin });
    saveUsers();
    return { success: true };
}

function login(username, password) {
    const user = users.find(user => user.username === username && user.password === password);
    if (user) {
        localStorage.setItem('loggedInUser', username);
        return { success: true };
    }
    return { success: false, message: 'Invalid username or password' };
}

function logout() {
    localStorage.removeItem('loggedInUser');
}

function getLoggedInUser() {
    return localStorage.getItem('loggedInUser');
}
