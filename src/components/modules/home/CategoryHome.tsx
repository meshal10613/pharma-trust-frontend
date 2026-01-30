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
            <h2 className="text-3xl md:text-4xl font-semibold mb-5 mx-5 text-center text-primary">
                Categories
            </h2>
            <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-10">
                Explore our medicine categories to quickly find what you need,
                from common health essentials to specialized treatments.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 mx-5">
                {categories.map((category) => (
                    <Card
                        key={category.id}
                        className="shadow-md hover:shadow-2xl flex flex-col items-center justify-center gap-2"
                    >
                        <h2 className="text-2xl font-semibold mb-5 flex items-center justify-center flex-wrap text-center">
                            {category.name}
                        </h2>
                        <Badge variant={`outline`} className="text-[#2B93C4]">
                            Medicines: {category.medicines.length}
                        </Badge>
                    </Card>
                ))}
            </div>
        </div>
    );
}
