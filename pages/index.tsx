import type { NextPage, GetServerSideProps } from 'next'
import Head from 'next/head'
import axios from 'axios'
import { ImageData, Item } from '../types/interface'
import Image from 'next/image'

const Home = (props: { imageData: { items: Item[] } }) => {
    return (
        <div className=''>
            <Head>
                <title>Create Next App</title>
                <meta name='description' content='Generated by create next app' />
                <link rel='icon' href='/favicon.ico' />
            </Head>
            <div className='container mx-auto'></div>
        </div>
    )
}

export default Home

export const getServerSideProps: GetServerSideProps = async () => {
    const { data } = await axios.get<ImageData>(`${process.env.NEXT_PUBLIC_SERVER_URL}/image`)
    return {
        props: {
            imageData: data,
        },
    }
}
