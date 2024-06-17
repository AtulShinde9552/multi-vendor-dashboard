import React, { useEffect } from 'react';
import { FaEye } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { get_areamanager } from '../../store/Reducers/areamanagerReducer';

const Areamanager = () => {
    const dispatch = useDispatch();
    const { areaManagers, loader } = useSelector(state => state.areamanager || { areaManagers: [], loader: false }); // Default to an empty array if undefined

    useEffect(() => {
        dispatch(get_areamanager());
    }, [areaManagers]);

    if (loader) {
        return <div>Loading...</div>;
    }

    return (
        <div className='px-2 lg:px-7 pt-5'>
            <div className='w-full p-4 bg-[#283046] rounded-md'>
                <div className='flex justify-between items-center'>
                    <h1 className='text-white text-lg'>Area Managers</h1>
                </div>
                <div className='relative overflow-x-auto'>
                    <table className='w-full text-sm text-left text-[#d0d2d6]'>
                        <thead className='text-xs text-[#d0d2d6] uppercase border-b border-slate-700'>
                            <tr>
                                <th scope='col' className='py-3 px-4'>No</th>
                                <th scope='col' className='py-3 px-4'>Name</th>
                                <th scope='col' className='py-3 px-4'>Email</th>
                                <th scope='col' className='py-3 px-4'>Role</th>
                                <th scope='col' className='py-3 px-4'>Actions</th>
                            </tr>
                        </thead>
                        <tbody className='text-sm font-normal'>
                            {areaManagers && areaManagers.map((d, i) => (
                                <tr key={d._id}>
                                    <td scope='row' className='py-1 px-4 font-medium whitespace-nowrap'>
                                        <img className='w-[45px] h-[45px]' src={`http://localhost:3000/images/category/${d.image}.jpg`} alt={d.name} />
                                    </td>
                                    <td scope='row' className='py-1 px-4 font-medium whitespace-nowrap'>{d.name}</td>
                                    <td scope='row' className='py-1 px-4 font-medium whitespace-nowrap'>{d.email}</td>
                                    <td scope='row' className='py-1 px-4 font-medium whitespace-nowrap'>{d.Role}</td>
                                    <td scope='row' className='py-1 px-4 font-medium whitespace-nowrap'>
                                        <div className='flex justify-start items-center gap-4'>
                                            <Link to={`/areamanager/dashboard/seller/details/${d._id}`} className='p-[6px] bg-green-500 rounded hover:shadow-lg hover:shadow-green-500/50'><FaEye /></Link>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Areamanager;
