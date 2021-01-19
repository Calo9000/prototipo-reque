const userCtrl = {};
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');

userCtrl.login = passport.authenticate('local', {
    successRedirect: '/home',
    failureRedirect: '/login',
    failureFlash: true
})

userCtrl.register = async(req, res) =>{
    const errors = []
    //console.log(req);
    //const {username, name, firstLastName, secondLastName, email, password, confirmPassword, birthday} = req.body;

    //console.log(file);
    
    //await userCtrl.upload(req, res);

    //console.log(birthday);
    const username = req.body.username;
    const name = req.body.name;
    const firstLastName = req.body.firstLastName;
    const secondLastName = req.body.secondLastName;
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    const birthday = req.body.birthday;
    const admin = (req.body.admin != null);
    //console.log(admin);
    //console.log(req.body.username);

    if (password != confirmPassword) {
        console.log('error')
        //req.flash('error_msg', 'Passwords do not match');
        errors.push({text: "Passwords do not match"})
    }
    if (password.length < 4){
        console.log('error')
        //req.flash('error_msg', 'Passwords must be at least 4 characters long');
        errors.push({text: 'passwords must be at least 4 characters long'});
    }
    if (errors.length > 0){
        res.render('register', {errors})
    }
    else{
        const emailUser = await User.findOne({email: email});
        const NewUsername = await User.findOne({username: username});
        if (emailUser) {
            req.flash('error_msg', 'Ya existe un usuario con ese correo electrónico');
            res.redirect('/register');
        } else if (NewUsername){
            req.flash('error_msg', 'Usuario con ese nombre ya existe');
            res.redirect('/register');
        } else {
            const newUser = new User ({username, name, firstLastName, secondLastName, email, password, birthday, admin});
            newUser.password =  await newUser.encryptPassword(password)
            await newUser.save();
            req.flash('success_msg', 'Usuario ha sido registrado');
            res.redirect('/login');
        }
                    
    }
}

userCtrl.cambiarContraseña = async(req, res) =>{
    const errors = []
    //console.log(req);
    //const {username, name, firstLastName, secondLastName, email, password, confirmPassword, birthday} = req.body;

    //console.log(file);
    
    //await userCtrl.upload(req, res);

    //console.log(birthday);
    const username = req.body.username;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    //console.log(admin);
    //console.log(req.body.username);

    if (password != confirmPassword) {
        console.log('error')
        //req.flash('error_msg', 'Passwords do not match');
        errors.push({text: "Passwords do not match"})
    }
    if (password.length < 4){
        console.log('error')
        //req.flash('error_msg', 'Passwords must be at least 4 characters long');
        errors.push({text: 'passwords must be at least 4 characters long'});
    }
    if (errors.length > 0){
        res.render('register', {errors})
    }
    else{
        const usuario = await User.findOne({username: username});
        if (!usuario){
            req.flash('error_msg', 'Usuario no encontrado');
            res.redirect('/cambiar');
        } else {
            usuario.password =  await usuario.encryptPassword(password)
            await usuario.save();
            req.flash('success_msg', 'Contraseña actualizada');
            res.redirect('/home');
        }
                    
    }
}

userCtrl.renderLoginForm  = (req, res) =>{
    console.log('ENTRANDO AL SIGN IN')
    res.render('login');
}

userCtrl.renderRegisterForm  = (req, res) =>{
    console.log('ENTRANDO AL REGISTER')
    res.render('register');
}

userCtrl.renderChangeForm  = (req, res) =>{
    console.log('Entrando a cambiar contraseña')
    res.render('cambiar');
}

userCtrl.logout = (req, res) =>{
    req.logout();
    req.flash('success_msg', 'User logged out');
    console.log('Logging out')
    res.redirect('/login');
}

module.exports = userCtrl;