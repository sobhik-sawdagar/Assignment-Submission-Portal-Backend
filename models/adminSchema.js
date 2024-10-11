const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); //bcrypt  library that is used to hash the password.


const adminSchema = new mongoose.Schema({ //This is the schema that is used to create the data structure of the admin.
    username : {
        type : String,
        required : true,
        unique : true,
    },
    password : {
        type : String,
        required : true,
    },
    role : {
        type : String, 
        default : 'Admin',
    },
});

//`pre` middleware function to hash the password before saving the data to the database.
adminSchema.pre('save', async function(next){
    const admin = this;// This is the object that is created from the data that is sent in the request body.

    if(!admin.isModified('password')) return next(); //This is the response that the server sends back to the client if the data is saved successfully.

    try{
        //Hash password generation
        const salt = await bcrypt.genSalt(10); //This is the data that is generated using the bcrypt library.   
        
        //Hashed Password
        const hashedPassword = await bcrypt.hash(admin.password, salt); // This is the data that is generated using the bcrypt library.

        //Overwrite the password with the hashed password
        admin.password = hashedPassword; //This is the data that is generated using the bcrypt library.    

        next(); //This is the response that the server sends back to the client if the data is saved successfully.
   
    }catch(err){
        return next(err); //This is the response that the server sends back to the client if there is an error.
    }
});

//`methods` function to compare the password with the hashed password.
adminSchema.methods.comparePassword = async function(enteredPassword){
    try{
        //Compare the password with the hashed password
        return await bcrypt.compare(enteredPassword, this.password); //This is the data that is compared with the hashed password.
    }catch(err){
        return false; //This is the response that the server sends back to the client if there is an error.
    }
};

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin; //This is the data that is exported to the server.