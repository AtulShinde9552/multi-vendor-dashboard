import React, { useEffect, useState } from 'react';
import { BsImages } from 'react-icons/bs';
import { FaEdit } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import { PropagateLoader, FadeLoader } from 'react-spinners';
import toast from 'react-hot-toast';
import { useSelector, useDispatch } from 'react-redux';
import { overrideStyle } from '../../utils/utils';
import { profile_image_upload } from '../../store/Reducers/authReducer';
import { get_seller, messageClear, update_seller_data } from '../../store/Reducers/sellerReducer';

const Profile = () => {
    const [isEditing, setIsEditing] = useState(false);
    const dispatch = useDispatch();
    const { sellerId } = useParams();
    const { seller, successMessage, shopInfo } = useSelector(state => state.seller);
    const { userInfo, loader } = useSelector(state => state.auth);

    const [state, setState] = useState({
        shopName: '',
        division: '',
        district: '',
        address: '',
        bankName: '',
        bankAccount: '',
        ifscCode: '',
        pinCode: ''
    });

    const inputHandle = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        });
    };

    useEffect(() => {
        if (sellerId) {
            dispatch(get_seller(sellerId));
        }
    }, [sellerId, dispatch]);

    useEffect(() => {
        if (seller) {
            setState({
                shopName: seller.shopName || '',
                division: seller.division || '',
                district: seller.district || '',
                address: seller.address || '',
                bankName: seller.bankName || '',
                bankAccount: seller.bankAccount || '',
                ifscCode: seller.ifscCode || '',
                pinCode: seller.pinCode || ''
            });
        }
    }, [seller]);

    const add_image = (e) => {
        if (e.target.files.length > 0) {
            const formData = new FormData();
            formData.append('image', e.target.files[0]);
            dispatch(profile_image_upload(formData));
        }
    };

    useEffect(() => {
        if (successMessage) {
            toast.success(successMessage);
            dispatch(messageClear());
            setIsEditing(false);
            dispatch(get_seller(sellerId)); // Fetch the updated seller data
        }
    }, [successMessage, dispatch, sellerId]);

    const add = (e) => {
        e.preventDefault();
        const shopInfo = {
            shopName: state.shopName,
            division: state.division,
            district: state.district,
            address: state.address,
            bankName: state.bankName,
            bankAccount: state.bankAccount,
            ifscCode: state.ifscCode,
            pinCode: state.pinCode
        };
        dispatch(update_seller_data({ shopInfo, sellerId }));
    };

    if (!seller) {
        return (
            <div className="flex justify-center items-center h-screen">
                <PropagateLoader color="#fff" cssOverride={overrideStyle} />
            </div>
        );
    }

    return (
        <div className='px-2 lg:px-7 py-5'>
            <div className='w-full flex flex-wrap'>
                <div className='w-full md:w-6/12'>
                    <div className='w-full p-4 bg-[#283046] rounded-md text-[#d0d2d6]'>
                        <div className='flex justify-center items-center py-3'>
                            {userInfo?.image ? (
                                <label htmlFor="img" className='h-[210px] w-[300px] relative p-3 cursor-pointer overflow-hidden'>
                                    <img className='w-full h-full' src={userInfo.image} alt="" />
                                    {loader && (
                                        <div className='bg-slate-600 absolute left-0 top-0 w-full h-full opacity-70 flex justify-center items-center z-20'>
                                            <FadeLoader />
                                        </div>
                                    )}
                                </label>
                            ) : (
                                <label className='flex justify-center items-center flex-col h-[210px] w-[300px] cursor-pointer border border-dashed hover:border-indigo-500 border-[#d0d2d6] relative' htmlFor="img">
                                    <BsImages />
                                    <span>Select Image</span>
                                    {loader && (
                                        <div className='bg-slate-600 absolute left-0 top-0 w-full h-full opacity-70 flex justify-center items-center z-20'>
                                            <FadeLoader />
                                        </div>
                                    )}
                                </label>
                            )}
                            <input onChange={add_image} type="file" className='hidden' id='img' />
                        </div>
                        <div className='px-0 md:px-5 py-2'>
                            <div className='flex justify-between text-sm flex-col gap-2 p-4 bg-slate-800 rounded-md relative'>
                                <span className='p-[6px] bg-yellow-500 rounded hover:shadow-lg hover:shadow-yellow-500/50 absolute right-2 top-2 cursor-pointer' onClick={() => setIsEditing(!isEditing)}>
                                    <FaEdit />
                                </span>
                                <div className='flex gap-2'>
                                    <span>Name:</span>
                                    <span>{seller?.name || 'N/A'}</span>
                                </div>
                                <div className='flex gap-2'>
                                    <span>Email:</span>
                                    <span>{seller?.email || 'N/A'}</span>
                                </div>
                                <div className='flex gap-2'>
                                    <span>Role:</span>
                                    <span>{seller?.role || 'N/A'}</span>
                                </div>
                                <div className='flex gap-2'>
                                    <span>Status:</span>
                                    <span>{seller?.status || 'N/A'}</span>
                                </div>
                            </div>
                        </div>
                        <div className='px-0 md:px-5 py-2'>
                            {isEditing ? (
                                <form onSubmit={add}>
                                    {Object.keys(state).map((key) => (
                                        <div className='flex flex-col w-full gap-1 mb-3' key={key}>
                                            <label htmlFor={key}>{key.charAt(0).toUpperCase() + key.slice(1)}</label>
                                            <input value={state[key]} onChange={inputHandle} className='px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]' type="text" placeholder={key} name={key} id={key} />
                                        </div>
                                    ))}
                                    <button disabled={loader} className='bg-blue-500 w-[190px] hover:shadow-blue-500/20 hover:shadow-lg text-white rounded-md px-7 py-2 mb-3'>
                                        {loader ? <PropagateLoader color='#fff' cssOverride={overrideStyle} /> : 'Update Info'}
                                    </button>
                                </form>
                            ) : (
                                <div className='flex flex-col gap-3'>
                                    {Object.keys(state).map((key) => (
                                        <div className='flex gap-2' key={key}>
                                            <span>{key.charAt(0).toUpperCase() + key.slice(1)}:</span>
                                            <span>{state[key]}</span>
                                        </div>
                                    ))}
                                    <button onClick={() => setIsEditing(true)} className='bg-yellow-500 hover:shadow-yellow-500/50 hover:shadow-lg text-white rounded-md px-7 py-2 mt-3'>
                                        Edit Info
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className='w-full md:w-6/12'>
                    <div className='w-full pl-0 md:pl-7 mt-6 md:mt-0'>
                        <div className='bg-[#283046] rounded-md text-[#d0d2d6] p-4'>
                            <h1 className='text-[#d0d2d6] text-lg mb-3 font-semibold'>Change Password</h1>
                            <form>
                                <div className='flex flex-col w-full gap-1 mb-3'>
                                    <label htmlFor="email">Email</label>
                                    <input className='px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]' type="email" placeholder='email' name='email' id='email' />
                                </div>
                                <div className='flex flex-col w-full gap-1'>
                                    <label htmlFor="o_password">Old Password</label>
                                    <input className='px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]' type="password" placeholder='old password' name='old_password' id='o_password' />
                                </div>
                                <div className='flex flex-col w-full gap-1'>
                                    <label htmlFor="n_password">New Password</label>
                                    <input className='px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]' type="password" placeholder='new password' name='new_password' id='n_password' />
                                </div>
                                <button className='bg-blue-500 hover:shadow-blue-500/50 hover:shadow-lg text-white rounded-md px-7 py-2 mt-5'>Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
