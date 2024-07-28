import logo from '../../../src/assets/logo.svg'
import { Link, useNavigate } from 'react-router-dom'
import api from '../../interceptors/Apis'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { registerInfo } from '../../redux/slices/auth_slice'
import { TiShoppingCart } from "react-icons/ti";

export const Navbar = () => {
    const cartInfo = useSelector((state: any) => state.cart.cartInfo);

    const [isLogged, setIsLogged] = useState(false)
    const [imgUrl, setImgUrl] = useState('')
    const [cartCount, setCartCount] = useState(cartInfo.length); // Example cart count
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await api.get('/auth/profile');
                if (response.status === 200) {
                    setImgUrl(response.data.imgUrl)
                    setIsLogged(true)
                    dispatch(registerInfo(response.data));
                }
            } catch (error) {
                setIsLogged(false)
            }
        };

        fetchUserProfile();
    }, [dispatch]);

    useEffect(() => {
        // Update cartCount whenever cartInfo changes
        setCartCount(cartInfo.length);
    }, [cartInfo]);

    const handleCartClick = () => {
        navigate('/shopping-cart');
    };
    return (
        <div className='bg-dark-green px-12 flex justify-between fixed w-[100%] z-50'>
            <div className="logo pt-2 flex flex-row items-center">
                <img src={logo} alt="logo" width={50} height={10} />
                <h2 className="title text-mid-green text-2xl ml-4 hidden md:block">ElderWiseCare</h2>
            </div>
            <ul className="flex flex-row gap-7 py-4 text-white justify-end items-center">
                <Link to="/about-us"> <li className='hover:cursor-pointer hover:text-light-green'>About Us</li></Link>
                <Link to="/product"><li className='hover:cursor-pointer hover:text-light-green'>Products</li></Link>
                <Link to="/entertainment"><li className='hover:cursor-pointer hover:text-light-green'>Entertainment</li></Link>
                <Link to="/faq"><li className='hover:cursor-pointer hover:text-light-green'>FAQ</li></Link>
                <Link to="/services">  <li className='hover:cursor-pointer hover:text-light-green'>Services</li></Link>
                {!isLogged && (
                    <Link to="/signin">
                        <li className='bg-light-green rounded-full px-3 text-black font-sans cursor-pointer active:bg-mid-green text-center my-auto mx-auto py-1'>
                            Signin
                        </li>
                    </Link>
                )}
                {isLogged && (
                    <li className="bg-light-green rounded-full cursor-pointer active:bg-mid-green w-10 h-10 relative overflow-hidden">
                        <img
                            src={imgUrl}
                            alt="profile Image"
                            className="w-full h-full object-cover object-center"
                        />
                    </li>
                )}
                {isLogged && <>
                    <li className='hover:cursor-pointer hover:text-light-green relative' onClick={handleCartClick}>
                        <TiShoppingCart className="text-2xl" />
                        {cartCount > 0 && (
                            <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-gray-700 bg-mid-green rounded-full transform translate-x-1/2 -translate-y-1/2">
                                {cartCount}
                            </span>
                        )}
                    </li>
                </>}
            </ul>
        </div>
    )
}
