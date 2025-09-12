import * as tagService from '@services/tagService';
import { Request, Response } from 'express';

// Get all tags
export const getTags = async (req: Request, res: Response) => {
  const tags = await tagService.getAllTags();
  res.json({ tags });
};

// Create a new tag
export const createTag = async (req: Request, res: Response) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: 'Tag name is required' });

  const newTag = await tagService.createTag(name);
  return res.status(201).json({ tag: newTag });
};

// Delete a tag by ID
export const deleteTag = async (req: Request, res: Response) => {
  const tagId = parseInt(req.params.id, 10);
  if (isNaN(tagId)) return res.status(400).json({ error: 'Invalid tag ID' });

  await tagService.deleteTag(tagId);
  return res.status(204).send();
};

// Rename tag with ID
export const updateTag = async (req: Request, res: Response) => {
  const tagId = parseInt(req.params.id, 10);
  const { name } = req.body;
  if (isNaN(tagId)) return res.status(400).json({ error: 'Invalid tag ID' });
  if (!name) return res.status(400).json({ error: 'Tag name is required' });

  const updatedTag = await tagService.updateTag(tagId, name);
  return res.json({ tag: updatedTag });
};
