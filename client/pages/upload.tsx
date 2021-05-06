import Layout from '@/components/Layout';
import { veriftToken } from '@/middleware/auth.middleware';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styles from '@/styles/Upload.module.sass';
import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/react-hooks';

const ADD_WALLPAPER_MUTATION = gql`
    mutation AddWallpaper($image: String!, $name: String!, $tags: String!,$author:String,$resolution:String) {
        addWallpaper(image: $image, name: $name, tags: $tags,author:$author,resolution:$resolution) {
            _id
        }
    }
`;

const upload = () => {
    const router = useRouter();
    const [image, setImage] = useState([]);
    const [countUpload, setCountUpload] = useState(0);
    // input name image and tags
    const [dataInput, setDataInput] = useState({});
    // error file check
    const [errorFile, setErrorFile] = useState(false);
    const [errorText, setErrorText] = useState('');

    const [uploading,setUploading] = useState(false)

    //categoly
    const [categoly,setCategoly] = useState(["user","anime","animation","romeo"])


    let [addWall, { data }] = useMutation(ADD_WALLPAPER_MUTATION);
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
                let imagerr = new Image();
                imagerr.src = e.target.result;
                imagerr.onload = function () {
                    setImage((image) => [
                    ...image,
                    {
                        base64: e.target.result,
                        name: '',
                        tags: '',
                        author: '',
                        resolution: `${this.width}X${this.height}`
                    },
                ])
                }
                
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
                        ['author_' + count]: '',
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
            console.log(key.indexOf('author'))
            if (value == '') {
                if(key.indexOf('author') >= 0) {

                }else{
                    setErrorFile(true);
                    setErrorText("Error: Title or Tags shouldn't empty");
                    return;
                }
                
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
            setUploading(true)

            fetch('http://localhost:4000/upload', requestOptions).then(async (res)=> {
                let img = await res.text()
                img = `https://drive.google.com/thumbnail?id=${img}&sz=w0-h0`
                addWall({
                    variables: {
                        image: img,
                        name: dataInput[`name_${i}`],
                        tags: dataInput[`tags_${i}`],
                        author: dataInput[`author_${i}`],
                        resolution: image[i]['resolution']
                    }
                }).then((respon)=> {
                    console.log("response :",respon)
                    router.push('/profile');
                })
            });
        });
    };


    //categoly
    const [catKey,setCatKey] = useState(false)
    const [dataCategoly,setDataCategoly] = useState([])

    const onChangeCategoly = (e:any) => {
        console.log(e.target.value.length);
        if(e.target.value.length >= 2) { 
            if(e.target.value.length == 2) {
                setCatKey(false)
                setDataCategoly(categoly)
            }else{
                console.log(dataCategoly)
                const data = (dataCategoly.filter((data,i)=>{
                    return data.indexOf(e.target.value) > -1
                }))
                console.log(data)
                setDataCategoly(data)
                setCatKey(true)
            }
        }else{
            setCatKey(false)
        }
        console.log(catKey);
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
                </div>
                <br />
                <div className="box">
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
                                <div className={'container2'}>
                                    <div className={styles.mainCategoly}>
                                        <input
                                            type='text'
                                            onChange={onChangeCategoly}
                                            name={`categoly_{i}`}
                                            className={'main-input inputColor '+styles.categoly}
                                            placeholder='Categoly ex.Anime'
                                            required={true}
                                        />
                                        {catKey?(
                                            <div className={styles.boxSearchCategoly + ` box`}>
                                                <ul className={styles.ulList}>
                                                    {dataCategoly.map((data,i)=>(
                                                        <li key={i} className={styles.liList}>
                                                            {data}
                                                        </li>
                                                    ))} 
                                                </ul>
                                            </div>
                                        ):('')}
                                    </div>
                                    <input
                                        type='text'
                                        onChange={hanndleOnInputChange}
                                        name={`tags_${i}`}
                                        className={'main-input inputColor '+styles.tags}
                                        placeholder='Tags ,separated by comma'
                                        required={true}
                                    />
                                </div>
                                <input
                                    type='text'
                                    onChange={hanndleOnInputChange}
                                    name={`author_${i}`}
                                    className='main-input inputColor'
                                    placeholder='Author.. (Option)'
                                />
                                {/* <input
                                    type='hidden'
                                    onWaiting={hanndleOnInputChange}
                                    name={`resolution_${i}`}
                                    className='main-input inputColor'
                                    value={e.resolution}
                                /> */}
                            </div>
                        </div>
                    ))}
                    <br/>
                    {errorFile == true ? (
                    <>
                        <p className='text-error'>{errorText}</p>
                        <br/>
                    </>
                    ) : ''}
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
                                uploading ? 
                                <div className='main-btn m-0'>
                                      <i className="fas fa-circle-notch fa-spin"></i>
                                </div>
                                :
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

