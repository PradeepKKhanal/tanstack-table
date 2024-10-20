import { useSearchParams } from "react-router-dom";
import { Input } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";

interface GlobalFilterProps {
	globalFilter: string;
	setGlobalFilter: React.Dispatch<React.SetStateAction<string>>;
	style: React.CSSProperties;
}

function GlobalFilter({
	// globalFilter,
	setGlobalFilter,
	style,
}: GlobalFilterProps) {
	console.log("globalFilter");
	const [searchParams, setSearchParams] = useSearchParams();
	const [inputSearch, setInputSearch] = useState(
		searchParams.get("gFilter") || ""
	);
	const debouncingRef = useRef<number>();

	useEffect(() => {
		setGlobalFilter(inputSearch || "");
	}, []);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputSearch(e.target.value);
		if (debouncingRef.current) {
			clearTimeout(debouncingRef.current);
		}
		debouncingRef.current = setTimeout(() => {
			setGlobalFilter(e.target.value);
			if (e.target.value != "") {
				searchParams.set("gFilter", e.target.value);
			} else {
				searchParams.delete("gFilter");
			}
			setSearchParams(searchParams);
		}, 1000);
	};

	return (
		<>
			<Input
				fontSize="13px"
				placeholder={"Global Search..."}
				onChange={(e) => {
					handleChange(e);
				}}
				value={inputSearch}
				style={style}
			></Input>
		</>
	);
}

export default GlobalFilter;
