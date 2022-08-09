const { response } = require("express");
const Message = require("../models/messages")


const getChat = async (req, res) => {

 
    
       const myId = req.uid;
       const messagesFrom = req.params.from;

       console.log(myId);
       console.log(messagesFrom);

       const last30 = await Message.find({
           $or: [{from: myId, for: messagesFrom}, {from: messagesFrom, for: myId}],
       }).sort({createdAt: "desc"}).limit(30);

        res.json({
            ok: true,
            messages: last30
        });
    
}

module.exports = {
    getChat
}