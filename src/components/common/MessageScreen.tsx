import { useState } from "react";
import ChatMenu from "../chat/ChatMenu";
import ChatScreen from "../chat/ChatScreen";
import { Navbar } from "./Navbar";
interface Chat {
    id: string;
    name: string;
    lastMessage: string;
    timestamp: string;
    profilePicture: string; // Profile picture URL is required
}

const MessageScreen = () => {
    const [selectedChat, setSelectedChat] = useState<Chat | null>(null);

    const handleSelectChat = (chat: Chat) => {
        setSelectedChat(chat);
    };
    return (
       <div>
        <Navbar/>
        <div className="flex h-screen pt-20">
            <ChatMenu onSelectChat={handleSelectChat} />
            <div className="flex-1">
                {selectedChat ? (
                    <ChatScreen chat={selectedChat} />
                ) : (
                    <div className="p-4">Select a chat to start messaging.</div>
                )}
            </div>
        </div>
       </div>
    );
}

export default MessageScreen

