# Scytale pull request client

Entring inside the project folder and installing the dependencies
```sh
cd <project_name> && yarn install
```

Development
```sh
yarn start
```

Example CURL to add new pull request
```
curl --location --request POST 'localhost:5000/prs' \
--header 'Content-Type: application/json' \
--data-raw '{
    "number": 2,
    "title": "title1",
    "description": "desc1",
    "author": "Jhohn Snow",
    "status": "open",
    "labels": ["label1", "label2"]
}'
```
