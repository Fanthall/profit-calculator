import { NextUIProvider } from "@nextui-org/react";
import logo from "../../assets/logo.png";
import "./dist/output.css";
import Layout from "./src/Layout/Layout";
export default function App() {
	return (
		<NextUIProvider
			className="w-full h-full"
			style={{
				overflow: "hidden",
				backgroundColor: "transparent",
			}}
		>
			<main
				className="dark text-foreground bg-background w-full h-full"
				style={{
					backgroundColor: "transparent",
					overflowY: "scroll",
					paddingRight: 17 /* Increase/decrease this value for cross-browser compatibility */,
					boxSizing: "content-box" /* So the width will be 100% + 17px */,
				}}
			>
				<div className="flex justify-start items-center flex-col w-full h-full">
					<img src={logo} width={150} height={150} />
					<div className="flex-grow w-full">
						<Layout />
					</div>
				</div>
			</main>
		</NextUIProvider>
	);
}
