import React, { useState } from "react";
import { Button, Alert } from "reactstrap";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import config from "../auth_config.json";

const { apiOrigin = "http://localhost:3001" } = config;

const ExternalApiComponent = () => {
  const [state, setState] = useState({
    showResult: false,
    endpointMessage: "",
    error: null
  });

  const { loginWithPopup, getAccessTokenWithPopup } = useAuth0();

  const handleConsent = async () => {
    try {
      await getAccessTokenWithPopup();
      setState({
        ...state,
        error: null
      });
    } catch (error) {
      setState({
        ...state,
        error: error.error
      });
    }
  };

  const handleLoginAgain = async () => {
    try {
      await loginWithPopup();
      setState({
        ...state,
        error: null
      });
    } catch (error) {
      setState({
        ...state,
        error: error.error
      });
    }

    await callPublicEndpoint();
  };

  const callProtectedEndpoint = async () => {
    return;
  };

  const callPublicEndpoint = async () => {
    return;
  };

  const handle = (e, fn) => {
    e.preventDefault();
    fn();
  };

  return (
    <>
      <div className="mb-5">
        {state.error === "consent_required" && (
          <Alert color="warning">
            You need to{" "}
            <a
              href="#/"
              className="alert-link"
              onClick={(e) => handle(e, handleConsent)}
            >
              consent to get access to users api
            </a>
          </Alert>
        )}

        {state.error === "login_required" && (
          <Alert color="warning">
            You need to{" "}
            <a
              href="#/"
              className="alert-link"
              onClick={(e) => handle(e, handleLoginAgain)}
            >
              log in again
            </a>
          </Alert>
        )}

        <h1>External API</h1>
        <p>
          Ping an external API by clicking one of the buttons below. The private
          APIs will call the external API using an access token, and the API
          will validate it using the API's audience value.
        </p>
        <div>
          <Button color="primary" className="mt-5" onClick={callPublicEndpoint}>
            Ping Public Endpoint
          </Button>
        </div>
        <div>
          <Button
            color="primary"
            className="mt-5"
            onClick={callProtectedEndpoint}
          >
            Ping Protected Endpoint
          </Button>
        </div>
      </div>

      <div className="result-block-container">
        {state.showResult && (
          <div className="result-block" data-testid="api-result">
            <h6 className="muted">Result</h6>
            {state.endpointMessage.msg}
          </div>
        )}
      </div>
    </>
  );
};

export default ExternalApiComponent;
