import { useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
	const [formData, setFormData] = useState({
		morningGen: "",
		morningCustomer: "",
		morningMaint: "",
		morningSO: "",
		midGen: "",
		midCustomer: "",
		midMaint: "",
		midSO: "",
		eveningGen: "",
		eveningCustomer: "",
		eveningMaint: "",
		eveningSO: "",
		notesForOpen: "",
		morningLead: "",
		midLead: "",
		eveningLead: "",
	});
	const [morningPhoto, setMorningPhoto] = useState(null); // For storing uploaded image
	const [midPhoto, setMidPhoto] = useState(null); // For storing uploaded image
	const [eveningPhoto, setEveningPhoto] = useState(null); // For storing uploaded image

	const [loading, setLoading] = useState(false);
	const [responseMsg, setResponseMsg] = useState("");
	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleMorningPhotoChange = (e) => {
		setMorningPhoto(e.target.files[0]);
		URL.createObjectURL(e.target.files[0]);
	};
	const handleMidPhotoChange = (e) => {
		setMidPhoto(e.target.files[0]);
		URL.createObjectURL(e.target.files[0]);
	};
	const handleEveningPhotoChange = (e) => {
		setEveningPhoto(e.target.files[0]);
		URL.createObjectURL(e.target.files[0]);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		setResponseMsg("");

		const formDataToSend = new FormData();
		formDataToSend.append("morningGen", formData.morningGen);
		formDataToSend.append("morningCustomer", formData.morningCustomer);
		formDataToSend.append("morningMaint", formData.morningMaint);
		formDataToSend.append("morningSO", formData.morningSO);
		formDataToSend.append("midGen", formData.midGen);
		formDataToSend.append("midCustomer", formData.midCustomer);
		formDataToSend.append("midMaint", formData.midMaint);
		formDataToSend.append("midSO", formData.midSO);
		formDataToSend.append("eveningGen", formData.eveningGen);
		formDataToSend.append("eveningCustomer", formData.eveningCustomer);
		formDataToSend.append("eveningMaint", formData.eveningMaint);
		formDataToSend.append("eveningSO", formData.eveningSO);
		formDataToSend.append("notesForOpen", formData.notesForOpen);
		formDataToSend.append("morningPhoto", morningPhoto);
		formDataToSend.append("midPhoto", midPhoto);
		formDataToSend.append("eveningPhoto", eveningPhoto);
		formDataToSend.append("morningLead", formData.morningLead);
		formDataToSend.append("midLead", formData.midLead);
		formDataToSend.append("eveningLead", formData.eveningLead);

		try {
			const response = await axios.post("/send-email", formDataToSend, {
				headers: { "Content-Type": "multipart/form-data" }, // Required for file uploads
			});
			setResponseMsg(response.data.message);

			setFormData({
				morningGen: "",
				morningCustomer: "",
				morningMaint: "",
				morningSO: "",
				midGen: "",
				midCustomer: "",
				midMaint: "",
				midSO: "",
				eveningGen: "",
				eveningCustomer: "",
				eveningMaint: "",
				eveningSO: "",
				notesForOpen: "",
				morningLead: "",
				midLead: "",
				eveningLead: "",
			});

			setMorningPhoto(null);
			setMidPhoto(null);
			setEveningPhoto(null);
		} catch (error) {
			console.log(error);
			setResponseMsg("Failed to send email. Please try again.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="flex flex-col items-center justify-center min-h-screen">
			<div>
				<h1 className="text-center text-2xl font-bold my-10 text-cyan-500">
					Daily Shift Report
				</h1>
			</div>
			<form
				onSubmit={handleSubmit}
				className="flex flex-col gap-4 items-center justify-center"
			>
				<div className="flex flex-col gap-4 my-12 text-white">
					<h1 className="text-center text-green-500">Morning</h1>
					<div className="flex flex-col gap-4">
						<label
							for="morningLead"
							class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
						>
							Select Lead
						</label>
						<select
							id="morningLead"
							onChange={handleChange}
							name="morningLead"
							value={formData.morningLead}
							class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
						>
							<option selected>Lead on Shift</option>
							<option value="Jake">Jake</option>
							<option value="Helen">Helen</option>
							<option value="Hannah">Hannah</option>
							<option value="Jorge">Jorge</option>
						</select>
						<textarea
							type="text"
							name="morningGen"
							placeholder="General"
							value={formData.morningGen}
							onChange={handleChange}
							required
							cols={100}
							className="border p-4 rounded w-full max-w-xl text-lg h-40"
						/>
						<textarea
							type="text"
							name="morningCustomer"
							placeholder="Customers"
							value={formData.morningCustomer}
							onChange={handleChange}
							required
							className="border p-4 rounded w-full max-w-xl text-lg h-40"
						/>
						<textarea
							name="morningMaint"
							placeholder="Maintenance"
							value={formData.morningMaint}
							onChange={handleChange}
							required
							className="border p-4 rounded w-full max-w-xl text-lg h-40"
						></textarea>
						<textarea
							name="morningSO"
							placeholder="Shout Outs"
							value={formData.morningSO}
							onChange={handleChange}
							required
							className="border p-4 rounded w-full max-w-xl text-lg h-40"
						></textarea>
						<label className="text-lg text-cyan-500">AM Photo:</label>
						<input
							type="file"
							accept="image/*"
							onChange={handleMorningPhotoChange}
							required
							className="border p-4 rounded w-full max-w-xl text-lg"
						/>
						{morningPhoto && (
							<img
								src={URL.createObjectURL(morningPhoto)}
								alt="Morning Preview"
								style={{ marginTop: "10px", maxHeight: "300px" }}
							/>
						)}
					</div>
				</div>
				<div className="flex flex-col gap-4 my-12 text-white">
					<h1 className="text-center text-yellow-500">Mid</h1>
					<div className="flex flex-col gap-4">
						<label
							for="midLead"
							class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
						>
							Select Lead
						</label>
						<select
							id="midLead"
							onChange={handleChange}
							name="midLead"
							value={formData.midLead}
							class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
						>
							<option selected>Lead on Shift</option>
							<option value="Jake">Jake</option>
							<option value="Helen">Helen</option>
							<option value="Hannah">Hannah</option>
							<option value="Jorge">Jorge</option>
						</select>
					</div>
					<textarea
						type="text"
						name="midGen"
						placeholder="General"
						value={formData.midGen}
						onChange={handleChange}
						required
						cols={100}
						className="border p-4 rounded w-full max-w-xl text-lg h-40"
					/>
					<textarea
						type="text"
						name="midCustomer"
						placeholder="Customers"
						value={formData.midCustomer}
						onChange={handleChange}
						required
						className="border p-4 rounded w-full max-w-xl text-lg h-40"
					/>
					<textarea
						name="midMaint"
						placeholder="Maintenance"
						value={formData.midMaint}
						onChange={handleChange}
						required
						className="border p-4 rounded w-full max-w-xl text-lg h-40"
					></textarea>
					<textarea
						name="midSO"
						placeholder="Shout Outs"
						value={formData.midSO}
						onChange={handleChange}
						required
						className="border p-4 rounded w-full max-w-xl text-lg h-40"
					></textarea>
					<input
						type="file"
						accept="image/*"
						onChange={handleMidPhotoChange}
						required
						className="border p-4 rounded w-full max-w-xl text-lg"
					/>
					{midPhoto && (
						<img
							src={URL.createObjectURL(midPhoto)}
							alt="Mid Preview"
							style={{ marginTop: "10px", maxHeight: "300px" }}
						/>
					)}
				</div>
				<div className="flex flex-col gap-4 my-12 text-white">
					<h1 className="text-center text-purple-500">Evening</h1>
					<div className="flex flex-col gap-4">
						<label
							for="eveningLead"
							class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
						>
							Select Lead
						</label>
						<select
							id="eveningLead"
							onChange={handleChange}
							name="eveningLead"
							value={formData.eveningLead}
							class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
						>
							<option selected>Lead on Shift</option>
							<option value="Jake">Jake</option>
							<option value="Helen">Helen</option>
							<option value="Hannah">Hannah</option>
							<option value="Jorge">Jorge</option>
						</select>
					</div>
					<textarea
						type="text"
						name="eveningGen"
						placeholder="General"
						value={formData.eveningGen}
						onChange={handleChange}
						required
						cols={100}
						className="border p-4 rounded w-full max-w-xl text-lg h-40"
					/>
					<textarea
						type="text"
						name="eveningCustomer"
						placeholder="Customers"
						value={formData.eveningCustomer}
						onChange={handleChange}
						required
						className="border p-4 rounded w-full max-w-xl text-lg h-40"
					/>
					<textarea
						name="eveningMaint"
						placeholder="Maintenance"
						value={formData.eveningMaint}
						onChange={handleChange}
						required
						className="border p-4 rounded w-full max-w-xl text-lg h-40"
					></textarea>
					<textarea
						name="eveningSO"
						placeholder="Shout Outs"
						value={formData.eveningSO}
						onChange={handleChange}
						required
						className="border p-4 rounded w-full max-w-xl text-lg h-40"
					></textarea>
					<textarea
						name="notesForOpen"
						placeholder="Notes for Open"
						value={formData.notesForOpen}
						onChange={handleChange}
						className="border p-4 rounded w-full max-w-xl text-lg h-40"
					></textarea>
					<input
						type="file"
						accept="image/*"
						onChange={handleEveningPhotoChange}
						required
						className="border p-4 rounded w-full max-w-xl text-lg"
					/>
					{eveningPhoto && (
						<img
							src={URL.createObjectURL(eveningPhoto)}
							alt="Evening Preview"
							style={{ marginTop: "10px", maxHeight: "300px" }}
						/>
					)}
				</div>
				{responseMsg && (
					<p
						className={`text-center ${
							responseMsg == "Email sent!" ? "text-green-500" : "text-red-500"
						}`}
					>
						{responseMsg}
					</p>
				)}
				<button
					type="submit"
					className="bg-blue-500 hover:bg-blue-600 hover:text-blue-500 text-cyan-500 font-bold py-2 px-4 rounded mb-10 width-full text-lg"
				>
					{loading ? "Sending..." : "Send Message"}
				</button>
			</form>
		</div>
	);
}

export default App;
