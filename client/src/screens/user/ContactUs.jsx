import React from "react";
import { useNavigate } from "react-router-dom";
import Container from "../../components/Container";
import Card from "../../components/common/Card";
import CustomButton from "../../components/common/CustomButton";

const ContactUs = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <div className="font-poppins flex flex-col min-h-screen">
        <header className="mb-6 text-center font-bold text-4xl text-gray-600 pt-[50px]">
          CONTACT US
        </header>

        <div className="w-4/5 mt-5 mx-auto flex flex-col md:flex-row gap-12">
          <Card>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center pl-6">
              <div className="flex flex-col space-y-4 text-left">
                <header className="text-3xl font-semibold text-[#465986]">
                  Need help with your booking?
                </header>
                <h2 className="text-base font-medium text-[#3E3E52] pb-4">
                  Get in touch and let us know how we can help
                </h2>
                <CustomButton
                  title={"Get in touch"}
                  type={"button"}
                  onClick={() => navigate("/")}
                  className={"w-1/2 md:w-1/3 pb-8"}
                />
              </div>
              <div className="flex justify-end items-center">
                <img
                  src="https://s3.rdbuz.com/images/webplatform/malaysia/contactUS_banner.png"
                  alt="Contact Us Banner"
                  className="max-w-sm h-auto"
                />
              </div>
            </div>
          </Card>
        </div>

        <div className="w-4/5 mt-10 mx-auto pt-4 pb-8">
          <div className="grid grid-cols-3 items-center">
            <div className="flex flex-col items-center text-center pl-[150px]">
              <a
                href="https://www.google.com/maps/dir/?api=1&destination=Asia+Pacific+University+of+Technology+%26+Innovation+%28APU%29,+Jalan+Teknologi,+Bukit+Jalil,+57000+Kuala+Lumpur,+Malaysia"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="https://s3.rdbuz.com/images/webplatform/malaysia/contactUS_malaysia.jpg"
                  alt="Map 1"
                  className="max-w-sm h-auto"
                />
              </a>
              <div className="mt-2 text-xl font-semibold text-gray-700 mb-2">
                Malaysia Office
              </div>
              <div className="text-sm text-gray-500 mt-1">
                Jalan Teknologi 5, Taman Teknologi Malaysia, 57000 Kuala Lumpur,
                Wilayah Persekutuan Kuala Lumpur
              </div>
            </div>

            <div className="h-60 bg-gray-300 w-px mx-auto"></div>

            <div className="flex flex-col items-center text-center pr-[150px]">
              <a
                href="https://www.google.com/maps/dir/?api=1&destination=Asia+Pacific+University+of+Technology+%26+Innovation+%28APU%29,+Jalan+Teknologi,+Bukit+Jalil,+57000+Kuala+Lumpur,+Malaysia"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="https://s3.rdbuz.com/images/webplatform/malaysia/contactUS_malaysia.jpg"
                  alt="Map 2"
                  className="max-w-sm h-auto"
                />
              </a>
              <div className="mt-2 text-xl font-semibold text-gray-700 mb-2">
                Corporate Office
              </div>
              <div className="text-sm text-gray-500 mt-1">
                Jalan Teknologi 5, Taman Teknologi Malaysia, 57000 Kuala Lumpur,
                Wilayah Persekutuan Kuala Lumpur
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ContactUs;
