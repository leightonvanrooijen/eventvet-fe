import { io } from "socket.io-client";

export const PROCEDURE_URL = "http://localhost:4000";
export const socket = io(PROCEDURE_URL, {
  transports: ["websocket"],
  autoConnect: false,
});
