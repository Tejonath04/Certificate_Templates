const mongoose = require("mongoose");

//const dbURI="mongodb+srv://Teju:0100@tempcert.gdi5gr6.mongodb.net/tempCert-backend?retryWrites=true&w=majority";
const dbURI="mongodb://127.0.0.1:27017/CertTemp";

const connectDb = async () => {
    try {
      const connect = await mongoose.connect(dbURI);
      console.log(
        "Database connected: ",
        connect.connection.host,
        connect.connection.name
      );
    } catch (err) {
      console.log(err);
      process.exit(1);
    }
  };
  
  module.exports = connectDb;