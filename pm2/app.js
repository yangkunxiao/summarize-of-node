const express = require('express')
const app = express()

app.get('/', (req, res) => {
    console.error("故意设置的error");
    res.send('Hello 2!')
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))