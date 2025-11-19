import { EventEmitter } from "events";
import http from "http";

export class MyRequest extends EventEmitter {
  constructor(private url, private options = {}) {
    super();
  }

  send(body = "") {
    const request = http.request(this.url, this.options, (res) => {
      let result = "";
      res.on("data", (chunck) => {
        result += chunck.toString("utf-8");
      });

      res.on("end", () => {
        this.emit("res", res.headers, result);
      });
    });

    request.write(body);
    request.end();
  }
}
