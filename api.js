import express from 'express'
import {config} from 'dotenv'
import cors from 'cors'

import { createStudentDocument,removeStudentDocument,getAllStudents,getSingleStudent,updateStudentDocument } from './src/studentCrud.js'
config();


const app=express();
app.use(express.json());

const corsOptions = {
    origin: 'http://127.0.0.1:5500', // Replace with your frontend's origin
    methods: ['GET', 'POST', 'DELETE', 'PUT', 'OPTIONS'], // Allow specific methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allow specific headers
};

app.use(cors(corsOptions));



const _uri=process.env.DB_URI;
const port = process.env.PORT || 3030;

console.log(process.env.PORT)

// console.log(process.env.DB_URI)
// console.log(process.env.PORT)

app.get('/',(req,res)=>{
    res.send('Hii')

})

// app.get('/mhmd',(req,res)=>{
//     res.send('ok')

// })


app.post('/student',async (req,res)=>{
    // console.log(req.body);

    // res.send(req.body);
    await createStudentDocument(_uri,req.body)

    res.send('ok')
})

app.delete('/student',async (req,res)=>{

    // console.log(req.body)
    //  await removeStudentDocument(_uri,req.body)
    const id = req.query.id; // Access the ID from the query string
    if (!id) {
        return res.status(400).send('ID is required');
    }
    try {
        await removeStudentDocument(_uri, id);
        res.send('okay');
    } catch (error) {
        console.error("Error deleting student:", error);
        res.status(500).send('Failed to delete student');
    }


   

})

app.get('/student',async (req,res)=>{
    let data= await getAllStudents(_uri);
    console.log(data)



   res.send(data)

})

app.get('/getSingleStudent',async (req,res)=>{
    const id=req.query.id;
    // console.log(id)
    let data=await getSingleStudent(_uri,id);
    // console.log(data);
    res.send(data)

})

app.get('/updateStudent',async (req,res)=>{
    await updateStudentDocument(_uri,req.query.id,req.query.age);
    
    res.send('done')
})
app.listen(port,()=>{   
    console.log(`server is running on port ${port}`)

})