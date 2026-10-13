
import Cart from "./Cart";
import "./App.css";

const products = [
  { id: 1, name: "Keyboard", price: 500 },
  { id: 2, name: "Mouse", price: 300 },
  { id: 3, name: "Headphones", price: 700 },
];

export default function App() {
  return (
    <main>
      <Cart products={products} />
    </main>
  );
}
