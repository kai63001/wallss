import {logout} from '../../middleware/auth.middleware'
import { useRouter } from "next/router";

const Logout = () => {
    const router = useRouter()
    const letLogout = logout()
    if(letLogout == "success") router.push('/')
    

    return (
        <div>
            Logout
        </div>
    )
}

export default Logout