import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Header, Icon } from "semantic-ui-react";

import { useStateValue } from "../state/state";
import { apiBaseUrl } from "../constants";
import { Patient } from "../types";

const IndividualPatientPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [{ patientDetails }, dispatch] = useStateValue();

  React.useEffect(() => {
    const fetchIndividualPatient = async () => {
      try {
        const { data: individualPatientFromApi } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );
        dispatch({
          type: "GET_PATIENT_DETAILS",
          payload: individualPatientFromApi,
        });
      } catch (e) {
        console.error(e);
      }
    };
    fetchIndividualPatient();
  }, [dispatch, id]);

  if (patientDetails[id]) {
    const patient = patientDetails[id];
    return (
      <>
        <Header>
          {patient.name}{" "}
          {patient.gender === "female" ? (
            <Icon name="venus" />
          ) : (
            <Icon name="mars" />
          )}
        </Header>
        <div>ssn: {patient.ssn}</div>
        <div>occupation: {patient.occupation}</div>
      </>
    );
  } else {
    return null;
  }
};

export default IndividualPatientPage;
