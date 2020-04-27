import React from "react";
import { useRouter } from "next/router";

import { useUser } from "../pages/_app";

export function withProtectedRoute<T>(ComponentClass: React.ComponentType<T>) {
  return (props: T) => {
    const router = useRouter();
    const { loading, user } = useUser();
    React.useEffect(() => {
      if (!loading && !user) {
        router.replace("/");
      }
    }, [loading, user]);
    return <ComponentClass {...props} />;
  };
}
