import MedicineCards from "../../../components/modules/medicines/MedicineCards";
import MedicinesPagination from "../../../components/modules/medicines/MedicinePagination";
import { medicineService } from "../../../services/medicine.service";
import { Medicine } from "../../../types";

export default async function MedicinesPage() {
	const { data } = await medicineService.getAllMedicines();
	const medicines: Medicine[] = data.data.data;

	return(
		<div className="container mx-auto my-10">
			<h2 className="text-2xl font-semibold mb-5 mx-5">Medicines</h2>
			<MedicineCards medicines={medicines}/>
			<MedicinesPagination/>
		</div>
	)
}