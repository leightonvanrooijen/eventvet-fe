import { Skeleton } from "../../../componentLibrary/components/atoms/Skeleton/Skeleton";

export const PreformProcedureLoading = () => {
  return (
    <div>
      <div style={{ display: "flex" }}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Skeleton height={"40px"} width={"200px"}></Skeleton>
          <Skeleton height={"15px"} width={"75px"}></Skeleton>
        </div>
        <div style={{ marginLeft: "auto" }}>
          <Skeleton height={"40px"} width={"100px"}></Skeleton>
        </div>
      </div>
      <div style={{ marginTop: "20px" }}>
        <div style={{ display: "flex" }}>
          <Skeleton height={"30px"} width={"200px"}></Skeleton>
          <div style={{ marginLeft: "auto" }}>
            <Skeleton height={"30px"} width={"50px"}></Skeleton>
          </div>
        </div>
      </div>
    </div>
  );
};
