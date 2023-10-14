// const mongoose = require('mongoose')

// const mongoURL = "mongodb://localhost:27017"
// // const connectToMongo = async ()=>{
// //     mongoose.connect(mongoURL, ()=>{
// //         console.log("connecte")
// //     })
// // }
// connectToMongo().catch(err => console.log(err));

// async function connectToMongo(){
//   await mongoose.connect(mongoURL, ()=>{
//             console.log("connecte")
//         });
// }

// module.exports = connectToMongo;

const mongoose = require('mongoose');

const mongoURL = "mongodb://localhost:27017/inotebook";

async function connectToMongo() {
  try {
    await mongoose.connect(mongoURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

module.exports = connectToMongo;

// You can call connectToMongo() in another module to establish the connection.
