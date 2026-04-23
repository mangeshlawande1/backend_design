import express from 'express';
import 'dotenv/config';
import logger from './logger.js';
import morgan from 'morgan';


const app = express()

const port = 3000;
app.use(express.json())

const morganFormat = ':method :url :status :response-time ms';

app.use(morgan(morganFormat, {
    stream: {
        write: (message) => {

            const logObject = {
                method: message.split(' ')[0],
                url: message.split(' ')[1],
                status: message.split(' ')[2],
                responseTime: message.split(' ')[3],
            };
            logger.info(logObject);
        }
    }
}));


let teaData = [];
let nextId = 1;

app.get('/', (req, res) => {
    console.log("GET")
    res.send("KO --> 200 ... ")
});

app.get('/jack', (req, res) => {
    res.send("call from jack sparrow ... ")
});

app.post('/teas', (req, res) => {
    
    logger.warn({
        msg: "Manual Warn Triggered",
        method: req.method,
        path: req.path
    });
    const { name, price } = req.body;
    const newTea = { id: nextId++, name, price }
    teaData.push(newTea);
    res.status(201).send(newTea);
});

app.get('/teas', (req, res) => {
    res.status(200).send(teaData);

})

app.get('/teas/:id', (req, res) => {
    const tea = teaData.find(t => t.id === parseInt(req.params.id))
    if (!tea) {
        return res.status(404).send("Tea not found !!")
    } else {
        res.status(200).send(tea)
    }
});

//update data
app.patch('/teas/:id', (req, res) => {
    const tea = teaData.find(t => t.id === parseInt(req.params.id));
    if (!tea) {
        return res.status(404).send("Tea not found !!")
    } else {
        const { name, price } = req.body;
        tea.name = name
        tea.price = price

        res.status(200).send(tea)
    }
});

// 204 --> deleted no content 
//delete tea 
// app.delete('/teas/:id', (req, res) => {
//     const index = teaData.findIndex(t => t.id === parseInt(req.params.id))

//     if (index === -1) {
//         return res.status(404).send("tea not found !!")
//     } else {
//         let tea = teaData.splice(index, 1)
//         return res.status(200).send(tea)
//     }

// });

app.delete('/teas/:id', (req, res) => {
    const teaId = parseInt(req.params.id);

    // Check if the tea exists first
    const teaExists = teaData.find(t => t.id === teaId);

    if (!teaExists) {
        return res.status(404).send("tea not found !!");
    }

    // Reassign teaData to a new array excluding the matching ID
    teaData = teaData.filter(t => t.id !== teaId);

    // Send back the tea that was removed
    return res.status(200).send(teaExists);
});


app.listen(port, () => {
    console.log(`server is running on port :${port}`);
});
