import { CheckCircleOutlined, GifOutlined, GiftOutlined, PhoneOutlined, TrophyOutlined } from "@ant-design/icons";

export default function Banner({ backColor }) {
  return (
    <div
      className="flex flex-wrap justify-between items-center mt-10 p-5 md:p-10 h-auto md:h-[30vh]"
      style={{ background: backColor }}
    >
      <div className="flex justify-center items-center mx-2 mb-5 md:mb-0 w-full md:w-auto">
        <div>
          <TrophyOutlined className="text-4xl md:text-6xl mr-3" />
        </div>
        <div>
          <h1 className="text-xl md:text-2xl font-bold">High Quality</h1>
          <p className="text-sm md:text-base">crafted from top materials</p>
        </div>
      </div>

      <div className="flex justify-center items-center mx-2 mb-5 md:mb-0 w-full md:w-auto">
        <div>
          <CheckCircleOutlined className="text-4xl md:text-6xl mr-3" />
        </div>
        <div>
          <h1 className="text-xl md:text-2xl font-bold">Warranty Protection</h1>
          <p className="text-sm md:text-base">Over 2 years</p>
        </div>
      </div>

      <div className="flex justify-center items-center mx-2 mb-5 md:mb-0 w-full md:w-auto">
        <div>
          <GiftOutlined className="text-4xl md:text-6xl mr-3" />
        </div>
        <div>
          <h1 className="text-xl md:text-2xl font-bold">Free Shipping</h1>
          <p className="text-sm md:text-base">Orders over $150</p>
        </div>
      </div>

      <div className="flex justify-center items-center mx-2 w-full md:w-auto">
        <div>
          <PhoneOutlined className="text-4xl md:text-6xl mr-3" />
        </div>
        <div>
          <h1 className="text-xl md:text-2xl font-bold">24/7 Support</h1>
          <p className="text-sm md:text-base">Dedicated support</p>
        </div>
      </div>
    </div>
  );
}
