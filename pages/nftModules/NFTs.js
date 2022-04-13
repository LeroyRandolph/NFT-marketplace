import { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { useWeb3 } from '@3rdweb/hooks'
import BuyNFT from './BuyNFT'
import ListNFT from './ListNFT'

const style = {
  purpleWrapper: `bg-[#543561] flex-auto w-[15rem] h-[22rem] my-10 mx-5 rounded-2xl overflow-hidden`,
  imageContainer: `h-2/3 w-full overflow-hidden flex justify-center items-center`,
  image: `w-full object-cover`,
  infoContainer: `p-3`,
  info: `flex justify-between text-white`,
  infoLeft: `flex-0.6`,
  assetName: `font-bold text-xl`,
  infoRight: `flex-0.4 text-right`,
  priceTag: `font-semibold text-sm text-white`,
  priceValue: `flex items-center text-lg text-right font-bold`,
  logo: `h-6 m-2`,
  buyButton: `font-lg mt-1 rounded-full bg-blue-500 py-1 px-4 text-white hover:bg-blue-700`,
  listButton: `font-lg mt-1 rounded-full bg-red-500 py-1 px-4 text-white hover:bg-red-700`,
}

/* For inputting listing price */
const inputPrompt = (nftId, marketplaceModule) => {
  console.log(nftId)
  const price = parseFloat(prompt("Please set the price"),"0");
  if(!isNaN(price) && price > 0){
    console.log(String(price*1000000000000000000))
    ListNFT(String(nftId), String(price*1000000000000000000), marketplaceModule)
  }else{
    toast.error('Invalid number!')
  }
  <Toaster />
}

const NFTs = ({ nft, ownedNfts, listings, marketplaceModule }) => {
  const { address, chainId } = useWeb3()
  const [isListed, setIsListed] = useState(false)
  const [isOwned, setIsOwned] = useState(false)
  const [price, setPrice] = useState(0)
  const [sellerAddress, setSellerAddress] = useState()
  const [listingId, setListingId] = useState(0)

  useEffect(() => {
    const listing = listings.find(
      (listing) =>
        listing.asset.id === nft.id && listing.asset.name === nft.name
    )
    const owned = ownedNfts.find(
      (owned) => owned.id === nft.id && owned.name === nft.name
    )
    if (Boolean(listing)) {
      setIsListed(true)
      setPrice(listing.buyoutCurrencyValuePerToken.displayValue)
      setSellerAddress(listing.sellerAddress)
      setListingId(listing.id)
    }
    if (Boolean(owned)) {
      setIsOwned(true)
    }
  }, [listings, nft])

  return (
    <div className={style.purpleWrapper}>
      <Toaster />
      {/* NFT image */}
      <div className={style.imageContainer}>
        <img src={nft.image} className={style.image} />
      </div>

      {/* NFT description */}
      <div className={style.infoContainer}>
        <div className={style.info}>
          <div className={style.infoLeft}>
            <div className={style.assetName}>{nft.name}</div>
            {isListed && (
              <div className="text-blue-400">
                @{sellerAddress.substring(0, 4)}...
                {sellerAddress.substring(sellerAddress.length - 4)}
              </div>
            )}
          </div>

          {/* Show the price details */}
          {isListed && (
            <div className={style.infoRight}>
              <div className={style.priceTag}>Price</div>
              <div className={style.priceValue}>
                <img
                  src="https://storage.opensea.io/files/6f8e2979d428180222796ff4a33ab929.svg"
                  className={style.logo}
                />
                {price}
              </div>

              {/* Show buy button */}
              <>
                { address !== sellerAddress ? (
                  <button
                    className={style.buyButton}
                    onClick={() => {
                      BuyNFT(listingId, marketplaceModule)
                    }}
                  >
                    Buy
                  </button>
                ) : null}
              </>
            </div>
          )}
            {/* Show list button */}
            {isOwned && !isListed && (
              <div className='flex-0.4 text-right bottom-0 relative'>
              <button
                className={style.listButton}
                onClick={() => {
                  inputPrompt(nft.id, marketplaceModule)
                }}
              >
                List
              </button>
              </div>
            )}

        </div>
      </div>
    </div>
  )
}

export default NFTs
