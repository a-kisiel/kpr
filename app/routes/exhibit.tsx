import type { Route } from "./+types/home";
import Menu from "../menu/menu";
import Exhibit from "../exhibit/exhibit";
import Contact from "../contact/contact";

import { useOutletContext, useParams } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Katie Kisiel" },
    { name: "description", content: "Portfolio site for Katie Kisiel" },
  ];
}

export default function() {
    const metadata = useOutletContext();
    const params = useParams();

    return <div>
        <Menu />
        <Exhibit hash={params.hash} metadata={metadata}/>
        <Contact />
    </div>;
}
