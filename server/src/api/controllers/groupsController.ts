import { groupService } from '@services';
import { Request, Response } from 'express';

// Get all groups
export const getGroupsHandler = async (req: Request, res: Response) => {
  try {
    const groups = await groupService.getAllGroups();
    res.json({ groups });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a group by ID
export const deleteGroupHandler = async (req: Request, res: Response) => {
  try {
    const groupId = parseInt(req.params.id, 10);
    if (isNaN(groupId)) return res.status(400).json({ error: 'Invalid group ID' });

    await groupService.deleteGroup(groupId);
    return res.status(204).send();
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
};
