import { Box, Select, Text } from "@chakra-ui/react";
import { ColumnPinningState, Table } from "@tanstack/react-table";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import { Product } from "../type/type";

interface ColumnPinProps {
	table: Table<Product>;
	setColumnPinning: React.Dispatch<React.SetStateAction<ColumnPinningState>>;
}

function ColumnPin({ table, setColumnPinning }: ColumnPinProps) {
	const [searchParams, setSearchParams] = useSearchParams();
	const [position, setPosition] = useState(searchParams.get("position") || "");
	const [columnName, setColumnName] = useState(
		searchParams.get("columnSort") || ""
	);

	useEffect(() => {
		const handleSearchParams = () => {
			if (position === "") {
				searchParams.delete("position");
			} else {
				searchParams.set("position", position);
			}

			if (columnName == "") {
				searchParams.delete("columnSort");
			} else {
				searchParams.set("columnSort", columnName);
			}
			setSearchParams(searchParams);
		};
		handleSearchParams();

		const handleColumnPinning = () => {
			if (position && columnName) {
				setColumnPinning({
					[position]: [columnName],
				});
			} else {
				setColumnPinning({
				});
			}
		};
		handleColumnPinning();
	}, [position, columnName]);


	return (
		<>
			<Box
				display={"flex"}
				flexDirection={"row"}
				my={"20px"}
				alignItems={"flex-end"}
				border={"1px solid lightgray"}
				p="10px"
				borderRadius={"10px"}
			>
				<Text w="150px" mb={"10px"} fontWeight={"bold"}>
					Pin your column
				</Text>
				<Box display={"flex"}>
					<Select
						fontSize={"13px"}
						w="150px"
						placeholder="Position"
						color={"gray"}
						onChange={(e) => setPosition(e.target.value)}
						defaultValue={position || ""}
					>
						<option value="left" style={{ color: "black" }}>
							Left
						</option>
						<option value="right" style={{ color: "black" }}>
							Right
						</option>
					</Select>

					<Select
						color={"gray"}
						ml="10px"
						w="150px"
						fontSize={"13px"}
						placeholder="Column"
						onChange={(e) => {
							setColumnName(e.target.value);
						}}
						defaultValue={columnName || ""}
					>
						{table.getAllLeafColumns().map((column) => {
							return (
								column.getCanPin() && (
									<option key={column.id} style={{ color: "black" }}>
										{column.id}
									</option>
								)
							);
						})}
					</Select>
				</Box>
			</Box>
		</>
	);
}

export default ColumnPin;
