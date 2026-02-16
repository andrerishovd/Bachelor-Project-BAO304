export interface IChatMessage {
  id: string;
  body: string;
  localDateTime: string; // ISO 8601 format: "2026-02-12T14:21:44.966631"
  senderType: "USER" | "AI";
}
