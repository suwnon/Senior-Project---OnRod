import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

const CardFeedback = ({
  image,
  data,
}: {
  image: string;
  data: {
    car_id: string;
    user_id: string;
    comment: string;
    rating: string;
  };
}) => {
  return (
    <>
      <div className="max-w-[612px] w-full h-[505px]  bg-transparent relative z-10">
        <div className="ml-[5%] bg-white h-[400px] rounded-xl">
          <img
            src={`http://localhost:3000/image/${image}`}
            className="w-full h-full object-cover rounded-xl"
          />
        </div>
        <div className="bg-white border absolute w-[95%] h-[240px] bottom-5  rounded-xl p-[32px] flex flex-col space-y-[16px]">
          {/* <p className="font-bold text-[20px] text-[#1B1C57]">
            Best! I got the used car I wanted through OnRod
          </p> */}
          <p className="text-[#626687] line-clamp-4">{data.comment}</p>
          <div className="flex flex-row justify-center items-center">
            <span className="w-[80%]">
              <div className="space-x-2 flex items-center">
                <Avatar className="  w-[40px] h-[40px]   top-6 border-4  rounded-full">
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    className=" rounded-full"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <span className="text-[#0E1735] text-[18px] font-bold">
                  Dianne Russell
                </span>
              </div>
            </span>
            <div className="w-fit font-bold ">{data.rating}</div>
          </div>
        </div>
      </div>
    </>
  );
};
export default CardFeedback;
