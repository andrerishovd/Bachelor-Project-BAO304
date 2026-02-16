import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  const { t, i18n } = useTranslation("common");

  return (
    <section className="container">
      <div className="row align-items-center">
        <div className="col">
          <h1 className="montserrat-title m-4">{t("pageNotFound")}</h1>
          <h2 className="text-muted">404</h2>
          <Link className="btn btn-primary btn-lg " to="/">
            {t("returnToHome")}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NotFoundPage;
