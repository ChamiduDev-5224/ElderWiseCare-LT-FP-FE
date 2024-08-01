import { useState } from "react";
import ChatMenu from "../chat/ChatMenu";
import ChatScreen from "../chat/ChatScreen";
import { Navbar } from "./Navbar";

interface Message {
    sender: string;
    text: string;
    dateTime: string;
}

interface Chat {
    id: string;
    name: string;
    lastMessage: string;
    timestamp: string;
    profilePicture: string; // Profile picture URL is required
    messages: Message[]; // Add messages property
}
interface ChatMenuChat {
    id: number;
    imgUrl: string;
    name: string;
}
const MessageScreen = () => {
    const [selectedChat, setSelectedChat] = useState<Chat | null>(null);

    const handleSelectChat = (chat: ChatMenuChat) => {
        const detailedChat: Chat = {
            id: chat.id.toString(),
            name: chat.name,
            lastMessage: '', // Placeholder or fetched from an API
            timestamp: '', // Placeholder or fetched from an API
            profilePicture: chat.imgUrl,
            messages: [], // Placeholder or fetched from an API
        };
        setSelectedChat(detailedChat);
    };
    return (
        <div>
            <Navbar />
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

