import { useEffect, useState } from 'react';
import download from 'downloadjs';
import moment from 'moment';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import axios from 'axios';
import AgentRoute from '../../components/Agent.Route';
import { useHistory, useParams } from 'react-router-dom';
import MedicalListTable from '../../components/agent/Step1-MedicalListTable';
import TransactionForm from '../../components/agent/Step2-TransactionForm';
import { MedicalItems } from '../../components/agent/MedicalItems';

function AgentAddTransaction() {
	let history = useHistory();
	const [donorInfo, setDonorInfo] = useState({});
	const [grandTotal, setGrandTotal] = useState(0);
	const [currentStep, setCurrentStep] = useState(1);
	const [medicalListInfo, setMedicalListInfo] = useState(MedicalItems);
	const [docUrl, setDocUrl] = useState({});

	let { donorId } = useParams();

	useEffect(() => {
		// TODO: check if user has permission to access the page and return the donor data based on the id
		const checkUserValid = async () => {
			try {
				const {
					data: { donor },
				} = await axios.post('/donor/validate', {
					donorId: donorId,
					agentId: 1,
				});
				setDonorInfo(donor[0]);
			} catch (err) {
				history.push('/');
			}
		};
		checkUserValid();
		// console.log(donorInfo);
	}, []);

	// useEffect(() => {
	// 	console.log(medicalListInfo);
	// }, [medicalListInfo]);

	const handleFormSubmit = async (e) => {
		e.preventDefault();
		// TODO: handle document submit, for pdf 1 and pdf 2 and send it to the server to update in the database
		try {
			console.log(donorInfo);
			const { data } = await axios.post('/transaction/create', {
				donorInfo,
				grandTotal,
			});
			console.log(data);

			generatePDF(data.data.transactionId);
			generatePDF2(data.data.transactionId);

			if (data.success) {
				history.push('/agent/transaction');
			}
		} catch (err) {
			console.log(err);
		}
	};

	const handleChange = (e) => {
		let grandTotal = 0;
		for (let i = 0; i < medicalListInfo.length; i++) {
			if (medicalListInfo[i].shortName === e.target.name) {
				medicalListInfo[i].requested = parseInt(e.target.value);
				medicalListInfo[i].totalCost = parseInt(
					medicalListInfo[i].requested * medicalListInfo[i].unitCost
				);
				setMedicalListInfo([...medicalListInfo]);
			}
			grandTotal += medicalListInfo[i].requested * medicalListInfo[i].unitCost;
		}
		setGrandTotal(grandTotal);
	};

	const generatePDF = async (transactionId) => {
		console.log('generatePDF');
		const url =
			'https://edemy-bucket-10.s3.ap-southeast-1.amazonaws.com/MEDICAL+LIST+new.pdf';
		const existingPdfBytes = await fetch(url).then((res) => res.arrayBuffer());

		const pdfDoc = await PDFDocument.load(existingPdfBytes);
		const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

		const pages = pdfDoc.getPages();
		const firstPage = pages[0];
		const { width, height } = firstPage.getSize();

		let grandTotal = 0;
		const todayDate = moment(new Date()).format('DD/MM/YYYY').split('/');

		firstPage.drawText(`${transactionId}`, {
			x: 300,
			y: 686,
			size: 12,
			font: helveticaFont,
			color: rgb(0.1, 0.1, 0.1),
		});

		firstPage.drawText(`${todayDate[0].split('')[0]}`, {
			x: 387,
			y: 686,
			size: 12,
			font: helveticaFont,
			color: rgb(0.1, 0.1, 0.1),
		});

		firstPage.drawText(`${todayDate[0].split('')[1]}`, {
			x: 403,
			y: 686,
			size: 12,
			font: helveticaFont,
			color: rgb(0.1, 0.1, 0.1),
		});

		firstPage.drawText(`${todayDate[1].split('')[0]}`, {
			x: 432,
			y: 686,
			size: 12,
			font: helveticaFont,
			color: rgb(0.1, 0.1, 0.1),
		});

		firstPage.drawText(`${todayDate[1].split('')[1]}`, {
			x: 449,
			y: 686,
			size: 12,
			font: helveticaFont,
			color: rgb(0.1, 0.1, 0.1),
		});

		firstPage.drawText(`${todayDate[2].split('')[0]}`, {
			x: 482,
			y: 686,
			size: 12,
			font: helveticaFont,
			color: rgb(0.1, 0.1, 0.1),
		});

		firstPage.drawText(`${todayDate[2].split('')[1]}`, {
			x: 499,
			y: 686,
			size: 12,
			font: helveticaFont,
			color: rgb(0.1, 0.1, 0.1),
		});

		firstPage.drawText(`${todayDate[2].split('')[2]}`, {
			x: 516,
			y: 686,
			size: 12,
			font: helveticaFont,
			color: rgb(0.1, 0.1, 0.1),
		});

		firstPage.drawText(`${todayDate[2].split('')[3]}`, {
			x: 533,
			y: 686,
			size: 12,
			font: helveticaFont,
			color: rgb(0.1, 0.1, 0.1),
		});

		for (let i = 0; i < medicalListInfo.length; i++) {
			if (medicalListInfo[i].requested !== 0) {
				firstPage.drawText(medicalListInfo[i].requested.toString(), {
					x: 410,
					y: medicalListInfo[i].y,
					size: 11,
					font: helveticaFont,
					color: rgb(0.1, 0.1, 0.1),
				});

				firstPage.drawText(medicalListInfo[i].totalCost.toString(), {
					x: 490,
					y: medicalListInfo[i].y,
					size: 11,
					font: helveticaFont,
					color: rgb(0.1, 0.1, 0.1),
				});
				grandTotal +=
					medicalListInfo[i].requested * medicalListInfo[i].unitCost;
			}
		}

		firstPage.drawText(grandTotal.toString(), {
			x: 490,
			y: 218,
			size: 11,
			font: helveticaFont,
			color: rgb(0.1, 0.1, 0.1),
		});

		// const pdfBytes = await pdfDoc.save();
		// download(pdfBytes, 'medical-list-example.pdf', 'application/pdf');

		const pdfBytes = await pdfDoc.saveAsBase64({ dataUri: true });

		axios
			.post('/transaction/upload-form', {
				file: pdfBytes,
				no: 1,
				transactionId: transactionId,
			})
			.then((res) => {
				console.log('completed');
				console.log(res);
			});
	};

	const generatePDFBtn = async (transactionId) => {
		console.log('generatePDF 2');
		const url =
			'https://edemy-bucket-10.s3.ap-southeast-1.amazonaws.com/MEDICAL+LIST+new.pdf';
		const existingPdfBytes = await fetch(url).then((res) => res.arrayBuffer());

		const pdfDoc = await PDFDocument.load(existingPdfBytes);
		const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

		const pages = pdfDoc.getPages();
		const firstPage = pages[0];
		const { width, height } = firstPage.getSize();

		let grandTotal = 0;
		const todayDate = moment(new Date()).format('DD/MM/YYYY').split('/');

		firstPage.drawText(`${transactionId}`, {
			x: 300,
			y: 686,
			size: 12,
			font: helveticaFont,
			color: rgb(0.1, 0.1, 0.1),
		});

		firstPage.drawText(`${todayDate[0].split('')[0]}`, {
			x: 387,
			y: 686,
			size: 12,
			font: helveticaFont,
			color: rgb(0.1, 0.1, 0.1),
		});

		firstPage.drawText(`${todayDate[0].split('')[1]}`, {
			x: 403,
			y: 686,
			size: 12,
			font: helveticaFont,
			color: rgb(0.1, 0.1, 0.1),
		});

		firstPage.drawText(`${todayDate[1].split('')[0]}`, {
			x: 432,
			y: 686,
			size: 12,
			font: helveticaFont,
			color: rgb(0.1, 0.1, 0.1),
		});

		firstPage.drawText(`${todayDate[1].split('')[1]}`, {
			x: 449,
			y: 686,
			size: 12,
			font: helveticaFont,
			color: rgb(0.1, 0.1, 0.1),
		});

		firstPage.drawText(`${todayDate[2].split('')[0]}`, {
			x: 482,
			y: 686,
			size: 12,
			font: helveticaFont,
			color: rgb(0.1, 0.1, 0.1),
		});

		firstPage.drawText(`${todayDate[2].split('')[1]}`, {
			x: 499,
			y: 686,
			size: 12,
			font: helveticaFont,
			color: rgb(0.1, 0.1, 0.1),
		});

		firstPage.drawText(`${todayDate[2].split('')[2]}`, {
			x: 516,
			y: 686,
			size: 12,
			font: helveticaFont,
			color: rgb(0.1, 0.1, 0.1),
		});

		firstPage.drawText(`${todayDate[2].split('')[3]}`, {
			x: 533,
			y: 686,
			size: 12,
			font: helveticaFont,
			color: rgb(0.1, 0.1, 0.1),
		});

		for (let i = 0; i < medicalListInfo.length; i++) {
			if (medicalListInfo[i].requested !== 0) {
				firstPage.drawText(medicalListInfo[i].requested.toString(), {
					x: 410,
					y: medicalListInfo[i].y,
					size: 11,
					font: helveticaFont,
					color: rgb(0.1, 0.1, 0.1),
				});

				firstPage.drawText(medicalListInfo[i].totalCost.toString(), {
					x: 490,
					y: medicalListInfo[i].y,
					size: 11,
					font: helveticaFont,
					color: rgb(0.1, 0.1, 0.1),
				});
				grandTotal +=
					medicalListInfo[i].requested * medicalListInfo[i].unitCost;
			}
		}

		firstPage.drawText(grandTotal.toString(), {
			x: 490,
			y: 218,
			size: 11,
			font: helveticaFont,
			color: rgb(0.1, 0.1, 0.1),
		});

		const pdfBytes = await pdfDoc.save();
		download(pdfBytes, 'medical-list-example.pdf', 'application/pdf');
	};

	const generatePDF2 = async (transactionId) => {
		const url =
			'https://edemy-bucket-10.s3.ap-southeast-1.amazonaws.com/EXEMPTION+FORM+NEW.pdf';
		const existingPdfBytes = await fetch(url).then((res) => res.arrayBuffer());

		const pdfDoc = await PDFDocument.load(existingPdfBytes);
		const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

		const pages = pdfDoc.getPages();
		const firstPage = pages[0];
		const { width, height } = firstPage.getSize();

		if (donorInfo.isCompany) {
			firstPage.drawText(`${moment(new Date()).format('DD/MM/YYYY')}`, {
				x: 80,
				y: 720,
				size: 11,
				font: helveticaFont,
				color: rgb(0.1, 0.1, 0.1),
			});

			firstPage.drawText('Company', {
				x: 190,
				y: 702,
				size: 11,
				font: helveticaFont,
				color: rgb(0.1, 0.1, 0.1),
			});

			// Company Registration
			firstPage.drawText(donorInfo.registrationNo.toString(), {
				x: 223,
				y: 657,
				size: 11,
				font: helveticaFont,
				color: rgb(0.1, 0.1, 0.1),
			});

			// Selection - Company Name
			firstPage.drawText('X', {
				x: 55,
				y: 627,
				size: 11,
				font: helveticaFont,
				color: rgb(0.1, 0.1, 0.1),
			});

			// Company Name
			firstPage.drawText(donorInfo.name, {
				x: 260,
				y: 630,
				size: 11,
				font: helveticaFont,
				color: rgb(0.1, 0.1, 0.1),
			});

			// Company Address
			firstPage.drawText(donorInfo.address, {
				x: 98,
				y: 574,
				size: 11,
				font: helveticaFont,
				color: rgb(0.1, 0.1, 0.1),
			});

			// Total Contribution
			firstPage.drawText(grandTotal.toString(), {
				x: 160,
				y: 555,
				size: 20,
				font: helveticaFont,
				color: rgb(0.1, 0.1, 0.1),
			});

			// Company Tel
			firstPage.drawText(donorInfo.contactNumber.toString(), {
				x: 110,
				y: 535,
				size: 11,
				font: helveticaFont,
				color: rgb(0.1, 0.1, 0.1),
			});

			// Email
			firstPage.drawText(donorInfo.email, {
				x: 110,
				y: 515,
				size: 11,
				font: helveticaFont,
				color: rgb(0.1, 0.1, 0.1),
			});
		} else {
			// Company or personal
			firstPage.drawText(`${moment(new Date()).format('DD/MM/YYYY')}`, {
				x: 80,
				y: 720,
				size: 11,
				font: helveticaFont,
				color: rgb(0.1, 0.1, 0.1),
			});

			firstPage.drawText('Personal', {
				x: 190,
				y: 702,
				size: 11,
				font: helveticaFont,
				color: rgb(0.1, 0.1, 0.1),
			});

			// Name
			firstPage.drawText(donorInfo.name, {
				x: 120,
				y: 482,
				size: 11,
				font: helveticaFont,
				color: rgb(0.1, 0.1, 0.1),
			});

			// Address
			firstPage.drawText(donorInfo.address, {
				x: 120,
				y: 460,
				size: 11,
				font: helveticaFont,
				color: rgb(0.1, 0.1, 0.1),
			});

			// IC Number
			firstPage.drawText(donorInfo.icNumber, {
				x: 90,
				y: 412,
				size: 11,
				font: helveticaFont,
				color: rgb(0.1, 0.1, 0.1),
			});

			// Total Contribution
			firstPage.drawText(grandTotal.toString(), {
				x: 160,
				y: 555,
				size: 11,
				font: helveticaFont,
				color: rgb(0.1, 0.1, 0.1),
			});

			// IC Number
			firstPage.drawText(donorInfo.contactNumber.toString(), {
				x: 390,
				y: 412,
				size: 11,
				font: helveticaFont,
				color: rgb(0.1, 0.1, 0.1),
			});
		}
		// const pdfBytes = await pdfDoc.save();
		// download(pdfBytes, 'medical-list-example.pdf', 'application/pdf');

		const pdfBytes = await pdfDoc.saveAsBase64({ dataUri: true });

		axios
			.post('/transaction/upload-form', {
				file: pdfBytes,
				no: 2,
				transactionId: transactionId,
			})
			.then((res) => {
				console.log('completed');
				console.log(res);
			});
	};

	const generatePDF2Btn = async (transactionId) => {
		const url =
			'https://edemy-bucket-10.s3.ap-southeast-1.amazonaws.com/EXEMPTION+FORM+NEW.pdf';
		const existingPdfBytes = await fetch(url).then((res) => res.arrayBuffer());

		const pdfDoc = await PDFDocument.load(existingPdfBytes);
		const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

		const pages = pdfDoc.getPages();
		const firstPage = pages[0];
		const { width, height } = firstPage.getSize();

		if (donorInfo.isCompany) {
			firstPage.drawText(`${moment(new Date()).format('DD/MM/YYYY')}`, {
				x: 80,
				y: 720,
				size: 11,
				font: helveticaFont,
				color: rgb(0.1, 0.1, 0.1),
			});

			firstPage.drawText('Company', {
				x: 190,
				y: 702,
				size: 11,
				font: helveticaFont,
				color: rgb(0.1, 0.1, 0.1),
			});

			// Company Registration
			firstPage.drawText(donorInfo.registrationNo.toString(), {
				x: 223,
				y: 657,
				size: 11,
				font: helveticaFont,
				color: rgb(0.1, 0.1, 0.1),
			});

			// Selection - Company Name
			firstPage.drawText('X', {
				x: 55,
				y: 627,
				size: 11,
				font: helveticaFont,
				color: rgb(0.1, 0.1, 0.1),
			});

			// Company Name
			firstPage.drawText(donorInfo.name, {
				x: 260,
				y: 630,
				size: 11,
				font: helveticaFont,
				color: rgb(0.1, 0.1, 0.1),
			});

			// Company Address
			firstPage.drawText(donorInfo.address, {
				x: 98,
				y: 574,
				size: 11,
				font: helveticaFont,
				color: rgb(0.1, 0.1, 0.1),
			});

			// Total Contribution
			firstPage.drawText(grandTotal.toString(), {
				x: 160,
				y: 555,
				size: 20,
				font: helveticaFont,
				color: rgb(0.1, 0.1, 0.1),
			});

			// Company Tel
			firstPage.drawText(donorInfo.contactNumber.toString(), {
				x: 110,
				y: 535,
				size: 11,
				font: helveticaFont,
				color: rgb(0.1, 0.1, 0.1),
			});

			// Email
			firstPage.drawText(donorInfo.email, {
				x: 110,
				y: 515,
				size: 11,
				font: helveticaFont,
				color: rgb(0.1, 0.1, 0.1),
			});
		} else {
			// Company or personal
			firstPage.drawText(`${moment(new Date()).format('DD/MM/YYYY')}`, {
				x: 80,
				y: 720,
				size: 11,
				font: helveticaFont,
				color: rgb(0.1, 0.1, 0.1),
			});

			firstPage.drawText('Personal', {
				x: 190,
				y: 702,
				size: 11,
				font: helveticaFont,
				color: rgb(0.1, 0.1, 0.1),
			});

			// Name
			firstPage.drawText(donorInfo.name, {
				x: 120,
				y: 482,
				size: 11,
				font: helveticaFont,
				color: rgb(0.1, 0.1, 0.1),
			});

			// Address
			firstPage.drawText(donorInfo.address, {
				x: 120,
				y: 460,
				size: 11,
				font: helveticaFont,
				color: rgb(0.1, 0.1, 0.1),
			});

			// IC Number
			firstPage.drawText(donorInfo.icNumber, {
				x: 90,
				y: 412,
				size: 11,
				font: helveticaFont,
				color: rgb(0.1, 0.1, 0.1),
			});

			// Total Contribution
			firstPage.drawText(grandTotal.toString(), {
				x: 160,
				y: 555,
				size: 11,
				font: helveticaFont,
				color: rgb(0.1, 0.1, 0.1),
			});

			// IC Number
			firstPage.drawText(donorInfo.contactNumber.toString(), {
				x: 390,
				y: 412,
				size: 11,
				font: helveticaFont,
				color: rgb(0.1, 0.1, 0.1),
			});
		}
		const pdfBytes = await pdfDoc.save();
		download(pdfBytes, 'medical-list-example.pdf', 'application/pdf');
	};

	return (
		<AgentRoute>
			{currentStep > 1 && (
				<button
					type="button"
					onClick={() => setCurrentStep(currentStep - 1)}
					className="py-2 px-4 m-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
					Back
				</button>
			)}
			{currentStep <= 1 && (
				<button
					type="button"
					onClick={() => setCurrentStep(currentStep + 1)}
					className="py-2 px-4 m-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
					Next Step
				</button>
			)}
			{currentStep === 1 && (
				<>
					<MedicalListTable
						handleChange={handleChange}
						medicalList={medicalListInfo}
						grandTotal={grandTotal}
					/>
				</>
			)}
			{currentStep === 2 && (
				<>
					<button
						type="button"
						onClick={generatePDFBtn}
						className="py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
						Generate PDF
					</button>
					<button
						type="button"
						onClick={generatePDF2Btn}
						className="py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
						Generate PDF 2
					</button>
					<TransactionForm
						donor={donorInfo}
						grandTotal={grandTotal}
						handleFormSubmit={handleFormSubmit}
					/>
				</>
			)}
		</AgentRoute>
	);
}

export default AgentAddTransaction;
