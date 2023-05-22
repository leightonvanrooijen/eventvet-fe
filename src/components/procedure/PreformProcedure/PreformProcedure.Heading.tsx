import { Typography } from "../../../componentLibrary/components/atoms/Text/Typography";
import { Button } from "../../../componentLibrary/components/atoms/Button/Button";
import { NEXT_STATUS_ACTION, STATUS_MAP } from "./PreformProcedure";
import { Procedure } from "../../../api/Procedure";

export const PreformProcedureHeading = ({
  procedure,
  onNextStatusClick,
  loading,
}: {
  procedure: Procedure;
  onNextStatusClick: (input: {
    status: "pending" | "inProgress";
    version: number;
    id: string;
  }) => void;
  loading: boolean;
}) => {
  const onStatusButtonClick = ({ status, version, id }: Procedure) => {
    if (status === "pending" || status === "inProgress") {
      onNextStatusClick({ status, version, id });
    }
  };

  return (
    <div>
      <div style={{ display: "flex" }}>
        <div style={{ marginRight: "auto" }}>
          <Typography variant={"headingSmall"}>{procedure.name}</Typography>
          <Typography variant={"bodyLarge"}>
            {STATUS_MAP[procedure.status]}
          </Typography>
        </div>
        <Button
          onClick={() => onStatusButtonClick(procedure)}
          disabled={loading}
        >
          {NEXT_STATUS_ACTION[procedure.status]}
        </Button>
      </div>
    </div>
  );
};
