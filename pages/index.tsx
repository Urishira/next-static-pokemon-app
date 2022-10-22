import { Button } from '@nextui-org/react'
import type { NextPage } from 'next'
import { Layout } from '../common/layout'

const Home: NextPage = () => {
  return (

    <Layout title='Pokemon-Home'>
      <Button color='gradient'>Hello world</Button>
    </Layout>
  )
}

export default Home
