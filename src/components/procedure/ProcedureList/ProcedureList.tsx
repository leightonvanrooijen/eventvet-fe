import { List } from "../../common/List/List";
import { ListItem } from "../../common/ListItem/LIstItem";
import React, { useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchAllProcedures } from "../../../api/fetchAllProcedures";
import { STATUS_MAP } from "../PreformProcedure/PreformProcedure";

export const ProcedureList = ({ setId }: { setId: React.Dispatch<string> }) => {
  const { data, error, isInitialLoading } = useQuery({
    queryKey: ["procedures"],
    queryFn: fetchAllProcedures,
    select: (data): { id: string; text: string; secondaryText: string }[] =>
      data?.map((procedure) => ({
        id: procedure.id,
        text: procedure.name,
        secondaryText: STATUS_MAP[procedure.status],
      })),
  });

  return (
    <div className="flex-col flex min-h-0">
      <div className="py-1 pl-2.5 bg-white">
        <p className="font-bold text-2xl">Procedures</p>
      </div>
      <List loading={isInitialLoading}>
        {data &&
          data.map((item) => (
            <ListItem
              key={item.id}
              text={item.text}
              secondaryText={item.secondaryText}
              onClick={() => setId(item.id)}
            />
          ))}
      </List>
    </div>
  );
};
