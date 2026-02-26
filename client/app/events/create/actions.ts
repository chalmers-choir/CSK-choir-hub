"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

import { request as apiRequest } from "@/lib/api-client/core/request";
import {
  ApiError,
  type CSKEvent,
  type CSKEventSummary,
  OpenAPI,
  type OpenAPIConfig,
} from "@/lib/apiClient";

import {
  type CreateEventActionInput,
  type CreateEventFieldErrors,
  type CreateEventRequestBody,
  createEventSchema,
} from "./schema";

type ActionStatus = "idle" | "success" | "error";

export type CreateEventActionState = {
  status: ActionStatus;
  message?: string;
  formError?: string;
  eventId?: number;
  fieldErrors?: CreateEventFieldErrors;
};

export const initialCreateEventActionState: CreateEventActionState = {
  status: "idle",
};

function getFieldErrors(inputErrors: Record<string, string[] | undefined>): CreateEventFieldErrors {
  return {
    name: inputErrors.name?.[0],
    type: inputErrors.type?.[0],
    description: inputErrors.description?.[0],
    dateStart: inputErrors.dateStart?.[0],
    place: inputErrors.place?.[0],
  };
}

function toApiRequestBody(input: CreateEventRequestBody): CSKEventSummary {
  return {
    ...input,
    requiresRegistration: false,
    requiresAttendance: false,
  };
}

async function addEventWithRequestScopedHeaders(
  requestBody: CSKEventSummary,
  cookie: string | null,
): Promise<{ event: CSKEvent }> {
  const baseHeadersConfig = OpenAPI.HEADERS;

  const requestConfig: OpenAPIConfig = {
    ...OpenAPI,
    HEADERS: async (options) => {
      const baseHeaders =
        typeof baseHeadersConfig === "function"
          ? await baseHeadersConfig(options)
          : (baseHeadersConfig ?? {});

      return cookie ? { ...baseHeaders, cookie } : { ...baseHeaders };
    },
  };

  return apiRequest<{ event: CSKEvent }>(requestConfig, {
    method: "POST",
    url: "/events",
    body: requestBody,
    mediaType: "application/json",
    errors: {
      400: "Invalid event data",
      401: "Unauthorized",
      403: "Forbidden",
    },
  });
}

function getActionErrorMessage(error: unknown): string {
  if (error instanceof ApiError) {
    const bodyMessage =
      typeof error.body === "object" && error.body && "message" in error.body
        ? (error.body.message as string | undefined)
        : undefined;

    return bodyMessage || error.message || "Kunde inte skapa evenemang.";
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "Kunde inte skapa evenemang.";
}

export async function createEventAction(
  _prevState: CreateEventActionState,
  input: CreateEventActionInput,
): Promise<CreateEventActionState> {
  const parsed = createEventSchema.safeParse(input);

  if (!parsed.success) {
    const { fieldErrors } = parsed.error.flatten();

    return {
      status: "error",
      fieldErrors: getFieldErrors(fieldErrors),
    };
  }

  const requestHeaders = await headers();
  const cookie = requestHeaders.get("cookie");

  try {
    const { event } = await addEventWithRequestScopedHeaders(toApiRequestBody(parsed.data), cookie);

    revalidatePath("/events");
    revalidatePath(`/events/${event.id}`);

    return {
      status: "success",
      message: "Evenemang skapat!",
      eventId: event.id,
    };
  } catch (error) {
    return {
      status: "error",
      formError: getActionErrorMessage(error),
    };
  }
}
