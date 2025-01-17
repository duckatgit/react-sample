import Empty from "User/Components/Empty";
import React from "react";
import { useTranslation } from "react-i18next";

function Card() {
  const { t } = useTranslation();
  return (
    <div>
      <Empty msg={t("dontHaveCard")} />
    </div>
  );
}

export default Card;
