import { Menubar, MenubarMenu, MenubarTrigger } from "./ui/menubar";
import Logo from "../images/Logo.png";
import { AlignRight, Search } from "lucide-react";
import { useNavigate } from "react-router";
export default function Menu() {
  const navigate = useNavigate();
  return (
    <div>
      <div className="flex justify-between mt-5 ml-2 mr-2">
        <img src={Logo}></img>
        <Menubar className="mt-1 hidden md:flex -ml-15 border-3 rounded-md border-border bg-foreground w-fill h-[35px] gap-1">
          <MenubarMenu>
            <MenubarTrigger
              onClick={(e) => {
                navigate("/principal");
              }}
              className="text-sm text-ring font-semibold"
            >
              Home
            </MenubarTrigger>
            <MenubarTrigger
              onClick={(e) => {
                navigate("/");
              }}
              className="text-sm text-ring font-semibold"
            >
              Login
            </MenubarTrigger>
          </MenubarMenu>
        </Menubar>
        <div className="md:hidden w-[40px] h-[35px]  border-3 rounded-md border-border flex justify-center bg-card ">
          <AlignRight color="#a29a9a" className="mt-0.75" />
        </div>
        <div className="hidden md:flex mt-1 ">
          <Search
            onClick={(e) => {
              navigate("/busca");
            }}
            color="#fafafa"
            className="cursor-pointer "
          />
        </div>
      </div>
    </div>
  );
}
