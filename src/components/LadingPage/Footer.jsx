import React from "react";
import { layout } from "../../Layout/Layout";
import { Link, useLocation } from "react-router-dom";

const Footer = () => {

  const location = useLocation();
  const isCryptoRoute = location.pathname === "/Crypto";
  const isCryptoRouteID = location.pathname === "/Crypto/:id";

  const footerLinks = [
    {
      title: "Suporte",
      links: [
        "Contato & Suporte",
        "Central de ajuda",
        "Termos & Serviços",
        "FAQ",
      ],
    },
    {
      title: "Empresa",
      links: ["Sobre", "Carreiras", "Privacidade & Segurança"],
    },
    {
      title: "Desenvolvedores",
      links: ["Cloud", "API Cripto", "Wallet"],
    },
  ];

  return (
    <section
      className={`${layout.flexCenter} ${layout.paddingY}
     ${!isCryptoRoute || isCryptoRouteID ? "border-t" : ""} flex-col`}
    >
      <div className={`${layout.flexStart} md:flex-row flex-col mb-8 w-full`}>
        <div className="flex-1 flex flex-col justify-start mt-4">
          <Link to="/">
            <h1 className="text-[42px] font-semibold md:pl-0">
              Dev<span className="text-primary">Coin</span>
            </h1>
          </Link>
        </div>
        <div className="flex-[1.5] w-full flex flex-row justify-between flex-wrap md:mt-0 mt-10">
          {footerLinks.map((footerLink, index) => (
            <div
              key={index}
              className="flex flex-col ss:my-0 my-4 min-w-[150px]"
            >
              <h4 className="font-semibold text-[18px] leading-[27px]">
                {footerLink.title}
              </h4>
              <ul className="list-none mt-4">
                {footerLink.links.map((link, index) => (
                  <li
                    key={index}
                    className={`text-[16px] leading-[24px] cursor-pointer hover:underline ${
                      index !== footerLink.links.length - 1 ? "mb-3" : "mb-0"
                    }`}
                  >
                    {link}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Footer;
