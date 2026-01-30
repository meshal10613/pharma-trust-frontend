import MedicineCards from "../../../components/modules/medicines/MedicineCards";
import MedicinesPagination from "../../../components/modules/medicines/MedicinePagination";
import { medicineService } from "../../../services/medicine.service";
import { Medicine } from "../../../types";

export default async function MedicinesPage({
    searchParams,
}: {
    searchParams: Promise<{ page: string }>;
}) {
    const { page } = await searchParams;
    const { data } = await medicineService.getAllMedicines({ page });
    const medicines: Medicine[] = data.data.data || [];
    const pagination = data.data.pagination || {
        limit: 10,
        page: 1,
        total: 10,
        totalPages: 1,
    };

    return (
        <div className="container mx-auto my-10">
            <h2 className="text-2xl font-semibold mb-5 mx-5">Medicines</h2>
            <MedicineCards medicines={medicines} />
            <MedicinesPagination meta={pagination} />
        </div>
    );
}
