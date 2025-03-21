import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { db } from "../../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

const ProductDetail = () => {
  const { id } = useParams(); // Извлекаем id из URL
  console.log("Получено id из параметров URL:", id); // Лог для проверки

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) {
      setError("Продукт с таким ID не существует");
      setLoading(false);
      return;
    }

    const loadProduct = async () => {
      try {
        const productRef = doc(db, "products", id);
        const productSnap = await getDoc(productRef);

        if (productSnap.exists()) {
          setProduct(productSnap.data());
        } else {
          setError("Продукт с таким ID не существует");
        }
      } catch (err) {
        setError("Ошибка при загрузке продукта");
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  if (loading) {
    return <div>Загрузка...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Детали продукта</h1>
      {product ? (
        <div>
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <p>Цена: {product.price} сом</p>
        </div>
      ) : (
        <div>Продукт не найден</div>
      )}
    </div>
  );
};

export default ProductDetail;
