import { app } from "./app.js";
import 'dotenv/config';
import { connectDB } from "./db/index.js";



const port = process.env.PORT || 3000;


connectDB()
    .then(() => {
        app.listen(port, () => {
            console.log(`Server is Listening on PORT ${port}`)
        })
    })
    .catch((error) => {
        console.log(`MongoDB connection Error : ${error}`);

    })

