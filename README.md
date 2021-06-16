Привет, меня зовут Тарас, это приложение создано специально для дипломной работы, приложение для дистанционного обучения.

Для корректного запуска миграций, нужно создать базу данных с названием distance_learning!
Запуск проекта npm start

Создание миграций:
node Migration.js add migration MIGRATION NAME

Прописывать в MySQL при первом запуске: 
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'lytvynskyi'
Или не сработают миграции!



NodeJS versio: v16.1.0
NPM versoin: 7.11.2