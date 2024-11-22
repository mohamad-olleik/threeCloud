import express from 'express'
import {config} from 'dotenv'
import {cors} from 'cors'

import { createStudentDocument,removeStudentDocument,getAllStudents,getSingleStudent } from './src/studentCrud.js'
config();


const app=express();
app.use(express.json());

app.use(cors())

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
     await removeStudentDocument(_uri,req.body._id)


    res.send('okay')

})

app.get('/student',async (req,res)=>{
    let data= await getAllStudents(_uri);
    console.log(data)



   res.send(data)

})

app.get('/getSingleStudent',async (req,res)=>{
    let data=await getSingleStudent(_uri,req.body._id);
    console.log(data);
    res.send(data)

})

app.listen(port,()=>{
    console.log(`server is running on port ${port}`)

})