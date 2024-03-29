import Layout from '@/components/Layout';
import Image from 'next/image';
import Link from 'next/link';
import styles from '@/styles/Register.module.sass';
import { useQuery, useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { useState } from 'react';
import { useRouter } from 'next/router';

const REGISTER_MUTATION = gql`
    mutation Register($username: String!, $password: String!, $name: String!) {
        register(username: $username, password: $password, name: $name) {
            name
        }
    }
`;

const Register = () => {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [vpassword, setVPassword] = useState('');
    const [errorInput ,setErrorInput] = useState('');
    const [errorText ,setErrorText] = useState('');
    let [register, { data }] = useMutation(REGISTER_MUTATION);
    const onRegister = (e) => {
        e.preventDefault();
        e.target.vpassword.setCustomValidity('');
        if (password != vpassword) {
            setErrorInput('password')
            setErrorText('Password and VerifyPassword not match!!')
        } else {
            register({
                variables: {
                    username: username,
                    password: password,
                    name: username,
                },
            })
                .then((response) => {
                    console.log(response);
                    router.push('/auth/login');
                })
                .catch((error) => {
                    // console.log(e)
                    if (error == 'Error: username already exit') {
                        console.log('username already exit');
                        setErrorInput('username')
                        setErrorText('username already exit')
                    }
                });
        }
    };
    return (
        <Layout title='Create an account'>
            <div className={styles.middle}>
                <div className={styles.content}>
                    <div className={styles.cover}>
                        <Image
                            src='https://images3.alphacoders.com/732/thumb-1920-732337.png'
                            alt='wallss create an accounts'
                            quality={100}
                            layout='fill'
                            objectFit='cover'
                            objectPosition='bottom center'
                        />
                    </div>
                    <div className={styles.mainContent + ' inboxColor'}>
                        <h1 className='p-0 m-0'>Create an account</h1>
                        Already have an account?{' '}
                        <Link href='/auth/login'>
                            <a className='color-main'> Sign In</a>
                        </Link>
                        <br />
                        <br />
                        <form onSubmit={onRegister}>
                            <label className='main-label' htmlFor='username'>
                                Username : 
                                {errorInput.indexOf('username') >= 0&&(<span className="text-error"> {errorText}</span>)}
                            </label>
                            <br />
                            <input
                                id='username'
                                name='username'
                                className={`main-input ${errorInput.indexOf('username') >= 0 ? 'error-input' : 'inputColor'}`}
                                type='text'
                                placeholder='wallss'
                                value={username}
                                onChange={(e) => {
                                    setErrorInput('')
                                    setUsername(e.target.value);
                                }}
                                required
                            />
                            <br />
                            <label className='main-label' htmlFor='email'>
                                Email Address :
                            </label>
                            <br />
                            <input
                                id='email'
                                name='email'
                                className='main-input inputColor'
                                type='email'
                                placeholder='user@wallss.net'
                                value={email}
                                onChange={(e) => {
                                    setErrorInput('')
                                    setEmail(e.target.value);
                                }}
                                required
                            />
                            <label className='main-label' htmlFor='password'>
                                Password :
                                {errorInput.indexOf('password') >= 0&&(<span className="text-error"> {errorText}</span>)}
                            </label>
                            <br />
                            <input
                                id='password'
                                name='password'
                                className={`main-input ${errorInput.indexOf('password') >= 0 ? 'error-input' : 'inputColor'}`}
                                type='password'
                                placeholder='wallPass@1234'
                                value={password}
                                onChange={(e) => {
                                    setErrorInput('')
                                    setPassword(e.target.value);
                                }}
                                required
                            />
                            <label className='main-label' htmlFor='vpassword'>
                                Verify Password :
                                {errorInput.indexOf('password') >= 0&&(<span className="text-error"> {errorText}</span>)}
                            </label>
                            <br />
                            <input
                                id='vpassword'
                                name='vpassword'
                                type='password'
                                className={`main-input ${errorInput.indexOf('password') >= 0 ? 'error-input' : 'inputColor'}`}
                                placeholder='wallPass@1234'
                                value={vpassword}
                                onChange={(e) => {
                                    setErrorInput('')
                                    setVPassword(e.target.value);
                                }}
                                required
                            />
                            <input type='checkbox' name='accept' id='accept' required />
                            <label htmlFor='accept'>I have read and agree to the Privacy Policy</label>
                            <br />
                            <br />
                            <input type='submit' className={styles.btnSummit} value='Create account' />
                            <div className='clearfix' />
                        </form>
                    </div>
                </div>
            </div>
            <br />
        </Layout>
    );
};
export default Register;
