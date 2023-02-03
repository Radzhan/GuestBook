import express from "express";
import mysqlDb from "./mysqlDb";
import categoryRouter from "./router/category";
import itemRouter from "./router/item";
import locationRouter from "./router/location";

const app = express();
const port = 8000;

app.use(express.json());
app.use('/items', itemRouter);
app.use('/categories', categoryRouter);
app.use('/locations', locationRouter);

const run = async () => {
    await mysqlDb.init();
    
    app.listen(port, () => {
        console.log('we are live on ' + port);
    });
};

run().catch(console.error);