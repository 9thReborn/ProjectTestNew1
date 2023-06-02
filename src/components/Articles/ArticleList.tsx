import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { Button } from "../../pages/Login/button";
import Modal from "../Modal/Modal";
import ModalForm from "../Modal/ModalForm";
import { toast } from "react-toastify";

const ArticleList: React.FunctionComponent = () => {
  const location = useLocation();
  const [articles, setArticles] = useState<any[]>([]);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const getAllArticlesUrl = "http://localhost:5000/article/allarticles";
  const deleteArticleUrl = `http://localhost:5000/article/delete/${articles[currentIndex]?.articleId}`;

  const fetchAllArticles = async () => {
    const response = await axios.get(getAllArticlesUrl);
    setArticles(response.data.allArticles);
  };

  const displayUpdateForm = (index: number) => {
    setModalOpen(true);
    setCurrentIndex(index);
    localStorage.setItem("updateMsg", JSON.stringify("Update Button Clicked"));
    localStorage.setItem("article", JSON.stringify(articles[index]));
  };

  const closeUpdateForm = () => {
    setModalOpen(false);
    setOpenDeleteModal(false);
    localStorage.removeItem("updateMsg");
    localStorage.removeItem("article");
  };

  const handleDeleteButton = (index: number) => {
    setOpenDeleteModal(true);
    setCurrentIndex(index);
  };

  const deleteArticle = async () => {
    const response = await axios.delete(deleteArticleUrl);
    if (response.data.message) {
      toast.success(response.data.message);
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }
  };

  useEffect(() => {
    if (location.pathname === "/articles") {
      fetchAllArticles();
    }
  }, []);
  console.log(articles);

  return (
    <ArticleContainer>
      <section>
        {articles.map((article, index) => (
          <EachArticle key={index}>
            <img src={article.headerImage} alt="article headerImage" />
            <h1>{article.articleTitle}</h1>
            <p>{article.articleBody}</p>
            <div className="btns">
              <Button
                btnText="Update"
                onClick={() => displayUpdateForm(index)}
              />
              <Button
                btnText="Delete"
                className="secondBtn"
                onClick={() => handleDeleteButton(index)}
              />
            </div>
          </EachArticle>
        ))}
      </section>
      {modalOpen && (
        <Modal
          handleCloseModal={closeUpdateForm}
          modalContainer="modalContainer"
          modalBackground="modal-bg"
          modalBtn="modal-button"
          children={
            <ModalForm
              heading={articles[currentIndex].articleTitle}
              content={articles[currentIndex].articleBody}
            />
          }
        />
      )}
      {openDeleteModal && (
        <Modal
          handleCloseModal={closeUpdateForm}
          modalBackground="modal-bg"
          modalBtn="hide-button"
          children={
            <DeleteBtnContainer onClick={(e) => e.stopPropagation()}>
              <p>Are you sure you want to delete this article?</p>
              <div>
                <Button btnText="Yes" onClick={deleteArticle} />
                <Button btnText="No" onClick={closeUpdateForm} />
              </div>
            </DeleteBtnContainer>
          }
        />
      )}
    </ArticleContainer>
  );
};

export default ArticleList;

const ArticleContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-start;
  width: 100vw;
  height: 100vh;
  margin: 0 auto;
  padding: 2rem;
  overflow: scroll;
  background-color: #e0e0e0;

  section {
    margin: 6rem 0 0 15.6rem;
    z-index: 6;
    position: relative;
    width: 82.6%;
    height: auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding-bottom: 2rem;
  }

  .hide-button {
    display: none;
  }

  .modal-bg {
    margin-top: -2rem;
  }
`;

const EachArticle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 33vw;
  height: 25rem;
  padding: 1rem;
  // margin-top: 2rem;
  // border:1px solid red;
  > p {
    overflow: auto;
    font-size: 0.8rem;
    line-height: 1.5rem;
    color: #222;
  }

  > h1 {
    margin-top: 0.5rem;
  }

  > img {
    height: 60%;
  }

  .btns {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    // border:1px solid red;
  }

  .secondBtn {
    margin-left: 2rem;
  }

  .btns button {
    background-color: #eb5757;
    border: none;
    border-radius: 0.2rem;
    color: #fff;
    width: 4rem;
    height: 2rem;
  }
`;

const DeleteBtnContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: fit-content;
  height: 7rem;
  justify-content: space-between;
  background-color: #fff;
  padding: 1rem;
  border-radius: 0.2rem;

  > div {
    display: flex;
    width: 100%;
    justify-content: space-around;
  }
  > div button {
    color: #fff;
    padding: 0.2rem 0.5rem;
    width: 3rem;
    height: 2rem;
    border: none;
    background-color: #eb5757;
    border-radius: 0.2rem;
  }
`;
