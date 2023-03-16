import React, { useCallback, useEffect, useState } from "react";

import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import PosterList from "./PosterList";
import { useHttpClient } from "./../../shared/hooks/http-hook";
import { useParams } from "react-router-dom";

const UserPosters = () => {
  const [posters, setPosters] = useState([]);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const params = useParams();
  const userId = params.uid;
  
  useEffect(() => {
    const fetchPosters = async () => {
      try {
        const responseData = await sendRequest(
          process.env.REACT_APP_URL + `/posters/user/${userId}`,
          "GET",
          null,
          {}
        );

        if (responseData) {
          setPosters(responseData.posters);
        } else {
          throw new Error("Something went wrong");
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchPosters();
  }, [sendRequest, userId]);

  const deleteHandler = (deletedId) => {
    setPosters((prev) => prev.filter((poster) => poster.id !== deletedId));
  };

  const userPosters = posters.filter((poster) => poster.userId === userId);
  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <LoadingSpinner asOverlay />}
      {!isLoading && posters && (
        <PosterList posters={userPosters} onDelete={deleteHandler} />
      )}
    </React.Fragment>
  );
};

export default UserPosters;
