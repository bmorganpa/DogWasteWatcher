import React from "react";
import gql from "graphql-tag";
import Link from "next/link";
import { useQuery } from "@apollo/react-hooks";
import { useTranslation } from "react-i18next";

import { WastesListQuery } from "../__generated__/types";
import { WastesListQuery_wastes } from "../__generated__/types";

import { useUser } from "./_app";
import { withApollo } from "../apollo/client";
import { WasteMap } from "../components/index/WasteMap";
import { PageWrapper } from "../components/PageWrapper";

const Index = () => {
  const { t } = useTranslation("index");

  const { loading: userLoading, user } = useUser();

  if (userLoading) {
    return <div>Loading...</div>;
  }

  return (
    <PageWrapper>
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
      <WasteMap />
    </PageWrapper>
  );
};

export default withApollo(Index);
