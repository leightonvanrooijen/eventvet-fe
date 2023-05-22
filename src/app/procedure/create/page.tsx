"use client";
import React, { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { socket } from "../../../socket";
import { CreateProcedure } from "../../../components/procedure/CreatProcedure/CreateProcedure";

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

  return <CreateProcedure />;
}
