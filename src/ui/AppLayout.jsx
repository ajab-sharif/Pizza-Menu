/* eslint-disable no-unused-vars */
import Header from "./Header";
import CartOverview from "./../features/cart/CartOverview";
import { Outlet, useNavigation } from "react-router-dom";
import Loader from "./Loader";

function AppLayout() {
  console.log("fast");
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";
  return (
    <div className="layout">
      {isLoading && <Loader />}
      <Header />
      <main>
        <h1>content</h1>
        <Outlet />
      </main>
      <CartOverview />
    </div>
  );
}

export default AppLayout;