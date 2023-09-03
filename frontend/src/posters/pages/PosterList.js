import './PosterList.css';

import Button from '../../shared/components/Form/Button';
import PosterListItem from './PosterListItem';

const PosterList = (props) => {
  if (props.posters.length !== 0) {
    return (
      <ul className='place-list'>
        {props.posters.map((poster) => (
          <PosterListItem
            key={poster._id}
            id={poster._id}
            imageUrl={poster.imageUrl}
            title={poster.title}
            year={poster.year}
            description={poster.description}
            trailerUrl={poster.trailerUrl}
            userid={poster.userId}
            onDelete={props.onDeletePoster}
          />
        ))}
      </ul>
    );
  } else {
    return (
      <div className='poster-list'>
        <h2>No posters.</h2>
        <Button to='/posters/new'>Share Poster</Button>
      </div>
    );
  }
};

export default PosterList;
