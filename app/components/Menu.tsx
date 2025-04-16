import Logo from "../images/Logo.png";
import { AlignRight } from "lucide-react";
export default function Menu() {
  return (
    <ul>
      <div className="flex justify-between mt-5 ml-2 mr-2">
        <img src={Logo}></img>
        <div className="w-[40px] h-[35px]  border-3 rounded-md border-border flex justify-center bg-card ">
          <AlignRight color="#a29a9a" className="mt-0.75" />
        </div>
      </div>
    </ul>
  );
}
