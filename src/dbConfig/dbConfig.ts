import mongoose from 'mongoose'

export async function connect()
{
    try {
        await mongoose.connect(process.env.MONGO_URL!)
        
        const connection=mongoose.connection;
        connection.on('connected',()=>{
            console.log('MongoDB connection Successful!');
            
        })

        connection.on('error',(err)=>{
            console.log('Error on connecting with Mongodb! '+err);
            
        })

    } catch (error) {
        console.log('Something went wrong!');
        
    }   
}