"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { Search } from "lucide-react";
import { useState } from "react";

export default function MedicinesQuery() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [search, setSearch] = useState(searchParams.get("search") || "");
    const [sortOrder, setSortOrder] = useState(searchParams.get("sortOrder") || "");
    const [sortBy, setSortBy] = useState(searchParams.get("sortBy") || "");

    const navigateToPage = (search: string, sortOrder: string, sortBy: string) => {
        const params = new URLSearchParams(searchParams.toString());
        if (search) {
            params.set("search", search);
        } else {
            params.delete("search");
        }

        if (sortOrder) {
            params.set("sortOrder", sortOrder);
        } else {
            params.delete("sortOrder");
        }

        if (sortBy) {
            params.set("sortBy", sortBy);
        } else {
            params.delete("sortBy");
        }


        router.push(`?${params.toString()}`);
    };

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        navigateToPage(search, sortOrder, sortBy);
    };

    const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newSort = e.target.value;
		const sortBy = newSort.split("-")[0];
		const sortOrder = newSort.split("-")[1];
        setSortOrder(sortOrder);
		setSortBy(sortBy);
        navigateToPage(search, sortOrder, sortBy);
    };

	const sortValue = sortBy && sortOrder ? `${sortBy}-${sortOrder}` : "";

    return (
        <div className="flex items-center justify-between mx-5">
            <form
                onSubmit={handleSearch}
                className="flex items-center justify-center gap-3"
            >
                <Input
                    placeholder="Search..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <Button type="submit" className="cursor-pointer">
                    <Search />
                </Button>
            </form>

            <select
                value={sortValue}
                onChange={handleSortChange}
                className="border rounded-md p-2 cursor-pointer"
            >
                <option value="">Sort By</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="name-asc">Name: A → Z</option>
                <option value="name-desc">Name: Z → A</option>
            </select>
        </div>
    );
}
