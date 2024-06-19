import React, { useEffect, useState } from 'react';
import { PropagateLoader } from 'react-spinners';
import toast from 'react-hot-toast';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { overrideStyle } from '../../utils/utils';
import { messageClear, regional_admin_register } from '../../store/Reducers/authReducer';

const AddRegionalAdmin = () => {
    const navigate = useNavigate()
    const [register, setRegister] = useState({
        email: '',
        name: '',
        password: ''
    });
    const dispatch = useDispatch();
    const { loader,errorMessage, successMessage } = useSelector(state => state.auth);

    const inputHandle = (e) => {
        setRegister({
            ...register,
            [e.target.name]: e.target.value
        });
    };

    const registerHandle = (e) => {
        e.preventDefault();
        dispatch(regional_admin_register(register))
    };

    useEffect(() => {
        if (successMessage) {
            toast.success(successMessage)
            dispatch(messageClear())
            setTimeout(() => {
                navigate('/admin/dashboard/regionaladmins');
                window.location.reload();
            }, 2000);
        }
        if (errorMessage) {
            toast.error(errorMessage)
            dispatch(messageClear())
        }
    }, [successMessage, errorMessage])
  return (
    <div className='px-2 lg:px-7 py-5'>
    <div className='w-full flex flex-wrap justify-center'>
        <div className='w-full md:w-6/12'>
            <div className='w-full pl-0 md:pl-7 mt-6 md:mt-0'>
                <div className='bg-[#283046] rounded-md text-[#d0d2d6] p-4 mt-6'>
                    <h1 className='text-[#d0d2d6] text-lg mb-3 font-semibold'>Register</h1>
                    <form onSubmit={registerHandle}>
                        <div className='flex flex-col w-full gap-1 mb-3'>
                            <label htmlFor="reg_email">Email</label>
                            <input 
                                value={register.email} 
                                onChange={inputHandle} 
                                className='px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]' 
                                type="email" 
                                placeholder='email' 
                                name='email' 
                                id='reg_email' 
                            />
                        </div>
                        <div className='flex flex-col w-full gap-1 mb-3'>
                            <label htmlFor="reg_name">Name</label>
                            <input 
                                value={register.name} 
                                onChange={inputHandle} 
                                className='px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]' 
                                type="text" 
                                placeholder='name' 
                                name='name' 
                                id='reg_name' 
                            />
                        </div>
                        <div className='flex flex-col w-full gap-1 mb-3'>
                            <label htmlFor="reg_password">Password</label>
                            <input 
                                value={register.password} 
                                onChange={inputHandle} 
                                className='px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]' 
                                type="password" 
                                placeholder='password' 
                                name='password' 
                                id='reg_password' 
                            />
                        </div>
                        <button 
                            disabled={loader} 
                            className='bg-blue-500 w-[190px] hover:shadow-blue-500/20 hover:shadow-lg text-white rounded-md px-7 py-2 mt-5'
                        >
                            {loader ? <PropagateLoader color='#fff' cssOverride={overrideStyle} /> : 'Register'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
  )
}

export default AddRegionalAdmin