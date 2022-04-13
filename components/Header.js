import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import logo from '../assets/logo.png'
import { AiOutlineSearch } from 'react-icons/ai'
import { ConnectWallet } from '@3rdweb/react'

const style = {
  wrapper: `bg-[#00000] flex flex-grow sm:flex-row m-4 justify-between items-center h-auto`,
  logoContainer: `flex items-center cursor-pointer`,
  logoText: ` ml-[1rem] text-black font-uber font-bold  text-2xl`,
  searchBar: `flex flex-1 mx-[0.8rem] items-center bg-[#363840] border-2 border-[#363840] rounded-[0.8rem]`,
  searchIcon: `text-[#8a939b] mx-3 font-bold text-lg`,
  searchInput: `h-[2.6rem] w-full border-0 bg-transparent outline-0 ring-0 px-2 pl-0 text-white placeholder:text-gray`,
  headerItems: `flex items-center justify-end`,
  headerItem: `text-white px-4 font-black text-l text-[#7A0BC0] cursor-pointer hover:decoration-[#7A0BC0] hover:scale-110 duration-100`,
}

const Header = () => {
  return (
    <div className={style.wrapper}>
      <Link href="/">
        <div className={style.logoContainer}>
          <Image src={logo} height={55} width={55} />
          <div className={style.logoText}>NEXT-NFTs</div>
        </div>
      </Link>
      <div className={style.searchBar}>
        <div className={style.searchIcon}>
          <AiOutlineSearch />
        </div>
        <input
          className={style.searchInput}
          placeholder="Search items and collections"
        />
      </div>
      <div className={style.headerItems}>
        <a className={style.headerItem} href="/Collections">
          Collections
        </a>
        <a className={style.headerItem} href="/">
          Create
        </a>
        <a className={style.headerItem} href="/">
          MyNFTs
        </a>
        <div className={style.headerIcon}>
          <Link href="/Signin">
            <button class="rounded-full bg-[#663399] py-2 px-4 font-bold text-white hover:bg-[#602f6b]">
              Sign In
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Header
