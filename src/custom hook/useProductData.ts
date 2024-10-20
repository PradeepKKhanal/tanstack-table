import axios from "axios";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export function useProductData() {
	return useQuery({
		queryKey: ["products"],
		queryFn: async () => {
			return await axios
				.get("https://dummyjson.com/products")
				.then((response) => response.data.products);
		},
		placeholderData: keepPreviousData,
	});
}
