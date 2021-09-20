# Steps to reproduce
1. Install the project
2. Run npm start
3. Send an invalid query to the initialized server
```sh
curl --location --request POST 'http://localhost:4000/graphql' \
--header 'Content-Type: application/json' \
--data-raw '{"query":"query ($x: Int!, $y: Int!) {\n    add (x: $x, y: $y)\n}","variables":{"x":1}}'
```