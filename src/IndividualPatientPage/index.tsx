import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Header, Icon } from "semantic-ui-react";

import { useStateValue, setPatientDetails } from "../state";
import { apiBaseUrl } from "../constants";
import { Entry, Patient } from "../types";

const IndividualPatientPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [{ diagnoses, patientDetails }, dispatch] = useStateValue();

  React.useEffect(() => {
    const fetchIndividualPatient = async () => {
      try {
        const { data: individualPatientFromApi } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );
        dispatch(setPatientDetails(individualPatientFromApi));
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
        <Header as="h2">
          {patient.name}{" "}
          {patient.gender === "female" ? (
            <Icon name="venus" />
          ) : (
            <Icon name="mars" />
          )}
        </Header>
        <div>ssn: {patient.ssn}</div>
        <div>occupation: {patient.occupation}</div>
        <Header as="h3">entries:</Header>
        {patient.entries
          ? patient.entries.map((entry: Entry) => (
              <>
                <div>
                  {entry.date} {entry.description}
                </div>
                <ul>
                  {entry.diagnosisCodes
                    ? entry.diagnosisCodes.map((code: string) => (
                        <li key={code}>
                          {code} {diagnoses[code]?.name}
                        </li>
                      ))
                    : null}
                </ul>
              </>
            ))
          : null}
      </>
    );
  } else {
    return null;
  }
};

export default IndividualPatientPage;
