import axios from 'axios';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import io from 'socket.io-client';

interface Message {
    sender: string;
    text: string;
    dateTime: string;
}

interface Chat {
    id: string;
    name: string;
    messages: Message[];
}

const ChatScreen = ({ chat }: { chat: Chat }) => {
    const userInfo = useSelector((state: any) => state.auth.userInfo);
    const [messageText, setMessageText] = useState('');
    const [messages, setMessages] = useState<Message[]>([]);
    const [socket, setSocket] = useState<any>(null);

    useEffect(() => {
        // Initialize WebSocket connection
        const newSocket = io(import.meta.env.VITE_REACT_BASE_URL);
        setSocket(newSocket);

        // Fetch messages from the server
        axios.get(`${import.meta.env.VITE_REACT_BASE_URL}/chat/${userInfo.id}`)
            .then(response => {
                const data = response.data.find((vl: any) => vl.id == chat.id);
                if (data && data.messages) {
                    
                    setMessages(data.messages);
                }
            })
            .catch((error) => {
                console.error('Error fetching chats:', error);
            });

        // // Handle incoming messages
        // newSocket.on('message', (message: Message) => {
        //     setMessages(prevMessages => [...prevMessages, message]);
        // });

        // Clean up on component unmount
        return () => {
            newSocket.disconnect();
        };
    }, [userInfo.id, chat.id]);

    const handleSendMessage = async () => {
        if (messageText.trim() === '') return;

        const newMessage: Message = { sender: 'Me', text: messageText, dateTime: new Date().toLocaleTimeString() };
        setMessages(prevMessages => [...prevMessages, newMessage]);

        try {
            const data = {
                messageText,
                senderId: userInfo.id,
                receiverId: chat.id,
            };
            const res = await axios.post(import.meta.env.VITE_REACT_BASE_URL + '/chat', data);
            if (res.status === 201) {
                // Emit message to WebSocket server
                socket.emit('sendMessage', data);
            }
        } catch (error) {
            console.log(error);
        }

        setMessageText('');
    };

    return (
        <div className="p-4 bg-gray-50 min-h-screen">
            <h2 className="text-2xl font-semibold mb-4">{chat.name}</h2>
            <div className="h-80 overflow-y-scroll bg-white p-4 border rounded-lg shadow-md">
                {messages.map((message, index) => (
                    <div key={index} className={`p-3 mb-2 rounded-lg ${message.sender === 'Me' ? 'bg-mid-green text-gray-800 self-end' : 'bg-gray-100 text-gray-800'}`}>
                        <div className="text-xs text-gray-800 mb-1 flex flex-row justify-between">
                            <span className='font-semibold'>{message.sender}</span>
                            <span>{message.dateTime}</span>
                        </div>
                        <p className="text-sm">{message.text}</p>
                    </div>
                ))}
            </div>
            <div className="mt-4">
                <textarea
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    placeholder="Type your message here..."
                />
                <button
                    onClick={handleSendMessage}
                    className="mt-2 bg-dark-green text-white p-2 rounded-lg hover:bg-green-600 transition"
                >
                    Send
                </button>
            </div>
        </div>
    );
};

export default ChatScreen;
