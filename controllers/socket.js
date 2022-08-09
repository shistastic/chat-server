const User = require("../models/user");
const Message = require("../models/messages");

const userConnected = async (uid = "") => {
    const user = await User.findById(uid);
    user.online = true;
    console.log(user.name);
    await user.save();

    return user;
}

const userDisconnected = async (uid = "") => {
    const user = await User.findById(uid);
    user.online = false;
    console.log("user DISCONECTED")
    await user.save();

    return user;
}

const saveMessage = async (payload) => {

    /*
        {
            from: "",
            to: "",
            message: ""
        }
    */
    try {
        const message = new Message(payload);
        await message.save();
        console.log("Success");
        return true;
    } catch (_) {
        console.log("failed", _);
        return false;
    }
}


module.exports = {
    userConnected, userDisconnected, saveMessage
}