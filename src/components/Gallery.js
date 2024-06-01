import GalleryItem from './GalleryItem';

const Gallery = ({ data }) => {
    const display = data.map((item, index) => (
        <GalleryItem item={item} key={index} />
    ))

    return (
        <div>
            {display}
        </div>
    )
};

export default Gallery;
