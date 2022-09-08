import React from "react";
import Layout from "../UI/Layout";
import { getSingleUserById } from "../Redux/actions/AdminActions";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Loader from "../UI/Loader";

const SingleUserScreen = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const adminReducer = useSelector((state) => state.adminReducer);
  const { loading, singleUser } = adminReducer;
//   console.log(adminReducer);

  useEffect(() => {
    dispatch(getSingleUserById(params.id));
  }, []);

  if (loading === true || singleUser === null ) {
    return <Loader />;
  }

  return (
    <Layout>
      <div className="row">
        <div className="col-md-6 col-lg-4 mx-auto space-y-5 text-white theme_background_color p-3 text-center rounded-lg">
          <div className="text-3xl">{singleUser.name}</div>
          <div className="text-xl">{singleUser.email}</div>
          <div className="text-2xl">
            {singleUser.isAdmin === true ? "Admin-user" : "User"}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SingleUserScreen;
