import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Button, Header, Icon } from "semantic-ui-react";

import AddEntryModal from "../AddEntryModal";
import EntryDetails from "../EntryDetails";
import { useStateValue, setPatientDetails, updatePatient } from "../state";
import { apiBaseUrl } from "../constants";
import { Entry, Patient } from "../types";
import { EntryFormValues } from "../AddEntryModal/AddEntryForm";

const IndividualPatientPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [{ diagnoses, patientDetails }, dispatch] = useStateValue();
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewEntry = async (values: EntryFormValues) => {
    try {
      const { data: updatedPatient } = await axios.post<Patient>(
        `${apiBaseUrl}/patients/${id}/entries`,
        values
      );
      dispatch(updatePatient(updatedPatient));
      closeModal();
    } catch (e) {
      console.error(e.response.data);
      setError(e.response.data.error);
    }
  };

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
        <AddEntryModal
          modalOpen={modalOpen}
          onSubmit={submitNewEntry}
          error={error}
          onClose={closeModal}
          diagnoses={diagnoses}
        />
        <br />
        <Button onClick={() => openModal()}>Add New Entry</Button>
        <Header as="h3">entries:</Header>
        {patient.entries
          ? patient.entries.map((entry: Entry, i: number) => (
              <EntryDetails key={i} entry={entry} />
            ))
          : null}
      </>
    );
  } else {
    return null;
  }
};

export default IndividualPatientPage;
