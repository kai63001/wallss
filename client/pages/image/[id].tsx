import { useRouter } from "next/router"
import Layout from "../../components/Layout"

const Image = () => {
    const router = useRouter()
    const { id } = router.query
    console.log(id)


    return (
        <Layout>
            <div className="main2">
                asd
            </div>
        </Layout>
    )

}

export default Image