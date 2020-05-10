# Домашняя работа
## API
1. Создать маршрут получения пользователя по email
2. Создать маршрут обновления данных пользователя

## Front-end
1. Добавить метод получения залогиненого пользователя по email. Его нужно вызывать после успешного логина а также после заполнения пользователем информации на странице FirstLoginSettings
2. Создать страницу Settings. На данной странице должна быть форма редактирования информации о пользователе а так же форма для изменения пароля пользователем. Для изменения пароля пользователь должен ввести старый пароль и новый пароль. Что бы проверить старый пароль пригодится данный метод [Firebase](https://firebase.google.com/docs/reference/js/firebase.auth.EmailAuthProvider#methods_1), для изменения пароля понадобится данный метод [Firebase](https://firebase.google.com/docs/auth/web/manage-users?hl=ru#set_a_users_password)
3. Добавить нотификации об успешном обновлении информации пользователем.

# chatmarkdow

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
