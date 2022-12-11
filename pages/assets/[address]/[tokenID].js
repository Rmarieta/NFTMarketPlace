import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useAddress, useMarketplace } from '@thirdweb-dev/react'
import { BigNumber } from 'ethers'
import TopNavbarLayout from '../../../layouts/TopNavbarLayout'
import NFTImage from '../../../components/NFTDetails/NFTImage'
import NFTSalesInfo from '../../../components/NFTDetails/NFTSalesInfo'
import NFTDetails from '../../../components/NFTDetails/NFTDetails'
import NFTBasicInfo from '../../../components/NFTDetails/NFTBasicInfo'

import loadingBanner from '../../../assets/loading.gif'
import Image from 'next/image'

const style = {
  wrapper: ``,
  loader: `pt-[40vh] items-center  mx-auto h-screen w-max`,
  listingWrapper: `mx-auto flex max-w-2xl flex-col space-y-4 py-4 dark:bg-[#202226] lg:max-w-none lg:py-8 lg:px-24 px-4`,
  nftContainer: `flex flex-col lg:flex-row lg:space-x-4`,
  leftContainer: `flex flex-col space-y-4 mb-9`,
  nftImage: `lg:block flex flex-col items-center`,
  leftElement: `lg:block`,
  rightContainer: `flex flex-1 flex-col space-y-4`,
  buyoutContainer: `flex-1`,
}

const NFT = () => {

  const [listing, setListing] = useState()
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { tokenID } = router.query

  
  const marketplace = useMarketplace('0x67783886a50a8642fdA72Da0602e06D1D255379f')
  const address = useAddress()

  useEffect(() => {
    getListing()
  }, [])

  useEffect(() => {
    if(!address) router.replace('/')
  }, [address])
  
  const getListing = async () => {
    try {
      setLoading(true)
      const listing = await marketplace.getListing(BigNumber.from(tokenID))

      setListing(listing)
      setLoading(false)
    } catch (e) {
      console.log(e)
    }
  }

  const buyNFT = async () => {
    try {
      await marketplace.buyoutListing(tokenID, 1)
    } catch (e) {
      console.log(e)
    }
  }
  
  return (
    <TopNavbarLayout>
      <div className={style.wrapper}>
        {loading ? (
          <div className={style.loader}><Image className={style.loaderImage} src={loadingBanner} alt='Loading...' width={35} height={35}/></div>
        ) : (
        <div className={style.listingWrapper}>
            <div className={style.nftContainer}>
              <div className={style.leftContainer}>
                <div className={style.nftImage}>
                  <NFTImage image={listing?.asset?.image} />
                </div>
  
                <div className={style.leftElement}>
                  <NFTDetails />
                </div>
              </div>
  
              <div className={style.rightContainer}>
                <NFTBasicInfo name={listing?.asset?.name} />
  
                <div className={style.buyoutContainer}>
                  <NFTSalesInfo price={listing?.buyoutCurrencyValuePerToken?.displayValue} buyNFT={buyNFT}/>
                </div>
              </div>
            </div>
        </div>
        )}
      </div>
    </TopNavbarLayout>
    
  )
}

export default NFT