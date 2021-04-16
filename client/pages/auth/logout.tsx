import {logout} from '../../middleware/auth.middleware'
import { useRouter } from "next/router";
import { veriftToken } from '@/middleware/auth.middleware';

const Logout = () => {
    const router = useRouter()
    const letLogout = logout()
    if(letLogout == "success") { 
    	router.reload() 
   	}

    

    return (
        <div>
            Logout
        </div>
    )
}

export async function getServerSideProps(context) {
	console.log('logout')
    const auth = await veriftToken(context);
    if (auth == null) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        };
    }

    return {
        props: {}, // will be passed to the page component as props
    };
}

export default Logout