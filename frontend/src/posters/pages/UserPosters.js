import React, { useEffect, useState } from 'react';

import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import PosterList from './PosterList';
import { useHttpClient } from './../../shared/hooks/http-hook';
import { useParams } from 'react-router-dom';

const UserPosters = () => {
  const [posters, setPosters] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const params = useParams();
  const userId = params.uid;

  useEffect(() => {
    const fetchPosters = async () => {
      try {
        const responseData = await sendRequest(
          process.env.dev.REACT_APP_URL + `/posters/user/${userId}`
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
      {isLoading && <LoadingSpinner asOverlay />}
      {!isLoading && posters && (
        <PosterList
          posters={posters}
          onDeletePoster={deleteHandler}
        />
      )}
    </React.Fragment>
  );
};

export default UserPosters;
