
import { useState } from "react";

export default function Cart({ products = [] }) {
  const [cart, setCart] = useState({});

  function addProduct(product) {
    setCart((current) => ({
      ...current,
      [product.id]: (current[product.id] || 0) + 1,
    }));
  }

  function changeQuantity(id, amount) {
    setCart((current) => {
      const next = { ...current };
      const quantity = (next[id] || 0) + amount;

      if (quantity <= 0) {
        delete next[id];
      } else {
        next[id] = quantity;
      }

      return next;
    });
  }

  function removeProduct(id) {
    setCart((current) => {
      const next = { ...current };
      delete next[id];
      return next;
    });
  }

  const cartProducts = products.filter(
    (product) => cart[product.id] > 0
  );

  const total = cartProducts.reduce(
    (sum, product) => sum + Number(product.price) * cart[product.id],
    0
  );

  const discount = total >= 1000 ? total * 0.1 : 0;
  const itemCount = Object.values(cart).reduce((sum, qty) => sum + qty, 0);

  return (
    <div className="store">
      <header className="topbar">
        <a className="brand" href="#home">
          <span className="brand-icon">N</span>
          <span>nova<span className="brand-light">store</span></span>
        </a>

        <div className="topbar-right">
          <span className="status-dot" />
          <span className="status-text">Demo storefront</span>
          <div className="cart-counter">
            <span>Bag</span>
            <span className="counter-number">{itemCount}</span>
          </div>
        </div>
      </header>

      <main id="home" className="store-content">
        <section className="hero">
          <div className="hero-copy">
            <span className="eyebrow">
              <span className="eyebrow-line" />
              THE EVERYDAY TECH EDIT
            </span>
            <h1>Good tech.<br />Better <span>living.</span></h1>
            <p>
              Thoughtfully picked essentials for your desk,
              your setup, and everything in between.
            </p>
            <a href="#products" className="hero-link">
              Explore collection <span>↘</span>
            </a>
          </div>

          <div className="hero-art" aria-hidden="true">
            <div className="orb orb-one" />
            <div className="orb orb-two" />
            <div className="art-label">ESSENTIALS / 001</div>
            <div className="floating-card card-keyboard">
              <span className="device-symbol">⌨</span>
              <span>KEYBOARD</span>
            </div>
            <div className="floating-card card-headphones">
              <span className="device-symbol">◖</span>
              <span>AUDIO</span>
            </div>
            <div className="art-center">
              <span>NS</span>
            </div>
            <div className="art-caption">DESIGNED FOR YOUR EVERYDAY.</div>
          </div>
        </section>

        <section id="products" className="catalog">
          <div className="section-heading">
            <div>
              <span className="eyebrow">THE COLLECTION</span>
              <h2>Small upgrades. <span>Big difference.</span></h2>
            </div>
            <span className="product-count">
              {products.length.toString().padStart(2, "0")} PRODUCTS
            </span>
          </div>

          <div className="product-grid">
            {products.map((product, index) => {
              const themes = ["violet", "blue", "orange"];
              const symbols = ["⌨", "⌁", "◉"];
              const descriptions = [
                "Built for your flow",
                "Precision in every click",
                "Sound that stays with you",
              ];

              return (
                <article className="product-card" key={product.id}>
                  <div className={`product-visual ${themes[index % themes.length]}`}>
                    <span className="product-index">
                      ITEM / {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="product-symbol" aria-hidden="true">
                      {symbols[index % symbols.length]}
                    </span>
                    <span className="visual-glow" />
                    <span className="product-tag">ESSENTIAL</span>
                  </div>

                  <div className="product-info">
                    <div className="product-meta">
                      <span>TECH ACCESSORIES</span>
                      <span className="product-star">✳</span>
                    </div>
                    <h3>{product.name}</h3>
                    <p className="product-description">
                      {descriptions[index % descriptions.length]}
                    </p>

                    <div className="product-bottom">
                      <span className="product-price">
                        <small>₹</small>
                        {Number(product.price).toLocaleString("en-IN", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </span>
                      <button
                        className="add-button"
                        data-testid={`add-${product.id}`}
                        onClick={() => addProduct(product)}
                        aria-label={`Add ${product.name} to cart`}
                      >
                        <span>Add to bag</span>
                        <span className="add-plus">+</span>
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section className="checkout-section">
          <div className="checkout-heading">
            <div>
              <span className="eyebrow">YOUR SELECTION</span>
              <h2>Your bag<span>.</span></h2>
            </div>
            <span className="bag-count">
              {itemCount} {itemCount === 1 ? "ITEM" : "ITEMS"}
            </span>
          </div>

          <div className="checkout-layout">
            <div className="cart-panel">
              {cartProducts.length === 0 ? (
                <div className="empty-state" data-testid="cart-empty">
                  <div className="empty-icon">↗</div>
                  <h3>Your bag is taking a break.</h3>
                  <p>Find something you love and add it here.</p>
                  <a href="#products">Explore products <span>→</span></a>
                </div>
              ) : (
                cartProducts.map((product, index) => (
                  <article className="cart-line" key={product.id}>
                    <div className={`cart-thumb thumb-${index % 3}`}>
                      {["⌨", "⌁", "◉"][index % 3]}
                    </div>

                    <div className="cart-product-info">
                      <h3>{product.name}</h3>
                      <p>Essential tech</p>
                      <button
                        className="remove-button"
                        data-testid={`remove-${product.id}`}
                        onClick={() => removeProduct(product.id)}
                      >
                        Remove
                      </button>
                    </div>

                    <div className="quantity-control">
                      <button
                        data-testid={`dec-${product.id}`}
                        onClick={() => changeQuantity(product.id, -1)}
                        aria-label={`Decrease ${product.name} quantity`}
                      >
                        −
                      </button>
                      <span data-testid={`qty-${product.id}`}>
                        {cart[product.id]}
                      </span>
                      <button
                        data-testid={`inc-${product.id}`}
                        onClick={() => changeQuantity(product.id, 1)}
                        aria-label={`Increase ${product.name} quantity`}
                      >
                        +
                      </button>
                    </div>

                    <div className="line-price">
                      ₹{(Number(product.price) * cart[product.id]).toFixed(2)}
                    </div>
                  </article>
                ))
              )}
            </div>

            <aside className="summary-panel">
              <span className="eyebrow">THE TOTAL</span>
              <h3>Order summary</h3>

              <div className="summary-row">
                <span>Subtotal</span>
                <span data-testid="total">₹{total.toFixed(2)}</span>
              </div>

              {discount > 0 && (
                <div className="summary-row discount-row">
                  <span>Discount (10%)</span>
                  <span data-testid="discount">−₹{discount.toFixed(2)}</span>
                </div>
              )}

              <div className="summary-row shipping-row">
                <span>Shipping</span>
                <span>Free</span>
              </div>

              <div className="summary-divider" />

              <div className="grand-total-row">
                <span>Grand total</span>
                <span data-testid="grand-total">
                  ₹{(total - discount).toFixed(2)}
                </span>
              </div>

              <p className="discount-note">
                {discount > 0
                  ? "Your 10% discount has been applied."
                  : "Spend ₹1,000 to unlock 10% off."}
              </p>

              <button
                className="checkout-button"
                onClick={() => {
                  if (itemCount === 0) {
                    document.getElementById("products")?.scrollIntoView({
                      behavior: "smooth",
                    });
                  } else {
                    window.alert("Demo only: checkout is not connected.");
                  }
                }}
              >
                {itemCount === 0 ? "Explore products" : "Continue to checkout"}
                <span>↗</span>
              </button>

              <div className="secure-note">
                <span>◇</span>
                Demo storefront · No payment collected
              </div>
            </aside>
          </div>
        </section>

        <footer className="footer">
          <a className="brand footer-brand" href="#home">
            <span className="brand-icon">N</span>
            <span>nova<span className="brand-light">store</span></span>
          </a>
          <span>BUILT FOR THE EVERYDAY by Yashraj Rana.</span>
          <span>FULL STACK LAB · SET B</span>
        </footer>
      </main>
    </div>
  );
}
