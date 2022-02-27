import NavLinkMenu from "./NavLinkMenu";
import { navlinks } from "common/constants/common.constant";

export default function NavLink() {
  return (
    <>
      {
        //
        navlinks.map((item) => (
          <NavLinkMenu key={item.cate} name={item.cate} lists={item.lists} />
        ))
      }
    </>
  );
}
