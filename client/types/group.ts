import { GroupType as ApiGroupType } from '@/lib/api-client/models/GroupType';

export const GroupType = {
  VOICE: 'VOICE',
  CHOIR: 'CHOIR',
  COMMITTEE: 'COMMITTEE',
  OTHER: 'OTHER',
} as const;

export type GroupType = (typeof GroupType)[keyof typeof GroupType];

// Compile-time check (no runtime effect)
const _assert: Record<GroupType, ApiGroupType> = GroupType;
