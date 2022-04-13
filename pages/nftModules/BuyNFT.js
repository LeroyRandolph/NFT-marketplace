import React from 'react'
import toast, { Toaster }  from 'react-hot-toast'

//Buy NFT from marketplace
const BuyNFT = (listingId, marketplaceModule) => {
  <Toaster/>
  const buyoutListing = (async (quantityDesired = 1) => {
    await marketplaceModule.buyoutDirectListing({ listingId, quantityDesired })
    toast.success('Successfully purchased!')
  })(buyoutListing)
}

export default BuyNFT
