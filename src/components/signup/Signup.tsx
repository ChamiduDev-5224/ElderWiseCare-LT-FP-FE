

import { ChangeEvent, useEffect, useState } from 'react';
import signupImg from '../../assets/signup.svg'
import logo from '../../assets/logo.svg'
import google from '../../assets/google.svg'
import PanelLoader from '../common/loaders/PanelLoader';
import { Link } from 'react-router-dom';
const Signup = () => {
    const [loading, setLoading] = useState(true);
    const [formSubmit, setFormSubmit] = useState(false);
    const [data, setData] = useState({
        id: '',
        username: '',
        email: '',
        password: ''
    })
    useEffect(() => {
        const img = new Image();
        img.src = signupImg;
        img.onload = () => setLoading(false);
    }, []);

    // register 
    const onCreateAccount = () => {
        setFormSubmit(true)
        setTimeout(() => {
            setFormSubmit(false)

        }, 2000);
        console.log(data);

    }

    //change values
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setData({
            ...data,
            [e.target.id]: e.target.value,
        });
        console.log(data);

    };

    return (
        <div className={`h-full`}>
            {formSubmit && (<PanelLoader />)}
            {loading ? (
                <PanelLoader />
            ) :
                (
                    <div className="flex flex-row justify-between">
                        <div className="flex flex-col w-[100%] md:w-[50%] lg:w-[40%] px-16 py-10 z-[900]">
                            <img src={logo} alt="logo" width={100} height={100} className='self-center' />
                            <p className='font-semibold mt-4'>User Name</p>
                            <input type="text" id="username"
                                className='border-2 pl-6 py-2 rounded-md border-mid-green' value={data.username} onChange={(e) => {
                                    handleChange(e);
                                }} />
                            <p className='font-semibold mt-4'>Email</p>
                            <input type="email" id="email"
                                className='border-2 pl-6 py-2 text-gray-400 rounded-md border-mid-green' value={data.email} onChange={(e) => {
                                    handleChange(e);
                                }} />
                            <p className='font-semibold mt-4'>Password</p>
                            <input type="password" id="password"
                                className='border-2 pl-6 py-2  rounded-md border-mid-green' value={data.password} onChange={(e) => {
                                    handleChange(e);
                                }} />
                            <span className='text-sm text-slate-500 font-normal'>Must be at least 8 characters</span>
                            <button className='mt-6 bg-dark-green text-light-green rounded-md py-3 hover:drop-shadow-xl' onClick={onCreateAccount}>Create Account</button>
                            <button className='mt-6 bg-light-green text-gray-800 rounded-md py-3 flex flex-row items-center justify-center gap-3 hover:drop-shadow-lg'><img src={google} className='w-8 h-8' alt="google" />Signup with Google</button>
                            <p className='mt-2 text-sm text-slate-500 font-normal'>Already have an account?
                                <Link to="/signin"> <strong className='underline cursor-pointer hover:text-slate-700 active:text-slate-600'> Login</strong></Link>
                            </p>
                        </div>
                        <div className='md:flex flex-row bg-dark-green h-fit w-[60%] justify-end hidden'>
                            <div className='flex flex-col'>
                                <h4 className='xl:text-4xl lg:text-3xl text-white font-bold top-[230px] hidden lg:block lg:right-[280px] xl:right-[350px] absolute z-30 shadow-xl'>-"Join Us and Make Caring</h4>
                                <h4 className='xl:text-4xl lg:text-3xl text-white font-bold ml-20 z-30 top-[280px] md:right-[280px] hidden lg:block xl:right-[320px] absolute shadow-xl'>for Loved Ones Easier"-</h4>
                            </div>
                            <img src={signupImg} alt="signup image" className='h-screen rounded-3xl text-right flex-shrink' style={{
                                backgroundRepeat: 'no-repeat',
                                backgroundAttachment: 'fixed',
                                objectFit: "cover",
                                filter: 'grayscale(40%)',
                            }} />
                        </div>
                    </div>
                )}

        </div>
    )
}

export default Signup