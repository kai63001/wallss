import Layout from "@/components/Layout";
import { veriftToken } from "@/middleware/auth.middleware";
import { useRouter } from "next/router";
import { useEffect } from "react";
import styles from "@/styles/Upload.module.sass";

const upload = () => {
  const router = useRouter();
  useEffect(() => {
    if (veriftToken() == null) {
      router.push("/auth/login");
    }
  });

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
        </div>
      </div>
    </Layout>
  );
};

export default upload;
