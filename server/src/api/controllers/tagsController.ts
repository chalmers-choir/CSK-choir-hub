import * as tagService from '@services/tagService';
import { BadRequestError } from '@utils/errors';
import { NextFunction, Request, Response } from 'express';

// Get all tags
export const getTags = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const tags = await tagService.getAllTags();
    res.json({ tags });
  } catch (error) {
    next(error);
  }
};

// Create a new tag
export const createTag = async (req: Request, res: Response, next: NextFunction) => {
  const { name } = req.body;
  if (!name) return next(new BadRequestError('Tag name is required'));

  try {
    const newTag = await tagService.createTag(name);
    return res.status(201).json({ tag: newTag });
  } catch (error) {
    return next(error);
  }
};

// Delete a tag by ID
export const deleteTag = async (req: Request, res: Response, next: NextFunction) => {
  const tagId = parseInt(req.params.id, 10);
  if (isNaN(tagId)) return next(new BadRequestError('Invalid tag ID'));

  try {
    await tagService.deleteTag(tagId);
    return res.status(204).send();
  } catch (error) {
    next(error);
  }
};

// Rename tag with ID
export const updateTag = async (req: Request, res: Response, next: NextFunction) => {
  const tagId = parseInt(req.params.id, 10);
  if (isNaN(tagId)) return next(new BadRequestError('Invalid tag ID'));

  const { name } = req.body;
  if (!name) return next(new BadRequestError('Tag name is required'));

  try {
    const updatedTag = await tagService.updateTag(tagId, name);
    return res.json({ tag: updatedTag });
  } catch (error) {
    next(error);
  }
};
