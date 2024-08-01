import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

// Define the interface for chat items

interface ChatMenuChat {
    id: number;
    imgUrl: string;
    name: string;
}

const ChatMenu = ({ onSelectChat }: { onSelectChat: (chat: ChatMenuChat) => void }) => {
    const userInfo = useSelector((state: any) => state.auth.userInfo);
    const [chats, setChats] = useState<ChatMenuChat[]>([]);
    const [selectedChatId, setSelectedChatId] = useState<number | null>(null);

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_REACT_BASE_URL}/chat/${userInfo.id}`)
            .then(response => {
                setChats(response.data);
            })
            .catch((error) => {
                console.error('Error fetching chats:', error);
            });
    }, [userInfo.id]);

    const handleChatClick = (chat: ChatMenuChat) => {
        setSelectedChatId(chat.id);
        onSelectChat(chat);
    };

    return (
        <div className="w-64 bg-light-green p-4">
            <h2 className="text-xl font-semibold mb-4">Chats</h2>
            <ul className="list-none">
                {chats.map(chat => (
                    <li
                        key={chat.id}
                        onClick={() => handleChatClick(chat)}
                        className={`cursor-pointer p-2 rounded flex flex-row gap-2 items-center ${
                            chat.id === selectedChatId ? 'bg-gray-400' : 'hover:bg-gray-300'
                        }`}
                    >
                        <img src={chat.imgUrl} alt="" className='w-6 h-6 rounded-full' />
                        <span>{chat.name}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ChatMenu;
