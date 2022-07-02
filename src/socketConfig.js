import { io } from "socket.io-client";
import ApiUrl from "./url";
const socket = io(ApiUrl.network, {
  transports: ["websocket"],
  upgrade: false,
  autoConnect: false,
});
export default socket;
