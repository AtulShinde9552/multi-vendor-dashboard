import React, { useEffect } from "react";
import { FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { get_regionaladmin } from "../../store/Reducers/regionaladminReducer";

const RegionalaAdmin = () => {
  const dispatch = useDispatch();
  const { regionaladmins, loader, errorMessage } = useSelector((state) => state.regionaladmin);

  useEffect(() => {
    console.log(regionaladmins);
    dispatch(get_regionaladmin());
  }, [dispatch]);

  if (loader) {
    return <div>Loading...</div>;
  }

  if (errorMessage) {
    return <div>Error: {errorMessage}</div>;
  }

  return (
    <div className="px-2 lg:px-7 pt-5">
      <div className="w-full p-4 bg-[#283046] rounded-md">
        <div className="flex justify-between items-center">
          <h1 className="text-white text-lg">Regional Admins</h1>
        </div>
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left text-[#d0d2d6]">
            <thead className="text-xs text-[#d0d2d6] uppercase border-b border-slate-700">
              <tr>
                <th className="py-3 px-4">No</th>
                <th className="py-3 px-4">Name</th>
                <th className="py-3 px-4">Region</th>
                <th className="py-3 px-4">Region Code</th>
                <th className="py-3 px-4">Email</th>
                <th className="py-3 px-4">Role</th>
                <th className="py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm font-normal">
              {regionaladmins &&
                regionaladmins.map((d, i) => (
                  <tr key={d._id}>
                    <td className="py-1 px-4 font-medium whitespace-nowrap">
                      {i + 1}
                    </td>
                    <td className="py-1 px-4 font-medium whitespace-nowrap">
                      {d.name}
                    </td>
                    <td className="py-1 px-4 font-medium whitespace-nowrap">
                      {d.region}
                    </td>
                    <td className="py-1 px-4 font-medium whitespace-nowrap">
                      {d.regionCode}
                    </td>
                    <td className="py-1 px-4 font-medium whitespace-nowrap">
                      {d.email}
                    </td>
                    <td className="py-1 px-4 font-medium whitespace-nowrap">
                      {d.role}
                    </td>
                    <td className="py-1 px-4 font-medium whitespace-nowrap">
                      <div className="flex justify-start items-center gap-4">
                        <Link
                          to={``}
                          className="p-[6px] bg-green-500 rounded hover:shadow-lg hover:shadow-green-500/50"
                        >
                          <FaEye />
                        </Link>
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

export default RegionalaAdmin;
