import { create } from 'zustand'; 
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebaseConfig'; 

export const productCollectionRef = collection(db, 'products');

export const useProduct = create(set => ({
    products: [],
    isFetch: false,
    async getAllProduct() {
        try {
            set({ isFetch: true });
            const querySnapshot = await getDocs(productCollectionRef);
            const productData = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));
            set({ products: productData });
        } catch (error) {
            console.error(error);
        } finally {
            set({ isFetch: false });
        }
    },
}));
