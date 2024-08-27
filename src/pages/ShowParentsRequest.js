import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showRequestedParents } from "../services/operations/motherAPI";
import { setReqValue } from "../slices/pmSlice";

const ShowParentsRequest = () => {
  const { token } = useSelector((state) => state.auth);
  const [requests, setRequests] = useState([]);
  const [acceptedRequests, setAcceptedRequests] = useState(() => {
    // Retrieve accepted requests from local storage on component mount
    const savedAcceptedRequests = localStorage.getItem("acceptedRequests");
    return savedAcceptedRequests ? JSON.parse(savedAcceptedRequests) : {};
  });
  const dispatch = useDispatch();

  async function temp() {
    try {
      const response = await showRequestedParents(token);
      console.log("RESPONSE ....", response);
      setRequests(response.requests);
    } catch (error) {
      console.log("ERROR IN SHOW REQUESTED PARENTS ....", error);
    }
  }

  function acceptRequest(id) {
    // console.log("ID ....", id);
    const newAcceptedRequests = { ...acceptedRequests, [id]: true };
    // console.log(newAcceptedRequests);
    setAcceptedRequests(newAcceptedRequests);
    localStorage.setItem("acceptedRequests", JSON.stringify(newAcceptedRequests));
    dispatch(setReqValue());
  }

  useEffect(() => {
    temp();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-medium text-indigo-600 mb-7">Requests</h1>

      <div>
        {requests.length === 0 ? (
          <h1>Loading....</h1>
        ) : requests.length > 0 ? (
          requests.map((request) => {
            return (
              <div key={request._id} className="flex flex-col h-32 w-32 items-center border-x-4">
                <img src={request.image} alt={`${request.firstName} ${request.lastName}`} />
                <div>
                  <h1>{`${request.firstName} ${request.lastName}`}</h1>
                </div>
                <button
                  className="bg-yellow-300 p-2 rounded-lg"
                  onClick={() => acceptRequest(request._id)}
                >
                  {acceptedRequests[request._id] ? (
                    <span>Chat Now !!</span> // TODO: redirect to a chatting website
                  ) : (
                    <span>Accept..</span>
                  )}
                </button>
              </div>
            );
          })
        ) : (
          <h1>No Requests....</h1>
        )}
      </div>
    </div>
  );
};

export default ShowParentsRequest;
