const { response } = require("express");
const User = require("../models/user");


const getUsers = async (req, res = response) => {
    
       // const uid = req.uid;

       const from = Number(req.query.from) || 0;
       console.log(from);

       const users = await User.find({_id: {$ne: req.uid}}).sort("-online").skip(from).limit(20);
    
        res.json({
            ok: true,
            users,
            from
        });
    
}

module.exports = {
    getUsers
}