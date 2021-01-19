const router = require("express").Router();
const {isAuthenticated} = require('../helpers/auth');

const { renderLoginForm, 
        renderRegisterForm,
        renderChangeForm,
        cambiarContraseña,
        login, 
        register,
        logout
    } = require('../controllers/user.controllers');

//LOG IN
router.get('/login', renderLoginForm);

router.post('/login', login);

//REGISTER
router.get('/register', renderRegisterForm);

router.post('/register', register);

//cambiar contraseña
router.get('/cambiar', renderChangeForm);

router.post('/cambiar', cambiarContraseña);

// LOGOUT
router.get("/logout", logout);

// XD
router.get('/', (req, res)=>{
    res.render('login');
});

//  HOME
router.get('/home', isAuthenticated, async(req, res)=>{
    res.render('home', {username: req.user.username, admin: req.user.admin});
});

module.exports = router;