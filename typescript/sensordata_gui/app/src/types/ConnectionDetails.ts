import { ConnectionStatus } from "../utils/Connections";

export default interface ConnectionDetails {
  IP: string;
  port: string;
  connectionStatus: ConnectionStatus;
}
