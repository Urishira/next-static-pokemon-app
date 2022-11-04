import { GetStaticProps } from 'next'
import type { NextPage } from 'next'
import { Button, Grid } from '@nextui-org/react'
import { Layout } from '../common/layout'
import { pokemonApi } from './api'
import { PokemonApiTypes, SmallPokemon } from '../types'
import { Card, Text, Link } from '@nextui-org/react'
import Image from 'next/image'
import { FC } from 'react'

type CartPokemonProps = {
  img: string
  name: string
}
const CardPokemon: FC<CartPokemonProps> = ({ img, name }) => {
  return (
    <Card css={{ p: '$6', mw: '400px' }}>
      <Image alt="nextui logo" src={img} />
      <Grid.Container css={{ pl: '$6' }}>
        <Grid xs={12}>
          <Text h4 css={{ lineHeight: '$xs' }}>
            Next UI
          </Text>
        </Grid>
        <Grid xs={12}>
          <Text css={{ color: '$accents8' }}>nextui.org</Text>
        </Grid>
      </Grid.Container>
      <Card.Body css={{ py: '$2' }}>
        <Text>Make beautiful websites regardless of your design experience.</Text>
      </Card.Body>
      <Card.Footer>
        <Link color="primary" target="_blank" href="https://github.com/nextui-org/nextui">
          Visit source code on GitHub.
        </Link>
      </Card.Footer>
    </Card>
  )
}

const Home: NextPage = props => {
  return (
    <Layout title="Pokemon-Home">
      <Button color="gradient">Hello world</Button>
      <Grid>{props.pokemon.map()}</Grid>
    </Layout>
  )
}

// You should use getStaticProps when:
//- The data required to render the page is available at build time ahead of a user’s request.
//- The data comes from a headless CMS.
//- The data can be publicly cached (not user-specific).
//- The page must be pre-rendered (for SEO) and be very fast — getStaticProps generates HTML and JSON files, both of which can be cached by a CDN for performance.

export const getStaticProps: GetStaticProps = async ctx => {
  const { data } = await pokemonApi.get<PokemonApiTypes>('/pokemon?limit=150')
  const pokemons: SmallPokemon[] = data.results.map((pokeInfo, i) => {
    const idPoke = i + 1
    return {
      ...pokeInfo,
      id: idPoke,
      img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${idPoke}.svg`
    }
  })

  return {
    props: {
      pokemons
    }
  }
}
export default Home
