import React, { useState } from 'react';
import './ProductList.css'
import CartItem from './CartItem';
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../redux/CartSlice";

function ProductList({ onHomeClick }) {
    const [showCart, setShowCart] = useState(false);

    const dispatch = useDispatch();

    const cartItems = useSelector(state => state.cart.items);
    const totalQuantity = cartItems.reduce(
        (total, item) => total + item.quantity,
        0
    );

    const [addedToCart, setAddedToCart] = useState({});

    const plantsArray = [
        {
            category: "Air Purifying Plants",
            plants: [
                {
                    name: "Snake Plant",
                    image: "https://cdn.pixabay.com/photo/2021/01/22/06/04/snake-plant-5939187_1280.jpg",
                    description: "Produces oxygen at night, improving air quality.",
                    cost: "$15"
                },
                {
                    name: "Spider Plant",
                    image: "https://cdn.pixabay.com/photo/2018/07/11/06/47/chlorophytum-3530413_1280.jpg",
                    description: "Filters formaldehyde and xylene from the air.",
                    cost: "$12"
                }
            ]
        }
    ];

    const handleAddToCart = (plant) => {
        dispatch(addItem(plant));
        setAddedToCart(prev => ({
            ...prev,
            [plant.name]: true
        }));
    };

    const handleContinueShopping = (e) => {
        e.preventDefault();
        setShowCart(false);
    };

    return (
        <div>
            <h3 style={{ color: "black" }}>
                Cart Items: {totalQuantity}
            </h3>

            {!showCart ? (
                <div className="product-grid">
                    {plantsArray.map((section, index) => (
                        <div key={index}>
                            <h2>{section.category}</h2>

                            <div className="product-grid">
                                {section.plants.map((plant, idx) => (
                                    <div key={idx} className="product-card">
                                        <img src={plant.image} alt={plant.name} />
                                        <h3>{plant.name}</h3>
                                        <p>{plant.description}</p>
                                        <p>{plant.cost}</p>

                                        <button
                                            onClick={() => handleAddToCart(plant)}
                                            disabled={addedToCart[plant.name]}
                                        >
                                            {addedToCart[plant.name]
                                                ? "Added to Cart"
                                                : "Add to Cart"}
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <CartItem onContinueShopping={handleContinueShopping} />
            )}
        </div>
    );
}

export default ProductList;
