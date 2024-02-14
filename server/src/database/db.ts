import mongoose from "mongoose"

const connectionString: string = "mongodb://localhost:27017/questify-hub";

const connectToMongo = () => {
 mongoose.connect(connectionString)
    .then(() => console.log("connected to database"))
    .catch(e => console.log("error: ", e.message));
}

export default connectToMongo;

