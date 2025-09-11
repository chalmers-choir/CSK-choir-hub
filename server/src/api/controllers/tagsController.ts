import * as tagService from '@services/tagService';
import { Request, Response } from 'express';

// Get all tags
export const getTags = async (req: Request, res: Response) => {
  try {
    const tags = await tagService.getAllTags();
    res.json({ tags });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

// Create a new tag
export const createTag = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ error: 'Tag name is required' });

    const newTag = await tagService.createTag(name);
    return res.status(201).json({ tag: newTag });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
};

// Delete a tag by ID
export const deleteTag = async (req: Request, res: Response) => {
  try {
    const tagId = parseInt(req.params.id, 10);
    if (isNaN(tagId)) return res.status(400).json({ error: 'Invalid tag ID' });

    await tagService.deleteTag(tagId);
    return res.status(204).send();
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
};
