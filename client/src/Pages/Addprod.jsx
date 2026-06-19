import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../Components/Navbar.jsx";
import Footer from "../Components/Footer.jsx";
import "./Addprod.css";

const API_BASE_URL = "https://sample-e-1.onrender.com";
const ADD_PRODUCT_URL = `${API_BASE_URL}/product/addproduct`;

const initialForm = {
	name: "",
	price: "",
	category: "",
	stock: "",
	description: "",
	image: null,
};

function Addprod() {
	const [formData, setFormData] = useState(initialForm);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [statusMessage, setStatusMessage] = useState("");
	const [statusType, setStatusType] = useState("");

	const navigate = useNavigate();

	const handleChange = (e) => {
		const { id, value, files } = e.target;

		setFormData((prev) => ({
			...prev,
			[id]: id === "image" ? files?.[0] || null : value,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsSubmitting(true);
		setStatusMessage("");

		const token = localStorage.getItem("token") || sessionStorage.getItem("token");

		const payload = new FormData();
		payload.append("name", formData.name);
		payload.append("price", String(Number(formData.price)));
		payload.append("category", formData.category);
		payload.append("stock", String(Number(formData.stock)));
		payload.append("description", formData.description);

		if (formData.image) {
			payload.append("image", formData.image);
		}

		try {
			await axios.post(ADD_PRODUCT_URL, payload, {
				headers: {
					...(token ? { Authorization: `Bearer ${token}` } : {}),
				},
			});

			setStatusType("success");
			setStatusMessage("Product added successfully. Redirecting...");
			setFormData(initialForm);

			window.setTimeout(() => {
				navigate("/");
			}, 1500);
		} catch (err) {
			console.error("Add product error:", err);
			setStatusType("error");
			setStatusMessage(err.response?.data?.message || "Unable to add product right now.");
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<div>
			<Navbar />

			<main className="addprod-page">
				<section className="addprod-card">
					<p className="addprod-eyebrow">Inventory</p>
					<h1>Add Product</h1>
					<p className="addprod-copy">Create a new catalog item and send it directly to the API.</p>

					{statusMessage ? <p className={`addprod-status addprod-status-${statusType}`}>{statusMessage}</p> : null}

					<form className="addprod-form" onSubmit={handleSubmit}>
						<label htmlFor="name">Product Name</label>
						<input
							type="text"
							id="name"
							placeholder="Wireless headphones"
							value={formData.name}
							onChange={handleChange}
							required
						/>

						<label htmlFor="price">Price</label>
						<input
							type="number"
							id="price"
							placeholder="4999"
							value={formData.price}
							onChange={handleChange}
							min="0"
							step="1"
							required
						/>

						<label htmlFor="category">Category</label>
						<input
							type="text"
							id="category"
							placeholder="Electronics"
							value={formData.category}
							onChange={handleChange}
							required
						/>

						<label htmlFor="stock">Stock</label>
						<input
							type="number"
							id="stock"
							placeholder="25"
							value={formData.stock}
							onChange={handleChange}
							min="0"
							step="1"
							required
						/>

						<label htmlFor="image">Image URL</label>
						<input
							type="file"
							id="image"
							accept="image/*"
							onChange={handleChange}
							required
						/>

						<label htmlFor="description">Description</label>
						<textarea
							id="description"
							placeholder="Short product description"
							rows="5"
							value={formData.description}
							onChange={handleChange}
							required
						/>

						<button type="submit" disabled={isSubmitting}>
							{isSubmitting ? "Saving product..." : "Add Product"}
						</button>
					</form>
				</section>
			</main>

			<Footer />
		</div>
	);
}

export default Addprod;
