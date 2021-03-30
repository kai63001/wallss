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
    const file = e.target.files || e.dataTransfer.files
    console.log(file[0])
    console.log(e.target.value)
    const reader = new FileReader();
    reader.onload = (e) => {
      console.log(e.target.result)
      setImage([...image,e.target.result])
    }
    reader.readAsDataURL(file[0])
    
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
          {image.map((e,i)=>(
            <div key={i}>
              <img src={e} width="100%" alt=""/>
            </div>
          ))}
          <input type="file" className={styles.uploadBTN} onChange={uploadImage}/>
        </div>
      </div>
    </Layout>
  );
};

export default upload;
