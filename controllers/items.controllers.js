import {sqlConnect, sql} from "../utils/sql.js"

export const getItems = async () => {
    const pool = await sqlConnect();
    const data = await pool.request().query('select * from items');
    console.log(data);
};

export const postItem = async (req, res) => {
    const pool = await sqlConnect();
    const data = await pool
        .request()
        .input("name", sql.VarChar, req.body.name)
        .input("price", sql.Float, req.body.price)
        .query("insert into items (name, price) values (@name, @price");
    // console.log(data.recordset);
    // res.json(data.recordset);
    res.status(200).json({ operation: true });
};