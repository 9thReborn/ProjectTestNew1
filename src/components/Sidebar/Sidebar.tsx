import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import { SidebarData, SuperAdminData } from "./SidebarData";
import logo from "./assets/img/logo.png";
import Header1 from "../Header/Header2";
import Modal from "../Modal/Modal";
import ModalForm from "../Modal/ModalForm";

const Sidebar: React.FunctionComponent = () => {
  const location = useLocation();
  const [currentPath, setCurrentPath] = useState(location.pathname);
  const [createBtn, setCreateBtn] = useState<any>(null);
  const [title, setTitle] = useState<string>("");
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [role, setRole] = useState<string>("");

  useEffect(() => {
    setCurrentPath(location.pathname);
    SidebarData.map((data: any) => {
      if (data.path === currentPath) {
        if (data.title === "Home") {
          setTitle("Dashboard");
        } else {
          setTitle(data.title);
        }
      }
      if (data.path === currentPath && currentPath === "/firstaid" && isAdmin) {
        setCreateBtn(
          <CreateBtn onClick={handleOpenModal}>{data.btnText}</CreateBtn>
        );
      } else {
        setCreateBtn(null);
      }
    });

    SuperAdminData.map((admin) => {
      if (admin.path === currentPath) {
        setTitle(admin.title);
        if (admin.title === "All articles") {
          setCreateBtn(
            <CreateBtn onClick={handleOpenModal}>{admin.btnText}</CreateBtn>
          );
        } else {
          setCreateBtn(null);
        }
      }
    });
    const roleFromStorage = localStorage.getItem("role");
    if (roleFromStorage) {
      const currentRole = JSON.parse(roleFromStorage);
      setRole(currentRole.role);
      if (currentRole.role === "admin") {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    } else {
      setIsAdmin(false);
      setRole("user");
    }
  }, [location]);

  const handleLinkClick = (path: string, title: string) => {
    setCurrentPath(path);
    setTitle(title);
    if (title === "Home") {
      setTitle("Dashboard");
    }
    localStorage.setItem("currentPath", JSON.stringify(path));
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <>
      <Header1 headerText={title} createBtn={createBtn} />

      {role === "user" ? (
        <SidebarMenu>
          <MenuIconClose to="#"></MenuIconClose>

          <LogoContainer>
            <img className="logo" src={logo} alt="logo" />
          </LogoContainer>

          {SidebarData.map((item, index) => {
            return (
              <MenuItems key={index}>
                <MenuItemLinks
                  to={item.path}
                  onClick={() => handleLinkClick(item.path, item.title)}
                  className={currentPath === item.path ? "active" : ""}
                >
                  {item.icon}
                  <span style={{ marginLeft: "16px" }}>{item.title}</span>
                </MenuItemLinks>
              </MenuItems>
            );
          })}
        </SidebarMenu>
      ) : (
        <SidebarMenu>
          <MenuIconClose to="#"></MenuIconClose>

          <LogoContainer>
            <img className="logo" src={logo} alt="logo" />
          </LogoContainer>

          {SuperAdminData.map((item, index) => {
            return (
              <MenuItems key={index}>
                <MenuItemLinks
                  to={item.path}
                  onClick={() => handleLinkClick(item.path, item.title)}
                  className={currentPath === item.path ? "active" : ""}
                >
                  {item.icon}
                  <span style={{ marginLeft: "16px" }}>{item.title}</span>
                </MenuItemLinks>
              </MenuItems>
            );
          })}
        </SidebarMenu>
      )}
      {openModal && (
        <Modal
          children={<ModalForm heading={""} content={undefined} />}
          handleCloseModal={handleCloseModal}
          modalContainer={"modalContainer"}
          modalBackground={"article-modal"}
          modalBtn={"modal-button"}
        />
      )}
    </>
  );
};

export default Sidebar;

const CreateBtn = styled.button`
  background-color: #eb5757;
  color: #fff;
  padding: 0.5rem;
  border: none;
  border-radius: 0.2rem;
`;

const MenuIconClose = styled(Link)`
  display: flex;
  justify-content: end;
  font-size: 1.5rem;
  margin-top: 0.75rem;
  margin-right: 1rem;
  color: #eb5757;
`;

const LogoContainer = styled.div`
  img {
    display: flex;
    width: 110px;
    justify-content: start;
    margin-left: 3rem;
    margin-top: 2rem;
    margin-bottom: 3.5rem;
  }
`;
const SidebarMenu = styled.div`
  width: 250px;
  height: 100vh;
  background-color: #fff;
  border-right: 1px solid #e0e0e0;
  position: fixed;
  top: 0;
  transition: 0.6s;
`;

const MenuItems = styled.li`
  list-style: none;
  display: flex;
  align-items: center;
  justify-content: start;
  width: 100%;
  height: 90px;
  padding: 1rem 0 1.25rem;
`;
const MenuItemLinks = styled(Link)`
  display: flex;
  align-items: center;
  padding: 0 2rem;
  font-size: 16px;
  text-decoration: none;
  color: #737373;
  margin-left: 1rem;

  &.active {
    background-color: #feebef;
    color: #eb5757;
    width: 100%;
    height: 45px;
    text-align: center;
    border-radius: 5px;
    margin: 0 1.7rem;
    padding: 0 20px;
  }

  &:hover {
    background-color: #feebef;
    color: #eb5757;
    width: 100%;
    height: 45px;
    text-align: center;
    border-radius: 5px;
    margin: 0 1.7rem;
    padding: 0 20px;
  }
`;
