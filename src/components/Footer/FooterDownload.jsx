import { FaCcVisa } from "react-icons/fa";
import { FaCcMastercard } from "react-icons/fa";
import { FaCcPaypal } from "react-icons/fa";
import { FaAmazonPay } from "react-icons/fa6";
import imgDownload1 from "../../assets/download1.jpg";
import imgDownload2 from "../../assets/download2.jpg";

const FooterDownload = () => {
  return (
    <div className="flex items-center justify-between flex-wrap gap-4">
      <div className="flex items-center gap-2">
        <span className=" capitalize">payment parteners</span>
        <ul className="flex items-center gap-2 translate-y-0.5">
          <li>
            <FaCcVisa className="text-2xl text-[#1a1f71]" />
          </li>
          <li>
            <FaCcMastercard className="text-2xl text-[#cc0000]" />
          </li>
          <li>
            <FaCcPaypal className="text-2xl text-[#003087]" />
          </li>
          <li>
            <FaAmazonPay className="text-2xl text-[#ff9900]" />
          </li>
        </ul>
      </div>

      <div className="flex items-center gap-2">
        <span className=" capitalize">get deliveries with freshCart</span>
        <div className="flex items-center gap-2 translate-y-0.5">
          <img src={imgDownload1} alt="google play" className="w-28" />
          <img src={imgDownload2} alt="app store" className="w-28" />
        </div>
      </div>
    </div>
  );
};

export default FooterDownload;
