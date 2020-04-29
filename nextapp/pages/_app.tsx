import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Head from "next/head";
import React from "react";
import { AppProps } from "next/app";

import "../i18n";
import { PageWrapper } from "../components/PageWrapper";

export type UserState = Readonly<{
  loading: boolean;
  user?: any;
}>;

const UserContext = React.createContext<UserState>({
  loading: true,
});

export default function MyApp(props: AppProps) {
  const userState = useFetchUser();
  const { user } = userState;
  const { Component, pageProps } = props;
  return (
    <div>
      <UserContext.Provider value={userState}>
        <Head>
          <link
            href="https://api.mapbox.com/mapbox-gl-js/v1.10.0/mapbox-gl.css"
            rel="stylesheet"
          />
        </Head>
        <PageWrapper>
          <div className="container">
            <AppBar position="static">
              <Toolbar>
                <div className="toolbar">
                  <Typography variant="h6">Dog Waste Watcher</Typography>
                  {user ? (
                    <Button color="inherit" href="/api/logout">
                      Logout
                    </Button>
                  ) : (
                    <Button color="inherit" href="/api/login">
                      Login
                    </Button>
                  )}
                </div>
              </Toolbar>
            </AppBar>
            <div className="page">
              <Component {...pageProps} />
            </div>
          </div>
        </PageWrapper>
      </UserContext.Provider>
      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          height: 100%;
        }

        .page {
          flex-grow: 1;
        }

        .toolbar {
          display: flex;
          justify-content: space-between;
          width: 100%;
        }
      `}</style>
    </div>
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
  return { loading, user };
}
