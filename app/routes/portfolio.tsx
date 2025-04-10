import type { Route } from "./+types/home";
import Menu from "../menu/menu";
import Gallery from "../gallery/gallery";
import Contact from "../contact/contact";

import { useOutletContext } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Katie Kisiel" },
    { name: "description", content: "Portfolio site for Katie Kisiel" },
  ];
}

export default function Portfolio() {
    const metadata = useOutletContext();

    return <div>
        <Menu />
        <Gallery metadata={metadata} />
        <Contact />
    </div>;
}
