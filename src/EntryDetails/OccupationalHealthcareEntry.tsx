import React from "react";
import { Diagnosis, OccupationalHealthCareEntry } from "../types";
import { Card, Icon } from "semantic-ui-react";

interface Props {
  entry: OccupationalHealthCareEntry;
  diagnoses: { [id: string]: Diagnosis };
}

const OccupationalHealthcareEntry: React.FC<Props> = ({ entry, diagnoses }) => {
  return (
    <>
      <Card>
        <Card.Content>
          <Card.Header>
            {entry.date} <Icon name="address card" />
          </Card.Header>
          <Card.Description>Description: {entry.description}</Card.Description>
        </Card.Content>
        <Card.Content>
          <div>Diagnosis:</div>
          {entry.diagnosisCodes
            ? entry.diagnosisCodes.map((code: string) => (
                <div key={code}>{diagnoses[code]?.name}</div>
              ))
            : null}
        </Card.Content>
        <Card.Content>Employer: {entry.employerName}</Card.Content>
        {entry.sickLeave ? (
          <Card.Content>
            Sick leave from {entry.sickLeave.startDate} to{" "}
            {entry.sickLeave.endDate}
          </Card.Content>
        ) : null}
      </Card>
    </>
  );
};
// const OccupationalHealthcareEntry = (props: any) => {
//   console.log("entry", props.entry);
//   const entry = props.entry;
//   return (
//     <>
//       <Card>
//         <Card.Content>
//           <Card.Header>
//             {props.entry.date} <Icon name="address card" />
//           </Card.Header>
//           <Card.Description>{entry.description}</Card.Description>
//         </Card.Content>
//         <Card.Content extra>
//           {entry.diagnosisCodes
//             ? entry.diagnosisCodes.map((code: string) => (
//                 <div key={code}>{props.diagnoses[code]?.name}</div>
//               ))
//             : null}
//         </Card.Content>

//         <Card.Content>{entry.employerName}</Card.Content>
//       </Card>
//     </>
//   );
// };

export default OccupationalHealthcareEntry;
