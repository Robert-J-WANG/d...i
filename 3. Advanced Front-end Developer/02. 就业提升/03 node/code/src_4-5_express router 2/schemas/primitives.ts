import { z } from "zod";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

/* ---------- number ---------- */

export const numberSchema = z.coerce.number();

/* ---------- int ---------- */

export const intSchema = z.coerce.number().int();

/* ---------- string ---------- */

export const stringSchema = () =>
  z.preprocess((v) => (typeof v === "string" ? v.trim() : v), z.string());

/* ---------- boolean ---------- */

export const booleanSchema = z.preprocess((v) => {
  if (v === true || v === false) return v;
  if (v === "true" || v === "1") return true;
  if (v === "false" || v === "0") return false;
  return v;
}, z.boolean());

/* ---------- date (UTC) ---------- */

export const utcDateSchema = z.preprocess((v) => {
  if (v instanceof Date) {
    return dayjs(v).utc().toDate();
  }
  if (typeof v === "string" || typeof v === "number") {
    const d = dayjs(v);
    if (!d.isValid()) return v;
    return d.utc().toDate();
  }
}, z.date());

/* =========================
   统一导出
   ========================= */

export const s = {
  numberSchema,
  intSchema,
  booleanSchema,
  utcDateSchema,
  stringSchema,
};
