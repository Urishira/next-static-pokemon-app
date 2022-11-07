import React from 'react'
import Image from 'next/image'
import { Navbar, Text } from '@nextui-org/react'
import Link from 'next/link'

export const NavbarPokemon = () => {
  return (
    <Navbar isBordered>
      <Navbar.Brand>
        <Image
          width={90}
          height={90}
          src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/132.png"
        />
        <Link href="/">
          <Text h3 as={'a'} size="$4xl" color="inherit" hideIn="xs">
            Pokemon
          </Text>
        </Link>
      </Navbar.Brand>
      <Navbar.Content>
        <Navbar.Link color="inherit" href="/favorites">
          Favorites
        </Navbar.Link>
      </Navbar.Content>
    </Navbar>
  )
}
