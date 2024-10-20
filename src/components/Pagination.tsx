import { Text, Button, Box, Select } from "@chakra-ui/react";
import { Table } from "@tanstack/react-table";
import { Product } from "../type/type";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";

interface PaginationProps {
	table: Table<Product>;
	pagination: {
		pageIndex: number;
		pageSize: number;
	};
	setPagination: React.Dispatch<
		React.SetStateAction<{
			pageIndex: number;
			pageSize: number;
		}>
	>;
}
function Pagination({ table, pagination, setPagination }: PaginationProps) {
	const [searchParams, setSearchParams] = useSearchParams();

	useEffect(() => {
		if (!searchParams.has("pageIndex") && !searchParams.has("pageSize")) {
			return;
		}
		setPagination({
			pageIndex: Number(searchParams.get("pageIndex")) - 1,
			pageSize: Number(searchParams.get("pageSize")),
		});
	}, []);

	useEffect(() => {
		if (pagination.pageIndex != Number(searchParams.get("pageIndex")) - 1) {
			searchParams.set("pageIndex", String(pagination.pageIndex + 1));
		}
		if (pagination.pageSize != Number(searchParams.get("pageSize"))) {
			searchParams.set("pageSize", String(pagination.pageSize));
		}

		setSearchParams(searchParams);
	}, [pagination]);

	return (
		<>
			<Box
				display={"flex"}
				alignItems={"center"}
				justifyContent={"flex-end"}
				mt={"20px"}
				gap="20px"
			>
				<Select
					w={"200px"}
					placeholder="Select Page Size"
					onChange={(e) => {
						table.setPageSize(Number(e.target.value));
					}}
				>
					{[2, 6, 10].map((val) => {
						return (
							<option key={val} value={val}>
								{val}
							</option>
						);
					})}
				</Select>

				<Box>
					Page{" "}
					<Text as="span" fontWeight={"bold"}>
						{table.getState().pagination.pageIndex + 1}
					</Text>{" "}
					of{" "}
					<Text as="span" fontWeight={"bold"} mr="10px">
						{table.getPageCount()}
					</Text>
					<Button
						onClick={() => {
							table.firstPage();
						}}
						isDisabled={!table.getCanPreviousPage()}
					>
						{"<<"}
					</Button>
					<Button
						onClick={() => {
							table.previousPage();
						}}
						isDisabled={!table.getCanPreviousPage()}
					>
						{"<"}
					</Button>
					<Button
						onClick={() => {
							table.nextPage();
						}}
						isDisabled={!table.getCanNextPage()}
					>
						{">"}
					</Button>
					<Button
						onClick={() => {
							table.lastPage();
						}}
						isDisabled={!table.getCanNextPage()}
					>
						{">>"}
					</Button>
				</Box>
			</Box>
		</>
	);
}

export default Pagination;
