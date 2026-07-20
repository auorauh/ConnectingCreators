"use client";
import React, { useEffect, useRef, useState } from 'react';
import Link from "next/link";
import "./Shop.css";
// import merchImage from '../Assets/merch1.jpg';
// import merchImage2 from '../Assets/Shop/PinkElephants/JNS01200_Afterlight.jpg';
// import merchImage3 from '../Assets/Shop/PinkElephants/JNS01262_Afterlight.jpg';
// import merchImage4 from '../Assets/Shop/PinkElephants/JNS01263_Afterlight.jpg';
// import merchImage5 from '../Assets/Shop/PinkElephants/shirtmockup5.png';

function Shop() {
    const [file, setFile] = useState(false);
    const [selectedImage, setSelectedImage] = useState('/Assets/merch1.jpg');

    const thumbnails = [
      { src: '/Assets/merch1.jpg', alt: 'Product view 1' },
      { src: '/Assets/Shop/PinkElephants/JNS01200_Afterlight.jpg', alt: 'Product view 2' },
      { src: '/Assets/Shop/PinkElephants/JNS01262_Afterlight.jpg', alt: 'Product view 3' },
      { src: '/Assets/Shop/PinkElephants/JNS01263_Afterlight.jpg', alt: 'Product view 4' },
      { src: '/Assets/Shop/PinkElephants/shirtmockup5.png', alt: 'Product view 5' },
    ];

  return (
    
    <div>
        {file ? <>
        <h1>Shop</h1>
        <p>Coming soon.</p></> : 
        <>
        <div className="ShopPage">
      <div className="ShopHeader">
        <h1>Shop</h1>
        <p>Official Connecting Creators Store.</p>
      </div>

      <div className="ProductCard">
        <div className="ProductImage">
        <img
          className="MainProductImage"
          src={selectedImage}
          alt="Connecting Creators T-Shirt"
        />

        <div className="ProductThumbnails">
          {thumbnails.map((thumb, index) => (
            <div
              key={thumb.src}
              className={`Thumbnail ${selectedImage === thumb.src ? 'active' : ''}`}
              onClick={() => setSelectedImage(thumb.src)}
            >
              <img src={thumb.src} alt={thumb.alt} />
            </div>
          ))}
        </div>
      </div>

        <div className="ProductInfo">
          <div className="ProductCategory">Apparel</div>

          <h2>Connecting Creators
            <br/>
            x
            <br/>
            Pink Elephants</h2>

          <p className="ProductDescription">
            This is the first ever limited run Connecting Creators t-shirt in collaboration with Pink Elephants. Printed on a 7.5 oz heavyweight 100% cotton t shirt, Designed by Geo Falls. This shirt represents our tribe of creators from all backgrounds and mediums coming together to transforming their pain into beauty.
          </p>

          <div className="ProductPrice">$50.00</div>

          <label>Sizes</label>
          <ul className="SizeSelect">
            <li>Small</li>
            <li>Medium</li>
            <li>Large</li>
            <li>XL</li>
          </ul>

          <Link href="/cart">
          <button className="PurchaseButton">
            Add to Cart
          </button></Link>
        </div>
      </div>
    </div>
        </>
        }
    </div>
  );
}

export default Shop;