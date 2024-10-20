import { Input, Select, Box } from "@chakra-ui/react";
import { Table } from "@tanstack/react-table";
import { useEffect,useRef,useState } from "react";
import { useSearchParams } from "react-router-dom";

import { Product } from "../type/type";

interface ColumnFilter {
	id: string;
	value: unknown;
}
interface ColumnFilterProps {
	table: Table<Product>;
	columnFilters?: ColumnFilter[];
	setColumnFilters: React.Dispatch<React.SetStateAction<ColumnFilter[]>>;
}

function ColumnFilter({
	table,
	setColumnFilters,
}: ColumnFilterProps) {
	const [searchParams, setSearchParams] = useSearchParams();
	const debouncingRef=useRef<number>()
	const [inputSearch,setInputSearch]=useState(searchParams.get('cSearchValue') || '')

	useEffect(() => {
		const handleChange2 = () => {
			if (searchParams.has("cSearchId") && searchParams.has("cSearchValue")) {
				setColumnFilters([
					{
						id: searchParams.get("cSearchId") || "",
						value: searchParams.get("cSearchValue"),
					},
				]);
			}
		};
		handleChange2();
	}, [searchParams]);

	return (
		<>
			<Box display={"flex"}>
				<Input
					fontSize={"13px"}
					placeholder="Column Search ..."
					w={"170px"}
					onChange={(e) => {
						setInputSearch(e.target.value)
						if(debouncingRef.current){
							clearTimeout(debouncingRef.current)
						}
						debouncingRef.current=setTimeout(()=>{
							if (e.target.value !== "") {
							searchParams.set("cSearchValue", e.target.value);
						} else {
							searchParams.delete("cSearchValue");
						}

						setSearchParams(searchParams);
						},5000)
						
					}}
					value={inputSearch}
				></Input>
				<Select
					fontSize={"13px"}
					placeholder="Select column..."
					defaultValue={searchParams.get("cSearchId") || ""}
					color={"gray"}
					w={"150px"}
					onChange={(e) => {
						if (e.target.value !== "") {
							searchParams.set("cSearchId", e.target.value);
						} else {
							searchParams.delete("cSearchId");
						}

						setSearchParams(searchParams);
					}}
				>
					{table.getAllLeafColumns().map(
						(column) =>
							column.getCanFilter() && (
								<option
									style={{ color: "black" }}
									key={column.id}
									value={column.id}
								>
									{column.id}
								</option>
							)
					)}
				</Select>
			</Box>
		</>
	);
}

export default ColumnFilter;
