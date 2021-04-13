import Layout from '@/components/Layout';
import { veriftToken } from '@/middleware/auth.middleware';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import styles from '@/styles/Upload.module.sass';

const upload = () => {
    const router = useRouter();
    const [image, setImage] = useState([]);
    const [countUpload, setCountUpload] = useState(0)
    const [dataInput, setDataInput] = useState({});
    const [errorFile, setErrorFile] = useState(false);
    useEffect(() => {
        console.log('check');
        if (veriftToken() == null) {
            router.push('/auth/login');
        }
    });

    const hanndleOnInputChange = (e) => {
        const { name, value } = e.target;
        setDataInput({
            ...dataInput,
            [name]: value,
        });
    };

    const uploadImage = (e) => {
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
        let data = dataInput
        if (files) {
            for (let i = 0; i < files.length; i++) {
                readAndPreview(files[i]);
                data = {
                    ...data,
                    ['name_'+count]: 'romeoo',
                    ['tags_'+count]: 'romeoo',
                }
                
                count += 1
                console.log(dataInput)
            }
            setDataInput(data)
            setCountUpload(count);
        }
    };

    const summitUpload = () => {
        console.log(image);
    };

    if (veriftToken() == null) {
        return <Layout></Layout>;
    }

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
                        <div key={i} className={'container'}>
                            <div className={styles.images}>
                                <img src={e.base64} className='imageRadius wallpaperLoading' width='100%' alt='' />
                            </div>
                            <div className={styles.detail}>
                                <input
                                    type='text'
                                    onChange={hanndleOnInputChange}
                                    name={`name_${i}`}
                                    className='main-input inputColor'
                                    placeholder='Title, caption or description'
                                />
                                <input
                                    type='text'
                                    onChange={hanndleOnInputChange}
                                    name={`tags_${i}`}
                                    className='main-input inputColor'
                                    placeholder='Tags ,separated by comma'
                                />
                            </div>
                        </div>
                    ))}
                    <br />
                    <p className='text-error'>Error: Support only png, jpg, jpeg, gif</p>
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
                                <div onClick={()=>(console.log(dataInput))} className='main-btn m-0'>
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

export default upload;
