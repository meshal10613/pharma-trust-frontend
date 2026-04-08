import Banner from "../../components/modules/home/Banner";
import CategoryHome from "../../components/modules/home/CategoryHome";
import MedicineHome from "../../components/modules/home/MedicineHome";
import { categoryService } from "../../services/category.service";
import { Category, Medicine, Review } from "../../types";
import { medicineService } from "../../services/medicine.service";
import WhyChooseUs from "../../components/modules/home/WhyChooseUs";
import { reviewService } from "../../services/review.service";
import Reviews from "../../components/modules/home/Reviews";

export const dynamic = "force-dynamic";

export default async function Home() {
    const [c, m, r] = await Promise.all([
        categoryService.getAllCategorys(),
        medicineService.getAllMedicinesServer(),
        reviewService.getAllReviews(),
    ]);

    const categories: Category[] = c.data?.data || [];
    const medicines: Medicine[] = m.data?.data?.data || [];
    const reviews: Review[] = r.data.data || [];

    return (
        <div className="container mx-auto">
            <Banner />
            <CategoryHome categories={categories} />
            <MedicineHome medicines={medicines} />
            <WhyChooseUs/>
            <Reviews reviews={reviews}/>
        </div>
    );
}
