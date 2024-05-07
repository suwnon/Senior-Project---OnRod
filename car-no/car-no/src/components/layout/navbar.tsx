import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/authOption";
import { Link } from "@tanstack/react-router";
import { useMemo } from "react";
const data = [
  {
    name: "Buyer",
    href: "/buyer",
    role: "Buyer",
  },
  {
    name: "Appointment",
    href: "/buyer/appove",
    role: "Buyer",
  },
  {
    role: "Seller",
    name: "Seller",
    href: "/seller",
  },
  {
    role: "Expert",
    name: "Cars",
    href: "/expert",
  },
  {
    role: "Expert",
    name: "Expert",
    href: "/expert/appove",
  },
  {
    name: "Login",
    href: "/sigin",
  },
  {
    name: "Register",
    href: "/signup",
  },
  {
    name: "Logout",
    href: "/",
  },
];
// type user = {
//   Id: number;
//   username: string;
//   email: string;
//   phone: string;
//   role: string | null;
//   token: string;
// };

const NavbarComponent = ({ children }: { children: React.ReactNode }) => {
  const { user, isAuthenticated, logout } = useAuth();
  const handleData = useMemo(() => {
    if (!isAuthenticated) {
      return data.filter((x) => ["Login", "Register"].includes(x.name));
    }
    const userSpecificData = data.filter(
      (x) => x.role?.toLowerCase() === user.role
    );
    const logoutData = data.find((x) => x.name === "Logout");
    console.log(userSpecificData);
    return [
      ...(userSpecificData ? [...userSpecificData] : []),
      ...(logoutData ? [logoutData] : []),
    ];
  }, [isAuthenticated, user]);

  return (
    <div className="min-h-screen h-full">
      <div className="flex flex-col ">
        <div className="  bg-transparent  p-5 w-full z-10">
          <div className="flex flex-row justify-between">
            <Link to={"/"}>
              <div className=" relative flex flex-row space-x-2 items-center">
                <img src="/img/logo.svg" />
                <p className="font-extrabold text-[#1B1C57]">OnRod</p>
              </div>
            </Link>
            <div className="w-1/2 space-x-2 flex flex-row">
              {handleData.map((_, index) => (
                <Link to={_.href} key={index}>
                  <Button
                    variant="secondary"
                    className="w-full bg-[#D1FAE5] text-[#047857]"
                    key={index}
                    onClick={() =>
                      isAuthenticated && _.name === "Logout" && logout()
                    }
                  >
                    {_.name}
                  </Button>
                </Link>
              ))}
            </div>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
};
export default NavbarComponent;
