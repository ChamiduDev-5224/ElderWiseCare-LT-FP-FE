
import logo from '../../../src/assets/logo.svg'
import proimg from '../../../src/assets/prox.svg'
import { Link } from 'react-router-dom'
export const Navbar = () => {
    
    return (
        <div className='bg-dark-green px-12 flex justify-between fixed w-[100%] z-50'>
            <div className="logo pt-2 flex flex-row items-center">
                <img src={logo} alt="logo" width={50} height={10} />
                <h2 className="title text-mid-green text-2xl ml-4 hidden md:block">ElderWiseCare</h2>
            </div>
            <ul className="flex flex-row gap-7 py-4 text-white justify-end items-center">
                <li className='hover:cursor-pointer hover:text-light-green'>About Us</li>
                <li className='hover:cursor-pointer hover:text-light-green'>Products</li>
                <li className='hover:cursor-pointer hover:text-light-green'>Services</li>
                <li className='hover:cursor-pointer hover:text-light-green'>FAQ</li>
                <Link to="/signup"> <li className='bg-light-green rounded-full px-3 text-black font-sans cursor-pointer active:bg-mid-green text-center my-auto mx-auto py-1'>Signout</li></Link>
                <li className='bg-light-green rounded-full cursor-pointer active:bg-mid-green w-10 h-10'><img src={proimg} alt='profile Image' /></li>

            </ul>
        </div>
    )
}
