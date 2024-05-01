import { Button } from "@/components/ui/button";
import ListExpertComponent from "../widget/listexpert";
import CardExpertComponent from "../widget/cardexpert";
const ChoseExpertComponents = () => {
  return (
    <>
      <div className=" container mx-auto">
        <div className="flex flex-col space-y-[16px] justify-center items-center">
          <span className="flex flex-col space-y-2 text-center text-[#1B1C57] text-[32px] font-bold">
            <p>Find out more about </p>
            <p>Expertise to check the cars</p>
          </span>
          <span className="w-fit justify-center flex">
            <Button className=" rounded-full bg-[#10B981]">More Article</Button>
          </span>
          <span className="w-full flex flex-row space-x-[16px]">
            <div className="w-1/2 ">
              {Array(4)
                .fill(0)
                .map((_, index) => (
                  <ListExpertComponent key={index} />
                ))}
            </div>
            <div className="w-1/2  flex items-center">
              <CardExpertComponent />
            </div>
          </span>
        </div>
      </div>
    </>
  );
};
export default ChoseExpertComponents;
