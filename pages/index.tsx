import { GetStaticProps } from 'next'
import type { NextPage } from 'next'
import { Button, Col, Grid, Row } from '@nextui-org/react'
import { Layout } from '../common/layout'
import { pokemonApi } from './api'
import { PokemonApiTypes, SmallPokemon } from '../types'
import { Card, Text, Link } from '@nextui-org/react'
import Image from 'next/image'
import { FC } from 'react'

type CartPokemonProps = {
  img: string
  name: string
  numberPoke: string
}
const CardPokemon: FC<CartPokemonProps> = ({ img, name, numberPoke }) => {
  return (
    <Card isPressable>
      <Card.Body css={{ p: 0 }}>
        <Image src={img} objectFit="fill" width="100%" height={140} alt={name} />
      </Card.Body>
      <Card.Footer css={{ justifyItems: 'flex-start' }}>
        <Row wrap="wrap" justify="space-between" align="center">
          <Text b>{name}</Text>
          <Text css={{ color: '$accents7', fontWeight: '$semibold', fontSize: '$sm' }}>
            {numberPoke}
          </Text>
        </Row>
      </Card.Footer>
    </Card>
  )
}

type PokemonPage = {
  pokemons: SmallPokemon[]
}
const Home: NextPage<PokemonPage> = ({ pokemons }) => {
  return (
    <Layout title="Pokemon-Home">
      <Button color="gradient">Hello world</Button>
      <Grid.Container gap={2} justify="center">
        {pokemons.map(({ id, img, name }) => (
          <Grid xs={6} sm={2} key={id}>
            <CardPokemon img={img} name={name} numberPoke={id as unknown as string} />
          </Grid>
        ))}
      </Grid.Container>
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
