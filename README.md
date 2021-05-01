# Node-Watcher
# Express.js-сервер для мониторинга нод

Версия проекта: v1.0.0

## Установка и запуск
Клонируйте проект, затем:
`npm i && npm run watch`

В случае успеха в терминале появится надпись `The Watcher is online and is running on port 3000`
Порт для запуска можно поменять в файле `server.js`: 
`const { PORT = 3000 } = process.env`

## Как использовать?
1) Вручную отправлять GET-запрос на `http://localhost:3000/watch` через Postman

2) Открыть в новой вкладке терминала файл этого проекта `/utils/starter.js`
и запустить его командой `node started.js`

Скрипт будет самостоятельно обращяться к нодам раз в 20 минут (по умолчанию) и выводить все инфу в терминал в виде:

```
// самая важная нода 65.21.106.155:37071 работает
Main node is online and working

//краткий отчет о состоянии всех нод (включая важную)

Nodes status:  {
  resent_update: 'Sat May 01 2021 16:32:40 GMT+0700 (Красноярск, стандартное время)',
  status: 'All nodes are online',
  nodes_offline: null,
  is_same_hash: 'All nodes have the same hash',
  different_hashes: null,
  is_same_height: 'All nodes have the same height',
  different_heights: null
}
```

Если где-то не сходятся хэши или высота, это убдет подробно отображено в полях объекта выше.
Если какие-то ноды упали, это тоже будет отображено.

Если главная нода `65.21.106.155:37071` упала, в терминале появится уведомление:

```
========
URGENT! THE MAIN NODE HAS GONE OFFLINE! IT HAPPENED ON: Sat May 01 2021 16:32:40 GMT+0700 (Красноярск, стандартное время)
========
```

Пример отчета, где у неготорых нод разошлись хэши и высота:

```
{
    "resent_update": "Sat May 01 2021 17:13:16 GMT+0700 (Красноярск, стандартное время)",
    "status": "All nodes are online",
    "nodes_offline": null,
    "is_same_hash": "Some nodes have different hashes",
    "hash_value": "Hash is different among modes",
    "different_hashes": {
        "3afe49bb2463b30510dd24aba24172330f4b6b4168fc006457ac21e07828b1fa": [
            "65.21.106.155:37071"
        ],
        "d81f5673ae50dc74ed6102041e1fa694d9b60885d0ea0dd55233ecb25aeac40d": [
            "216.108.231.40:38081",
            "185.148.147.15:38081",
            "64.235.35.173:38081",
            "64.235.45.119:38081"
        ]
    },
    "is_same_height": "Nodes have different heights now",
    "height_value": "Nodes have different heights nows",
    "different_heights": {
        "1157233": [
            "65.21.106.155:37071"
        ],
        "1157234": [
            "216.108.231.40:38081",
            "185.148.147.15:38081",
            "64.235.35.173:38081",
            "64.235.45.119:38081"
        ]
    }
}
```

## Как добавить/удалить ноды для отслеживания?
`/utils/params`, 

Массив `node_routes`

## Структура сервера
Папка `middlewares`: есть 1 файл `pingNodes.js`, скрипт которого обращается ко всем нодам, собирает данные и передает запрос дальше

Папка `utils`:
`functions.js` — вспомогательные функции

`params.js` — различные данные, необходимые для работы сервера

`starter.js` — скрип для интервальной проверик нод

Папка 'src':
`App.js` — описание основных параметров сервера

`Watcher.js` — Логика работы сервера

Файл `server.js` — входная точка приложения. Инициализация экземпляра сервера и его запуск

## API

`GET http://localhost:3000/watch`
Проверяет все ноды и возвращает объект-отчет

`GET http://localhost:3000/watch/main`
Проверяет важную ноду 65.21.106.155:37071 и сообщает онлайн она или нет
