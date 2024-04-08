import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import pg from "pg";
import env from "dotenv";
import bcrypt from "bcrypt";

const app = express();
const port = 3000;
const saltRounds = 10;
env.config();

app.use(bodyParser.json());
app.use(cors());


const db = new pg.Client({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
  });
  db.connect();

app.post('/api/register', async (req, res) => {
  try {
    const {name , email , password} = req.body;
    const hashedPassword = await bcrypt.hash(password , saltRounds);
    const result = await db.query("INSERT INTO users (name , email , password) VALUES ($1 , $2 , $3)" , [name , email , hashedPassword]);
    console.log("Data Inserted Successfully...");
    res.send('Signup successful!');
  } catch (error) {
    console.log(error);
  }

});

app.post('/api/login' , async(req , res)=>{
    try {
        const {email , password} = req.body;
        const result = await db.query("SELECT * FROM users WHERE email = $1 ", [
            email,
          ]);
          if (result.rows.length > 0) {
            const user = result.rows[0];
            const storedHashedPassword = user.password;
            bcrypt.compare(password, storedHashedPassword, (err, valid) => {
              if (err) {
                console.error("Error comparing passwords:", err);
                return cb(err);
              } else {
                if (valid) {
                    res.send('Login successful!');
                }else{
                    res.send('Invalid Credintials..')
                }
              }
            });
        }
    } catch (error) {
        
    }
})

app.listen(port , ()=>{
    console.log(`Backend server is running on port ${port}`);
})