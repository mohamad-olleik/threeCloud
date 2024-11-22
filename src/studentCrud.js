import {MongoClient} from 'mongodb'
import { v4 as uuidv4 } from 'uuid';

let mongoClient;

async function connectToDB(uri){
    try{
        mongoClient=new MongoClient(uri);
        await mongoClient.connect();
        console.log("connection to mongoDB succeeded...")
    
        return mongoClient;
    }
    catch(error){
        console.error("connection to mongoDB failed")
    }
   
}

export async function createStudentDocument(uri,studentObj){
    let mongoClient;
    try{
     mongoClient=await connectToDB(uri);
    let db=mongoClient.db('school');
    let collection=db.collection('students');
    studentObj._id=uuidv4();
    await collection.insertOne(studentObj);
    }
    catch(error){
        console.error("error while creating a student document")
    }
    finally{
        mongoClient.close();
        console.log("this line of code will be executed regardless if the precious succeeded or threw an error ")
    }
}

export async function removeStudentDocument(uri,_id){
    let mongoClient;
    try{
     mongoClient=await connectToDB(uri);
    let db=mongoClient.db('school');
    let collection=db.collection('students');
    await collection.deleteOne({_id});
    }
    catch(error){
        console.error("error while creating a student document")
    }
    finally{
        mongoClient.close();
        console.log("this line of code will be executed regardless if the precious succeeded or threw an error ")
    }
}

export async function getAllStudents(uri){
    let mongoClient;
    try{
     mongoClient=await connectToDB(uri);
    let db=mongoClient.db('school');
    let collection=db.collection('students');

    let toRet=await collection.find({}).toArray()
    return toRet;
    }
    catch(error){
        console.error("error while creating a student document")
    }
    finally{
        mongoClient.close();
        console.log("this line of code will be executed regardless if the precious succeeded or threw an error ")
    }
}


export async function getSingleStudent(uri,_id){
    let mongoClient;
    try{
     mongoClient=await connectToDB(uri);
    let db=mongoClient.db('school');
    let collection=db.collection('students');

    let toRet=await collection.findOne({_id})
    return toRet;
    }
    catch(error){
        console.error("error while creating a student document")
    }
    finally{
        mongoClient.close();
        console.log("this line of code will be executed regardless if the precious succeeded or threw an error ")
    }
}



