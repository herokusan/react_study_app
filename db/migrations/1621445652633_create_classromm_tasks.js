module.exports = {
    "up": "CREATE TABLE classroom_tasks (id INT NOT NULL AUTO_INCREMENT, UNIQUE KEY id (id), \
    class_id INTEGER, tasks VARCHAR(45), user_id INTEGER, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, \
    deadline DATE, response BLOB, task_id INTEGER)",
}