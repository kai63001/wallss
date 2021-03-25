import { useRouter } from "next/router"

const Image = () => {
    const router = useRouter()
    const { id } = router.query
    console.log(id)


    return (
        <div className="">
            asd
        </div>
    )

}

export default Image