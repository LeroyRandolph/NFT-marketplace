import React from 'react'
import toast, { Toaster } from 'react-hot-toast'

<Toaster/>
const ListNFT = (nftId, price, marketplaceModule) => {
  /* for the information of listing nft */
  const listing = {
  // address of the contract the asset you want to list is on
  assetContractAddress: "0xda3cf476C51b9C1933357Bb9e2005587BE70ae4b",
  // token ID of the asset you want to list
  tokenId: nftId,
  // in how many seconds with the listing open up
  startTimeInSeconds: 0,
  // how long the listing will be open for (1 day)
  listingDurationInSeconds: 86400,
  // how many of the asset you want to list
  quantity: 1,
  // address of the currency contract that will be used to pay for the listing
  currencyContractAddress: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
  // how much the asset will be sold for
  buyoutPricePerToken: price,
}
console.log(listing.buyoutPricePerToken)
console.log(typeof listing.buyoutPricePerToken)

/* list on marketplace */
const list = (async () =>{
  await marketplaceModule.createDirectListing(listing)
  toast.success('Successfully listed!\nListing duration will be 1 days')
})(list)
}

export default ListNFT