import Layout from "@/components/Layout";
import { veriftToken } from "@/middleware/auth.middleware";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "@/styles/Upload.module.sass";

const upload = () => {
  const router = useRouter();
  const [image, setImage] = useState([]);
  useEffect(() => {
    console.log("check");
    if (veriftToken() == null) {
      router.push("/auth/login");
    }
  });

  const uploadImage = (e) => {
    const files = e.target.files || e.dataTransfer.files;
    console.log(files.length);
    console.log(e.target.value);
    const readAndPreview = (file) => {
      console.log("readANdPrv")
      const reader = new FileReader();
      reader.onload = (e) => {
        console.log(e.target.result);
        setImage(image => [
          ...image,
          {
            base64: e.target.result,
            name: "",
            tags: "",
          }
        ]);
      };
      reader.readAsDataURL(file)
    };
    if (files) {
      for (let i = 0; i < files.length; i++) {
        readAndPreview(files[i]);
      }
    }

  };

  if (veriftToken() == null) {
    return <Layout></Layout>;
  }

  return (
    <Layout>
      <div className={styles.main}>
        <div className="center">
          <h1>Upload Wallpapers</h1>
        </div>
        <div className="box">
          <p>
            Thanks for contributing to our wallpaper collection! Please review
            our community rules and remember that all uploads are moderated.
            Adding tags and a caption to your uploads will help other users find
            your content easily.
          </p>
          <br />
          <b>Remember:</b>
          <ul>
            <li>No selfies or personal photos</li>
            <li>No screenshots</li>
            <li>No offensive images</li>
          </ul>
          <br />
          {image.map((e, i) => (
            <div key={i}>
              <img src={e.base64} width="100%" alt="" />
            </div>
          ))}
          <br/>
          <label htmlFor="file" className="dark-btn">
            Upload Wallpaper
          </label>
          <input
            id="file"
            name="file"
            type="file"
            className={styles.uploadBTN}
            onChange={uploadImage}
            multiple={true}
          />
          <br/>
          <br/>
        </div>
      </div>
      <br />
      <br />
    </Layout>
  );
};

export default upload;