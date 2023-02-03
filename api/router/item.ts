import express from 'express';
import { OkPacket } from 'mysql2';
import { imagesUpload } from "../multer";
import mysqlDb from '../mysqlDb';
import { Item } from '../types';

const itemRouter = express.Router();

itemRouter.post('/', imagesUpload.single('image'), async (req, res) => {
    if (!req.body.name || !req.body.category_id || !req.body.location_id) {
        return res.status(400).send({ eror: 'name , category_id and location_id are reqired' });
    }

    const itemData = {
        name: req.body.name,
        category_id: req.body.category_id,
        location_id: req.body.location_id,
        description: req.body.description,
        image: req.file ? req.file.filename : null,
    };

    const connection = mysqlDb.getConnection();
    const result = await connection.query('INSERT INTO object (name , category_id, location_id, description, image) VALUES (? ,? , ?,? ,?)'
        , [itemData.name, itemData.category_id, itemData.location_id, itemData.description, itemData.image]
    );


    const info = result[0] as OkPacket;

    res.send({
        ...itemData,
        id: info.insertId,
    });
});
itemRouter.get('/', async (req, res) => {
    const connection = mysqlDb.getConnection();
    const result = await connection.query('SELECT id , name , category_id , location_id FROM object');
    const item = result[0];
    res.send(item);
})

itemRouter.get('/:id', async (req, res) => {
    const connection = mysqlDb.getConnection();
    const result = await connection.query('select * FROM object WHERE id = ?', [req.params.id])
    const items = result[0] as Item[];
    const item = items[0];
    if (!item) {
        return res.status(404).send({ error: 'Not found' })
    }
    res.send(item)
})

export default itemRouter;