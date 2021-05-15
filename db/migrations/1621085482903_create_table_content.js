module.exports = {
    "up": "CREATE TABLE classroom_content (id INT NOT NULL AUTO_INCREMENT, UNIQUE KEY id (id), \
    class_id INTEGER, content VARCHAR(45), user_id INTEGER)",
}