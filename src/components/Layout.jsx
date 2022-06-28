import Footer from "./Footer";
import Header from "./Header";
import styles from "./Layout.module.css";

const Layout = (props) => {
  const { children } = props;
  return (
    <div className={styles.layout}>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
