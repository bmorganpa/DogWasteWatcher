import React from "react";
import { AppProps } from "next/app";
import "../i18n";

export type UserState = Readonly<{
    loading: boolean;
    user?: any;
}>;

const UserContext = React.createContext<UserState>({
    loading: true
});

export default function MyApp(props: AppProps) {
  const userState = useFetchUser();
  const { Component, pageProps } = props;
  return (
    <UserContext.Provider value={userState}>
      <Component {...pageProps} />
    </UserContext.Provider>
  );
}

export function useUser(): UserState {
  return React.useContext(UserContext);
}

function useFetchUser() {
  const [loading, setLoading] = React.useState(true);
  const [user, setUser] = React.useState();
  React.useEffect(() => {
    async function getUser() {
      const res = await fetch("/api/me");
      if (res.ok) {
        setUser(await res.json());
      }
      setLoading(false);
    }
    getUser();
  }, [setUser]);
  return {loading, user};
}
