import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Link,
  Image,
} from "@nextui-org/react";
import { useNavigate } from "react-router";

export default function CardCustom({
  title,
  description,
  navigateTo,
  linkText,
}) {
  const navigation = useNavigate();
  return (
    <Card className="max-w-[400px] bg-primary text-white">
      <CardHeader className="flex gap-3">
        <div className="flex flex-col items-center justify-center mx-auto">
          <p className="text-md font-bold text-lg uppercase tracking-[1px]">
            {title}
          </p>
        </div>
      </CardHeader>
      <CardBody>
        <p className="text-gray-100 text-center">{description}</p>
      </CardBody>
      <CardFooter>
        <div className="items-center justify-center mx-auto bg-secondary py-2 px-4 rounded-md">
          <button onClick={() => navigation(`${navigateTo}`)}>
            {linkText}
          </button>
        </div>
      </CardFooter>
    </Card>
  );
}
