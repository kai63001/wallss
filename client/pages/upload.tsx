import Layout from '@/components/Layout';
import { veriftToken } from '@/middleware/auth.middleware';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import styles from '@/styles/Upload.module.sass';

const upload = () => {
    const router = useRouter();
    const [image, setImage] = useState([]);
    const [countUpload, setCountUpload] = useState(0);
    // input name image and tags
    const [dataInput, setDataInput] = useState({});
    // error file check
    const [errorFile, setErrorFile] = useState(false);
    const [errorText, setErrorText] = useState('');
    console.log('check');

    const hanndleOnInputChange = (e) => {
        setErrorFile(false);
        const { name, value } = e.target;
        setDataInput({
            ...dataInput,
            [name]: value,
        });
    };

    const checkTypeImage = (type: string) => {
        const support = ['image/jpg', 'image/jpeg', 'image/png', 'image/gif'];
        if (support.includes(type)) return true;
        return false;
    };

    const uploadImage = (e) => {
        setErrorFile(false);
        const files = e.target.files || e.dataTransfer.files;
        console.log(files.length);
        console.log(e.target.value);
        const readAndPreview = (file) => {
            console.log('readANdPrv');
            const reader = new FileReader();
            reader.onload = (e) => {
                setImage((image) => [
                    ...image,
                    {
                        base64: e.target.result,
                        name: '',
                        tags: '',
                    },
                ]);
            };
            reader.readAsDataURL(file);
        };
        let count = countUpload;
        let data = dataInput;
        if (files) {
            for (let i = 0; i < files.length; i++) {
                console.log('🚀 type image : ' + checkTypeImage(files[i].type));
                if (checkTypeImage(files[i].type)) {
                    readAndPreview(files[i]);
                    data = {
                        ...data,
                        ['name_' + count]: '',
                        ['tags_' + count]: '',
                    };

                    count += 1;
                    console.log(dataInput);
                } else {
                    setErrorFile(true);
                    setErrorText('Error: Support only png, jpg, jpeg, gif');
                    console.log('😞 error file');
                }
            }
            setDataInput(data);
            setCountUpload(count);
        }
    };

    const summitUpload = () => {
        var myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');

        for (const [key, value] of Object.entries(dataInput)) {
            console.log(key, value);
            if (value == '') {
                setErrorFile(true);
                setErrorText("Error: Title or Tags shouldn't empty");
                return;
            }
        }
        image.forEach(async (d, i) => {
            const urlencoded = new URLSearchParams();
            urlencoded.append('img',d.base64)
            const requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: urlencoded,
            };
            const data = await fetch('http://localhost:4000/upload', requestOptions);
            console.log(await data.text());
        });
    };

    return (
        <Layout>
            <div className={styles.main}>
                <div className='center'>
                    <h1>Upload Wallpapers</h1>
                </div>
                <div className='box'>
                    <p>
                        Thanks for contributing to our wallpaper collection! Please review our community rules and
                        remember that all uploads are moderated. Adding tags and a caption to your uploads will help
                        other users find your content easily.
                    </p>
                    <br />
                    <b>Remember:</b>
                    <ul>
                        <li>No selfies or personal photos</li>
                        <li>No screenshots</li>
                        <li>No offensive images</li>
                    </ul>
                    <br />
                    {image.map((e, i) => (
                        <div key={i} className={'container ' + styles.uploadImage}>
                            <div className={styles.images}>
                                <img src={e.base64} className='imageRadius wallpaperLoading' width='100%' alt='' />
                            </div>
                            <div className={styles.detail}>
                                <input
                                    type='text'
                                    onChange={hanndleOnInputChange}
                                    name={`name_${i}`}
                                    className={`main-input inputColor`}
                                    placeholder='Title, caption or description'
                                    required={true}
                                />
                                <input
                                    type='text'
                                    onChange={hanndleOnInputChange}
                                    name={`tags_${i}`}
                                    className='main-input inputColor'
                                    placeholder='Tags ,separated by comma'
                                    required={true}
                                />
                            </div>
                        </div>
                    ))}
                    <br />
                    {errorFile == true ? <p className='text-error'>{errorText}</p> : ''}
                    <br />
                    <div className={styles.spaceBTW}>
                        <div>
                            <label htmlFor='file' className='dark-btn m-0'>
                                Upload Wallpaper
                            </label>
                            <input
                                id='file'
                                name='file'
                                type='file'
                                className={styles.uploadBTN}
                                onChange={uploadImage}
                                multiple={true}
                            />
                        </div>
                        <div className={styles.inBTW}>
                            {image.length > 0 ? (
                                <div onClick={summitUpload} className='main-btn m-0'>
                                    Done
                                </div>
                            ) : (
                                <div>
                                    <br />
                                    <br />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <br />
            <br />
        </Layout>
    );
};

export async function getServerSideProps(context) {
    const auth = await veriftToken(context);
    if (auth == null) {
        return {
            redirect: {
                destination: '/auth/login',
                permanent: false,
            },
        };
    }

    return {
        props: {},
    };
}

export default upload;

