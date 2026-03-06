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
