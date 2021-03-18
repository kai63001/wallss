import jwt from 'jsonwebtoken';
import { useQuery, useMutation } from "@apollo/react-hooks";

const KEY = process.env.KEY || 'shadow';

export const test = () => {
    return "test"
}

export const login = (username:String,password:String,rememberme:Boolean) => {
    return username
}