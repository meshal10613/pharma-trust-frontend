"use server";

import { updateTag } from "next/cache";
import { categoryService } from "../services/category.service"

export const createCategory = async(name: string) => {
	updateTag("categories");
	return await categoryService.addCategory(name);
}

export const deleteCategory = async(id: string) => {
	updateTag("categories");
	return await categoryService.deleteCategory(id);
}

export const updateCategory = async(id: string, name: string) => {
	updateTag("categories");
	return await categoryService.updateCategory(id, name);
}