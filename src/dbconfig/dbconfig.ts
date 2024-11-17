import mongoose from "mongoose";

export async function connect() {
  try{
      mongoose.connect(process.env.mongo_url!);
    const connction =mongoose.connection;
    connction.on('connected',()=>{
      console.log('Mongodb connceted')
    })
    connction.on('error',()=>{
      console.log('Mongodb Connected error');
      process.exit;
    })
  }catch(err)
  {
    console.log("oops! sometihng went wrong")
    console.log(err)
  }
  
}