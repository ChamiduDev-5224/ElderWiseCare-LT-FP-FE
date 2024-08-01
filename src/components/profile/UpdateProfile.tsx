import React, { useState, useEffect } from 'react';
import logo from '../../assets/logo.svg';
import axios from 'axios';
import { isEmpty } from '../validation/FormValidation';
import { Msgs } from '../validation/Messages';
import { DangerMsg } from '../common/message/Messages';
import PanelLoader from '../common/loaders/PanelLoader';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Toast from '../common/toast/Toast';

// Define interfaces for types
interface FormData {
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
}

interface Location {
    id: number;
    name: string;
    province_id?: number;
    district_id?: number;
    latitude?: string;
    longitude?: string;
    postcode?: string;
}

interface Errors {
    [key: string]: string;
}

export const UpdateProfile = () => {
    const navigate = useNavigate();
    const userInfo = useSelector((state: any) => state.auth.userInfo);

    const [formData, setFormData] = useState<FormData>({
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

    const [districts, setDistricts] = useState<Location[]>([]);
    const [cities, setCities] = useState<Location[]>([]);
    const [provinces, setProvinces] = useState<Location[]>([]);
    const [cityData, setCityData] = useState<Location[]>([]);
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' }>({ message: '', type: 'info' });

    const [errors, setErrors] = useState<Errors>({});
    const [isLoader, setIsLoader] = useState(false);

    useEffect(() => {
        const fetchLocations = async () => {
            try {
                const response = await axios.get(import.meta.env.VITE_REACT_BASE_URL + '/essential/location');
                setProvinces(response.data.provinces);
                setDistricts(response.data.districts);
                setCityData(response.data.cities);
            } catch {
                window.location.reload();
            }
        };

        fetchLocations();
    }, []);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(import.meta.env.VITE_REACT_BASE_URL + `/user/${userInfo.id}`);
                setFormData({
                    ...response.data,
                    image: null // Do not set the image data from the response
                });
            } catch {
                showToast('Failed to fetch user data.', 'error');
            }
        };

        fetchUserData();
    }, [userInfo.id]);

    useEffect(() => {
        if (formData.province) {
            const selectedDistricts = districts.filter(dis => dis.province_id === parseInt(formData.province));
            setDistricts(selectedDistricts);
        } else {
            setDistricts([]);
        }
        setCities([]);
        setFormData(prevState => ({ ...prevState, district: '', city: '' }));
    }, [formData.province]);

    useEffect(() => {
        if (formData.district) {
            const selectedCities = cityData.filter(city => city.district_id === parseInt(formData.district));
            setCities(selectedCities);
        } else {
            setCities([]);
        }
        setFormData(prevState => ({ ...prevState, city: '' }));
    }, [formData.district]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setErrors(prevErrors => ({ ...prevErrors, [name]: '' }));
        setFormData({ ...formData, [name]: value });
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFormData({ ...formData, image: e.target.files[0] });
        }
    };

    const validateForm = () => {
        const newErrors: Errors = {};
        if (isEmpty(formData.firstName)) newErrors.firstName = Msgs.firstNameReq;
        if (isEmpty(formData.lastName)) newErrors.lastName = Msgs.lastNameReq;
        if (isEmpty(formData.telephone)) newErrors.telephone = Msgs.telephoneReq;
        if (isEmpty(formData.gender)) newErrors.gender = Msgs.genderReq;
        if (isEmpty(formData.userType)) newErrors.userType = Msgs.userTypeReq;
        if (isEmpty(formData.province)) newErrors.province = Msgs.provinceReq;
        if (isEmpty(formData.district)) newErrors.district = Msgs.districtReq;
        if (isEmpty(formData.city)) newErrors.city = Msgs.cityReq;
        if (isEmpty(formData.street)) newErrors.street = Msgs.streetReq;

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsLoader(true);
        let imageUrl: string = '';
        if (formData.image) {
            imageUrl = await uploadImage(formData.image);
        }
        setIsLoader(false);

        const selectedCity = cities.find(city => city.id == parseInt(formData.city));

        const dataToSubmit = {
            ...formData,
            imageUrl,
            latitude: parseFloat(selectedCity?.latitude || '0'),
            longitude: parseFloat(selectedCity?.longitude || '0'),
            zipcode: parseInt(selectedCity?.postcode || '0', 10),
            prefix: parseInt(formData.prefix, 10),
            telephone: parseInt(formData.telephone, 10),
            gender: parseInt(formData.gender, 10),
            userType: parseInt(formData.userType, 10),
            province: parseInt(formData.province, 10),
            district: parseInt(formData.district, 10),
            city: parseInt(formData.city, 10),
            street: formData.street,
            email: userInfo.email
        };

        try {
            const res = await axios.post(import.meta.env.VITE_REACT_BASE_URL + '/auth/reg-form', dataToSubmit);
            if (res.status === 201) {
                navigate('/');
            }
        } catch {
            showToast('Data submission is not successful.', 'error');
        }
        setIsLoader(false);
    };

    const uploadImage = async (imageFile: File) => {
        const formData = new FormData();
        formData.append('file', imageFile);

        const response = await axios.post(import.meta.env.VITE_REACT_BASE_URL + '/auth/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        return response.data;
    };

    const showToast = (message: string, type: 'success' | 'error' | 'info') => {
        setToast({ message, type });
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
                    <img src={logo} width={40} height={40} alt="Logo" />
                    <h2 className="text-3xl font-semibold text-gray-800 px-2">Profile Update</h2>
                </div>
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
                                <option value="">Select Prefix</option>
                                <option value="Mr">Mr</option>
                                <option value="Ms">Ms</option>
                            </select>
                            {errors.prefix && <DangerMsg msg={errors.prefix} />}
                        </div>
                        <div>
                            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name<span className="text-red-500">*</span></label>
                            <input
                                type="text"
                                id="firstName"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-600"
                            />
                            {errors.firstName && <DangerMsg msg={errors.firstName} />}
                        </div>
                        <div>
                            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name<span className="text-red-500">*</span></label>
                            <input
                                type="text"
                                id="lastName"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-600"
                            />
                            {errors.lastName && <DangerMsg msg={errors.lastName} />}
                        </div>
                        <div>
                            <label htmlFor="telephone" className="block text-sm font-medium text-gray-700">Telephone<span className="text-red-500">*</span></label>
                            <input
                                type="tel"
                                id="telephone"
                                name="telephone"
                                value={formData.telephone}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-600"
                            />
                            {errors.telephone && <DangerMsg msg={errors.telephone} />}
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
                                <option value="">Select Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                            {errors.gender && <DangerMsg msg={errors.gender} />}
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
                                <option value="">Select User Type</option>
                                <option value="caregiver">Caregiver</option>
                                <option value="caretaker">Caretaker</option>
                            </select>
                            {errors.userType && <DangerMsg msg={errors.userType} />}
                        </div>
                    </div>
                </section>
                <section className="px-6 mt-6">
                    <h3 className="text-lg font-medium text-gray-700 mb-2">Location Information</h3>
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
                                <option value="">Select Province</option>
                                {provinces.map(province => (
                                    <option key={province.id} value={province.id}>{province.name}</option>
                                ))}
                            </select>
                            {errors.province && <DangerMsg msg={errors.province} />}
                        </div>
                        <div>
                            <label htmlFor="district" className="block text-sm font-medium text-gray-700">District<span className="text-red-500">*</span></label>
                            <select
                                id="district"
                                name="district"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-600"
                                value={formData.district}
                                onChange={handleChange}
                            >
                                <option value="">Select District</option>
                                {districts.map(district => (
                                    <option key={district.id} value={district.id}>{district.name}</option>
                                ))}
                            </select>
                            {errors.district && <DangerMsg msg={errors.district} />}
                        </div>
                        <div>
                            <label htmlFor="city" className="block text-sm font-medium text-gray-700">City<span className="text-red-500">*</span></label>
                            <select
                                id="city"
                                name="city"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-600"
                                value={formData.city}
                                onChange={handleChange}
                            >
                                <option value="">Select City</option>
                                {cities.map(city => (
                                    <option key={city.id} value={city.id}>{city.name}</option>
                                ))}
                            </select>
                            {errors.city && <DangerMsg msg={errors.city} />}
                        </div>
                        <div>
                            <label htmlFor="street" className="block text-sm font-medium text-gray-700">Street<span className="text-red-500">*</span></label>
                            <input
                                type="text"
                                id="street"
                                name="street"
                                value={formData.street}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-600"
                            />
                            {errors.street && <DangerMsg msg={errors.street} />}
                        </div>
                        <div>
                            <label htmlFor="image" className="block text-sm font-medium text-gray-700">Image</label>
                            <input
                                type="file"
                                id="image"
                                name="image"
                                onChange={handleImageChange}
                                className="mt-1 block w-full text-sm text-gray-500"
                            />
                        </div>
                    </div>
                </section>
                <div className="px-6 py-4 flex justify-end">
                    <button
                        type="submit"
                        className="bg-green-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600"
                    >
                        Update Profile
                    </button>
                </div>
            </form>
        </div>
    );
};
