import Layout from "@/components/Layout";
import { useRouter } from "next/router";

const Category = () => {
    const router = useRouter();
    return (
        <Layout>
            <div className="main2">
                {router.query.name}
            </div>
        </Layout>
    )
    
}

export default Category