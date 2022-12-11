import Image from 'next/image'
import { AiOutlineHeart } from 'react-icons/ai'

const style = {
  wrapper: `rounded-lg dark:bg-[#313339] lg:max-w-none max-w-fit`,
  nftHeader: `flex items-center justify-between p-4`,
  likesContainer: `flex items-center justify-end space-x-2`,
  heartIcon: `h-5 w-5 text-gray-500 dark:text-gray-400`,
  likesCount: `text-sm font-semibold text-gray-500 dark:text-gray-400`,
  nftImage: `rounded-b-lg object-cover`,
  imageWrapper: `flex items-center`,
}

const NFTImage = ({image}) => {
  return (
    <div className={style.wrapper}>
      <div className={style.nftHeader}>
        <Image height={20} width={20} src='/eth-logo.svg' alt='eth' />

        <div className={style.likesContainer}>
          <AiOutlineHeart className={style.heartIcon} />
          <div className={style.likesCount}>
            0
          </div>
        </div>
      </div>

      <div className={style.imageWrapper}>
        {image && <Image className={style.nftImage}
                   src={image} 
                   alt='nft' 
                   width={390}
                   height={390}
              />}
      </div>
    </div>
  )
}

export default NFTImage