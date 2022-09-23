import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config()

mongoose.connect(process.env.DB_CREDS).then(
    () => {
        console.log('mongodb connected!')
    }
);
mongoose.Promise = global.Promise;
export default mongoose