import Banner from "../../components/modules/home/Banner";
import CategoryHome from "../../components/modules/home/CategoryHome";
import MedicineHome from "../../components/modules/home/MedicineHome";
import { categoryService } from "../../services/category.service";
import { Category, Medicine } from "../../types";
import { medicineService } from "../../services/medicine.service";

export default async function Home() {
    const [ c, m ] = await Promise.all([
        categoryService.getAllCategorys(),
        medicineService.getAllMedicines(),
    ]);

    const categories: Category[] = c.data?.data;
    const medicines: Medicine[] = m.data?.data?.data;

    return (
        <div className="container mx-auto">
            <Banner />
            <CategoryHome categories={categories} />
            <MedicineHome medicines={medicines} />
        </div>
    );
}
