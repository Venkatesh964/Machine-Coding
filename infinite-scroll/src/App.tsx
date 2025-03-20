import { useEffect, useState } from "react";

const LIMIT = 20;

type productType = {
  id: number;
  title: string;
  price: number;
};
function App() {
  // const page = 1;
  const [page, setPage] = useState(1);
  const [data, setData] = useState<productType[]>([]);

  const [loading, setLoading] = useState(true);
  //const [count, setCount] = useState(50);

  async function getData() {
    setLoading(true);
    const response = await fetch(
      `https://dummyjson.com/products?limit=20&skip=${
        (page - 1) * LIMIT
      }&select=title,price`
    );
    const data = await response.json();
    setLoading(false);
    setData((prevData) => [...prevData, ...data.products]);
  }

  useEffect(() => {
    getData();
  }, [page]);

  useEffect(() => {
    const onscroll = () => {
      //everything here is stored in pixels
      //innerheight gives the height of current window in pixels
      //scrollY gives the height scrolled in pixels
      //with offsetHeight we are taking the height of the body.
      // getBoundingClientRect()
      if (
        window.innerHeight + window.scrollY >=
        window.document.body.getBoundingClientRect().height - 100
      ) {
        setPage((prev) => prev + 1);
      }
    };

    window.addEventListener("scroll", onscroll);

    return () => window.removeEventListener("scroll", onscroll);
  }, []);

  console.log(data);
  return (
    <div>
      {data.map((product: productType) => (
        <Card key={product.id} title={product.title} price={product.price} />
      ))}
    </div>
  );
}

function Card({ title, price }: { title: any; price: any }) {
  return (
    <div>
      <div>{title}</div>
      <div>{price}</div>
    </div>
  );
}
export default App;
