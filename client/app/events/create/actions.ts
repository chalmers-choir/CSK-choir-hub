"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

import { z } from "zod";

import { EventsService, OpenAPI } from "@/lib/apiClient";

const eventTypeSchema = z.enum(["REHEARSAL", "CONCERT", "GIG", "PARTY", "MEETING", "OTHER"]);

const createEventSchema = z.object({
  name: z.string().trim().min(1, "Namn på evenemanget krävs."),
  type: eventTypeSchema,
  description: z.string().trim().optional(),
  dateStart: z
    .string()
    .trim()
    .min(1, "Datum och tid krävs.")
    .refine((value) => !Number.isNaN(Date.parse(value)), "Ogiltigt datum eller tid."),
  place: z.string().trim().min(1, "Plats krävs."),
});

export type CreateEventActionInput = z.input<typeof createEventSchema>;

export type CreateEventActionResult =
  | { ok: true; eventId: number }
  | { ok: false; message: string };

export type CreateEventActionState = CreateEventActionResult | null;

export async function createEventAction(
  _prevState: CreateEventActionState,
  input: CreateEventActionInput,
): Promise<CreateEventActionResult> {
  const parsed = createEventSchema.safeParse(input);

  if (!parsed.success) {
    const firstIssue = parsed.error.issues[0];

    return {
      ok: false,
      message: firstIssue?.message ?? "Ogiltiga fält.",
    };
  }

  const requestHeaders = await headers();
  const cookie = requestHeaders.get("cookie");

  try {
    if (cookie) {
      OpenAPI.HEADERS = { cookie };
    }

    const { event } = await EventsService.addEvent({
      requestBody: {
        name: parsed.data.name,
        type: parsed.data.type,
        description: parsed.data.description || undefined,
        dateStart: parsed.data.dateStart,
        place: parsed.data.place,
        requiresRegistration: false,
        requiresAttendance: false,
      },
    });

    revalidatePath("/events");
    revalidatePath(`/events/${event.id}`);

    return { ok: true, eventId: event.id };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Kunde inte skapa evenemang.";

    return { ok: false, message };
  }
}
