import { Navigate, Outlet } from 'react-router-dom';
import api from '../interceptors/Apis';
import { useEffect, useState } from 'react';
import { registerInfo } from '../redux/slices/auth_slice';
import { useDispatch } from 'react-redux';

const ProtectedRoute: React.FC<{ children?: React.ReactNode; defaultRedirectPath?: string }> = ({
    children,
    defaultRedirectPath = '/signin',
}) => {
    const [valid, setIsValid] = useState(false);
    const [loading, setLoading] = useState(true); // Loading state
    const [redirectPath, setRedirectPath] = useState<string | null>(null); // Redirect path state
    const dispatch = useDispatch();
    
    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await api.get('/auth/profile');

                if (response.status === 200) {
                    if (response.data.sts !== 3) {
                        setIsValid(true);
                    } else {
                        setRedirectPath('/regform');
                    }
                    dispatch(registerInfo(response.data));

                } else {
                    setIsValid(false);
                }
            } catch (error) {
                console.error('API Error:', error);
                setIsValid(false);
            } finally {
                setLoading(false);
            }
        };

        fetchUserProfile();
    }, [dispatch]);



    if (loading) {
        return null;
    }


    if (redirectPath) {
        return <Navigate to={redirectPath} replace />;
    }

    if (!valid) {
        return <Navigate to={defaultRedirectPath} replace />;
    }

    return children ? children : <Outlet />;
};

export default ProtectedRoute;
