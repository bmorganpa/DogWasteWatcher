import React from "react";
import gql from "graphql-tag";
import Link from "next/link";
import { useQuery } from "@apollo/react-hooks";
import { useTranslation } from "react-i18next";

import { ThingsListQuery } from "../__generated__/types";
import { ThingsListQuery_things } from "../__generated__/types";
import { withApollo } from "../apollo/client";

export const THINGS_QUERY = gql`
  query ThingsListQuery {
    things {
      id
      latitude
      longitude
    }
  }
`;

const Index = () => {
  const { t } = useTranslation("index");
  const { data: thingsListData, error, loading } = useQuery<ThingsListQuery>(
    THINGS_QUERY,
  );

  const [user, setUser] = React.useState();
  React.useEffect(() => {
    async function getUser() {
      const res = await fetch("/api/me");
      if (res.ok) {
        setUser(await res.json());
      }
    }
    getUser();
  }, [setUser]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const thingsList = thingsListData?.things ? (
    <ul>
      {thingsListData?.things.map(function mapThingToComponent(
        thing: ThingsListQuery_things,
      ) {
        return <li key={thing.id}>{t("labels.thing", thing as any)}</li>;
      })}
    </ul>
  ) : (
    undefined
  );

  return (
    <div>
      {error && <div>{error.message}</div>}
      {user ? (
        <div>{t("title", user)}</div>
      ) : (
        <a href="/api/login">{t("common:labels.login")}</a>
      )}
      <div>{user && <a href="/api/logout">{t("common:labels.logout")}</a>}</div>
      <div>
        <Link href="/create_thing">
          <a>{t("buttons.create.label")}</a>
        </Link>
      </div>
      {thingsList}
    </div>
  );
};

export default withApollo(Index);
