import {
	Table,
	Thead,
	Tbody,
	Tr,
	Th,
	Td,
	TableContainer,
	Box,
	Container,
} from "@chakra-ui/react";

import {
	useReactTable,
	getCoreRowModel,
	getSortedRowModel,
	flexRender,
	getPaginationRowModel,
	getFilteredRowModel,
	ColumnPinningState,
} from "@tanstack/react-table";
import { useState } from "react";
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";
import { BiSortAlt2 } from "react-icons/bi";

import { column } from "../Table/column";
import GlobalFilter from "../components/GlobalFilter";
import ColumnFilter from "../components/ColumnFilter";
import ColumnPin from "../components/ColumnPin";
import Pagination from "../components/Pagination";
import { useProductData } from "../custom hook/useProductData";

function ProductTable() {
	const [globalFilter, setGlobalFilter] = useState<string>("");
	const [columnFilters, setColumnFilters] = useState<ColumnFilter[]>([]);
	const { data, isLoading, isError, error } = useProductData();
	const [pagination, setPagination] = useState({ pageIndex: 3, pageSize: 4 });
	const [columnPinning, setColumnPinning] = useState<ColumnPinningState>({
		left: [],
		right: [],
	});

	const table = useReactTable({
		data,
		columns: column,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),

		state: {
			globalFilter: globalFilter,
			columnFilters: columnFilters,
			columnPinning: columnPinning,
			pagination: pagination,
		},
		onGlobalFilterChange: setGlobalFilter,
		onColumnFiltersChange: setColumnFilters,
		onColumnPinningChange: setColumnPinning,
		onPaginationChange: setPagination,
	});

	if (isLoading) return <h1>Loading...</h1>;

	if (isError) return <h1>{error.message}</h1>;

	return (
		<Container maxW={"80%"} m={"auto"} mt={"100px"}>
			<ColumnPin table={table} setColumnPinning={setColumnPinning}/>

			<Box display={"flex"} justifyContent={"space-between"}>
				<ColumnFilter
					table={table}
					columnFilters={columnFilters}
					setColumnFilters={setColumnFilters}
				></ColumnFilter>
				<GlobalFilter
					style={{ width: "300px", marginBottom: "10px" }}
					globalFilter={globalFilter}
					setGlobalFilter={setGlobalFilter}
				></GlobalFilter>
			</Box>

			<TableContainer fontSize={"11px"}>
				<Table>
					<Thead bgColor={"lightskyblue"}>
						{table.getHeaderGroups().map((headerGroup) => (
							<Tr key={headerGroup.id}>
								{headerGroup.headers.map((header) => (
									<Th
										key={header.id}
										colSpan={header.colSpan}
										onClick={() => {
											header.column.getCanSort()
												? header.column.toggleSorting()
												: "";
										}}
										style={{
											position: header.column.getIsPinned()
												? "sticky"
												: "static",
											left:
												header.column.getIsPinned() === "left" ? 0 : undefined,
											right:
												header.column.getIsPinned() === "right" ? 0 : undefined,
											background: header.column.getIsPinned()
												? "lightskyblue"
												: undefined,
											zIndex: header.column.getIsPinned() ? 1 : undefined,
										}}
									>
										<div
											style={{
												display: "flex",
												gap: "5px",
												alignItems: "center",
											}}
										>
											{flexRender(
												header.column.columnDef.header,
												header.getContext()
											)}
											{header.column.getCanSort() ? <BiSortAlt2 /> : ""}
											{header.column.getIsSorted() ? (
												header.column.getIsSorted() === "asc" ? (
													<TiArrowSortedUp />
												) : (
													<TiArrowSortedDown />
												)
											) : (
												""
											)}
										</div>
									</Th>
								))}
							</Tr>
						))}
					</Thead>
					<Tbody>
						{table.getRowModel().rows.map((row) => (
							<Tr key={row.id}>
								{row.getVisibleCells().map((cell) => (
									<Td
										key={cell.id}
										style={{
											position: cell.column.getIsPinned() ? "sticky" : "static",
											left:
												cell.column.getIsPinned() === "left" ? 0 : undefined,
											right:
												cell.column.getIsPinned() === "right" ? 0 : undefined,
											background: cell.column.getIsPinned()
												? "#f9f9f9"
												: undefined,
										}}
									>
										{flexRender(cell.column.columnDef.cell, cell.getContext())}
									</Td>
								))}
							</Tr>
						))}
					</Tbody>

					{/* <Tfoot>
						{table.getFooterGroups().map((footerGroup) => (
							<Tr key={footerGroup.id}>
								{footerGroup.headers.map((header) => (
									<Th key={header.id} colSpan={header.colSpan}>
										{flexRender(
											header.column.columnDef.footer,
											header.getContext()
										)}
									</Th>
								))}
							</Tr>
						))}
					</Tfoot> */}
				</Table>
			</TableContainer>

			<Pagination
				table={table}
				pagination={pagination}
				setPagination={setPagination}
			></Pagination>

			{/* To display the selected data by checkbox */}
			<Box>
				<pre>
					{table.getSelectedRowModel().rows.map((row) => (
						<div key={row.id} style={{ maxWidth: "350px", textWrap: "wrap" }}>
							{JSON.stringify(row.original)}
						</div>
					))}
				</pre>
			</Box>
		</Container>
	);
}

export default ProductTable;
