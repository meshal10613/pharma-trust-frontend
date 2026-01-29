import { Category } from "../../../types";
import { Badge } from "../../ui/badge";
import { Card } from "../../ui/card";

export default function CategoryHome({
    categories,
}: {
    categories: Category[];
}) {
    return (
        <div className="my-20">
			<h2 className="text-2xl font-semibold mb-5 mx-5">Categories</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 mx-5">
                {categories.map((category) => (
                    <Card
                        key={category.id}
                        className="shadow-md hover:shadow-2xl flex flex-col items-center justify-center gap-2"
                    >
                        <h2 className="text-2xl font-semibold mb-5">
                            {category.name}
                        </h2>
						<Badge variant={`outline`} className="text-[#2B93C4]">Medicines: {category.medicines.length}</Badge>
						
                    </Card>
                ))}
            </div>
        </div>
    );
}
