const exp= require('express')
const app= exp();
const cors = require('cors');
app.use(cors())
app.use(exp.json());
require('dotenv').config()//process.env.SECRET_KEY

//import MongoClient
const {MongoClient}=require('mongodb')
let mClient=new MongoClient(process.env.DB_URL)
const port = process.env.PORT || 4000
//connect mongoDB server
mClient.connect()
.then((connectionObj)=>{

    //connect to a database(servicefinder)
    const servicefinderdb=connectionObj.db('servicefinder')
    //connection to a collection
    const customerCollection=servicefinderdb.collection('customer')
    const serviceProviderCollection=servicefinderdb.collection('serviceprovider')

    app.set('customerCollection',customerCollection)
    app.set('serviceProviderCollection',serviceProviderCollection)
    
    console.log("DB connection success")

    app.listen(port,()=>console.log("http server started on port 4000"))
}
)
.catch(err=>console.log("Error in DB connection",err))

const customerApp = require("./API/customerApi");
const serviceproviderApp = require("./API/serviceProviderApi");

app.use("/customer-api",customerApp);

app.use("/serviceprovider-api", serviceproviderApp);

