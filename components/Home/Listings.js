import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useMarketplace } from '@thirdweb-dev/react'
import NFTCard from './NFTCard'

import loadingBanner from '../../assets/loading.gif'
import Image from 'next/image'

const style = {
  listWrapper: `mx-auto grid max-w-fit flex-1 grid-cols-1 gap-8 p-10 pt-24 md:grid-cols-2 md:pt-0 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5`,
  wrapper: ``,
  loader: `flex items-center justify-center max-w-fit pt-0 pb-10 mx-auto`,//`flex items-center md-col-start- lg-col-start- xl:col-start- 2xl:col-start-2`,
  loaderImage: ``,
}

const Listings = () => {

  const [listings, setListings] = useState([])
  
  const marketplace = useMarketplace('0x67783886a50a8642fdA72Da0602e06D1D255379f')

  useEffect(() => {
    getListings()
  }, [])
  
  const getListings = async () => {
    try {
      const list = await marketplace.getActiveListings()

      setListings(list)
    } catch (e) {
      console.log(e)
    }
  }
  
  return (
    <div className={style.wrapper}>
      {listings.length > 0 ? (
      <div className={style.listWrapper}>
        {listings?.map((listing,index) => (
          <Link 
            key={index}
            href = {`/assets/${listing.assetContractAddress}/${listing.id}`}
          >
          <a><NFTCard listing={listing} /></a>
          </Link>
        ))}
      </div>
      ) : (
      <div className={style.loader}><Image className={style.loaderImage} src={loadingBanner} alt='Loading...' width={35} height={35}/></div>
      )}
    </div>
  )
}

export default Listings