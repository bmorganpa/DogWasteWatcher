import React from "react";
import gql from "graphql-tag";
import Link from "next/link";
import { useQuery } from "@apollo/react-hooks";
import { useTranslation } from "react-i18next";

import { WastesListQuery } from "../__generated__/types";
import { WastesListQuery_wastes } from "../__generated__/types";
import { withApollo } from "../apollo/client";

import { useUser } from "./_app";

export const WASTES_QUERY = gql`
  query WastesListQuery {
    wastes {
      id
      latitude
      longitude
    }
  }
`;

const Index = () => {
  const { t } = useTranslation("index");
  const { data: wastesListData, error, loading } = useQuery<WastesListQuery>(
    WASTES_QUERY,
  );

  const { loading: userLoading, user } = useUser();

  if (loading || userLoading) {
    return <div>Loading...</div>;
  }

  const wastesList = wastesListData?.wastes ? (
    <ul>
      {wastesListData?.wastes.map(function mapWasteToComponent(
        waste: WastesListQuery_wastes,
      ) {
        return <li key={waste.id}>{t("labels.waste", waste as any)}</li>;
      })}
    </ul>
  ) : undefined;

  return (
    <div>
      {error && <div>{error.message}</div>}
      {user ? (
        <div>{t("title", user)}</div>
      ) : (
        <a href="/api/login">{t("common:labels.login")}</a>
      )}
      {user && (
        <div>
          <a href="/api/logout">{t("common:labels.logout")}</a>
        </div>
      )}
      <div>
        <Link href="/create_waste">
          <a>{t("buttons.create.label")}</a>
        </Link>
      </div>
      {wastesList}
    </div>
  );
};

export default withApollo(Index);
