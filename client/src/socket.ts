import { io } from "socket.io-client";

// "undefined" means the URL will be computed from the `window.location` object
const URL = "http://localhost:4000";

export const ClientSocket = io(URL, {
  autoConnect: true,
});
