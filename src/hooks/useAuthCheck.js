import { useState, useEffect } from 'react';
import { checkAuthorization } from '@services/authService';

export function useAuthCheck() {
  const [isAuthorized, setAuthorized] = useState(false);
  const [isChecking, setChecking] = useState(true);
  const [isServerDown, setServerDown] = useState(false);

  useEffect(() => {
    async function checkAuth() {
      setChecking(true);
      try {
        await checkAuthorization();
        setAuthorized(true);
      } catch (error) {
        if (error.response?.status === 401) setAuthorized(false);
        else {
          setServerDown(true);
        } console.error("Auth check error:", error.response?.status || 'Server is down.');
      } finally {
        setChecking(false);
      }
    }

    checkAuth();
  }, []);

  return { isAuthorized, isChecking, isServerDown, setAuthorized };
}