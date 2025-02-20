import { createContext, useContext, useState, useEffect } from "react";
import { dbService } from "../services/db";

const ShoppingItemsContext = createContext({});

export function useShoppingItems() {
    return useContext(ShoppingItemsContext);
}

export function ShoppingItemsProvider({ children }) {
    const [products, setProducts] = useState([]);
    const [isLoadingProducts, setIsLoadingProducts] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadProducts = async () => {
            try {
                setIsLoadingProducts(true);
                await dbService.init();
                const products = await dbService.getAllProducts();
                setProducts(products);
                setError(null);
            } catch (err) {
                setError("Failed to load products");
                console.error("Error loading products:", err);
            } finally {
                setIsLoadingProducts(false);
            }
        };

        loadProducts();
    }, []);

    async function addProduct(product) {
        try {
            const newProduct = await dbService.addProduct(product);
            setProducts(prevProducts => [...prevProducts, newProduct]);
            return newProduct;
        } catch (error) {
            console.error("Error adding product:", error);
            throw error;
        }
    }

    async function updateProduct(id, updatedProduct) {
        try {
            const updated = await dbService.updateProduct(id, updatedProduct);
            setProducts(prevProducts =>
                prevProducts.map(product =>
                    product.id === id ? updated : product
                )
            );
        } catch (error) {
            console.error("Error updating product:", error);
            throw error;
        }
    }

    async function deleteProduct(id) {
        try {
            await dbService.deleteProduct(id);
            setProducts(prevProducts =>
                prevProducts.filter(product => product.id !== id)
            );
        } catch (error) {
            console.error("Error deleting product:", error);
            throw error;
        }
    }

    return (
        <ShoppingItemsContext.Provider
            value={{
                products,
                isLoadingProducts,
                error,
                addProduct,
                updateProduct,
                deleteProduct
            }}
        >
            {children}
        </ShoppingItemsContext.Provider>
    );
}