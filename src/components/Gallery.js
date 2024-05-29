// import { useContext } from 'react';
// import { DataContext } from '../context/DataContext';
// import GalleryItem from './GalleryItem';

// function Gallery() {
//     const data = useContext(DataContext);

//     const display = data.map((item, index) => {
//         return (
//             <GalleryItem item={item} key={index} />
//         );
//     });

//     return (
//         <div className="gallery">
//             {display}
//         </div>
//     );
// }

// export default Gallery;


import GalleryItem from './GalleryItem';

function Gallery(props) {

    const display = props.data.map((item, index) => {
        return (
            <GalleryItem item={item} key={index} />
        )
    })
    return (
        <div>
            {display}
        </div>
    )
};

export default Gallery;