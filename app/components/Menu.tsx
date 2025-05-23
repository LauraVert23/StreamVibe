import { Menubar, MenubarMenu, MenubarTrigger } from "./ui/menubar";
import Logo from "../images/Logo.png";
import { AlignRight, Search } from "lucide-react";
import { useNavigate } from "react-router";
export default function Menu() {
  const navigate = useNavigate();
  return (
    <div className="lg:ml-5 xl:ml-8 2xl:ml-10  lg:w-[94%]">
      <div className="flex justify-between mt-2 ml-2 mr-2">
        <img
          className="lg:w-[150px] xl:w-[200px] xl:h-[60px] xl:mt-3"
          src={Logo}
        ></img>
        <Menubar className="mt-1 hidden md:flex -ml-15  lg:-ml-22 lg:mt-2 xl:-ml-35 xl:mt-5 border-4 rounded-md border-border bg-foreground w-fill h-[35px] lg:h-[40px] xl:h-[45px] 2xl:h-[50px] gap-1">
          <MenubarMenu>
            <MenubarTrigger
              onClick={(e) => {
                navigate("/principal");
              }}
              className="text-sm lg:text-base xl:text-lg 2xl:text-xl text-ring font-semibold bg-card cursor-pointer hover:bg-border"
            >
              Home
            </MenubarTrigger>
            <MenubarTrigger
              onClick={(e) => {
                navigate("/");
              }}
              className="text-sm lg:text-base xl:text-lg 2xl:text-xl text-ring font-semibold cursor-pointer hover:bg-border "
            >
              Login
            </MenubarTrigger>
          </MenubarMenu>
        </Menubar>
        <div className="md:hidden w-[40px] h-[35px]  border-3 rounded-md border-border flex justify-center bg-card ">
          <AlignRight color="#a29a9a" className="mt-0.75" />
        </div>
        <div className="hidden hover:scale-110 cursor-pointer md:flex justify-center mt-1 xl:mt-6 bg-card w-[35px] lg:w-[40px] xl:w-[45px] lg:h-[45px] lg:border-3 border-border items-center border-2 rounded-md">
          <Search
            onClick={(e) => {
              navigate("/busca");
            }}
            color="#737373"
            size={20}
            className="cursor-pointer "
          />
        </div>
      </div>
    </div>
  );
}
