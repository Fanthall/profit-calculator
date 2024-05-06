import { FunctionComponent } from "react";
import Calculator from "../Calculator/Calculator";

const Layout: FunctionComponent = () => {
	return (
		<div className="flex justify-start items-start flex-col w-full h-full">
			<Calculator />
		</div>
	);
};
export default Layout;
