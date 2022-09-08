import React from "react";
import { useEffect } from "react";
import Layout from "../../UI/Layout";
import { Link } from "react-router-dom";
import {
  adminAllUsers,
  deleteUserFromAdmin,
} from "../../Redux/actions/AdminActions";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../UI/Loader";
import { TiTick } from "react-icons/ti";
import { ImCross } from "react-icons/im";
import { AiFillEdit } from "react-icons/ai";
import { BsTrash } from "react-icons/bs";
import { Navigate } from "react-router-dom";

const UserListScreen = () => {
  const dispatch = useDispatch();
  const adminReducer = useSelector((state) => state.adminReducer);
  const userReducers = useSelector((state) => state.userReducers);
  const { users, loading } = adminReducer;
  const { user } = userReducers;
  //   console.log(adminReducer);

  useEffect(() => {
    dispatch(adminAllUsers());
  }, [dispatch]);

  const deleteHandler = (id) => {
    dispatch(deleteUserFromAdmin(id));
  };

  if (user === null) {
    return <Navigate to="/login" replace />;
  }

  if (loading === true) {
    return <Loader />;
  }

  return (
    <Layout>
      <div className="row text-center">
        <div className="text-4xl">All Users List</div>
      </div>
      <table className="table">
        <thead>
          <tr className="row">
            <th className="col-md-4">ID</th>
            <th className="col-md-2">NAME</th>
            <th className="col-md-3">EMAIL</th>
            <th className="col-md-3">ADMIN</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id} className="row">
              <td className="col-md-4"><Link to={`/single_user/${user._id}`}>{user._id}</Link></td>
              <td className="col-md-2">{user.name}</td>
              <td className="col-md-3">{user.email}</td>
              <td className="col-md-3 flex justify-between">
                <span>
                  {user.isAdmin === true ? (
                    <>
                      <TiTick />
                    </>
                  ) : (
                    <>
                      <ImCross />
                    </>
                  )}
                </span>
                <span className="flex space-x-3 cursor-pointer">
                  <Link to={`/single_user/${user._id}/edit`}>
                    <AiFillEdit />
                  </Link>
                  <span onClick={() => deleteHandler(user._id)}>
                    <BsTrash />
                  </span>
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
};

export default UserListScreen;
