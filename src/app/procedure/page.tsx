"use client";
import React, { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { socket } from "../../socket";
import { PreformProcedure } from "../../components/procedure/PreformProcedure/PreformProcedure";
import { ProcedureList } from "../../components/procedure/ProcedureList/ProcedureList";

export default function Home() {
  const queryClient = useQueryClient();
  const [id, setId] = React.useState<string>("");

  useEffect(() => {
    const onProcedureUpdated = (id: string) => {
      queryClient.invalidateQueries(["procedures"]);
      queryClient.invalidateQueries(["procedure", id]);
    };

    socket.on("procedure updated", onProcedureUpdated);

    return () => {
      socket.off("procedure updated", onProcedureUpdated);
    };
  }, [queryClient]);

  return (
    <>
      <ProcedureList setId={setId} />
      {id && <PreformProcedure id={id} />}
    </>
  );
}
