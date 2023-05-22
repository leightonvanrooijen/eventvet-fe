import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchAllProcedures } from "../../../api/fetchAllProcedures";
import { STATUS_MAP } from "../PreformProcedure/PreformProcedure";
import styled, { css } from "styled-components";
import { ListItem } from "../../../componentLibrary/components/atoms/ListItem/ListItem";
import { List } from "../../../componentLibrary/components/molecules/List/List";
import { Typography } from "../../../componentLibrary/components/atoms/Text/Typography";

export const StyledProcedureListContainer = styled("div")`
  width: 200px;
  display: flex;
  flex-direction: column;
  height: 100%;
  border-radius: 0.25rem;
  padding: 0.5rem;
`;

const Heading = styled("div")`
  padding: 0 0.25rem 0.5rem;
`;

export const ProcedureList = ({ setId }: { setId: React.Dispatch<string> }) => {
  const [firstLoadComplete, setFirstLoadComplete] =
    React.useState<boolean>(false);

  const { data, error, isInitialLoading } = useQuery({
    queryKey: ["procedures"],
    queryFn: fetchAllProcedures,
    select: (data): { value: string; text: string; secondaryText: string }[] =>
      data?.map((procedure) => ({
        value: procedure.id,
        text: procedure.name,
        secondaryText: STATUS_MAP[procedure.status],
      })),
  });

  // select the first item in the list on first load
  useEffect(() => {
    if (data && data?.length > 0 && !firstLoadComplete) {
      setId(data[0].value);
      setFirstLoadComplete(true);
    }
  }, [data, setId, firstLoadComplete]);

  return (
    <StyledProcedureListContainer>
      <Heading>
        <Typography variant={"headingSmall"}>Procedures</Typography>
      </Heading>
      <List loading={isInitialLoading}>
        {data &&
          data.map((procedure, i) => (
            <ListItem
              onClick={() => setId(procedure.value)}
              key={procedure.value + i}
              secondaryText={procedure.secondaryText}
            >
              {procedure.text}
            </ListItem>
          ))}
      </List>
    </StyledProcedureListContainer>
  );
};
