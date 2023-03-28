const mongoose = require('mongoose')
const dotenv = require('dotenv');

dotenv.config({path:'./config.env'});
const app = require('./app');

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);
// console.log(DB);

mongoose.set('strictQuery', true);
mongoose.connect(DB,{
    useNewUrlParser: true,
}).then(con=>{
    console.log("DB CONNECTION SUCCESSFULL");
});

const port = process.env.PORT || 3001;

app.listen(port,()=>{
    console.log("Server running on port",port);
})