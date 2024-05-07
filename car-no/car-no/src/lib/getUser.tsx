import { useEffect, useState } from "react";
type user = {
    Id: number;
    username: string;
    email: string;
    phone: string;
    role: string | null;
    token: string;
  };
const useUserSession = (): user | null => {
  const [user, setUser] = useState<user | null>(null);

  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return user;
};

export default useUserSession;

