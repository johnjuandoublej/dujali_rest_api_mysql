import { Product, UnitProduct } from "./product.interface";
import { v4 as uuidv4 } from "uuid";
import mysql from "mysql";

const connection = mysql.createConnection({
host: "localhost",
user: "root",
password: "",
database: "productdb",
});

connection.connect((err) => {
if (err) {
console.error("Error connecting to MySQL:", err);
return;
}
console.log("Connected to MySQL database!");
});

export const findAll = async (): Promise<UnitProduct[]> => {
const query = "SELECT * FROM products";
return new Promise((resolve, reject) => {
connection.query(query, (error, results: UnitProduct[]) => {
if (error) {
reject(error);
} else {
resolve(results);
}
});
});
};

export const findOne = async (id: string): Promise<UnitProduct | null> => {
const query = "SELECT * FROM products WHERE id = ?";
return new Promise((resolve, reject) => {
connection.query(query, [id], (error, results: UnitProduct[]) => {
if (error) {
reject(error);
} else {
if (results.length === 0) {
resolve(null);
} else {
resolve(results[0]);
}
}
});
});
};

export const create = async (productInfo: Product): Promise<UnitProduct | null> => {
const id = uuidv4();
const { name, price, quantity, image } = productInfo;
const query = "INSERT INTO products (id, name, price, quantity, image) VALUES (?, ?, ?, ?, ?)";
const values = [id, name, price, quantity, image];
return new Promise((resolve, reject) => {
connection.query(query, values, (error) => {
if (error) {
reject(error);
} else {
resolve({ id, ...productInfo });
}
});
});
};

export const update = async (id: string, updateValues: Product): Promise<UnitProduct | null> => {
const { name, price, quantity, image } = updateValues;
const query = "UPDATE products SET name = ?, price = ?, quantity = ?, image = ? WHERE id = ?";
const values = [name, price, quantity, image, id];
return new Promise((resolve, reject) => {
connection.query(query, values, (error) => {
if (error) {
reject(error);
} else {
resolve({ id, ...updateValues });
}
});
});
};

export const remove = async (id: string): Promise<void> => {
const query = "DELETE FROM products WHERE id = ?";
return new Promise((resolve, reject) => {
connection.query(query, [id], (error) => {
if (error) {
reject(error);
} else {
resolve();
}
});
});
};

export default connection;
// import {Product, UnitProduct, Products} from "./product.interface";
// import { v4 as random} from "uuid"
// import fs from "fs"

// let products : Products = loadProducts()

// function loadProducts(): Products{
//     try{
//         const data = fs.readFileSync('./products.json', 'utf-8')
//         return JSON.parse(data)
//     }catch(error){
//         console.log(`Error ${error}`)
//         return {}
//     }
// }

// function saveProducts(){
//     try{
//         fs.writeFileSync('./products.json', JSON.stringify(products), 'utf-8')
//         console.log(`Products saved successfully`)
//     }catch(error){
//         console.log(`Error ${error}`)
//     }
// }

// export const findAll = async() : Promise<UnitProduct[]> => Object.values(products)

// export const findOne = async (id : string) : Promise<UnitProduct> => products[id]

// export const create = async (productInfo : Product) : Promise<null | UnitProduct> =>{

//     let id = random()

//     let product = await findOne(id)

//     while(product){
//         id = random()
//         await findOne(id)
//     }

//     products[id] = {
//         id : id,
//         ...productInfo
//     }

//     saveProducts()

//     return products[id]
// }

// export const update = async(id:string, updateValues : Product) : Promise <UnitProduct | null> => {
    
//     const product = await findOne(id)

//     if(!product){
//         return null
//     }

//     products[id] = {
//         id,
//         ...updateValues
//     }

//     saveProducts()

//     return products[id]
// }

// export const remove = async (id : string) : Promise <null | void > => {

//     const product = await findOne(id)

//     if(!product){
//         return null
//     }

//     delete products[id]

//     saveProducts()
// }