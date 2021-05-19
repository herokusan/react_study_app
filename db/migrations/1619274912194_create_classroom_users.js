module.exports = {
    "up": "CREATE TABLE classroom_users (id INT NOT NULL AUTO_INCREMENT, UNIQUE KEY id (id), \
    email TEXT, password TEXT, name TEXT, surname TEXT, patronymic TEXT, phone TEXT, age INT, city INT, \
    sex TEXT)",
}