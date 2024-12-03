import {MongoClient} from 'mongodb'


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

export async function updateStudentDocument(uri,id,newAge){
    let mongoClient;
    try{
     mongoClient=await connectToDB(uri);
    let db=mongoClient.db('school');
    let collection=db.collection('students');
    console.log(id);
    console.log(age)
    await collection.updateOne({_id:id},{$set:{age:newAge}})

    
    }
    catch(error){
        console.error("error while  updating a student document")
    }
    finally{
        mongoClient.close();
        console.log("this line of code will be executed regardless if the precious succeeded or threw an error ")
    }
}

const uri="mongodb+srv://mhmd:uh93WbI3oJbMPQv2@cluster0.xjhua.mongodb.net/"
const id="00b5cc7e-2df3-48d8-b5c6-e574c07b9914"
updateStudentDocument(uri,id,33)