import { useState, useEffect } from 'react';
import { database } from '@/plugins/firebase';
import { ref, onValue, query, orderByChild, get } from 'firebase/database';

interface Model {
  id: string;
  name: string;
  profilePicture: string;
  gender: string;
  city: string;
  ethnic: string;
  country: string;
  role: string;
  industry: string[];
  product_field: string[];
  [key: string]: any;
}

export const useModels = () => {
  const [models, setModels] = useState<Model[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    const spgRef = query(ref(database, 'promoters_public_info/'), orderByChild('name'));

    // First try to get cached data
    get(spgRef).then((snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const modelsList = Object.entries(data).map(([id, value]) => ({
          id,
          ...(value as any),
        }));
        setModels(modelsList);
        setLoading(false);
      }
    }).catch(() => {
      // Ignore cache errors, will try real-time updates
    });

    // Set up real-time listener
    const unsubscribe = onValue(spgRef, 
      (snapshot) => {
        try {
          const data = snapshot.val();
          if (!data) {
            setModels([]);
            setError(null);
            return;
          }

          const modelsList = Object.entries(data).map(([id, value]) => ({
            id,
            ...(value as any),
          }));

          setModels(modelsList);
          setError(null);
        } catch (err) {
          setError('Unable to load models. Please check your connection.');
        } finally {
          setLoading(false);
        }
      }, 
      (error) => {
        if (error.code === 'NETWORK_ERROR' || error.code === 'CLIENT_OFFLINE') {
          setError('You appear to be offline. Please check your connection.');
        } else {
          setError('Unable to load models. Please try again later.');
        }
        setLoading(false);
      },
      // Set up offline persistence
      { onlyOnce: false }
    );

    return () => unsubscribe();
  }, []);

  return { models, loading, error };
};