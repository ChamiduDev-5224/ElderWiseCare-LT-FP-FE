import { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../interceptors/Apis';
import { useDispatch, useSelector } from 'react-redux';
import { registerInfo } from '../../redux/slices/auth_slice';
import { TiShoppingCart } from "react-icons/ti";
import { MdNotificationsNone } from "react-icons/md";

import { MdSettings, MdExitToApp, MdMenu } from "react-icons/md";
import logo from '../../../src/assets/logo.svg';

export const Navbar = () => {
    const cartInfo = useSelector((state: any) => state.cart.cartInfo);
    const [isLogged, setIsLogged] = useState(false);
    const [imgUrl, setImgUrl] = useState('');
    const [userType, setUserType] = useState(1)
    const [cartCount, setCartCount] = useState(cartInfo.length);
    const [dropdownOpen, setDropdownOpen] = useState(false); // State for dropdown visibility
    const [menuOpen, setMenuOpen] = useState(false); // State for mobile menu visibility
    const dropdownRef = useRef<HTMLDivElement>(null); // Ref to the dropdown menu
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await api.get('/auth/profile');
                if (response.status === 200) {
                    setImgUrl(response.data.imgUrl);
                    setUserType(response.data.type)
                    setIsLogged(true);
                    dispatch(registerInfo(response.data));
                }
            } catch (error) {
                setIsLogged(false);
            }
        };

        fetchUserProfile();
    }, [dispatch]);

    useEffect(() => {
        // Update cartCount whenever cartInfo changes
        setCartCount(cartInfo.length);
    }, [cartInfo]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setDropdownOpen(false);
            }
        };

        // Add event listener if dropdown is open
        if (dropdownOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        // Clean up event listener on component unmount or when dropdown is closed
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [dropdownOpen]);

    const handleCartClick = () => {
        navigate('/shopping-cart');
    };

    const handleProfileClick = () => {
        setDropdownOpen(prev => !prev); // Toggle dropdown visibility
    };

    const handleLogout = () => {
        // Implement logout logic here
        navigate('/signin');
        localStorage.setItem('token', '');
        localStorage.setItem('refreshToken', '');
        localStorage.setItem('accessToken', '');

    };

    const handleProfile = () => {
        navigate('/profile');
    };

    const handleSettings = () => {
        navigate('/settings');
    };

    const toggleMenu = () => {
        setMenuOpen(prev => !prev); // Toggle mobile menu visibility
    };

    return (
        <div className='bg-dark-green px-12 flex justify-between fixed w-[100%] z-50 h-[72px]'>
            <Link to="/">
                <div className="logo pt-2 flex flex-row items-center">
                    <img src={logo} alt="logo" width={50} height={10} />
                    <h2 className="title text-mid-green text-2xl ml-4 hidden md:block">ElderWiseCare</h2>
                </div>
            </Link>

            {/* Hamburger Icon */}
            <div className="md:hidden flex items-center">
                <MdMenu className="text-white text-3xl cursor-pointer" onClick={toggleMenu} />
            </div>

            {/* Navbar Links */}
            <ul className={`md:flex flex-row gap-7 py-4 text-white justify-end items-center ${menuOpen ? 'block' : 'hidden'} md:block`}>
                <Link to="/about-us">
                    <li className='hover:cursor-pointer hover:text-light-green'>About Us</li>
                </Link>
                <Link to="/product">
                    <li className='hover:cursor-pointer hover:text-light-green'>Products</li>
                </Link>
                <Link to="/entertainment">
                    <li className='hover:cursor-pointer hover:text-light-green'>Entertainment</li>
                </Link>
                <Link to="/faq">
                    <li className='hover:cursor-pointer hover:text-light-green'>FAQ</li>
                </Link>
                <Link to={userType == 1 ? '/caretake-service' : '/services'}>
                    <li className='hover:cursor-pointer hover:text-light-green'>Services</li>
                </Link>
                {!isLogged && (
                    <Link to="/signin">
                        <li className='bg-light-green rounded-full px-3 text-black font-sans cursor-pointer active:bg-mid-green text-center my-auto mx-auto py-1'>
                            Sign In
                        </li>
                    </Link>
                )}
                {isLogged && (
                    <div className="relative flex items-center">
                        <li className="bg-light-green rounded-full cursor-pointer active:bg-mid-green w-10 h-10 relative overflow-hidden" onClick={handleProfileClick}>
                            <img
                                src={imgUrl}
                                alt="profile Image"
                                className="w-full h-full object-cover object-center"
                            />
                        </li>
                        {dropdownOpen && (
                            <div ref={dropdownRef} className="absolute top-full right-0 bg-white text-black shadow-lg rounded mt-2 w-48 z-50">
                                <ul className="p-2">
                                    <Link to="/updateProfile">  <li onClick={handleProfile} className="flex items-center p-2 hover:bg-gray-100 cursor-pointer">
                                        <MdSettings className="mr-2" />
                                        Profile
                                    </li></Link>
                                    <li onClick={handleSettings} className="flex items-center p-2 hover:bg-gray-100 cursor-pointer">
                                        <MdSettings className="mr-2" />
                                        Settings
                                    </li>
                                    <li onClick={handleLogout} className="flex items-center p-2 hover:bg-gray-100 cursor-pointer">
                                        <MdExitToApp className="mr-2" />
                                        Logout
                                    </li>
                                </ul>
                            </div>
                        )}
                        <li className='hover:cursor-pointer hover:text-light-green relative ml-4' onClick={handleCartClick}>
                            <TiShoppingCart className="text-2xl" />
                            {cartCount > 0 && (
                                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-gray-700 bg-mid-green rounded-full transform translate-x-1/2 -translate-y-1/2">
                                    {cartCount}
                                </span>
                            )}
                        </li>

                        <Link to="/msgScreen"> <li className='hover:cursor-pointer hover:text-light-green relative ml-4'>
                            <MdNotificationsNone className="text-2xl" />
                        </li></Link>
                    </div>
                )
                }
            </ul >
        </div >
    );
};
