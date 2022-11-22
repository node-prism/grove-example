import { PrismApp } from "@prsm/grove";
import { Connection } from "@prsm/grove/ws";

export default class SocketAuthTracker {
  static authenticatedSocketIds: Connection[] = [];

  static init(app: PrismApp) {
    app.wss.on("connected", (connection: Connection) => {
      connection.send({ command: "hello:world", payload: { hello: "world" } });
      app.wss.addToRoom("online", connection);
    });
    app.wss.on("close", (connection: Connection) => {
      SocketAuthTracker.authenticatedSocketIds =
        SocketAuthTracker.authenticatedSocketIds.filter(
          (c) => c.id !== connection.id
        );
      app.wss.removeFromRoom("online", connection);
    });
  }

  static addAuthenticatedConnection(connection: Connection) {
    SocketAuthTracker.authenticatedSocketIds.push(connection);
  }

  static isAuthenticated(connection: Connection) {
    return SocketAuthTracker.authenticatedSocketIds.includes(connection);
  }
}
