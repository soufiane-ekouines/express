const express = require('express');
const dotenv = require('dotenv');

//load env vars

dotenv.config({ path: './config/config.env' });

const app = express();

app.get('/api/v1/bootcamps', (req, res) => {
    res.status(200).send({ success: true, message: 'show all bootcamps'  });
})

app.post('/api/v1/bootcamps', (req, res) => {
    res.status(200).send({ success: true, message: 'store bootcamps'  });
})


app.get('/api/v1/bootcamps/:id', (req, res) => {
    res.status(200).send({ success: true, message: 'show bootcamp by id '+req.params.id  });
})

app.put('/api/v1/bootcamps/:id', (req, res) => {
    res.status(200).send({ success: true, message: 'update bootcamps '+req.params.id  });
})

app.delete('/api/v1/bootcamps/:id', (req, res) => {
    res.status(200).send({ success: true, message: 'delete bootcamps '+req.params.id  });
})
const PORT = process.env.PORT || 5000


app.listen(PORT, console.log("server running in port " + process.env.NODE_ENV + "mode port " + PORT));