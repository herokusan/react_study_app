module.exports = {
    "up": "CREATE TABLE classroom_billing (id INT NOT NULL AUTO_INCREMENT, UNIQUE KEY id (id), \
    user_id INTEGER, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, \
    payed BOOLEAN, end_date DATETIME)",
}