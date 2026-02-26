import { z } from "zod";

import type { CSKEventType } from "@/lib/apiClient";

export const EVENT_TYPES = [
  "REHEARSAL",
  "CONCERT",
  "GIG",
  "PARTY",
  "MEETING",
  "OTHER",
] as const satisfies readonly CSKEventType[];

export const eventTypeSchema = z.enum(EVENT_TYPES);

export const createEventSchema = z.object({
  name: z.string().trim().min(1, "Namn på evenemanget krävs."),
  type: eventTypeSchema,
  description: z
    .string()
    .trim()
    .optional()
    .transform((value) => value || undefined),
  dateStart: z.string().trim().min(1, "Datum och tid krävs."),
  place: z.string().trim().min(1, "Plats krävs."),
});

export type CreateEventActionInput = z.input<typeof createEventSchema>;
export type CreateEventRequestBody = z.output<typeof createEventSchema>;
export type CreateEventField = keyof CreateEventActionInput;
export type CreateEventFieldErrors = Partial<Record<CreateEventField, string>>;
