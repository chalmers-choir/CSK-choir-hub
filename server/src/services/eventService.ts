import { eventModel } from '@db';

export async function getAllEvents() {
  return eventModel.findAll();
}

export async function deleteEvent(eventId: number) {
  await eventModel.deleteById(eventId);
}
