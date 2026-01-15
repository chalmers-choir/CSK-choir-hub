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
}

export enum CSKAttendanceStatus {
  PRESENT = 'PRESENT',
  ABSENT = 'ABSENT',
}

export interface CSKEventAttendee {
  id: number;
  firstName: string;
  lastName: string;
  status?: CSKAttendanceStatus; // true: present/registered, false: absent, null/undefined: not set
}

export interface CSKEventRegistration {
  id: number;
  firstName: string;
  lastName: string;
  comments?: string;
  dietaryPreferences?: string;
}
