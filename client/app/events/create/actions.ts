'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { ApiError, type CSKEventSummary, EventsService } from '@/lib/serverApiClient';

import {
  type CreateEventFieldErrors,
  type CreateEventRequestBody,
  createEventSchema,
} from './schema';

type ActionStatus = 'idle' | 'success' | 'error';

export type CreateEventActionState = {
  status: ActionStatus;
  message?: string;
  formError?: string;
  eventId?: number;
  fieldErrors?: CreateEventFieldErrors;
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

function getActionErrorMessage(error: unknown): string {
  if (error instanceof ApiError) {
    const bodyMessage =
      typeof error.body === 'object' && error.body && 'message' in error.body
        ? (error.body.message as string | undefined)
        : undefined;

    return bodyMessage || error.message || 'Kunde inte skapa evenemang.';
  }

  if (error instanceof Error) {
    return error.message;
  }

  return 'Kunde inte skapa evenemang.';
}

export async function createEventAction(
  _prevState: CreateEventActionState,
  formData: FormData,
): Promise<CreateEventActionState> {
  const input = {
    name: String(formData.get('name') ?? ''),
    type: String(formData.get('type') ?? ''),
    description: String(formData.get('description') ?? ''),
    dateStart: String(formData.get('dateStart') ?? ''),
    place: String(formData.get('place') ?? ''),
  };

  const parsed = createEventSchema.safeParse(input);

  if (!parsed.success) {
    const { fieldErrors } = parsed.error.flatten();

    return {
      status: 'error',
      fieldErrors: getFieldErrors(fieldErrors),
    };
  }

  try {
    const { event } = await EventsService.addEvent({
      requestBody: toApiRequestBody(parsed.data),
    });

    revalidatePath('/events');
    revalidatePath(`/events/${event.id}`);
  } catch (error) {
    return {
      status: 'error',
      formError: getActionErrorMessage(error),
    };
  }
  redirect(`/events`);
}
