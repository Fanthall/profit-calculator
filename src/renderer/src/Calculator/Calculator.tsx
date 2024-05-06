import { Button, Input } from "@nextui-org/react";
import { Field, Form, Formik } from "formik";
import {
	FunctionComponent,
	PropsWithChildren,
	useEffect,
	useState,
} from "react";
import { BsTrash3 } from "react-icons/bs";
import { FiPlus } from "react-icons/fi";
import { TbEdit, TbEditOff } from "react-icons/tb";
import * as Yup from "yup";
import { CalculatorList } from "../../constants/interfaces";

interface CalculatorProps extends PropsWithChildren {}
const Calculator: FunctionComponent<CalculatorProps> = (props) => {
	const [operationList, setOperationList] = useState<CalculatorList[]>([]);
	const [totalAmountOfOperation, setTotalAmountOfOperation] =
		useState<number>(0);
	const [profit, setProfit] = useState<number>(25);
	const [fee, setFee] = useState<number>(10);
	const [editProfit, setEditProfit] = useState<boolean>(false);
	const [editFee, setEditFee] = useState<boolean>(false);
	const [calculationResult, setCalculationResult] = useState<number>(0);
	useEffect(() => {
		const profitResult = (totalAmountOfOperation / 100) * profit;
		const feeResult = ((profitResult + totalAmountOfOperation) / 100) * fee;
		setCalculationResult(totalAmountOfOperation + profitResult + feeResult);
	}, [totalAmountOfOperation, profit, fee]);

	const [initialVal] = useState<CalculatorList>({
		operation: "",
		price: "",
	});
	return (
		<>
			<h1 className="w-full text-center text-xl">Calculator</h1>
			<div className="w-full h-full flex flex-row justify-start items-start">
				<div className="w-[75%] h-full flex flex-col justify-start items-start p-8 ">
					<div className="w-[500px] h-[75px] flex flex-row justify-between items-center">
						<Formik
							className=" flex flex-row justify-start items-start h-full"
							initialValues={initialVal}
							onSubmit={(
								values,
								{ setValues, setErrors, setTouched }
							) => {
								setOperationList([...operationList, { ...values }]);
								setTotalAmountOfOperation(
									totalAmountOfOperation + parseInt(values.price!)
								);
								setValues(initialVal);
								setErrors({ operation: "", price: "" });
								setTouched({ operation: false, price: false });
							}}
							validationSchema={Yup.object().shape({
								operation: Yup.string()
									.nullable()
									.required("Lütfen doldurun"),
								price: Yup.string()
									.nullable()
									.required("Lütfen doldurun")
									.test(
										"Is positive?",
										"Lütfen geçerli bir tutar giriniz",
										(value: any) =>
											(value === undefined ||
												parseInt(value) >= 0) &&
											/^\d+$/.test(value)
									),
							})}
							validateOnChange={false}
							validateOnBlur={false}
						>
							<Form className=" flex flex-row justify-between items-center h-full">
								<div className="w-[242px] p-2">
									<Field
										placeholder="İşlem"
										name="operation"
										render={(props: any) => (
											<div>
												<Input
													{...props.field}
													type="text"
													label="İşlem"
													size="sm"
												/>
												<div className="!text-danger">
													{props.meta.error !== "" &&
													props.meta.touched
														? props.meta.error
														: undefined}
												</div>
											</div>
										)}
									/>
								</div>

								<div className="w-[242px] p-2">
									<Field
										placeholder="Ücret"
										name="price"
										render={(props: any) => (
											<div>
												<Input
													{...props.field}
													type="text"
													label="Fiyat"
													size="sm"
												/>
												<div className="!text-danger">
													{props.meta.error}
												</div>
											</div>
										)}
									/>
								</div>

								<div className="w-[50px] p-2 flex justify-center items-center">
									<Button
										variant="ghost"
										color="primary"
										isIconOnly
										startContent={<FiPlus />}
										type="submit"
									></Button>
								</div>
							</Form>
						</Formik>
					</div>
					<div className="w-[500px] flex flex-row justify-between items-center">
						<div className="w-full p-2 h-full pt-8">
							<div className="h-[30px] w-full flex flex-row justify-between items-center">
								<div className="flex-grow text-center border border-solid basis-[250px] h-full">
									İşlem
								</div>
								<div className="flex-grow text-center border border-solid basis-[250px] h-full">
									Ücreti
								</div>
								<div className="flex-grow text-center border border-solid basis-[250px] h-full"></div>
							</div>
							{operationList.map((item, index) => {
								return (
									<div className="h-fit w-full flex flex-row justify-between items-center min-h-7">
										<div
											className="flex-grow border border-solid basis-[250px]  "
											style={{
												overflow: "hidden",
												height: 30,
												width: "100%",
											}}
										>
											<div
												className="flex flex-row justify-center items-center"
												style={{
													width: "100%",
													height: "100%",
													overflowY: "scroll",

													paddingRight: 17 /* Increase/decrease this value for cross-browser compatibility */,
													boxSizing:
														"content-box" /* So the width will be 100% + 17px */,
												}}
											>
												{item.operation}
											</div>
										</div>
										<div
											className="flex-grow border border-solid basis-[250px] flex flex-row justify-center items-center "
											style={{
												overflow: "hidden",
												height: 30,
											}}
										>
											{item.price}
										</div>
										<div
											className="flex-grow border border-solid basis-[250px]  flex flex-row justify-center items-center "
											style={{
												overflow: "hidden",
												height: 30,
											}}
										>
											<Button
												onClick={() => {
													const newList = operationList.filter(
														(it, i) => i !== index
													);
													setTotalAmountOfOperation(
														totalAmountOfOperation -
															parseInt(item.price!)
													);
													setOperationList(newList);
												}}
												isIconOnly
												variant="light"
												className="h-full w-full text-small "
												color="danger"
												radius="none"
												startContent={<BsTrash3 />}
											></Button>
										</div>
									</div>
								);
							})}
							<div className="h-[30px] w-full flex flex-row justify-between items-center">
								<div className="flex-grow flex flex-row justify-center items-center border border-solid basis-[250px] h-full">
									Toplam
								</div>
								<div className="flex-grow flex flex-row justify-center items-center border border-solid basis-[250px] h-full">
									{totalAmountOfOperation}
								</div>
								<div className="flex-grow flex flex-row justify-center items-center border border-solid basis-[250px] h-full">
									<Button
										className="h-full w-full text-small "
										color="danger"
										radius="none"
										startContent={<BsTrash3 />}
										size="sm"
										onClick={() => {
											setOperationList([]);
											setTotalAmountOfOperation(0);
										}}
									>
										CLEAR
									</Button>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="w-[25%] h-full p-8">
					<div className="w-full flex flex-col justify-around items-center h-[150px]">
						<h1>Hesap Oranları</h1>
						<div>
							<Input
								disabled={!editProfit}
								type="text"
								label="Kar Oranı"
								size="sm"
								value={profit ? profit.toString() : ""}
								onChange={(val) => {
									setProfit(
										parseInt(
											val.target.value !== ""
												? val.target.value
												: "0"
										)
									);
								}}
								endContent={
									editProfit ? (
										<TbEditOff
											className="cursor-pointer"
											onClick={() => {
												setEditProfit(false);
											}}
										/>
									) : (
										<TbEdit
											className="cursor-pointer"
											onClick={() => {
												setEditProfit(true);
											}}
										/>
									)
								}
							/>
						</div>
						<div>
							<Input
								disabled={!editFee}
								type="text"
								label="Vergi Oranı"
								size="sm"
								value={fee ? fee.toString() : ""}
								onChange={(val) => {
									setFee(
										parseInt(
											val.target.value !== ""
												? val.target.value
												: "0"
										)
									);
								}}
								endContent={
									editFee ? (
										<TbEditOff
											className="cursor-pointer"
											onClick={() => {
												setEditFee(false);
											}}
										/>
									) : (
										<TbEdit
											className="cursor-pointer"
											onClick={() => {
												setEditFee(true);
											}}
										/>
									)
								}
							/>
						</div>
					</div>
					<div className="w-full flex flex-col justify-around items-center h-[100px] border border-solid">
						<h1>Hesap Sonucu</h1>
						<div>{calculationResult}</div>
					</div>
				</div>
			</div>
		</>
	);
};
export default Calculator;
