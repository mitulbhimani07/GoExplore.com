const passport=require('passport');
const jwtStrategy=require('passport-jwt').Strategy;
const ejwt=require('passport-jwt').ExtractJwt;

var opts={
    jwtFromRequest:ejwt.fromAuthHeaderAsBearerToken(),
    secretOrKey:"Api"
}
const AdminModel = require('../model/GoExplore.AdminModel/AdminModel')
passport.use(new jwtStrategy(opts, async function(payload,done){
    let checkUserData=await AdminModel.findOne({email:payload.AdminRegister.email});
    if(checkUserData){
        return done(null,checkUserData);
    }else{
        return done(null,false)
    }
}))
passport.serializeUser((user,done)=>{
    console.log(user.id);
    return done(null,user.id)
});

passport.deserializeUser(async(id,done)=>{
    let userData = await AdminModel.findById(id);
    if (userData) {
        return done(null,userData)
    } else {
        return done(null,false);
    }
})
module.exports=passport;