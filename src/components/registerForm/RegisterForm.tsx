// src/components/ModernForm.tsx
import React, { useState, useEffect } from 'react';
import { RiErrorWarningFill } from "react-icons/ri";
import logo from '../../assets/logo.svg'
import axios from 'axios';
import { isEmpty } from '../validation/FormValidation';
import { Msgs } from '../validation/Messages';
import { DangerMsg } from '../common/message/Messages';
import PanelLoader from '../common/loaders/PanelLoader';
import { useDispatch, useSelector } from 'react-redux';
import { registerInfo } from '../../redux/slices/auth_slice';
import api from '../../interceptors/Apis';
import { useNavigate } from 'react-router-dom';
import Toast from '../common/toast/Toast';
const RegisterForm: React.FC = () => {

    const navigate = useNavigate()
    useEffect(() => {

        axios.get(import.meta.env.VITE_REACT_BASE_URL + '/essential/location')
            .then(function (response) {

                // handle success
                setProvinces(response.data.provinces)
                setDisctricts(response.data.districts)

                setCityData(response.data.cities)
            })
            .catch(function () {
                window.location.reload;
            })

        const fetchUserProfile = async () => {
            try {
                const response = await api.get('/auth/profile');
                if (response.status == 200) {
                    if (response.data.sts !== 3) {
                        navigate('/')
                    }
                    dispatch(registerInfo(response.data));
                }
            } catch (error) {
                window.location.reload;
            }
        };

        fetchUserProfile();

    }, [])
    const userInfo = useSelector((state: any) => state.auth.userInfo);

    const [formData, setFormData] = useState<{
        prefix: string;
        firstName: string;
        lastName: string;
        telephone: string;
        gender: string;
        userType: string;
        province: string;
        district: string;
        city: string;
        street: string;
        image: File | null;
    }>({
        prefix: '',
        firstName: '',
        lastName: '',
        telephone: '',
        gender: '',
        userType: '',
        province: '',
        district: '',
        city: '',
        street: '',
        image: null,
    });


    const [districts, setDistricts] = useState<any[]>([])
    const [cities, setCities] = useState<any[]>([])

    const [provinces, setProvinces] = useState<any[]>([])
    const [disctricts, setDisctricts] = useState<any[]>([])
    const [cityData, setCityData] = useState<any[]>([])
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' }>({ message: '', type: 'info' });

    const [PrefixeErrMsg, setPreffixErrorMsg] = useState('')
    const [fNameErrMsg, setFNameErrorMsg] = useState('')
    const [lNameErrMsg, setLNameErrorMsg] = useState('')
    const [tpErrMsg, setTpErrorMsg] = useState('')
    const [genderErrMsg, setGenderErrorMsg] = useState('')
    const [userTypeErrMsg, setuUserTypeErrorMsg] = useState('')
    const [cityErrMsg, setCityErrorMsg] = useState('')
    const [provinceErrMsg, setProvinceErrorMsg] = useState('')
    const [disctrictErrMsg, setDisctrictErrorMsg] = useState('')
    const [streetErrMsg, setStreetErrorMsg] = useState('')
    const [isLoader, setIsLoader] = useState(false)
    const dispatch = useDispatch()
    const showToast = (message: string, type: 'success' | 'error' | 'info') => {
        setToast({ message, type });
    };


    useEffect(() => {
        if (formData.province) {

            const selectedDistricts = disctricts.filter(dis => dis.province_id == formData.province);
            setDistricts(selectedDistricts.length > 0 ? selectedDistricts : []);
        } else {
            setDistricts([]);
        }
        setCities([]);
        setFormData(prevState => ({ ...prevState, district: '', city: '' }));
    }, [formData.province]);

    useEffect(() => {
        if (formData.district) {
            const selectedCities = cityData.filter(city => city.district_id == formData.district);
            setCities(selectedCities.length > 0 ? selectedCities : []);
        } else {
            setCities([]);
        }
        setFormData(prevState => ({ ...prevState, city: '' }));
    }, [formData.district]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setPreffixErrorMsg('')
        setFNameErrorMsg('')
        setLNameErrorMsg('')
        setTpErrorMsg('')
        setGenderErrorMsg('')
        setuUserTypeErrorMsg('')
        setCityErrorMsg('')
        setProvinceErrorMsg('')
        setDisctrictErrorMsg('')
        setStreetErrorMsg('')
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoader(true)
        // Validate form inputs
        if (isEmpty(formData.firstName)) {
            setFNameErrorMsg(Msgs.firstNameReq);
            setIsLoader(false)
            return;
        }
        if (isEmpty(formData.lastName)) {
            setLNameErrorMsg(Msgs.lastNameReq);
            setIsLoader(false)
            return;
        }

        if (isEmpty(formData.telephone)) {
            setTpErrorMsg(Msgs.telephoneReq);
            setIsLoader(false)
            return;
        }
        if (isEmpty(formData.gender)) {
            setGenderErrorMsg(Msgs.genderReq);
            setIsLoader(false)
            return;
        }
        if (isEmpty(formData.userType)) {
            setuUserTypeErrorMsg(Msgs.userTypeReq);
            setIsLoader(false)
            return;
        }
        if (isEmpty(formData.province)) {
            setProvinceErrorMsg(Msgs.provinceReq);
            setIsLoader(false)
            return;
        }
        if (isEmpty(formData.district)) {
            setDisctrictErrorMsg(Msgs.districtReq);
            setIsLoader(false)
            return;
        }
        if (isEmpty(formData.city)) {
            setCityErrorMsg(Msgs.cityReq);
            setIsLoader(false)
            return;
        }

        if (isEmpty(formData.street)) {
            setStreetErrorMsg(Msgs.streetReq);
            setIsLoader(false)
            return;
        }
        // Handle form submission
        let imageUrl: any = '';
        if (formData.image) {
            imageUrl = await uploadImage(formData.image);
        }
        setIsLoader(false)

        const selCity = cities.find((city) => city.id == formData.city);

        const dataToSubmit = {
            ...formData,
            imageUrl,
            latitude: parseFloat(selCity.latitude.toString()),
            longitude: parseFloat(selCity.longitude.toString()),
            zipcode: parseInt(selCity.postcode.toString(), 10),
            prefix: parseInt(formData.prefix, 10),
            telephone: parseInt(formData.telephone, 10),
            gender: parseInt(formData.gender, 10),
            userType: parseInt(formData.userType, 10),
            province: parseInt(formData.province, 10),
            district: parseInt(formData.district, 10),
            city: parseInt(formData.city, 10),
            street: formData.street, // Assuming this is correctly a string
            email: userInfo.email // Assuming this is correctly a string
        };

        // main form submit 
        try {
            const res = await axios.post(import.meta.env.VITE_REACT_BASE_URL + '/auth/reg-form', dataToSubmit);
            if (res.status == 201) {
                navigate('/');
            }
        } catch (error) {
            showToast('Data submission is not succesful.', 'error')

        }
        setIsLoader(false)

    };


    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFormData({ ...formData, image: e.target.files[0] });
        }
    };

    const uploadImage = async (imageFile: any) => {
        const formData = new FormData();
        formData.append('file', imageFile);

        const response = await axios.post(import.meta.env.VITE_REACT_BASE_URL + '/auth/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        setIsLoader(false)

        return response.data;
    };


    return (
        <div className="flex justify-center py-8 px-4 sm:px-6 lg:px-4">
            {isLoader && <PanelLoader />}
            {toast.message && (
                <Toast
                    message={toast.message}
                    type={toast.type}
                    duration={5000}
                    onClose={() => setToast({ message: '', type: 'info' })}
                />
            )}
            <form
                className="w-full max-w-screen-lg bg-white rounded-lg shadow-md"
                onSubmit={handleSubmit}
            >
                <div className='flex flex-row items-center px-6 mb-5'>
                    <img src={logo} width={40} height={40} />
                    <h2 className="text-3xl font-semibold text-gray-800 px-2">Future Information Update</h2>

                </div>
                {/* Basic Information Section */}
                <section className="px-6">
                    <h3 className="text-lg font-medium text-gray-700 mb-2">Basic Information</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="prefix" className="block text-sm font-medium text-gray-700">Prefix<span className="text-red-500">*</span></label>
                            <select
                                id="prefix"
                                name="prefix"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-600"
                                value={formData.prefix}
                                onChange={handleChange}
                            >
                                <option value={0}>Select</option>
                                <option value={4}>Dr</option>
                                <option value={1}>Mr</option>
                                <option value={3}>Mrs</option>
                                <option value={2}>Ms</option>
                                <option value={5}>Prof</option>

                            </select>
                            <DangerMsg msg={PrefixeErrMsg} />

                        </div>
                        <div>
                            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name<span className="text-red-500">*</span></label>
                            <input
                                type="text"
                                id="firstName"
                                name="firstName"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-600"
                                placeholder="Enter your first name"
                                value={formData.firstName}
                                onChange={handleChange}

                            />
                            <DangerMsg msg={fNameErrMsg} />

                        </div>
                        <div>
                            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name<span className="text-red-500">*</span></label>
                            <input
                                type="text"
                                id="lastName"
                                name="lastName"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-600"
                                placeholder="Enter your last name"
                                value={formData.lastName}
                                onChange={handleChange}

                            />
                            <DangerMsg msg={lNameErrMsg} />

                        </div>
                        <div>
                            <label htmlFor="telephone" className="block text-sm font-medium text-gray-700">Telephone<span className="text-red-500">*</span></label>
                            <input
                                type="tel"
                                id="telephone"
                                name="telephone"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-600"
                                placeholder="Enter your telephone number"
                                value={formData.telephone}
                                onChange={handleChange}
                                maxLength={10}

                            />
                            <DangerMsg msg={tpErrMsg} />

                        </div>
                        <div>
                            <label htmlFor="gender" className="block text-sm font-medium text-gray-700">Gender<span className="text-red-500">*</span></label>
                            <select
                                id="gender"
                                name="gender"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-600"
                                value={formData.gender}
                                onChange={handleChange}

                            >
                                <option value={0}>Select</option>
                                <option value={2}>Female</option>
                                <option value={1}>Male</option>
                                <option value={3}>Other</option>
                            </select>
                            <DangerMsg msg={genderErrMsg} />

                        </div>
                        <div>
                            <label htmlFor="userType" className="block text-sm font-medium text-gray-700">User Type<span className="text-red-500">*</span></label>
                            <select
                                id="userType"
                                name="userType"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-600"
                                value={formData.userType}
                                onChange={handleChange}

                            >
                                <option value="">Select</option>
                                <option value={1}>Caretaker</option>
                                <option value={2}>Caregiver</option>
                            </select>
                            <DangerMsg msg={userTypeErrMsg} />

                        </div>
                        <div>
                            <label htmlFor="image" className="block text-sm font-medium text-gray-700">Profile Image</label>
                            <input
                                type="file"
                                id="image"
                                name="image"
                                accept="image/*"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-600"
                                onChange={handleImageChange}

                            />
                        </div>
                    </div>
                </section>

                {/* Address Section */}
                <section className="px-6 mt-6">
                    <h3 className="text-lg font-medium text-gray-700 mb-2">Address</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="province" className="block text-sm font-medium text-gray-700">Province<span className="text-red-500">*</span></label>
                            <select
                                id="province"
                                name="province"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-600"
                                value={formData.province}
                                onChange={handleChange}

                            >
                                <option value="">Select</option>
                                {provinces?.map((province) => (
                                    <option key={province.id} value={province.id}>
                                        {province.name_en}
                                    </option>
                                ))}
                            </select>
                            <DangerMsg msg={provinceErrMsg} />

                        </div>
                        <div>
                            <label htmlFor="district" className="block text-sm font-medium text-gray-700">District<span className="text-red-500">*</span></label>
                            <select
                                id="district"
                                name="district"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-600"
                                value={formData.district}
                                onChange={handleChange}
                                disabled={!formData.province}

                            >
                                <option value="">Select</option>
                                {districts.map((district) => (
                                    <option key={district.id} value={district.id}>
                                        {district.name_en}
                                    </option>
                                ))}
                            </select>
                            <DangerMsg msg={disctrictErrMsg} />

                        </div>
                        <div>
                            <label htmlFor="city" className="block text-sm font-medium text-gray-700">City<span className="text-red-500">*</span></label>
                            <select
                                id="city"
                                name="city"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-600"
                                value={formData.city}
                                onChange={handleChange}
                                disabled={!formData.district}

                            >
                                <option value="">Select</option>
                                {cities.map((city) => (
                                    <option key={city.id} value={city.id}>
                                        {city.name_en}
                                    </option>
                                ))}
                            </select>
                            <DangerMsg msg={cityErrMsg} />

                        </div>
                    </div>
                    <div>
                        <label htmlFor="street" className="block text-sm font-medium mt-2 text-gray-700">Street<span className="text-red-500">*</span></label>
                        <input
                            type="text"
                            id="street"
                            name="street"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-600"
                            placeholder="Enter your street"
                            value={formData.street}
                            onChange={handleChange}
                        />
                        <DangerMsg msg={streetErrMsg} />

                    </div>
                </section>

                {/* Submit Button */}
                <div className="px-6 my-6 flex flex-row items-center justify-between gap-4">
                    <div className='flex flex-row items-center gap-1'>
                        <RiErrorWarningFill /><span className='text-black font-semibold'>
                            Fill all the fields that have asterisk.</span>
                    </div>
                    <div className='flex flex-col md:flex-row gap-2'>
                        <button
                            type="submit"
                            className=" bg-white border w-40 md:w-fit border-black font-semibold text-black py-3 px-12 hover:bg-slate-50 rounded-md shadow focus:outline-none focus:ring-2 focus:ring-gray-900"
                        >
                            Clear
                        </button>
                        <button
                            type="submit"
                            className=" md:ml-2 bg-dark-green w-40 md:w-fit text-white py-3 px-4 rounded-md shadow hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-gray-900"
                        >
                            Update Information
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default RegisterForm;
