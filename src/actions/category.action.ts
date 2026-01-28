"use server";

import { categoryService } from "../services/category.service"

export const createCategory = async(name: string) => {
	return await categoryService.addCategory(name);
}

export const deleteCategory = async(id: string) => {
	return await categoryService.deleteCategory(id);
}