import React from 'react'
import Image from 'next/image'
import { Navbar, Text } from '@nextui-org/react'

export const NavbarPokemon = () => {
  return (
    <Navbar isBordered variant="sticky">
      <Navbar.Brand>
        <Image
          width={70}
          height={70}
          src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/132.png"
        />
        <Text h3 color="inherit" hideIn="xs">
          Pokemon
        </Text>
      </Navbar.Brand>
      <Navbar.Content>
        <Navbar.Link color="inherit" href="#">
          Favorites
        </Navbar.Link>
      </Navbar.Content>
    </Navbar>
  )
}
