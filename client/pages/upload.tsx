import Layout from "@/components/Layout";
import { veriftToken } from "@/middleware/auth.middleware";
import { useRouter } from "next/router";
import { useEffect } from "react";

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

  return <Layout>asdasdsa</Layout>;

};

export default upload;
