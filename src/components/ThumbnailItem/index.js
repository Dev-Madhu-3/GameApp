import './index.css'

const ThumbnailItem = props => {
  const {imagesListItem, onClickThumbnail} = props
  const {thumbnailUrl} = imagesListItem

  const OnClickItem = () => {
    onClickThumbnail(imagesListItem.id)
  }
  return (
    <li>
      <button type='button' className='thumbnail-item' onClick={OnClickItem}>
        <img className='thumbnail-image' src={thumbnailUrl} alt='thumbnail' />
      </button>
    </li>
  )
}

export default ThumbnailItem
