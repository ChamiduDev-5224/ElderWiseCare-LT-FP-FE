
import logo from '../../../src/assets/logo.svg'
export const Navbar = () => {
    return (
        <div className='bg-dark-green px-12 flex justify-between fixed w-[100%] z-50'>
            <div className="logo pt-2 flex flex-row">
                <img src={logo} alt="logo" width={50} height={10} />
            <h2 className="title text-mid-green text-2xl ml-4 hidden md:block">ElderWiseCare</h2>
            </div>
            <ul className="flex flex-row gap-7 py-4 text-white justify-end">
                <li>About Us</li>
                <li>Developer</li>
                <li>Your</li>
                <li className='bg-light-green rounded-full px-3 text-black font-sans cursor-pointer active:bg-mid-green'>Login</li>
            </ul>
        </div>
    )
}
