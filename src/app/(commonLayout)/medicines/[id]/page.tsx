import MedicinesDetails from "../../../../components/modules/medicines/MedicineDetails";
import { medicineService } from "../../../../services/medicine.service";
import { Medicine } from "../../../../types";

export default async function MedicineDetailsPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const { data } = await medicineService.getMedicineById(id);
    const medicine: Medicine = data.data;

    return (
        <div className="container mx-auto">
            <MedicinesDetails medicine={medicine} />
        </div>
    );
}
