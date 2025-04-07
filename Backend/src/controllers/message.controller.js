import { Message } from "../models/message.model.js";
import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

//get the users in the chat dashboard
const getusersForSidebar = asyncHandler(async(req,res)=>{
    try {
        const loggedInUserId = req.user._id; //the logged in user should not see himself in the dash board of messages
        const filteredUsers = await User.find({_id : {$ne:loggedInUserId}}).select("-password")

        res.status(200).json(filteredUsers);
    } catch (error) {
        console.log("Error in getUserForSidebar: ", error.message);
        res.status(500).json({error:"Internal server error"});
    }
})

//get the messages of the user with an other user
const getMessages = asyncHandler(async(req,res)=>{
    try {
        const {id:userToChatId} = req.params 
        const myId = req.user._id;

        //get all the message where the sender is the user and the receiver is the userToChat and vice versa
        const messages = await Message.find({$or:[
            {senderId: myId,receiverId:userToChatId},
            {senderId: userToChatId, receiverId: senderId}
        ]})

        res.send(200).json(messages);
    } catch (error) {
        console.log("Error in getMessages controller : ", error.message);
        res.status(500).json({error:" Internal server error "})
        
    }

})

const sendMessages = asyncHandler(async(req,res)=>{
    try {
        const {text,image} = req.body;
        const {id:userToChatId} = req.params 
        const myId = req.user._id;

        let imageUrl;
        if(image){
            const imagePath = req.file?.path;
            if(!imagePath){
                throw new ApiError(400,"File to be sent is missing")
            }
            const sentImageResponse =  await uploadOnCloudinary(imagePath);

            imageUrl = sentImageResponse.url;
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image: imageUrl,
        })

        await newMessage.save();

        //todo: realtime functionality goes here => socket.io

        res.status(201).json(newMessage)
    } catch (error) {
        console.log("Error in sendMessage controller", error.message);

        res.status(500).json({error: "Internal server error"})
        
        
    }
})

export {
    getusersForSidebar,
    getMessages,
    sendMessages
}