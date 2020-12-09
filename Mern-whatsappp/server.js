// import all modules
import express from 'express'
import mongoose from 'mongoose'
import Messages from './dbMessages.js'
import Pusher from 'pusher'
import cors from 'cors'
// app config
const app = express()

// Step -1 for deployment
const port = process.env.PORT || 9000

const pusher = new Pusher({
    appId: "1117933",
    key: "6bfd56268944a925f8ef",
    secret: "ee909f203cdf9c10101c",
    cluster: "ap2",
    useTLS: true
  });

// middleware
app.use(express.json());
app.use(cors());

/*
app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader("Access-Control-Allow-Headers","*");
    next();
})*/



// db config
const connection_url = 'mongodb+srv://gopi:rOXePTfvXDxOSTg9@cluster0.ezoiu.mongodb.net/whatsappdb?retryWrites=true&w=majority'
// add process.env.MONGODB_URI
// Step -2 for deployment
mongoose.connect(process.env.MONGODB_URI || connection_url,{
    useCreateIndex:true,
    useNewUrlParser:true,
    useUnifiedTopology:true
})

const db = mongoose.connection // fro pusher
// for db connection
db.once('open', () => {
     console.log('db connected');

     const msgCollection = db.collection("messagecontents");
     const changeStream = msgCollection.watch();

     changeStream.on('change',(change)=>{
         console.log(change);


         // if functions
         if (change.operationType === 'insert'){
             const messageDetails = change.fullDocument;
             pusher.trigger('messages', 'inserted',{
                 name:messageDetails.name,
                 message:messageDetails.message,
                 timestamp:messageDetails.timestamp,
                 received:messageDetails.received
             });
         } else {
             console.log('error trigerring Pusher')
         }
     });
});
// 

// db password --- rOXePTfvXDxOSTg9----gopi |
//mongodb+srv://gopi:<password>@cluster0.ezoiu.mongodb.net/<dbname>?retryWrites=true&w=majority

//api routes
app.get('/' ,(req,res) => res.status(200).send('hello world'))


app.get('/messages/sync',(req,res)=>{
    Messages.find((err,data)=>{
        if (err){
            res.status(500).send(err)
        } else{
            res.status(200).send(data)
        }
    })
})
app.post('/messages/new',(req,res)=>{
    const dbMessage = req.body

    Messages.create(dbMessage,(err,data)=> {
        if(err){
            res.status(500).send(err)
        } else{
            res.status(201).send()
        }
    })
})

// Step-3 for deployment

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('Frontend/whatsappp-clone-app/build'))
}



// listen
app.listen(port,()=> console.log(`Listning on the port : ${port}`))