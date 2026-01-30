"use server";

import { reviewService } from "../services/review.service";
import { Review } from "../types";

export const createReview = async(data: Partial<Review>) => {
	return await reviewService.createReview(data);
}