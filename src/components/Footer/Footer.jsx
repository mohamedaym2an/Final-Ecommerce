import FooterCopyrights from "./FooterCopyrights";
import FooterDownload from "./FooterDownload";
import FooterEmail from "./FooterEmail";

const Footer = () => {
  return (
    <footer className="bg-footerColor pt-10 pb-4">
      <div className="container">
        <FooterEmail />
        <hr className="my-5" />
        <FooterDownload />
        <hr className="my-5" />
        <FooterCopyrights />
      </div>
    </footer>
  );
};

export default Footer;
