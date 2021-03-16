import mongoose from 'mongoose';

const options = {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

export default function mongoConnection() {
    mongoose.connect('mongodb://127.0.0.1:27017/saint-george-db', options).catch((err) => console.log(err));

    // When the connection is disconnected
    mongoose.connection.on('disconnected', () => {
        console.log('Mongoose disconnected');
    });
}
