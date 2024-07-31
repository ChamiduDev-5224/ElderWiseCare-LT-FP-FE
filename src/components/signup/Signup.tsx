

import { ChangeEvent, useEffect, useState } from 'react';
import signupImg from '../../assets/signup.svg'
import logo from '../../assets/logo.svg'
import google from '../../assets/google.svg'
import PanelLoader from '../common/loaders/PanelLoader';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { DangerMsg } from '../common/message/Messages';
import { isEmail, isEmpty, passwordLength } from '../validation/FormValidation';
import { Msgs } from '../validation/Messages';
import Toast from '../common/toast/Toast';
import { useDispatch } from "react-redux";
import { registerInfo } from '../../redux/slices/auth_slice';

const Signup = () => {
    const [loading, setLoading] = useState(true);
    const [formSubmit, setFormSubmit] = useState(false);
    const [emailErr, setEmailErr] = useState('')
    const [paswdErr, setPaswdErr] = useState('')
    const [userNameErr, setUserNameErr] = useState('')
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' }>({ message: '', type: 'info' });
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const showToast = (message: string, type: 'success' | 'error' | 'info') => {
        setToast({ message, type });
    };
    const [data, setData] = useState({
        userName: '',
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

        setFormSubmit(true) // loader acive 

        //userName empty
        if (isEmpty(data.userName)) {
            setFormSubmit(false);
            return setUserNameErr(Msgs.usernReq)
        }

        //email empty
        if (isEmpty(data.email)) {
            setFormSubmit(false);
            return setEmailErr(Msgs.emailReq)
        }
        //email check
        if (!isEmail(data.email)) {
            setFormSubmit(false);
            return setEmailErr(Msgs.emilValid)
        }
        //Pwd empty
        if (isEmpty(data.password)) {
            setFormSubmit(false);
            return setPaswdErr(Msgs.pwdReq)
        }

        //Pwd Length
        if (!passwordLength(data.password)) {
            setFormSubmit(false);
            return setPaswdErr(Msgs.pwdLength)
        }

        axios.post(import.meta.env.VITE_REACT_BASE_URL + '/auth/signup', data)
            .then(function (response) {
                if (response.data.sts == 1) {
                    dispatch(registerInfo(response.data.data));
                    navigate('/signin')
                } else {
                    showToast(response.data.message, 'error')
                }
            })
            .catch(function () {
                showToast("You can't signup. Please try it again.", 'error')
            });

        setFormSubmit(false)//loader deactive

    }

    //change values
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setData({
            ...data,
            [e.target.id]: e.target.value,
        });
        setUserNameErr('')
        setPaswdErr('')
        setEmailErr('')
    };


    return (
        <div className={`h-full`}>
            {formSubmit && (<PanelLoader />)}
            {loading ? (
                <PanelLoader />
            ) :
                (
                    <div className="flex flex-row justify-between">
                        <div className="flex flex-col w-[100%] md:w-[50%] lg:w-[40%] px-16 py-8 z-[900]">
                            <img src={logo} alt="logo" width={100} height={100} className='self-center' />
                            <p className='font-semibold mt-4'>User Name</p>
                            <input type="text" id="userName"
                                className='border-2 pl-6 py-2 rounded-md border-mid-green' value={data.userName} onChange={(e) => {
                                    handleChange(e);
                                }} />
                            <DangerMsg msg={userNameErr} />

                            <p className='font-semibold mt-4'>Email</p>
                            <input type="email" id="email"
                                className='border-2 pl-6 py-2 text-gray-400 rounded-md border-mid-green' value={data.email} onChange={(e) => {
                                    handleChange(e);
                                }} />
                            <DangerMsg msg={emailErr} />
                            <p className='font-semibold mt-4'>Password</p>
                            <input type="password" id="password"
                                className='border-2 pl-6 py-2  rounded-md border-mid-green' value={data.password} onChange={(e) => {
                                    handleChange(e);
                                }} />
                            <DangerMsg msg={paswdErr} />

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
                        {toast.message && (
                            <Toast
                                message={toast.message}
                                type={toast.type}
                                duration={5000}
                                onClose={() => setToast({ message: '', type: 'info' })}
                            />
                        )}
                    </div>

                )}

        </div>
    )
}

export default Signup