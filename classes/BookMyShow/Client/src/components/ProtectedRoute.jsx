import { Layout, Menu, message } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import React, { useEffect } from "react";
import {
  HomeOutlined,
  LogoutOutlined,
  ProfileOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { GetCurrentUser } from "../api/user";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "../redux/loaderSlice";
import { setUser } from "../redux/userSlice";

const ProtectedRoute = ({ children }) => {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getValidUser = async () => {
    try {
      dispatch(showLoading());
      const response = await GetCurrentUser();
      if (response.success) {
        dispatch(setUser(response?.data));
      } else {
        message.warning(response?.message);
      }
    } catch (error) {
      message.error(error);
    } finally {
      dispatch(hideLoading());
    }
  };
  useEffect(() => {
    if (localStorage.getItem("tokenForBMS")) {
      getValidUser();
    } else {
      navigate("/login");
    }
  }, []);

  const navItems = [
    {
      key: "home",
      label: (
        <span
          onClick={() => {
            navigate("/");
          }}
        >
          Home
        </span>
      ),
      icon: <HomeOutlined />,
    },
    {
      key: "roleProfile",
      label: (
        <span
          onClick={() => {
            if (user.role === "admin") {
              navigate("/admin", { replace: true });
            } else if (user.role === "partner") {
              navigate("/partner", { replace: true });
            } else {
              navigate("/profile", { replace: true });
            }
          }}
        >
          {user?.role === "admin" && "Movie Management"}
          {user?.role === "partner" && "Theatre Management"}
          {user?.role === "user" && "My Bookings"}
        </span>
      ),
      icon: <ProfileOutlined />,
    },
    {
      key: "profile",
      label: `${user ? user.name : ""}`,
      icon: <UserOutlined />,
      children: [
        {
          key: "logout",
          label: (
            <Link
              to="/login"
              onClick={() => {
                localStorage.removeItem("tokenForBMS");
              }}
            >
              Logout
            </Link>
          ),
          icon: <LogoutOutlined />,
        },
      ],
    },
  ];

  return (
    <>
      <Layout>
        <Header
          className="d-flex justify-content-between"
          style={{
            position: "sticky",
            top: 0,
            zIndex: 1,
            width: "100%",
            alignItems: "center",
          }}
        >
          <h3 className="text-white m-0" style={{ color: "white" }}>
            BookMyShow
          </h3>
          <Menu theme="dark" mode="horizontal" items={navItems} />
        </Header>
        <Content style={{ height: "100%" }}>{children}</Content>
        {/* ToDo */}
        <Footer
          style={{
            textAlign: "center",
            background: "#001529",
            color: "white",
            position: "absolute",
            bottom: 0,
            zIndex: 1,
            width: "100%",
          }}
        >
          BookMyShow ©{new Date().getFullYear()} Created by Scaler
        </Footer>
      </Layout>
    </>
  );
};

export default ProtectedRoute;
