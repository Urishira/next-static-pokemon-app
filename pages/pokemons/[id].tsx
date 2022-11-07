import React from 'react'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { pokemonApi } from '../api'
import { Pokefull } from '../../types'
import { Button, Card, Col, Container, Grid, Row, Text } from '@nextui-org/react'
import Image from 'next/image'
import { Layout } from '../../common/layout'

type PokemonProps = {
  pokemon: Pokefull
}

const PokemonDetail: NextPage<PokemonProps> = ({ pokemon }) => {
  const ability = pokemon.abilities.map(value => value.ability.name)
  return (
    <Layout title="pokemon-detail">
      <Grid.Container css={{ marginTop: '$20' }} gap={5}>
        <Grid xs={12} sm={4}>
          <Card css={{ w: '100%', h: '400px' }}>
            <Card.Header css={{ position: 'absolute', zIndex: 1, top: 5 }}>
              <Col>
                <Text size={12} weight="bold" transform="uppercase" color="#ffffffAA">
                  Pokemon
                </Text>
                <Text h3 color="white">
                  {pokemon.name}
                </Text>
              </Col>
            </Card.Header>
            <Card.Body
              css={{ p: 0, display: 'flex', alignContent: 'center', justifyItems: 'center' }}
            >
              <Image
                src={pokemon.sprites.other?.dream_world.front_default || ''}
                width="100%"
                height="300px"
                objectFit="fill"
                alt={pokemon.name}
              />
            </Card.Body>
            <Card.Footer
              isBlurred
              css={{
                position: 'absolute',
                bgBlur: '#ffffff66',
                borderTop: '$borderWeights$light solid rgba(255, 255, 255, 0.2)',
                bottom: 0,
                zIndex: 1
              }}
            >
              <Row justify="center">
                <Col>
                  <Text color="white" size={20}>
                    Ability : {ability}
                  </Text>
                  <Text color="white" size={20}>
                    weight : {pokemon.weight}
                  </Text>
                </Col>
                <Col>
                  <Row justify="flex-end">
                    <Button flat auto rounded color="secondary">
                      <Text
                        css={{ color: 'inherit', letterSpacing: '$widest' }}
                        size={12}
                        weight="bold"
                        transform="uppercase"
                      >
                        get Favorite
                      </Text>
                    </Button>
                  </Row>
                </Col>
              </Row>
            </Card.Footer>
          </Card>
        </Grid>
        <Grid xs={12} sm={8}>
          <Card>
            <Card.Header>
              <Text h2>Sprites</Text>
              <Button>Add Favorites</Button>
            </Card.Header>
            <Card.Body>
              <Container justify="center" alignItems="center">
                <Image
                  width={200}
                  height={200}
                  src={pokemon.sprites.other?.home.front_default || ''}
                  layout="fixed"
                />
                <Image
                  width={200}
                  height={200}
                  src={pokemon.sprites.other?.home.front_shiny || ''}
                  layout="fixed"
                />
                <Image
                  width={200}
                  height={200}
                  src={pokemon.sprites.other?.['official-artwork'].front_default || ''}
                  layout="fixed"
                />
                <Image
                  width={200}
                  height={200}
                  src={pokemon.sprites.other?.dream_world.front_default || ''}
                  layout="fixed"
                />
              </Container>
            </Card.Body>
          </Card>
        </Grid>
      </Grid.Container>
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async ctx => {
  const paths = [...Array(150)].map((value, index) => {
    return { params: { id: `${index + 1}` } }
  })
  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ctx => {
  const id = ctx.params?.id as unknown as { id: string }
  const { data: pokemon } = await pokemonApi.get<Pokefull>(`/pokemon/${id}/`)
  return {
    props: {
      pokemon
    }
  }
}

export default PokemonDetail
