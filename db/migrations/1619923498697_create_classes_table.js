module.exports = {
        "up": "CREATE TABLE classroom_classes (id INT NOT NULL AUTO_INCREMENT, UNIQUE KEY id (id), \
        class_name TEXT, user_created INT, users JSON, content JSON)",
}