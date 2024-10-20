import { Checkbox } from "@chakra-ui/react";
import { format } from "date-fns";
import { createColumnHelper } from "@tanstack/react-table";

import { Product } from "../type/type";

const columnHelper = createColumnHelper<Product>();

function dateFormatter(date: string) {
	const dateObj = new Date(date);
	const formattedDate = format(dateObj, "yyyy-MM-dd");
	return formattedDate;
}

export const column = [
	columnHelper.group({
		header: " ",
		columns: [
			columnHelper.display({
				id: "select-col",
				enableColumnFilter: false,
				enablePinning: false,
				header: ({ table }) => (
					<Checkbox
						isChecked={table.getIsAllRowsSelected()}
						isIndeterminate={table.getIsSomeRowsSelected()}
						onChange={table.getToggleAllRowsSelectedHandler()}
					/>
				),
				cell: ({ row }) => (
					<Checkbox
						isChecked={row.getIsSelected()}
						onChange={row.getToggleSelectedHandler()}
					></Checkbox>
				),
			}),
		],
	}),

	columnHelper.group({
		header: " ",
		columns: [
			columnHelper.accessor("id", {
				header: "Id",
				footer: (props) => props.column.id,
			}),
		],
	}),
	columnHelper.group({
		header: " ",
		columns: [
			columnHelper.accessor("title", {
				header: "Title",
				footer: (props) => props.column.id,
				cell: (info) => (
					<div style={{ width: "190px", textWrap: "wrap" }}>
						{info.getValue()}
					</div>
				),

				size: 250,
			}),
		],
	}),
	columnHelper.group({
		header: " ",
		columns: [
			columnHelper.accessor("price", {
				header: "Price",
				footer: (props) => props.column.id,
				sortDescFirst: false,
				filterFn: (row, columnId, value) => {
					const cellValue = row.getValue(columnId);
					return cellValue === value;
				},
			}),
		],
	}),
	columnHelper.group({
		header: " ",
		columns: [
			columnHelper.accessor("images", {
				header: "Images",
				size: 150,
				footer: (props) => props.column.id,
				enableSorting: false,
				enableColumnFilter: true,
				enableGlobalFilter: true,
				enablePinning: false,

				cell: ({ getValue }) => {
					return getValue()
						.slice(0, 2)
						.map((image: string) => {
							return (
								<div
									key={image}
									style={{ width: "250px", textWrap: "wrap", fontSize: "10px" }}
								>
									<a href={image} style={{ color: "blue" }}>
										{image}
									</a>
								</div>
							);
						});
				},
			}),
		],
	}),
	//

	columnHelper.group({
		header: "Time",
		footer: (props) => props.column.id,
		columns: [
			columnHelper.accessor((row) => row.meta.createdAt, {
				header: "Creation At",
				size: 100,
				footer: (props) => props.column.id,
				cell: (info) => dateFormatter(info.getValue()),
				sortingFn: (rowA, rowB) => {
					return (
						new Date(rowA.original.meta.createdAt).getTime() -
						new Date(rowB.original.meta.createdAt).getTime()
					);
				},
			}),
			columnHelper.accessor((row) => row.meta.updatedAt, {
				header: "Updated At",
				footer: (props) => props.column.id,
				cell: (info) => dateFormatter(info.getValue()),
				sortingFn: (rowA, rowB) => {
					return (
						new Date(rowA.original.meta.updatedAt).getTime() -
						new Date(rowB.original.meta.updatedAt).getTime()
					);
				},
			}),
		],
	}),

	columnHelper.group({
		header: " ",
		columns: [
			columnHelper.accessor((row) => row.category, {
				header: "Category",
				footer: (props) => props.column.id,
				cell: (info) => (
					<div
						style={{
							backgroundColor:
								info.getValue() === "beauty"
									? "lightgoldenrodyellow"
									: "lightgreen",
						}}
					>
						{info.getValue()}{" "}
					</div>
				),
			}),
		],
	}),
];
