import { useShoppingItems } from "../context/ShoppingItemsContext";
import { StoreItem } from "./StoreItem";
import { Container, Row, Col } from "react-bootstrap";
import { useState } from "react";
import { ClipLoader } from "react-spinners";
import { SearchBar } from "./SearchBar";

export function Store() {
    const { products, isLoadingProducts, error } = useShoppingItems();
    const [searchQuery, setSearchQuery] = useState("");
    const [filters, setFilters] = useState({
        category: [],
        priceRange: { min: '', max: '' },
        rating: 0
    });

    if (isLoadingProducts) {
        return (
            <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "200px" }}>
                <ClipLoader color="#8a2be2" size={50} />
            </Container>
        );
    }

    if (error) {
        return (
            <Container className="text-center mt-5">
                <h3 className="text-danger">Error loading products</h3>
                <p>{error}</p>
            </Container>
        );
    }

    const filteredProducts = products?.filter(product => {
        const matchesSearchQuery = !searchQuery || 
            product.name.toLowerCase().includes(searchQuery.toLowerCase());
        // Updated category matching logic
        const matchesCategory = filters.category.length === 0 || 
            filters.category.includes(product.category);
        const matchesPriceRange = (!filters.priceRange.min || product.price >= Number(filters.priceRange.min)) &&
                                 (!filters.priceRange.max || product.price <= Number(filters.priceRange.max));
        const matchesRating = product.rating >= filters.rating;

        return matchesSearchQuery && matchesCategory && matchesPriceRange && matchesRating;
    }) || [];

    if (!products || products.length === 0) {
        return (
            <Container className="text-center mt-5">
                <h3>No products available</h3>
                <button 
                    className="btn btn-primary mt-3"
                    onClick={() => window.location.reload()}
                >
                    Refresh Page
                </button>
            </Container>
        );
    }

    return (
        <>
            <Container className="mb-4">
                <SearchBar onSearch={setSearchQuery} onFilter={setFilters} />
                <Row md={2} xs={1} lg={3} className="g-3">
                    {filteredProducts.map(item => (
                        <Col key={item.id || Math.random()}>
                            <StoreItem {...item} />
                        </Col>
                    ))}
                </Row>
                {filteredProducts.length === 0 && searchQuery && (
                    <div className="text-center mt-4">
                        <h4>No products found matching "{searchQuery}"</h4>
                    </div>
                )}
            </Container>
        </>
    );
}