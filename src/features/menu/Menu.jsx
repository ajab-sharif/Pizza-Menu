/* eslint-disable no-unused-vars */
const BASE_URL = "https://react-fast-pizza-api.onrender.com/api";
import { useLoaderData } from "react-router-dom";
import { getMenu } from "./../../services/apiRestaurant";
import MenuItem from "./MenuItem";

function Menu() {
  const menu = useLoaderData();

  return (
    <ul>
      {menu.map((pizza) => (
        <MenuItem pizza={pizza} key={pizza.id} />
      ))}
    </ul>
  );
}

export async function loader() {
  const menu = await getMenu();
  return menu;
}

export default Menu;
