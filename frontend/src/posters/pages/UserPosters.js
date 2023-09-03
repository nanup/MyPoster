import React, { useEffect, useState } from 'react';

import ErrorModal from '../../shared/components/UI/ErrorModal';
import PosterList from './PosterList';
import { useHttpClient } from '../../shared/hooks/httpHook';
import { useParams } from 'react-router-dom';

const UserPosters = () => {
  const [posters, setPosters] = useState();
  const {error, sendRequest, clearError } = useHttpClient();

  const params = useParams();
  const userId = params.uid;

  useEffect(() => {
    const fetchPosters = async () => {
      try {
        const responseData = await sendRequest(
          process.env.REACT_APP_API_URL + `/posters/user/${userId}`
        );
        setPosters(responseData.posters);
      } catch (err) {
        console.log(err);
      }
    };
    fetchPosters();
  }, [sendRequest, userId]);

  const deleteHandler = (deletedId) => {
    setPosters((prevPosters) =>
      prevPosters.filter((poster) => poster._id !== deletedId)
    );
  };

  return (
    <React.Fragment>
      <ErrorModal
        error={error}
        onClear={clearError}
      />
      {posters && (
        <PosterList
          posters={posters}
          onDeletePoster={deleteHandler}
        />
      )}
    </React.Fragment>
  );
};

export default UserPosters;
