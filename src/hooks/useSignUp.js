import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useSignUp = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { dispatch } = useAuthContext();

  const signup = async (name, email, password) => {
    setLoading(true);
    setError(null);

    const res = await fetch(
      `${process.env.REACT_APP_BASE_URL}/api/user/signup`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      }
    );

    const json = await res.json();

    // if res.ok === false
    if (!res.ok) {
      setLoading(false);
      setError(json.error);
    }

    // if res.ok === true
    if (res.ok) {
      // update outh context
      dispatch({ type: "LOGIN", payload: json });
      // save to loacl stroage
      localStorage.setItem("user", JSON.stringify(json));

      setLoading(false);
    }
  };

  return { error, loading, signup };
};
