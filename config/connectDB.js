import mongoose from "mongoose";


const connectDB = async () => {
    try {
        const {connection} = await mongoose.connect(process.env.DB_URL);
        console.log('DB Connect Successfully to ',connection.host);
    } catch (error) {
        console.error('Error While Connecting DB: ', error.message)
        process.exit(1)
    }
}

export default connectDB;