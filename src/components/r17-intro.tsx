import Link from "next/link";
import { Fragment } from "react";

type IntroPart = Readonly<{ text: string; href?: string }>;
export type IntroBlock = Readonly<{ heading: string; parts: readonly IntroPart[] }>;

export function IntroH3({ heading, parts }: IntroBlock) {
  return (
    <div className="intro-subsection">
      <h3>{heading}</h3>
      <p>
        {parts.map((part, index) =>
          part.href ? (
            <Link href={part.href} key={index}>
              {part.text}
            </Link>
          ) : (
            <Fragment key={index}>{part.text}</Fragment>
          ),
        )}
      </p>
    </div>
  );
}

export const HUB_INTRO: IntroBlock | null = null;

export const HUB_INTRO_BRAND: IntroBlock | null = { heading: "What do Oklahoma menus call the Presidential weed brand?", parts: [{ text: "Menus may list it as Presidential, Presidential THC, Presidential cannabis or Presidential marijuana; they all mean the same product family. " }, { text: "The official Presidential cannabis site for Oklahoma", href: "/" }, { text: " explains each format and series. Its signature is an infused construction: flower carried through with concentrate and finished with kief or diamonds, across " }, { text: "Oklahoma Moon Rocks", href: "/moon-rocks" }, { text: ", tobacco-free blunts, infused pre-rolls and minis. The package names the product and its series: Silver Flavor, Gold Strain or Rose Gold Connoisseur. Bring that exact name to the dispensary and confirm with the store before you go. Start with " }, { text: "find Presidential in Oklahoma", href: "/find" }, { text: " or " }, { text: "the Oklahoma retailer page", href: "/retailers" }, { text: "." }] };

export const REGION_INTROS: Readonly<Record<string, IntroBlock | undefined>> = {
  "green-country": { heading: "What to ask for at a participating dispensary", parts: [{ text: "Name the brand, the format, the series, and the product, for example: Presidential, Moon Rocks, Silver, Blue Raspberry. Moon Rocks, blunts, pre-rolls, and minis are different formats, and Silver, Gold, and Rose Gold are different series. Each dispensary chooses its own assortment, so the official locator and the store confirm what is currently on hand. Keep reading with " }, { text: "Presidential Moon Rocks in Oklahoma", href: "/moon-rocks" }, { text: ", " }, { text: "Presidential retailer guide", href: "/retailers" }, { text: ", or " }, { text: "all Oklahoma dispensary regions", href: "/dispensaries" }, { text: "." }] },
  "great-plains-country": { heading: "Which Presidential formats to look for", parts: [{ text: "Four formats carry the Presidential construction: Moon Rocks, tobacco-free blunts in a hemp wrap, infused pre-rolls in paper, and minis that bring the rolled formats into a smaller package. Each is built on the same idea: flower carried through with concentrate and finished with kief or diamonds. Assortments vary by dispensary, so check the official locator before you go. Keep reading with " }, { text: "tobacco-free blunt formats", href: "/blunts" }, { text: ", " }, { text: "Presidential infused pre-rolls", href: "/pre-rolls" }, { text: ", or " }, { text: "find a participating dispensary", href: "/find" }, { text: "." }] },
  "frontier-country": { heading: "What to ask for at a participating dispensary", parts: [{ text: "Name the brand, the format, the series, and the product, for example: Presidential, Moon Rocks, Silver, Blue Raspberry. Formats are Moon Rocks, tobacco-free blunts, infused pre-rolls, and minis. Each dispensary chooses its own assortment, so confirm the exact item with the store. Keep reading with " }, { text: "Presidential Moon Rocks in Oklahoma", href: "/moon-rocks" }, { text: ", " }, { text: "Presidential retailer guide", href: "/retailers" }, { text: ", or " }, { text: "all Oklahoma dispensary regions", href: "/dispensaries" }, { text: "." }] },
};
