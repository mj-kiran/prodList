import express from 'express'


const app = express()

app.listen(3300, () => {
    console.log('server started at 3300');
})