import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../Components/Navbar.jsx";
import Footer from "../Components/Footer.jsx";
import Card from "../Components/Card.jsx";
import "./Home.css";

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await axios.get("https://sample-e-1.onrender.com/product/getproducts");
        const items = Array.isArray(response.data)
          ? response.data
          : Array.isArray(response.data?.value)
            ? response.data.value
            : [];

        setProducts(items);
      } catch (err) {
        setError("Unable to load products right now.");
        console.error("Product fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  return (
    <div>
      <Navbar />

      <main className="body">
        <section className="home-hero">
          <div className="home-hero-copy">
            <p className="home-eyebrow">Featured products</p>
            <br></br>
            <h1>Shop the latest products from our catalog</h1>
            <br></br>
          </div>

          {loading ? <p className="home-status">Loading products...</p> : null}
          {error ? <p className="home-status home-status-error">{error}</p> : null}
        </section>

        {!loading && !error ? (
          <section className="product-grid">
            {products.length > 0 ? (
              products.map((product) => <Card key={product._id} product={product} />)
            ) : (
              <p className="home-status">No products found.</p>
            )}
          </section>
        ) : null}
      </main>

      <Footer />
    </div>
  );
}

export default Home;
