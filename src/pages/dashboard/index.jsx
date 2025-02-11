import React, { useState, useEffect } from 'react';
import { FaPlus } from 'react-icons/fa';
import ProductTab from './ProductTab';
import OrdersReceived from './OrdersReceived';
import AvailableLocation from './AvailableLocation';
import Admins from './Admins';
import ProtectedPage from '@/component/ProtectedRoute';
import { Modal } from '@/component/Modal';
import { useApiContext } from '@/DashBoard/FetchContext';
const developmentUrl = 'https://buy-stuff-six.vercel.app'
const localUrl = 'http://localhost:3000'
export async function getServerSideProps(context) {
    const { req } = context;
    const token = req.cookies.token;
    if (!token) {
        return {
            redirect: {
                destination: '/auth/login',
                permanent: false,
            },
        };
    }
    try {
        const response = await fetch(`${developmentUrl}/api/auth/me`, {
            headers: {
                Cookie: `token=${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch user');
        }
        const { user } = await response.json();
        console.log(user);
        return {
            props: { user },
        };
    } catch (error) {
        console.error('Failed to fetch user:', error.message);
        return {
            redirect: {
                destination: '/auth/login',
                permanent: false,
            },
        };
    }
}


export default function AdminDashboard({ user }) {
    const [currentAction, setCurrentAction] = useState(0);
    const collections = ['Products', 'Orders Received', 'Available Location', 'Edit Admin'];
    const handleActionClick = (action) => {
        setCurrentAction(action);
    };
    const [isOpen, setModal] = useState(false)
    const { isModalOpen } = useApiContext()
    const toggleModal = () => {
        setModal(!isOpen)
        console.log(isOpen);

    }
    const currentTabName = collections[currentAction];
    const renderComponent = () => {
        switch (currentAction) {
            case 0:
                return <ProductTab toggleModal={toggleModal} user={user} />;
            case 1:
                return <OrdersReceived />;
            case 2:
                return <AvailableLocation />;
            case 3:
                return <Admins />;
            default:
                return null;
        }
    };

    useEffect(() => {

    }, []);

    return (
        <ProtectedPage>

            <section className='w-[90%] mt-4 py-[90px] mx-auto'>
                <div className='flex w-full justify-between items-center'>
                    <h1 className='lg:text-5xl xs:text-2xl capitalize'>Welcome {user.name}!</h1>
                    <div className='border border-black w-[40px] lg:h-[50px] lg:w-[50px] h-[40px] rounded-full'>
                    </div>
                </div>
                <h4 className='my-4 lg:text-sm xs:text-sm font-600'>{`Dashboard > ${currentTabName}`}</h4>
                <div className='grid xs:grid-cols-2 lg:grid-cols-4 gap-3'>
                    {collections.map((collection, idx) => (
                        <div key={idx} className='border rounded-lg bg-gray-dark text-white xs:px-3 xs:py-1 md:p-4 border-black'>
                            <h2 className='xs:text-sm md:text-md'>{collection}</h2>
                            <div className='border xs:my-4 md:my-3 md:w-6 md:h-6 xs:w-5 xs:h-5 grid items-center rounded-full justify-center border-white'>
                                <FaPlus onClick={() => handleActionClick(idx)} color='white' className='font-400 xs:text-[10px] md:text-sm' />
                            </div>
                        </div>
                    ))}
                </div>

                <div className='tab-body mt-4'>
                    {renderComponent()}
                </div>

                {isModalOpen &&
                    <Modal />
                }
            </section>
        </ProtectedPage>
    );
}