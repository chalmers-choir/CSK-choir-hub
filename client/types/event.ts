export enum CSKEventType {
  REHEARSAL = 'REHEARSAL',
  CONCERT = 'CONCERT',
  GIG = 'GIG',
  PARTY = 'PARTY',
  MEETING = 'MEETING',
  OTHER = 'OTHER',
}

export interface CSKEvent {
  id: number;
  createdAt: string;
  updatedAt: string;
  name: string;
  type: CSKEventType;
  dateStart: string;
  dateEnd?: string;
  place: string;
  description?: string;
  requiresAttendance: boolean;
  requiresRegistration: boolean;
  attendances?: any[];
  registrations?: any[];
}
