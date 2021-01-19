const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/User');


//LO QUE VERIFICA SI SE PUEDE O NO LOGGEAR ALGUEN
passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
}, async (username, password, done)=>{
    const user = await User.findOne({username})
    
    console.log(user);
    if(!user){
        console.log('user not found');
        return done(null, false, {message: 'User Not Found'})
    } else{
        const match = await user.matchPassword(password);
        if(match){
            console.log("Logging in");
            return done(null, user);
        } else{
            console.log('Incorrect password');
            return done(null, false, {message: 'Incorrect Password'})
        }
    }
}));


//PARA PASAR LOS DATOS ENTRE PAGINAS
passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user)=>{
        done(err, user);
    });
});