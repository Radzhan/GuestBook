import express from 'express';
import { OkPacket } from 'mysql2';
import mysqlDb from '../mysqlDb';
import { LocationAndCategori } from '../types';

const categoryRouter = express.Router();

categoryRouter.post('/', async (req , res) => {
    if (!req.body.name) {
        console.log(req.body.name)
        return res.status(400).send({eror: 'Name are required'});
    }

    const categoryData = {
        name: req.body.name, 
        description: req.body.description,
    };

    const connection = mysqlDb.getConnection();
    const result = await connection.query('INSERT INTO categories (name , description) VALUES (? ,?)'
    , [req.body.name, req.body.description]
    );

    const info = result[0] as OkPacket;

    res.send({
        ...categoryData,
        id: info.insertId,
    });
});

categoryRouter.get('/', async (req, res) => {
    const connection = mysqlDb.getConnection();
    const result = await connection.query('SELECT id , name FROM categories');
    const item = result[0];
    res.send(item);
})

categoryRouter.get('/:id', async (req, res) => {
    const connection = mysqlDb.getConnection();
    const result = await connection.query('select * FROM categories WHERE id = ?', [req.params.id] )
    const items = result[0] as LocationAndCategori[];
    const item = items[0];
    if (!item) {
        return res.status(404).send({error: 'Not found'})
    }
    res.send(item)
})

export default categoryRouter;