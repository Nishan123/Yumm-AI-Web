import { useState, useCallback, useRef } from "react";
import { Recipe, SearchFilters } from "@/lib/types/recipe.type";
import { searchRecipesAction } from "@/lib/actions/search-action";

const PAGE_SIZE = 10;

interface SearchState {
    recipes: Recipe[];
    loading: boolean;
    loadingMore: boolean;
    error: string | null;
    page: number;
    hasMore: boolean;
    searchQuery: string;
    filters: SearchFilters;
}

const initialState: SearchState = {
    recipes: [],
    loading: false,
    loadingMore: false,
    error: null,
    page: 1,
    hasMore: true,
    searchQuery: "",
    filters: {},
};

export const useSearch = () => {
    const [state, setState] = useState<SearchState>(initialState);
    // Ref to avoid stale closures in callbacks
    const stateRef = useRef(state);
    stateRef.current = state;

    const fetchRecipes = useCallback(
        async (query: string, page: number, filters: SearchFilters, append: boolean) => {
            try {
                const data = await searchRecipesAction({
                    searchTerm: query,
                    page,
                    size: PAGE_SIZE,
                    filters,
                });

                setState((prev) => {
                    const existingIds = new Set(prev.recipes.map((r) => r.recipeId));
                    const newRecipes = data.recipes.filter(
                        (r) => !existingIds.has(r.recipeId)
                    );

                    return {
                        ...prev,
                        recipes: append ? [...prev.recipes, ...newRecipes] : data.recipes,
                        loading: false,
                        loadingMore: false,
                        error: null,
                        hasMore: data.pagination
                            ? data.pagination.page < data.pagination.totalPages
                            : data.recipes.length >= PAGE_SIZE,
                        page: page + 1,
                    };
                });
            } catch (err: any) {
                setState((prev) => ({
                    ...prev,
                    loading: false,
                    loadingMore: false,
                    error: err.message || "Failed to search recipes",
                }));
            }
        },
        []
    );

    const search = useCallback(
        async (query: string) => {
            if (!query.trim()) return;
            const filters = stateRef.current.filters;

            setState((prev) => ({
                ...prev,
                loading: true,
                searchQuery: query,
                page: 1,
                recipes: [],
                hasMore: true,
                error: null,
            }));

            await fetchRecipes(query, 1, filters, false);
        },
        [fetchRecipes]
    );

    const loadNextPage = useCallback(async () => {
        const { loading, loadingMore, hasMore, searchQuery, page, filters } =
            stateRef.current;
        if (loading || loadingMore || !hasMore || !searchQuery.trim()) return;

        setState((prev) => ({ ...prev, loadingMore: true }));
        await fetchRecipes(searchQuery, page, filters, true);
    }, [fetchRecipes]);

    const setFilters = useCallback(
        async (filters: SearchFilters) => {
            const query = stateRef.current.searchQuery;
            setState((prev) => ({
                ...prev,
                filters,
                loading: query.trim() ? true : false,
                page: 1,
                recipes: [],
                hasMore: true,
                error: null,
            }));

            if (query.trim()) {
                await fetchRecipes(query, 1, filters, false);
            }
        },
        [fetchRecipes]
    );

    const clearFilters = useCallback(async () => {
        const query = stateRef.current.searchQuery;
        setState((prev) => ({
            ...prev,
            filters: {},
            loading: query.trim() ? true : false,
            page: 1,
            recipes: [],
            hasMore: true,
            error: null,
        }));

        if (query.trim()) {
            await fetchRecipes(query, 1, {}, false);
        }
    }, [fetchRecipes]);

    return {
        ...state,
        search,
        loadNextPage,
        setFilters,
        clearFilters,
    };
};
