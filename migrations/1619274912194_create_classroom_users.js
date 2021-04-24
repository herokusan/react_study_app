module.exports = {
    "up": "CREATE TABLE classroom_users (id INT NOT NULL, UNIQUE KEY id (id), \
    email TEXT, password INT, name TEXT, surname TEXT, patronymic TEXT, phone TEXT, age INT, city INT, \
    sex TEXT)",
}