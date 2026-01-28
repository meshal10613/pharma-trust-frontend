import AddCategory from "../../../../../components/modules/admin/category/AddCategory";
import CategoryTable from "../../../../../components/modules/admin/category/CategoryTable";
import { categoryService } from "../../../../../services/category.service";
import { Category } from "../../../../../types";

export default async function CategoriesPage() {
    const { data } = await categoryService.getAllCategorys();
    const categories: Category[] = data.data;

    return (
        <div>
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold mb-5">
                    Category Management
                </h2>
				<AddCategory/>
            </div>
            <CategoryTable categories={categories} />
        </div>
    );
}
