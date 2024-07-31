import React, { useEffect, useRef, useState } from 'react';
import { Navbar } from '../common/Navbar';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Toast from '../common/toast/Toast';
import PanelLoader from '../common/loaders/PanelLoader';
import { BiEdit } from 'react-icons/bi';
import { MdDeleteForever } from 'react-icons/md';
import ChatMenu from '../chat/ChatMenu';
import ChatScreen from '../chat/ChatScreen';

const CreateGig = () => {
    const userInfo = useSelector((state: any) => state.auth.userInfo);
    const [image, setImage] = useState<File | null>(null);
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' }>({ message: '', type: 'info' });
    const [selectedServices, setSelectedServices] = useState<string[]>([]);
    const [loaderShow, setLoaderShow] = useState(false)

    const [createGigData, setCreateGigData] = useState<{
        title: string;
        description: string;
        serviceList: string[];
        serviceArea: string;
        image: File | null;
    }>({
        title: '',
        description: '',
        serviceList: [],
        serviceArea: '',
        image: null,
    });

    const [errors, setErrors] = useState<{
        title: boolean;
        description: boolean;
        serviceList: boolean;
        serviceArea: boolean;
        image: boolean;
    }>({
        title: false,
        description: false,
        serviceList: false,
        serviceArea: false,
        image: false,
    });
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setImage(e.target.files[0]);
            setCreateGigData({ ...createGigData, image: e.target.files[0] });
        }
    };

    const handleServiceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSelectedServices(prevSelected =>
            prevSelected.includes(value)
                ? prevSelected.filter(service => service !== value)
                : [...prevSelected, value]
        );
    };
    const showToast = (message: string, type: 'success' | 'error' | 'info') => {
        setToast({ message, type });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        setCreateGigData({ ...createGigData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Validate fields
        const titleValid = createGigData.title.trim() !== '';
        const descriptionValid = createGigData.description.trim() !== '';
        const serviceListValid = selectedServices.length > 0;
        const serviceAreaValid = createGigData.serviceArea !== '';
        const imageValid = image !== null;

        setErrors({
            title: !titleValid,
            description: !descriptionValid,
            serviceList: !serviceListValid,
            serviceArea: !serviceAreaValid,
            image: !imageValid,
        });

        if (titleValid && descriptionValid && serviceListValid && serviceAreaValid && imageValid) {
            // Submit form data
    
            setLoaderShow(true);
            const imgUrl = await uploadImage(createGigData.image);

            const dataForm = {
                ...createGigData,
                serviceList: selectedServices,
                image: imgUrl,
                userId: userInfo.id
            }

            try {

                const res = await axios.post(import.meta.env.VITE_REACT_BASE_URL + '/gig/add', dataForm);
                if (res.status == 201) {
                    setLoaderShow(false);
                    showToast('New Gig Added Successfully.', 'success')
                    clearForm()
                }
            } catch (error) {
                setLoaderShow(false);
                showToast('Sorry! New Gig Cannot Adding.', 'error')
            }



        }
    };

    // upload image
    const uploadImage = async (imageFile: any) => {
        const formData = new FormData();
        formData.append('file', imageFile);

        const response = await axios.post(import.meta.env.VITE_REACT_BASE_URL + '/auth/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        return response.data;
    };
    // clear form 
    const clearForm = () => {
        setCreateGigData({
            title: '',
            description: '',
            serviceList: [],
            serviceArea: '',
            image: null,
        });
        setSelectedServices([]);
        setImage(null);

        // Reset the file input element
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }

        setErrors({
            title: false,
            description: false,
            serviceList: false,
            serviceArea: false,
            image: false,
        });

    }

    return (

        <div className="p-4 ">
            {loaderShow && <PanelLoader />}
            <Toast
                message={toast.message}
                type={toast.type}
                duration={5000}
                onClose={() => setToast({ message: '', type: 'info' })}
            />
            <h2 className="text-2xl font-semibold mb-4">Create New Gig</h2>
            {/* Form for creating a gig */}
            <form className="bg-white p-6 rounded-lg shadow-lg" onSubmit={handleSubmit}>
                <label className="block mb-2 text-sm font-medium text-gray-700">Gig Title</label>
                <input
                    name="title"
                    type="text"
                    className={`block w-full p-2 border border-gray-300 rounded mb-4 ${errors.title ? 'border-red-500' : ''}`}
                    value={createGigData.title}
                    onChange={handleChange}
                />
                {errors.title && <p className="text-red-500 text-sm">Title is required.</p>}

                <label className="block mb-2 text-sm font-medium text-gray-700">Description</label>
                <textarea
                    name="description"
                    className={`block w-full p-2 border border-gray-300 rounded mb-4 ${errors.description ? 'border-red-500' : ''}`}
                    rows={4}
                    value={createGigData.description}
                    onChange={handleChange}
                />
                {errors.description && <p className="text-red-500 text-sm">Description is required.</p>}

                <label className="block mb-2 text-sm font-medium text-gray-700">Upload Image</label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    ref={fileInputRef}
                    className={`block mb-4 ${errors.image ? 'border-red-500' : ''}`}
                />
                {errors.image && <p className="text-red-500 text-sm">Image is required.</p>}

                <fieldset className="mb-4">
                    <legend className="text-sm font-medium text-gray-700">Select Services</legend>
                    <div className="flex flex-row gap-2">
                        <label className="flex items-center mb-2">
                            <input
                                type="checkbox"
                                value="Consultation"
                                checked={selectedServices.includes('Consultation')}
                                onChange={handleServiceChange}
                                className="mr-2"
                            />
                            Consultation
                        </label>
                        <label className="flex items-center mb-2">
                            <input
                                type="checkbox"
                                value="Care giving"
                                checked={selectedServices.includes('Care giving')}
                                onChange={handleServiceChange}
                                className="mr-2"
                            />
                            Care giving
                        </label>
                        {/* Add other service options here */}
                    </div>
                    {errors.serviceList && <p className="text-red-500 text-sm">At least one service must be selected.</p>}
                </fieldset>

                <label className="block mb-2 text-sm font-medium text-gray-700">Service Area</label>
                <select
                    name="serviceArea"
                    value={createGigData.serviceArea}
                    onChange={handleChange}
                    className={`block w-full p-2 border border-gray-300 rounded mb-4 ${errors.serviceArea ? 'border-red-500' : ''}`}
                >
                    <option value="">Select Area</option>
                    <option value="all">All Country</option>
                    <option value="specific">Related Area Only</option>
                </select>
                {errors.serviceArea && <p className="text-red-500 text-sm">Service area is required.</p>}

                <button
                    type="submit"
                    className="bg-dark-green text-white p-2 rounded hover:bg-transparent hover:border-2 border-dark-green hover:text-dark-green"
                >
                    Create Gig
                </button>
            </form>
        </div>
    );
};
interface Service {
    sid: number;
    des: string;
    sts: number;
}

interface Gig {
    gid: number;
    tit: string;
    des: string;
    imu: string;
    sts: number;
    services: Service[];
}
const ManageGig = ({ onSelectGig }: { onSelectGig: (gig: Gig) => void }) => {
    const userInfo = useSelector((state: any) => state.auth.userInfo);
    const [gigs, setGigs] = useState<Gig[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const gigsPerPage = 6; // Number of gigs per page

    useEffect(() => {
        axios.get(import.meta.env.VITE_REACT_BASE_URL + '/gig/' + userInfo.id)
            .then(response => {
                setGigs(response.data);
            })
            .catch(() => {
                setGigs([]);
            });
    }, [userInfo]);

    const totalPages = Math.ceil(gigs.length / gigsPerPage);

    const handleEdit = (id: number) => {
        // Add functionality to edit the gig
    };

    const handleDelete = (id: number) => {
        setGigs(gigs.filter(gd => gd.gid !== id));
        // Add functionality to delete the gig from backend if needed
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    // Get gigs for the current page
    const startIndex = (currentPage - 1) * gigsPerPage;
    const endIndex = startIndex + gigsPerPage;
    const currentGigs = gigs.slice(startIndex, endIndex);

    return (
        <div className="p-4">
            <h2 className="text-2xl font-semibold mb-4">Manage Gigs</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentGigs.map(gd => (
                    <div
                        key={gd.gid}
                        className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-2xl"
                        onClick={() => onSelectGig(gd)} // Pass gig data to parent
                    >
                        <img
                            src={gd.imu}
                            alt={gd.tit}
                            className="w-full h-48 object-cover"
                        />
                        <div className="p-4 ">
                            <h3 className="text-xl font-semibold text-gray-800 truncate">{gd.tit}</h3>
                            <p className="text-gray-600 mt-2">{gd.des}</p>
                            <p className="text-gray-500 mt-2">Services: {gd.services.map(service => service.des).join(', ')}</p>
                            <div className="mt-4 flex justify-end space-x-2">
                                <button
                                    onClick={(e) => { e.stopPropagation(); handleEdit(gd.gid); }}
                                    className="bg-dark-green text-white-wt px-3 py-1 rounded"
                                >
                                    <BiEdit size={22} />
                                </button>
                                <button
                                    onClick={(e) => { e.stopPropagation(); handleDelete(gd.gid); }}
                                    className="bg-dark-green text-white-wt px-3 py-1 rounded"
                                >
                                    <MdDeleteForever size={22} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex justify-center mt-4">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="bg-gray-300 text-gray-700 px-3 py-1 rounded-l hover:bg-gray-400 disabled:opacity-50"
                >
                    Previous
                </button>
                <span className="px-3 py-1 text-gray-700">Page {currentPage} of {totalPages}</span>
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="bg-gray-300 text-gray-700 px-3 py-1 rounded-r hover:bg-gray-400 disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </div>
    );
};


const GigDetails = ({ gig }: { gig: Gig }) => {

    return (
        <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-md">
            <img
                src={gig.imu}
                alt={gig.tit}
                className="w-full h-48 object-cover"
            />
            <div className="p-4">
                <h3 className="text-2xl font-semibold text-gray-800">{gig.tit}</h3>
                <h2 className='font-semibold mt-6'>Description</h2>
                <p className="text-gray-600 mt-2 w-1/2">{gig.des}</p>
                <p className="text-gray-500 mt-2">Services: {gig.services.map(service => service.des).join(', ')}</p>
            </div>
        </div>
    );
};

interface Chat {
    id: string;
    name: string;
    lastMessage: string;
    timestamp: string;
    profilePicture: string; // Profile picture URL is required
}



// Component for viewing messages
const Messages = () => {
    const [selectedChat, setSelectedChat] = useState<Chat | null>(null);

    const handleSelectChat = (chat: Chat) => {
        setSelectedChat(chat);
    };

    return (
        <div className="flex h-full">
            <ChatMenu onSelectChat={handleSelectChat} />
            <div className="flex-1">
                {selectedChat ? (
                    <ChatScreen chat={selectedChat} />
                ) : (
                    <div className="p-4">Select a chat to start messaging.</div>
                )}
            </div>
        </div>
    );
};

interface OrderDetail {
    orderId: string;
    orderAmount: number;
}

interface EarningsCardProps {
    title: string;
    amount: number;
    date: string;
    orders: OrderDetail[];
}

const EarningsCard: React.FC<EarningsCardProps> = ({ title, amount, date, orders }) => {
    return (
        <div className="bg-white shadow-md rounded-lg p-4 mb-4 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
            <p className="text-xl font-bold text-green-600">${amount.toFixed(2)}</p>
            <p className="text-sm text-gray-500">{date}</p>
            <div className="mt-4">
                <h4 className="text-md font-semibold text-gray-700">Order Details</h4>
                <ul className="list-disc list-inside mt-2">
                    {orders.map((order, index) => (
                        <li key={index} className="text-sm text-gray-600">
                            <span className="font-bold">Order ID:</span> {order.orderId} -
                            <span className="font-bold"> Amount:</span> ${order.orderAmount.toFixed(2)}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};
const earningsData = [
    {
        title: 'January Earnings',
        amount: 4500,
        date: 'January 2024',
        orders: [
            { orderId: '001', orderAmount: 1500 },
            { orderId: '002', orderAmount: 3000 }
        ]
    },
    {
        title: 'February Earnings',
        amount: 5000,
        date: 'February 2024',
        orders: [
            { orderId: '003', orderAmount: 2000 },
            { orderId: '004', orderAmount: 3000 }
        ]
    },
    {
        title: 'March Earnings',
        amount: 3500,
        date: 'March 2024',
        orders: [
            { orderId: '005', orderAmount: 3500 }
        ]
    }
    // Add more earnings data here
];
// Component for viewing earnings
const Earnings = () => {

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-2xl font-bold mb-6">Earnings Overview</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {earningsData.map((data, index) => (
                    <EarningsCard
                        key={index}
                        title={data.title}
                        amount={data.amount}
                        date={data.date}
                        orders={data.orders}
                    />
                ))}
            </div>
        </div>
    );
}
// Main Service component with navigation and content display
const Dashboard = () => {
    const [selected, setSelected] = useState<string>('manage'); // Default to manage view
    const [selectedGig, setSelectedGig] = useState<Gig | null>(null); // State for selected gig

    const handleSelectGig = (gig: Gig) => {
        setSelected('details'); // Change to 'details' or any other view you use for displaying the gig details
        setSelectedGig(gig); // Set the selected gig data
    };

    return (
        <div className="flex h-screen">
            <Navbar />


            <div className="flex h-screen bg-gray-100 pt-20">
                <div className="w-64 bg-white shadow-md">
                    <nav className="p-4">
                        <ul>

                            <li>
                                <button
                                    onClick={() => setSelected('manage')}
                                    className={`w-full text-left p-2 ${selected === 'manage' || selected === 'details' ? 'bg-dark-green text-white' : 'text-gray-700'} hover:bg-dark-green  hover:text-white transition-colors`}
                                >
                                    Manage Gig
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => setSelected('create')}
                                    className={`w-full text-left p-2 ${selected === 'create' ? 'bg-dark-green text-white' : 'text-gray-700'} hover:bg-dark-green hover:text-white transition-colors`}
                                >
                                    Create Gig
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => setSelected('messages')}
                                    className={`w-full text-left p-2 ${selected === 'messages' ? 'bg-dark-green text-white' : 'text-gray-700'} hover:bg-dark-green hover:text-white transition-colors`}
                                >
                                    Messages
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => setSelected('earnings')}
                                    className={`w-full text-left p-2 ${selected === 'earnings' ? 'bg-dark-green text-white' : 'text-gray-700'} hover:bg-dark-greenhover:text-white transition-colors`}
                                >
                                    Earnings
                                </button>
                            </li>
                        </ul>
                    </nav>
                </div>

            </div>

            {/* Content Area */}
            <div className="flex-1 p-6 pt-20">
                {selected === 'create' && <CreateGig />}
                {selected === 'manage' && <ManageGig onSelectGig={handleSelectGig} />}
                {selected === 'messages' && <Messages />}
                {selected === 'earnings' && <Earnings />}
                {selected === 'details' && selectedGig && <GigDetails gig={selectedGig} />}
            </div>
        </div>
    );
};

export default Dashboard;



