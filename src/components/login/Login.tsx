import { ChangeEvent, useEffect, useState } from "react";
import PanelLoader from "../common/loaders/PanelLoader";
import logo from '../../assets/logo.svg';
import loginImg from '../../assets/signup.svg';
import { Link } from "react-router-dom";
import { DangerMsg } from "../common/message/Messages";
import { isEmail, isEmpty } from "../validation/FormValidation";
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { Msgs } from "../validation/Messages";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setToken } from "../../redux/slices/auth_slice";
import Toast from "../common/toast/Toast";

export const Login = () => {
    const [loading, setLoading] = useState(true);
    const [formSubmit, setFormSubmit] = useState(false);
    const [data, setData] = useState({
        email: '',
        password: ''
    });
    const [emailErr, setEmailErr] = useState('');
    const [paswdErr, setPaswdErr] = useState('');
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' }>({ message: '', type: 'info' });

    const googleClientId = import.meta.env.VITE_REACT_GOOGLE_CLIENT_ID;
    const showToast = (message: string, type: 'success' | 'error' | 'info') => {
        setToast({ message, type });
    };

    const dispatch = useDispatch();
    const nav = useNavigate();

    useEffect(() => {
        const img = new Image();
        img.src = loginImg;
        img.onload = () => setLoading(false);
    }, []);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setData({
            ...data,
            [e.target.id]: e.target.value,
        });
        setEmailErr('');
        setPaswdErr('');
    };



    const handleSubmit = async () => {

        setFormSubmit(true);

        if (isEmpty(data.email)) {
            setFormSubmit(false);
            return setEmailErr(Msgs.emailReq);
        }
        if (!isEmail(data.email)) {
            setFormSubmit(false);
            return setEmailErr(Msgs.emilValid);
        }
        if (isEmpty(data.password)) {
            setFormSubmit(false);
            return setPaswdErr(Msgs.pwdReq);
        }

        axios.post(`${import.meta.env.VITE_REACT_BASE_URL}/auth/login`, data)
            .then(function (response) {
                
                if (response.data) {
                    localStorage.setItem('token', response.data.accessToken);
                    localStorage.setItem('refreshToken', response.data.refreshToken); // Store the refresh token
                    dispatch(setToken(response.data.accessToken));

                    if (response.data.userSts == 3) {
                        nav('/regform');
                    } else if (response.data.userSts == 1) {
                        nav('/');
                    }

                }
            })
            .catch(function () {
                showToast('Sorry! Your login credentials are not correct.', 'error')
            })
            .finally(() => {
                setFormSubmit(false);
            });

    }


    return (
        <div className={`h-full`}>
            {formSubmit && <PanelLoader />}
            {toast.message && (
                            <Toast
                                message={toast.message}
                                type={toast.type}
                                duration={5000}
                                onClose={() => setToast({ message: '', type: 'info' })}
                            />
                        )}
            {loading ? (
                <PanelLoader />
            ) : (
                <div className="flex flex-row justify-between">
                    <div className="flex flex-col w-[100%] md:w-[50%] lg:w-[40%] px-16 py-10 z-[900]">
                        <img src={logo} alt="logo" width={100} height={100} className='self-center' />
                        <p className='font-semibold mt-4'>Email</p>
                        <input
                            type="text"
                            id="email"
                            className='border-2 pl-6 py-2 rounded-md border-mid-green'
                            value={data.email}
                            onChange={handleChange}
                        />
                        <DangerMsg msg={emailErr} />
                        <p className='font-semibold mt-4'>Password</p>
                        <input
                            type="password"
                            id="password"
                            className='border-2 pl-6 py-2  rounded-md border-mid-green'
                            value={data.password}
                            onChange={handleChange}
                        />
                        <DangerMsg msg={paswdErr} />
                        <p className='mt-2 text-sm text-slate-500 font-normal'>Forgot password?</p>
                        <button
                            className='mt-6 bg-dark-green text-light-green rounded-md py-3 hover:drop-shadow-xl'
                            type="button"
                            onClick={handleSubmit}
                        >
                            Login
                        </button>
                        <div className='mt-2 rounded-md py-3 flex flex-row items-center justify-center gap-3 hover:drop-shadow-lg'>
                            <GoogleOAuthProvider clientId={googleClientId}>
                                <GoogleLogin
                                    onSuccess={credentialResponse => {
                                    }}
                                    onError={() => {
                                    }}
                                    locale="2"
                                />
                            </GoogleOAuthProvider>
                        </div>
                        <p className='mt-2 text-sm text-slate-500 font-normal'>
                            Don't have an account?
                            <Link to="/signup">
                                <strong className='underline cursor-pointer hover:text-slate-700 active:text-slate-600'> Register</strong>
                            </Link>
                        </p>
                    </div>
                    <div className='md:flex flex-row bg-dark-green h-fit w-[60%] justify-end hidden'>
                        <div className='flex flex-col'>
                            <h4 className='xl:text-4xl lg:text-3xl text-white font-bold top-[230px] hidden lg:block lg:right-[280px] xl:right-[350px] absolute z-30 shadow-xl'>
                                -"Join Us and Make Caring
                            </h4>
                            <h4 className='xl:text-4xl lg:text-3xl text-white font-bold ml-20 z-30 top-[280px] md:right-[280px] hidden lg:block xl:right-[320px] absolute shadow-xl'>
                                for Loved Ones Easier"-
                            </h4>
                        </div>
                        <img
                            src={loginImg}
                            alt="signup image"
                            className='h-screen rounded-3xl text-right flex-shrink'
                            style={{
                                backgroundRepeat: 'no-repeat',
                                backgroundAttachment: 'fixed',
                                objectFit: "cover",
                                filter: 'grayscale(40%)',
                            }}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};
