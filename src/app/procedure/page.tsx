"use client";
import React from "react";
import { PreformProcedure } from "../../components/procedure/PreformProcedure/PreformProcedure";
import { ProcedureList } from "../../components/procedure/ProcedureList/ProcedureList";

export default function Home() {
  const [id, setId] = React.useState<string>("");

  return (
    <>
      <ProcedureList setId={setId} />
      {id && <PreformProcedure id={id} />}
    </>
  );
}
