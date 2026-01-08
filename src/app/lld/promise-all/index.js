// Call API using Promise.all

import { useState } from "react";
import { useEffect } from "react";
import "./styles.css";

export default function App() {
  const [data, setData] = useState([]);
  // Call API to get product details
  const callProductApi = async (products = []) => {
    const promises = [];
    await Promise.all(
      products.map((item) => {
        promises.push(
          fetch(`https://fakestoreapi.com/products/${item.productId}`)
        );
      })
    );
    const arr = [];
    for (let i = 0; i < promises.length; i++) {
      arr.push(await (await promises[i]).json());
    }
    return arr;
  };

  // Call API to get all product list
  useEffect(() => {
    (async function () {
      const res = await fetch("https://fakestoreapi.com/carts/?limit2");
      const data = await res.json();
      if (data && data.length) {
        const productData = [];
        for (let i = 0; i < data.length; i++) {
          productData.push({
            userId: data[i].userId,
            date: data[i].date,
            product: await callProductApi(data[i].products),
          });
        }
        setData(productData);
      }
    })();
  }, []);

  return (
    <div>
      {data && (
        <>
          {data && data.length
            ? data.map((item) => (
                <div key={item.date + item.userId}>
                  {item.date},
                  <div>
                    {item?.product.map((p) => (
                      <div key={p.category}>{p.title}</div>
                    ))}
                  </div>
                </div>
              ))
            : null}
        </>
      )}
    </div>
  );
}
