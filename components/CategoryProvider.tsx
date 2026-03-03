"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type CategoryType = "tiles" | "spices";

interface CategoryContextType {
    category: CategoryType;
    setCategory: (category: CategoryType) => void;
}

const CategoryContext = createContext<CategoryContextType | undefined>(undefined);

export function CategoryProvider({ children }: { children: React.ReactNode }) {
    const [category, setCategory] = useState<CategoryType>("tiles");

    useEffect(() => {
        const root = document.documentElement;

        // Remove old theme classes to prevent conflicts
        root.classList.remove("theme-tiles", "theme-spices");

        // Add the new theme class
        root.classList.add(`theme-${category}`);

    }, [category]);

    return (
        <CategoryContext.Provider value={{ category, setCategory }}>
            {children}
        </CategoryContext.Provider>
    );
}

export function useCategory() {
    const context = useContext(CategoryContext);
    if (context === undefined) {
        throw new Error("useCategory must be used within a CategoryProvider");
    }
    return context;
}
