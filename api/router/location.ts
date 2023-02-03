import express from 'express';
import { OkPacket } from 'mysql2';
import mysqlDb from '../mysqlDb';
import { LocationAndCategori } from '../types';

const locationRouter = express.Router();

locationRouter.post('/', async (req , res) => {
    if (!req.body.name) {
        return res.status(400).send({eror: 'Name are required'});
    }

    const locationData = {
        name: req.body.name, 
        description: req.body.description,
    };

    const connection = mysqlDb.getConnection();
    const result = await connection.query('INSERT INTO location (name, description) VALUES (? ,?)'
    , [locationData.name,locationData.description]
    );

    const info = result[0] as OkPacket;

    res.send({
        ...locationData,
        id: info.insertId,
    });
});

locationRouter.get('/', async (req, res) => {
    const connection = mysqlDb.getConnection();
    const result = await connection.query('SELECT id , name FROM location');
    const item = result[0];
    res.send(item);
})

locationRouter.get('/:id', async (req, res) => {
    const connection = mysqlDb.getConnection();
    const result = await connection.query('select * FROM location WHERE id = ?', [req.params.id] )
    const items = result[0] as LocationAndCategori[];
    const item = items[0];
    if (!item) {
        return res.status(404).send({error: 'Not found'})
    }
    res.send(item)
})

export default locationRouter;