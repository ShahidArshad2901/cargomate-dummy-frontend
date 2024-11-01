// hooks/useAuthSync.ts
import { useAuth } from "@frontegg/nextjs";
import { useEffect, useState } from "react";

export const useAuthSync = () => {
  const { user, isAuthenticated } = useAuth();
  const [backendSynced, setBackendSynced] = useState(false);

  useEffect(() => {
    const syncWithBackend = async () => {
      if (isAuthenticated && user && !backendSynced) {
        try {
          console.log('Attempting to sync with backend...'); // Debug log

          const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/sync`, {
            method: 'POST',
            credentials: 'include', // Important for CORS
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${user.accessToken}`,
            },
            body: JSON.stringify({
              frontegg_user_id: user.id,
              email: user.email,
              name: user.name,
            })
          });

          console.log('Response status:', response.status); // Debug log

          if (response.ok) {
            setBackendSynced(true);
            console.log('Sync successful'); // Debug log
          } else {
            console.error('Sync failed:', await response.text()); // Debug log
          }
        } catch (error) {
          console.error('Failed to sync with backend:', error);
        }
      }
    };

    syncWithBackend();
  }, [isAuthenticated, user, backendSynced]);

  return { backendSynced };
};
