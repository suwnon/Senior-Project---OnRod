import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

const CardExpertComponent = () => {
  return (
    <>
      <div className="flex flex-col space-y-[16px]">
        <div className="w-full h-[382px] rounded-xl bg-transparent">
          <img
            src="/img/f1982b38cdecc0c75eee7574e4c0feec.png"
            className="w-full h-full rounded-xl object-cover"
          />
        </div>
        <div className="flex flex-col space-y-2">
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
          <p className="text-[#1B1C57] text-[24px] font-semibold">
            12 Things to know before buying a used car
          </p>
          <p className="text-[#626687] text-[14px] ">
            Want to buy a used cars but are unsure about what we should know,
            here I will try to explain what we should know and check when we
            want to buy used cars.
          </p>
          <p className="text-[#888B97] text-[12px]">8 min read | 25 Apr 2021</p>
        </div>
      </div>
    </>
  );
};
export default CardExpertComponent;
