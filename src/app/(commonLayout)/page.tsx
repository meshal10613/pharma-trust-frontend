import Banner from "../../components/modules/home/Banner";
import CategoryHome from "../../components/modules/home/Category";
import { categoryService } from "../../services/category.service";
import { Category } from "../../types";

export default async function Home() {
    const { data } = await categoryService.getAllCategorys();
    const categories: Category[] = data.data;

    return (
        <div className="container mx-auto">
            <Banner />
            <CategoryHome categories={categories} />
        </div>
    );
}
