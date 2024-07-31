import React, { useState, useEffect } from 'react';
import { FaPaperPlane } from 'react-icons/fa';
import axios from 'axios';
import { useSelector } from 'react-redux';
import io from 'socket.io-client';

const socket = io(import.meta.env.VITE_REACT_BASE_URL);

interface ChatPopupProps {
    isOpen: boolean;
    onClose: () => void;
    user: any;
    caregiverId: number;
}

const ChatPopup: React.FC<ChatPopupProps> = ({ isOpen, onClose, user, caregiverId }) => {
    const userInfo = useSelector((state: any) => state.auth.userInfo);

    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState<any[]>([]); // State to manage chat messages

    useEffect(() => {
        if (user) {
            console.log(user);
            fetchMessages();
        }
    }, [user]);

    useEffect(() => {
        socket.on('message', (data: any) => {
            console.log(data);
            
            setMessages((prevMessages) => [...prevMessages, data]);
        });

        return () => {
            socket.off('message');
        };
    }, []);

    const fetchMessages = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_REACT_BASE_URL}/chat/${user.id}`);
            if (res.status === 200) {
                setMessages(res.data);
            }
        } catch (error) {
            console.log('Error fetching messages:', error);
        }
    };

    const handleSendMessage = async () => {
        try {
            const data = {
                messageText: message,
                senderId: userInfo.id,
                receiverId: caregiverId,
            };

            socket.emit('sendMessage', data);
            setMessage('');
        } catch (error) {
            console.log('Error sending message:', error);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={onClose}>
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md" onClick={(e) => e.stopPropagation()}>
                <h2 className="text-xl font-semibold mb-4">Chat with {user.userName}</h2>
                <div className="flex flex-col h-64 overflow-y-auto border border-gray-300 p-2 mb-4">
                    {messages.map((msg, index) => (
                        <div key={index} className={`p-2 mb-2 rounded-lg ${msg.senderId === userInfo.id ? 'bg-blue-100 self-end' : 'bg-gray-100'}`}>
                            {msg.messageText}
                        </div>
                    ))}
                </div>
                <div className="flex items-center">
                    <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Type a message"
                        className="border border-gray-300 rounded-lg px-4 py-2 flex-1 mr-2"
                    />
                    <button onClick={handleSendMessage} className="bg-dark-green text-white px-4 py-2 rounded-lg hover:bg-dark-green-dark">
                        <FaPaperPlane />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChatPopup;
