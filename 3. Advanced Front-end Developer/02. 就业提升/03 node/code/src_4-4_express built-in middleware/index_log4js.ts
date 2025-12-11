import { sqlLogger, defaultLogger } from "./utils/logger";

/* ----------- 使用sqlLogger ---------- */
/* setInterval(() => {
  sqlLogger.debug("debug msgs");
}, 100);
 */
/* --------- 使用defaultLogger -------- */
setInterval(() => {
  defaultLogger.debug("debug msgs");
}, 100);
