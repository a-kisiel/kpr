import type { Route } from "./+types/home";
import Menu from "../menu/menu";
import Greeting from "../greeting/greeting";
import Atlas from "../atlas/atlas";
import Contact from "../contact/contact";

import { useOutletContext } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Katie Kisiel" },
    { name: "description", content: "Portfolio site for Katie Kisiel" },
  ];
}

export default function Home() {

  const metadata = useOutletContext();

  return <div id="home">
    <Menu />
    <Greeting metadata={metadata} />
    <Atlas />
    <Contact />
  </div>;
}
