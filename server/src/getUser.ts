import jwt from 'jsonwebtoken';

const getUser = (token:String) => {
    if (!token) return null

    const parToken = token.split(' ')[1];

    try {
        const decodedToekn = jwt.verify(parToken, process.env.SECRET || 'shadow');
        console.log(decodedToekn)
        return decodedToekn;
    } catch (error) {
      return null
    }

}

export default getUser;
