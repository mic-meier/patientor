import React from "react";
import { Diagnosis, HospitalEntryType } from "../types";
import { Card, Icon } from "semantic-ui-react";

const HospitalEntry: React.FC<{
  entry: HospitalEntryType;
  diagnoses: { [id: string]: Diagnosis };
}> = ({ entry, diagnoses }) => {
  return (
    <>
      <Card>
        <Card.Content>
          <Card.Header>
            {entry.date} <Icon name="hospital" />
          </Card.Header>
          <Card.Description>{entry.description}</Card.Description>
        </Card.Content>
        <Card.Content extra>
          {entry.diagnosisCodes
            ? entry.diagnosisCodes.map((code: string) => (
                <div key={code}>{diagnoses[code]?.name}</div>
              ))
            : null}
        </Card.Content>
        <Card.Content>
          <div>Discharge: {entry.discharge.date}</div>
          <div>Reason: {entry.discharge.criteria}</div>
        </Card.Content>
      </Card>
    </>
  );
};

export default HospitalEntry;
