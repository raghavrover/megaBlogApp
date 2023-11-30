// 1. Choose between Flex and Grid.
// 2. Pick between Whole array rendering and separate array rendering
import { Link } from "react-router-dom";
import Logo from "./Logo";

const footerDataArray = [
  {
    id: "FDA_1",
    name: "Company",
    data: [
      {
        id: "CA_1",
        name: "Features",
      },
      {
        id: "CA_2",
        name: "Pricing",
      },
      {
        id: "CA_3",
        name: "Affiliate Program",
      },
      {
        id: "CA_4",
        name: "Press Kit",
      },
    ],
  },
  {
    id: "FDA_2",
    name: "Support",
    data: [
      {
        id: "SA_1",
        name: "Features",
      },
      {
        id: "SA_2",
        name: "Pricing",
      },
      {
        id: "SA_3",
        name: "",
      },
      {
        id: "SA_4",
        name: "Press Kit",
      },
    ],
  },
  {
    id: "FDA_3",
    name: "Legal",
    data: [
      {
        id: "LA_1",
        name: "Features",
      },
      {
        id: "LA_2",
        name: "Pricing",
      },
      {
        id: "LA_3",
        name: "",
      },
      {
        id: "LA_4",
        name: "Press Kit",
      },
    ],
  },
];

const companyArray = [
  {
    id: "CA_1",
    name: "Features",
  },
  {
    id: "CA_2",
    name: "Pricing",
  },
  {
    id: "CA_3",
    name: "Affiliate Program",
  },
  {
    id: "CA_4",
    name: "Press Kit",
  },
];

const supportArray = [
  {
    id: "SA_1",
    name: "Features",
  },
  {
    id: "SA_2",
    name: "Pricing",
  },
  {
    id: "SA_3",
    name: "",
  },
  {
    id: "SA_4",
    name: "Press Kit",
  },
];

const legalArray = [
  {
    id: "LA_1",
    name: "Features",
  },
  {
    id: "LA_2",
    name: "Pricing",
  },
  {
    id: "LA_3",
    name: "",
  },
  {
    id: "LA_4",
    name: "Press Kit",
  },
];

const FooterDataItem = ({ name }) => (
  <>
    <li className="mb-1">
      <Link
        className=" text-xs font-medium text-slate-700 hover:text-slate-900"
        to="/"
      >
        {name}
      </Link>
    </li>
  </>
);

const FooterBlock = ({ blockData }) => (
  <li>
    <div className="w-full items-center">
      <div className="h-full">
        <h3 className="tracking-px mb-9 text-xs font-semibold uppercase text-gray-400">
          {blockData?.name}
        </h3>
        <ul>
          {blockData.data.map((object, i) => (
            <FooterDataItem key={i} name={object.name} />
          ))}
        </ul>
      </div>
    </div>
  </li>
);

function Footer() {
  return (
    <footer className="w-full pt-4 bg-gray-500">
      <div className="w-[90%] max-w-[1440px] mx-auto grid grid-cols-1 min-[450px]:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
        <div className=" pl-4 mb-6 flex flex-col items-start">
          <Logo />
          <p className="text-sm">Mega Blog</p>
        </div>
        {/* <ul className=""> // To create each footer data block
          {footerDataArray.map((object) => (
            <FooterBlock key={object.id} blockData={object} />
          ))}
        </ul> */}

        <div className="w-full">
          <div className="h-full pl-4 mb-6">
            <h3 className="tracking-px mb-2 text-xs font-semibold uppercase text-gray-400">
              Company
            </h3>
            <ul>
              {companyArray.map((object, i) => (
                <FooterDataItem key={i} name={object.name} />
              ))}
            </ul>
          </div>
        </div>

        <div className="w-full">
          <div className="h-full pl-4 mb-6">
            <h3 className="tracking-px mb-2 text-xs font-semibold uppercase text-gray-400">
              Support
            </h3>
            <ul>
              {supportArray.map((object, i) => (
                <FooterDataItem key={i} name={object.name} />
              ))}
            </ul>
          </div>
        </div>

        <div className="w-full">
          <div className="h-full pl-4 mb-6">
            <h3 className="tracking-px mb-2 text-xs font-semibold uppercase text-gray-400">
              Legal
            </h3>
            <ul>
              {legalArray.map((object, i) => (
                <FooterDataItem key={i} name={object.name} />
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="text-center pt-4 pb-2">
        <span className=" text-xs">
          &copy; Copyright 2023. All Rights Reserved by DevUI.
        </span>
      </div>
    </footer>
  );
}

export default Footer;
