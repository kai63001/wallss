import Head from 'next/head'
import Layout from '../components/Layout'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <Layout>
      <div>
      <Image
        src="/static/images/wallpaper4.jpg"
        alt="Walls free wallpaper background image hd"
        width={100}
        height={43}
        layout="responsive"
      />
      </div>
      asdas
    </Layout>
  )
}
