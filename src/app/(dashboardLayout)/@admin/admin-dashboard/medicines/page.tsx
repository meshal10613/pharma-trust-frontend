import AddMedicine from "../../../../../components/modules/seller/medicine/AddMedicine";
import MedicineTable from "../../../../../components/modules/seller/medicine/MedicineTable";
import { categoryService } from "../../../../../services/category.service";
import { medicineService } from "../../../../../services/medicine.service";
import { userService } from "../../../../../services/user.service";
import { Category, Medicine, User } from "../../../../../types";

export default async function MedicinesPage() {
    const [m, c, u] = await Promise.all([
        medicineService.getAllMedicines(),
        categoryService.getAllCategorys(),
        userService.getSession(),
    ]);

    const medicines: Medicine[] = m.data.data.data;
    const categories: Category[] = c.data.data;
    const user: User = u.data.user;

    return (
        <div>
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold mb-5">
                    Medicine Management
                </h2>
                <AddMedicine categories={categories} user={user} />
            </div>
            <MedicineTable medicines={medicines} />
        </div>
    );
}
