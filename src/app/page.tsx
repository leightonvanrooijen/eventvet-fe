"use client";
import React, { useEffect } from "react";
import {
  QueryClient,
  QueryClientProvider,
  useQueryClient,
} from "@tanstack/react-query";
import { ProcedureList } from "../components/procedure/ProcedureList/ProcedureList";
import { socket } from "../socket";
import { CreateProcedure } from "../components/procedure/CreatProcedure/CreateProcedure";
import { PreformProcedure } from "../components/procedure/PreformProcedure/PreformProcedure";

const SideBar = ({ setId }: { setId: React.Dispatch<string> }) => {
  return (
    <div className="h-full flex flex-col w-80 ml-2 pt-2 bg-white">
      <ProcedureList setId={setId} />
      <div className="mt-auto mb-4">
        <CreateProcedure />
      </div>
    </div>
  );
};

export default function Home() {
  const [queryClient] = React.useState(() => new QueryClient());
  const [q] = React.useState(() => socket.connect());

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
    <QueryClientProvider client={queryClient}>
      <SideBar setId={setId} />
      {id && (
        <div className="w-full h-full">
          <PreformProcedure id={id} />
        </div>
      )}
    </QueryClientProvider>
  );
}
