import Layout from '@/components/Layout';
import { veriftToken } from '@/middleware/auth.middleware';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styles from '@/styles/Upload.module.sass';
import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/react-hooks';

const ADD_WALLPAPER_MUTATION = gql`
    mutation AddWallpaper($image: String!, $name: String!, $tags: String!,$author:String,$resolution:String,$categoly:String) {
        addWallpaper(image: $image, name: $name, tags: $tags,author:$author,resolution:$resolution,categoly:$categoly) {
            _id
        }
    }
`;

const ADD_CATEGORY_MUTATION = gql`
    mutation AddCategoly($name:String!) {
        addCategory(name:$name){
            _id
        }
    }
`;

const FIND_CATEGORY_MUTATION = gql`
    mutation FindCategoly($name:String!) {
        findCategory(name:$name){
            name
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
    let [addCategory] = useMutation(ADD_CATEGORY_MUTATION);
    let [findCategory] = useMutation(FIND_CATEGORY_MUTATION);
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
                let imagerr :any = new Image();
                imagerr.src = e.target.result;
                imagerr.onload = function () {
                    setImage((image) => [
                    ...image,
                    {
                        base64: e.target.result,
                        name: '',
                        tags: '',
                        categoly: '',
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
                console.log('size Image:',files[i].size)
                if(files[i].size > 10000000){
                    setErrorFile(true);
                    setErrorText('Error: size limit 10mb');
                }else if (checkTypeImage(files[i].type)) {
                    readAndPreview(files[i]);
                    data = {
                        ...data,
                        ['name_' + count]: '',
                        ['tags_' + count]: '',
                        ['author_' + count]: '',
                        ['categoly_' + count]: '',
                        ['type_' + count]: 'desktop',
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

        for (const [key, value] of Object.entries(dataInput)) {
            console.log(key, value);
            if (value == '') {
                if(key.indexOf('author') >= 0) {

                }else{
                    setErrorFile(true);
                    setErrorText("Error: Title or Tags shouldn't empty");
                    return;
                }
                
            }
        }
        uploadData(image)
    };

    const uploadData = (image:any,i=0) => {
        var myHeaders = new Headers();
        console.log("i:",i)
        myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');
        const urlencoded = new URLSearchParams();
        urlencoded.append('img', image[i].base64)
        console.log("imgBase64",image)
        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
        };
        setUploading(true)
        console.log("type:", dataInput[`type_${i}`])

        fetch('http://localhost:4000/upload', requestOptions).then(async (res) => {
            let img = await res.text()
            img = await `https://drive.google.com/thumbnail?id=${img}&sz=w0-h0`
            if (dataInput[`type_${i}`] == "desktop") {
                console.log("Desktop Upload")
                addWall({
                    variables: {
                        image: img,
                        name: dataInput[`name_${i}`],
                        tags: dataInput[`tags_${i}`],
                        categoly: dataInput[`categoly_${i}`],
                        author: dataInput[`author_${i}`],
                        resolution: image[i]['resolution'],
                    }
                }).then((respon) => {
                    console.log("image.length and i -1:", image.length,i)
                    if(image.length <= i+1){
                        router.push('/profile')
                        return
                    }else{
                        uploadData(image,i+1)
                    }
                })
            } else {
                console.log("MoBile Upload")
            }
        });
    }


    //categoly
    const [catKey,setCatKey] = useState(false)
    const [dataCategoly,setDataCategoly] = useState([])

    const onChangeCategoly = (e:any,i:number) => {
        console.log(e.target.value.length);
        let itemImage = [...image]
        let item = {
            ...itemImage[i],
            categoly: e.target.value
        }
        itemImage[i] = item

        setImage(
            itemImage
        )
        hanndleOnInputChange(e)
        if(e.target.value.length >= 2) {
            if(e.target.value.length == 2) {
                findCategory({
                    variables: {
                        name: e.target.value
                    }
                }).then((res)=>{
                    setCatKey(false)
                    console.log(res.data.findCategory.name)
                    setDataCategoly(res.data.findCategory)
                })
            }else{
                console.log(dataCategoly)
                const data = (dataCategoly?.filter((data,i)=>{
                    return data?.name?.indexOf(e.target.value) > -1
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

    const onClickCategoly = (e:any,i:number,ir:number) => {
        console.log(dataCategoly[ir])
        let itemImage = [...image]
        let item = {
            ...itemImage[i],
            categoly: dataCategoly[ir].name      
        }
        itemImage[i] = item

        setImage(
            itemImage
        )

        setDataInput({
            ...dataInput,
            [`categoly_${i}`]: dataCategoly[ir].name,
        });

        setCatKey(false)
    }

    const onClickAddCategory = (i:number) => {
        console.log(dataInput[`categoly_${i}`])
        addCategory({
            variables: {
                name: dataInput[`categoly_${i}`]
            }
        }).then((respon)=> {
                console.log("response :",respon)
            })
        setCatKey(false)
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
                                <div className="container2">
                                    <input
                                        type='text'
                                        onChange={hanndleOnInputChange}
                                        name={`name_${i}`}
                                        className={`main-input inputColor ${styles.name}`}
                                        placeholder='Title, caption or description'
                                        required={true}
                                    />
                                    <div className={styles.type}>
                                        <select onChange={hanndleOnInputChange} className={`main-input inputColor ${styles.selection}`} name={`type_${i}`}>
                                            <option value="desktop">Desktop</option>
                                            <option value="mobile">Mobile</option>
                                        </select>
                                    </div>
                                </div>
                                <div className={'container2'}>
                                    <div className={styles.mainCategoly}>
                                        <input
                                            type='text'
                                            onChange={(e)=>{
                                                onChangeCategoly(e,i)
                                            }}
                                            value={e.categoly}
                                            name={`categoly_${i}`}
                                            className={'main-input inputColor '+styles.categoly}
                                            placeholder='Category ex.Anime'
                                            required={true}
                                        />
                                        {catKey?(
                                            <div className={styles.boxSearchCategoly + ` box`}>
                                                <ul className={styles.ulList}>
                                                    {dataCategoly?.map((data,ir)=>(
                                                        <li key={ir} onClick={(e)=> {
                                                            onClickCategoly(e,i,ir)
                                                        }} className={styles.liList}>
                                                            {data.name}
                                                        </li>
                                                    ))} 
                                                    <li onClick={(e) => {
                                                        onClickAddCategory(i)
                                                    }} className={styles.liList2}>
                                                        <i className="fas fa-plus"></i> Add category
                                                    </li>
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

