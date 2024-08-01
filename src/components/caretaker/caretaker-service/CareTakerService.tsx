import React, { useEffect, useState } from 'react';
import CareTakerCard from './CareTakerCard';
import { Navbar } from '../../common/Navbar';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { MdOutlineChatBubbleOutline } from 'react-icons/md';
import { FaHeart, FaShareAlt } from 'react-icons/fa';
import ChatPopup from './ChatPopuup';
import { Service, Card, UserInfo } from '../../../types'; // Adjust the path as needed

const ITEMS_PER_PAGE = 6;

const CareTakerService: React.FC = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [filteredCards, setFilteredCards] = useState<Card[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [filter, setFilter] = useState<string>('');
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  const [selectedUserInfo, setSelectedUserInfo] = useState<UserInfo[]>([]);
  const [isChatPopupOpen, setIsChatPopupOpen] = useState<boolean>(false);
  const [selectedChatUser, setSelectedChatUser] = useState<UserInfo | null>(null);
  const userInfo = useSelector((state: any) => state.auth.userInfo);

  useEffect(() => {
    fetchGigs();
  }, [userInfo]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFilter(value);
  };

  const fetchGigs = async () => {
    try {
      const data = {
        lat: userInfo.lat,
        userid: userInfo.id,
        longtitite: userInfo.longtitite
      };
      const res = await axios.post(import.meta.env.VITE_REACT_BASE_URL + '/gig/fetchCustomerGig', data);
      if (res.status === 201) {
        setCards(res.data);
        setFilteredCards(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = () => {
    const filtered = cards.filter(card =>
      card.tit.toLowerCase().includes(filter.toLowerCase())
    );
    setFilteredCards(filtered);
    setCurrentPage(1);
  };

  useEffect(() => {
    handleSearch();
  }, [filter, cards]);

  const indexOfLastCard = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstCard = indexOfLastCard - ITEMS_PER_PAGE;
  const currentCards = filteredCards.slice(indexOfFirstCard, indexOfLastCard);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(filteredCards.length / ITEMS_PER_PAGE);

  const handleCardClick = (card: Card, gigId: number) => {
    axios.get(`${import.meta.env.VITE_REACT_BASE_URL}/gig/userinfo/${gigId}`)
      .then(response => {
        if (response.status === 200) {
          setSelectedUserInfo(response.data);
          setSelectedCard(card);
        }
      })
      .catch((error) => {
        console.error('Error fetching user info:', error);
      });
  };

  const openChatPopup = (user: UserInfo) => {
    setSelectedChatUser(user);
    setIsChatPopupOpen(true);
  };

  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-4 py-20">
        <div className="flex flex-col md:flex-row md:justify-between mb-4">
          <div className="flex items-center mb-4 md:mb-0">
            <input
              type="text"
              placeholder="Search"
              value={filter}
              onChange={handleFilterChange}
              className="border border-gray-300 rounded-lg px-4 py-2 mr-4"
            />
            <button
              onClick={handleSearch}
              className="bg-dark-green text-white px-4 py-2 rounded-lg hover:bg-dark-green-dark"
            >
              Search
            </button>
          </div>
          <div className="flex justify-center items-center">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => paginate(index + 1)}
                className={`mx-1 px-4 py-2 rounded-lg ${currentPage === index + 1 ? 'bg-dark-green text-white' : 'bg-gray-200 text-gray-700'} hover:bg-dark-green hover:text-white`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>

        {selectedCard ? (
          <div className="bg-slate-100 shadow-lg rounded-lg p-6">
            <button
              onClick={() => setSelectedCard(null)}
              className="text-dark-green font-semibold mb-4 inline-block hover:underline"
            >
              &larr; Back to List
            </button>
            <h2 className="text-2xl font-semibold mb-4">{selectedCard.tit}</h2>
            <img src={selectedCard.imu} alt={selectedCard.tit} className="w-full h-64 object-cover mb-4 bg-white" />
            <div className='flex flex-row bg-white rounded-md p-4 justify-between'>
              <div>
                <h3 className='font-semibold'>Description</h3>
                <p className="text-gray-700 mb-4 mt-4 w-3/5">{selectedCard.des}</p>
                <h3 className='font-semibold'>Services</h3>
                <p className="text-gray-500 mt-2">{selectedCard.services.map((service: Service) => service.des).join(', ')}</p>
              </div>
              <div className='flex flex-col'>
                <div className='flex flex-row gap-2 justify-end'>
                  <FaHeart className='text-lg hover:shadow-2xl cursor-pointer rounded-full text-red-600' />
                  <MdOutlineChatBubbleOutline className='text-lg hover:shadow-2xl cursor-pointer' onClick={() => openChatPopup(selectedUserInfo[0])} />
                  <FaShareAlt className='text-lg hover:shadow-2xl cursor-pointer' />
                </div>
                <div>
                  {selectedUserInfo.map((data: UserInfo) => (
                    <div className='shadow-2xl mt-4' key={data.id}>
                      <h1 className='font-semibold text-center'>Caregiver Information</h1>
                      <img src={data.userImg} className='w-10 h-10 rounded-full mx-auto my-auto mt-2' alt="userImg" />
                      <h4 className='px-6 text-center'>{data.userName}</h4>
                      <h4 className='px-6 mt-4'>{data.firstName} {data.lastName}</h4>
                      <h4 className='px-6'>{data.email}</h4>
                      <h4 className='px-6'>{data.telephone}</h4>
                      <h4 className='px-6 pb-6'>{data.street} {data.city}</h4>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentCards.map((card: Card, index: number) => (
              <CareTakerCard
                key={index}
                imageUrl={card.imu}
                title={card.tit}
                description={card.des}
                link={'#'}
                onClick={() => handleCardClick(card, card.gid)}
              />
            ))}
          </div>
        )}

        {/* Render ChatPopup component */}
        <ChatPopup
          isOpen={isChatPopupOpen}
          onClose={() => setIsChatPopupOpen(false)}
          user={selectedChatUser}
          caregiverId={parseInt(selectedUserInfo[0]?.userId)}
        />
      </div>
    </div>
  );
};

export default CareTakerService;
