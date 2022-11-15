import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

export const NavbarPokemon = () => {
  return (
    <nav className="w-full h-5 flex items-center">
      <Image
        width={50}
        height={50}
        layout="fixed"
        src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/17.png"
        alt="pokemon"
      />

      <Link href="/" passHref>
        Pokemon
      </Link>

      <Link href="/favorites" passHref>
        Favorite
      </Link>
    </nav>
  )
}
