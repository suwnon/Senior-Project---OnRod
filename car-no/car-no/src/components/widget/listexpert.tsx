import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";

const ListExpertComponent = () => {
  return (
    <>
      <div className="flex flex-row space-x-[32px]">
        <div className=" rounded-xl h-[144px] w-[200px] relative">
            <img src='/img/0aabde6523f2c8832cf1a6999c9598f4.jpg' />
        </div>
        <div className="flex flex-col space-y-2  justify-center px-3">
          <div className="space-x-2 flex items-center ">
            <Avatar className="  w-[32px] h-[32px]   top-6 border-4  rounded-full">
              <AvatarImage
                src="https://github.com/shadcn.png"
                className=" rounded-full"
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <span className="text-[#0E1735] text-xs font-bold">
              Dianne Russell
            </span>
          </div>
            <span className="text-[18px] text-[#1B1C57]">The things we need to check when we want to buy used car</span>
            <span className="text-[#888B97] text-[14px]">4 min read | 25 Apr 2021</span>
        </div>
      </div>
    </>
  );
};
export default ListExpertComponent;
