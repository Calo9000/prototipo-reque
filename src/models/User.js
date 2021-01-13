const{ Schema, model} = require('mongoose');
const bcrypt = require('bcryptjs');
const { basic } = require('http-auth');

const UserSchema = new Schema({
    username:{type:String , required: true},
    name:{type:String , required: true},
    firstLastName:{type:String , required: true},
    secondLastName:{type:String , required: true},
    email:{type:String , required: true},
    password:{type:String , required: true},
    birthday:{type:Date, required:true},
    admin:{type:Boolean, required: true}
})

UserSchema.methods.encryptPassword = async password =>{
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}

UserSchema.methods.matchPassword = async function(possiblePassword) {
    return await bcrypt.compare(possiblePassword, this.password)
}

module.exports = model('User', UserSchema);
