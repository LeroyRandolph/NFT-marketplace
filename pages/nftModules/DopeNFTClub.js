import React, { useMemo, useEffect, useState } from 'react'
import { ThirdwebSDK } from '@3rdweb/sdk'
import { useWeb3 } from '@3rdweb/hooks'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import NFTs from './NFTs'

const style = {
  splitter: `flex h-screen flex-col lg:grid lg:grid-cols-10`,
  background: `bg-gradient-to-br from-[#42275a] to-[#734b6d] lg:col-span-2`,
  infoContainer: `flex flex-col items-center justify-center lg:min-h-screen`,
  pictureWrapper: `rounded-xl bg-gradient-to-br from-[#43C6AC] to-[#F8FFAE] p-2 my-5`,
  clubPicture: `w-44 rounded-xl object-cover lg:h-46 lg:w-46`,
  clubTitle: `text-white text-3xl font-uber font-bold`,
  desciptionWrapper: `text-center p-8 space-y-3`,
  clubDesciption: `text-gray-300 text-md`,
  rightSideWrapper: `lg:col-span-8`,
}

const DopeNFTClub = () => {
  const [nfts, setNfts] = useState([])
  const [OwnedNfts, setOwnedNfts] = useState([])
  const [listings, setListings] = useState([])
  const { provider } = useWeb3()
  const { address } = useWeb3()

  const getModuleNFTs = useMemo(() => {
    if (!provider) return
    const sdk = new ThirdwebSDK(provider.getSigner())
    return sdk.getNFTModule('0xda3cf476C51b9C1933357Bb9e2005587BE70ae4b')
  }, [provider])

  // get all NFTs in the collection
  useEffect(() => {
    // return if no nfts are fetched
    if (!getModuleNFTs) return
    ;(async () => {
      const nfts = await getModuleNFTs.getAll()
      setNfts(nfts)
    })()
  }, [getModuleNFTs])

  // get all owned NFTs in the collection
  useEffect(() => {
    // return if no nfts are fetched
    if (!getModuleNFTs) return
    ;(async () => {
      const OwnedNfts = await getModuleNFTs.getOwned(String(address))
      setOwnedNfts(OwnedNfts)
    })()
  }, [getModuleNFTs, address])

  const getListingNFTs = useMemo(() => {
    if (!provider) return
    const sdk = new ThirdwebSDK(provider.getSigner())
    return sdk.getMarketplaceModule(
      '0x9e3cd5CCb37D5c0d324e42e428BA2E10b2aC9C43'
    )
  }, [provider, address])

  // get all listing NFTs in marketplace
  useEffect(() => {
    // return if no nfts are fetched
    if (!getListingNFTs) return
    ;(async () => {
      const listings = await getListingNFTs.getAllListings()
      setListings(listings)
    })()
  }, [getListingNFTs, address])

  console.log( {nfts})
  console.log( {OwnedNfts})
  console.log({listings})

  return (
    <>
      <div className={style.splitter}>
        {/* left side */}
        <div className={style.background}>
          <div className={style.infoContainer}>
            <div className={style.pictureWrapper}>
              <img
                className={style.clubPicture}
                src="https://lh3.googleusercontent.com/18cldSlheirQ9YT9_jjGm8Zm__SPXlrNQStKd7-lDQXUGNtXDwPk6gAh08OrGto8r-OFDe4gYkY9dmq7KnWNkh1s7HXMaM964cbR6A=w600"
                alt=""
              />
            </div>
            <div className={style.desciptionWrapper}>
              <h1 className={style.clubTitle}>Dope NFT Club</h1>
              <h2 className={style.clubDesciption}>
                Dope NFT Club launched as a fixed set of 10 items in mid-2017
                and became one of the inspirations for the ERC-721 standard.
              </h2>
            </div>
          </div>
        </div>

        {/* right side */}

        <div className={style.rightSideWrapper}>
          <Header />

          <div className="grid place-items-center gap-2 md:grid-cols-2 lg:grid-cols-5">
          {/* Map through all nfts */}
            {nfts.map((nft, id) => (
              <NFTs
                key={id}
                nft={nft}
                ownedNfts={OwnedNfts}
                listings={listings}
                marketplaceModule={getListingNFTs}
              />
            ))}
          </div>

          <Footer />
        </div>
      </div>
    </>
  )
}

export default DopeNFTClub
