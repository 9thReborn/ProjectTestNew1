import React, { useEffect, useState } from "react";
import { InputField } from "../../pages/Login/input-field";
import { Button } from "../../pages/Login/button";
import "./Modal.css";
import axios from "axios";
import { toast } from "react-toastify";

interface FormValues {
  headerImage?: string | null;
  articleTitle: string;
  articleBody: string;
}

interface FormProps {
  heading: string;
  content: any;
}

const ModalForm: React.FC<FormProps> = ({ heading, content }) => {
  const [formValues, setFormValues] = useState<FormValues>({
    headerImage: "",
    articleTitle: "",
    articleBody: "",
  });
  const [imageRequired, setImageRequired] = useState<boolean>(false);
  const [path, setPath] = useState<string>("");
  const [updateMsg, setUpdateMsg] = useState<string>("");
  const [article, setArticle] = useState<any>({});
  console.log(article);

  useEffect(() => {
    const updateMsgFromStorage = localStorage.getItem("updateMsg");
    const pathFromStorage = localStorage.getItem("currentPath");
    const articleFromStorage = localStorage.getItem("article");
    if (pathFromStorage) {
      const currentPath = JSON.parse(pathFromStorage);
      setPath(currentPath);
      if (currentPath === "/articles" && updateMsgFromStorage) {
        setImageRequired(false);
        setUpdateMsg(JSON.parse(updateMsgFromStorage));
        if (articleFromStorage) {
          const currentArticle = JSON.parse(articleFromStorage);
          console.log(currentArticle);
          setArticle(currentArticle);
          setFormValues({
            headerImage: currentArticle.headerImage,
            articleTitle: currentArticle.articleTitle,
            articleBody: currentArticle.articleBody,
          });
        } else {
          setFormValues({ headerImage: "", articleTitle: "", articleBody: "" });
        }
      } else {
        setImageRequired(true);
      }
    }
  }, [setArticle]);
  console.log(formValues);

  const updateArticleUrl = `http://localhost:5000/article/update/${article?.articleId}`;
  const createArticleUrl = "http://localhost:5000/article/create";

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files.length > 0) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        setFormValues((prevValues) => ({
          ...prevValues,
          [name]: base64String,
        }));
      };
      reader.readAsDataURL(files[0]);
    }
  };

  const handleChildClick = (event: { stopPropagation: () => void }) => {
    event.stopPropagation();
  };

  const submitArticle = async () => {
    const response = await axios.post(createArticleUrl, formValues, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.data.message === "Article created successfully") {
      toast.success(response.data.message);
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }
  };

  const submitArticleUpdate = async () => {
    try {
      const response = await axios.put(updateArticleUrl, formValues);
      console.log(response);
      if (response.data.msg) {
        toast.success(response.data.msg);
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    } catch (error: any) {
      toast.error(error.response.data.Error);
      localStorage.removeItem("article");
      localStorage.removeItem("updateMsg");
    }
  };

  const handleFormSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (path === "/articles") {
      if (updateMsg) {
        submitArticleUpdate();
      } else {
        submitArticle();
      }
    }
  };

  return (
    <div className="modalFormWrapper" onClick={handleChildClick}>
      <form onSubmit={handleFormSubmit} className="modalForm">
        <label
          htmlFor="myFileInput"
          style={{
            padding: "10px 20px",
            backgroundColor: "#EB5757",
            color: "#fff",
            cursor: "pointer",
            borderRadius: "6px",
            border: "none",
            textAlign: "center",
          }}
        >
          Choose Article Image
        </label>

        <InputField
          type="file"
          onChange={handleImageChange}
          className="chooseFile"
          name="headerImage"
          required={imageRequired}
          disabled={false}
          id="myFileInput"
          inputStyle={
            !formValues.headerImage ? { display: "none" } : { display: "flex" }
          }
          accept="image/*"
        />

        <InputField
          type="text"
          onChange={handleInputChange}
          placeHolder="Title goes here"
          name="articleTitle"
          required
          className={"titleInput"}
          disabled={false}
          defaultValue={heading}
        />
        <textarea
          name="articleBody"
          className="contentTextArea"
          cols={30}
          rows={10}
          placeholder="Description"
          defaultValue={content}
          onChange={handleInputChange}
          required
        ></textarea>
        <Button btnText="Submit" type="submit" className={"modalFormBtn"} />
      </form>
    </div>
  );
};

export default ModalForm;
