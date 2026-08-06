import type { PageContent, PageLink } from "./types";

const MAIN = "https://presidentialmoonrocks.com";
const OMMA = "https://oklahoma.gov/omma.html";
const OMMA_RULES = "https://oklahoma.gov/omma/rules-and-legislation.html";
const PATIENTS = "https://oklahoma.gov/omma/patients-caregivers/patient-licenses.html";
const RIGHTS = "https://oklahoma.gov/omma/patients-caregivers/patient-rights-and-responsibilities.html";
const OMMA_DATA = "https://oklahoma.gov/omma/about/licensing-and-tax-data.html";
const OMMA_FAQ = "https://oklahoma.gov/omma/help/faqs.html";
const HB2095 = "https://www.oklegislature.gov/BillInfo.aspx?Bill=HB2095&Session=2300";
const HB3143 = "https://www.oklegislature.gov/BillInfo.aspx?Bill=hb3143&Session=2600";
const ELECTION_2018 = "https://oklahoma.gov/elections/elections-results/election-results/2018-election-results/2018-june-primary-election.html";
const ELECTION_2023 = "https://oklahoma.gov/elections/elections-results/election-results/2023-election-results/march-special-elections-and-propositions.html";
const OMMA_HISTORY = "https://oklahoma.gov/omma/about/news/2021/the-oklahoma-medical-marijuana-authority-names-new-executive-dir.html";
const DISPENSARY = "https://oklahoma.gov/omma/businesses/commercial-licenses/dispensary-license.html";

const upLink: PageLink = {
  href: "/",
  label: "Presidential THC Oklahoma",
  description: "Return to the official Presidential product guide for Oklahoma.",
};

const formatLinks: PageLink[] = [
  { href: "/moon-rocks", label: "Moon Rocks", description: "The flagship three-layer Presidential format." },
  { href: "/blunts", label: "Blunts", description: "Full-size and mini tobacco-free hemp-wrap formats." },
  { href: "/pre-rolls", label: "Pre-Rolls", description: "Infused rolls and multipacks across the catalog." },
  { href: "/minis", label: "Minis", description: "Compact blunt and pre-roll options." },
];

const seriesLinks: PageLink[] = [
  { href: "/silver", label: "Silver Flavor Series", description: "Seven vibrant, fruit-forward product identities." },
  { href: "/gold", label: "Gold Strain Series", description: "Nineteen cannabis-first product identities." },
  { href: "/rose-gold", label: "Rose Gold Connoisseur Series", description: "Five refined, solventless craft identities." },
];

const silverRoster: PageLink[] = [
  ["Blue Raspberry", "blue-raspberry"], ["Grape", "grape"], ["Peach Mango", "peach-mango"],
  ["Pineapple", "pineapple"], ["Strawberry", "strawberry"], ["Tropical", "tropical"], ["Watermelon", "watermelon"],
].map(([label, slug]) => ({ label, href: `${MAIN}/moon-rocks/${slug}` }));

const goldRoster: PageLink[] = [
  ["24K", "24k"], ["Blue Dream", "blue-dream"], ["Cap Junky", "cap-junky"],
  ["Cherry Gelato", "cherry-gelato"], ["Crescendo", "crescendo"], ["Galactic Gas", "galactic-gas"],
  ["Gorilla Goo", "gorilla-goo"], ["King Louis", "king-louis"], ["NYC Diesel", "nyc-diesel"],
  ["Orange Push Pop", "orange-push-pop"], ["Papaya Punch", "papaya-punch"], ["Pink Cookies", "pink-cookies"],
  ["Presidential OG", "presidential-og"], ["Rainbow Belts", "rainbow-belts"], ["SFV OG", "sfv-og"],
  ["Skywalker", "skywalker"], ["Waui", "waui"], ["XJ-13", "xj-13"], ["XXX", "xxx"],
].map(([label, slug]) => ({ label, href: `${MAIN}/moon-rocks/${slug}` }));

const roseGoldRoster: PageLink[] = [
  ["Cereal Milk", "cereal-milk"], ["Cosmic Cookies", "cosmic-cookies"], ["God’s Gift", "gods-gift"],
  ["Wedding Cake", "wedding-cake"], ["White Walker", "white-walker"],
].map(([label, slug]) => ({ label, href: `${MAIN}/moon-rocks/${slug}` }));

const homePage: PageContent = {
  path: "/",
  kind: "pillar",
  h1: "Presidential THC Oklahoma",
  title: "Presidential THC Oklahoma | Official Presidential Products in Oklahoma",
  description: "The official Presidential product guide for Moon Rocks, blunts, infused pre-rolls, minis, and licensed Oklahoma retail.",
  intro: [
    "Presidential THC Oklahoma is the official state home for Presidential products. It brings the packages, formats, series, and Oklahoma retail path into one product-first guide, then connects every featured item to its canonical record on the main Presidential site. The purpose is simple: recognize what you want, understand where it sits in the collection, and find it through a licensed Oklahoma dispensary.",
    "This is a brand property, not a neutral publication and not a second storefront. Presidential sells wholesale through licensed retailers. Oklahoma patients buy from those retailers, while this site keeps the product family legible—from the flagship Moon Rocks construction to tobacco-free blunts, infused pre-rolls, compact minis, and six distinct catalog groupings.",
  ],
  sections: [
    {
      id: "presidential-in-oklahoma",
      heading: "Presidential in Oklahoma",
      imageCount: 1,
      paragraphs: [
        "Oklahoma has become one of Presidential’s most important markets. Close to two hundred licensed retail doors carry the brand across the state, making Oklahoma the second-largest Presidential market by door count. That scale matters because the state is not being treated as a small satellite campaign. It supports a dedicated official property, a broad product assortment, and a statewide path from package discovery to licensed retail.",
        "The footprint reaches major population centers and regional communities, but wholesale distribution means the assortment changes from door to door. One dispensary may build its Presidential shelf around Silver flavors and minis; another may carry a deeper Gold strain selection, larger blunts, or the core House Line. A broad network creates opportunity without turning any one store’s inventory into a universal promise.",
        "Presidential’s role is to make the catalog recognizable wherever it appears. The crest, black ground, vivid illustrated packaging, and series colors hold the family together. Oklahoma retailers decide what they carry, and patients can confirm current availability before visiting. That division keeps the product story ambitious while respecting how a licensed wholesale market actually works.",
        "A dedicated Oklahoma property also gives the state room to speak in its own voice. The landscape hero and Sooner line establish place, but the site does not turn regional pride into a second brand. Presidential remains the unmistakable subject, Oklahoma remains the licensed market, and the main site remains the destination behind every product image. That hierarchy keeps local relevance and national brand authority working together.",
        "It also gives patients and buyers a shorter path from statewide context to the exact package they recognize.",
      ],
    },
    {
      id: "what-presidential-thc-is",
      heading: "What Presidential THC is",
      imageCount: 1,
      paragraphs: [
        "Presidential began in Los Angeles in 2012 with a construction that is direct enough to describe in one line and distinctive enough to build a catalog around: flower carried through with cannabis concentrate, then finished in kief. Three visible layers give Moon Rocks their identity and establish the material language that carries into the infused formats around them.",
        "The point is construction, not an invented effects promise. Presidential does not need medical language or exaggerated potency claims to explain the product. Flower, concentrate, and kief create a tangible sequence. Packaging, format, and product name then organize that sequence for the shelf, whether the result appears as a flagship Moon Rock, a rolled pre-roll, a hemp-wrapped blunt, or a smaller mini.",
        [
          { text: "The " },
          { text: "official Presidential catalog", href: `${MAIN}/moon-rocks` },
          { text: " carries the canonical product records, individual names, and current collection structure. This Oklahoma property gives those products room to lead visually, and each package image acts as a direct route to the matching record instead of sending visitors through a generic landing page." },
        ],
        "That approach protects clarity. Product art shows the identity in frame; the surrounding copy explains the format and series; the linked official record provides the specific destination. No duplicate store, competing catalog, or unsupported promise is needed. The product remains the center of the experience from the first image onward.",
      ],
    },
    {
      id: "four-formats",
      heading: "The four formats",
      imageCount: 2,
      paragraphs: [
        "Moon Rocks are the flagship. They present the three-layer construction in its most recognizable form: flower as the foundation, cannabis concentrate carried across it, and kief completing the exterior. The format makes the method visible and gives the brand its name, its iconography, and the reference point for everything else in the collection.",
        "Blunts take Presidential material into a tobacco-free hemp wrap. The wrap gives the product a larger rolled profile and creates an exterior that distinguishes a blunt from a paper pre-roll. Full-size and mini options let the same product family occupy more than one physical scale without losing the identity of the format.",
        "Pre-rolls organize the infused material in paper, ready as singles or packs depending on the product. They preserve the core idea in a familiar rolled shape and give series artwork a tall package surface. The product page identifies the exact item; the package communicates Presidential, series, and format at a glance.",
        "Minis bring both blunt and pre-roll thinking into compact formats. They are not a seventh series or a separate material claim. They are a size and pack architecture spanning smaller hemp-wrapped blunts and smaller paper pre-rolls, with package systems designed to keep several pieces orderly and recognizable.",
        "Each format has its own page on this site because each deserves more than a label in a menu. The format pages explain construction, package cues, representative product names, and the route to licensed Oklahoma retail. Their images remain format-specific, so blunt art appears with blunts and mini packages appear with minis rather than serving as generic decoration.",
        "The four pages also make comparison practical without flattening the products. A visitor can move from flagship construction to wrap choice, from paper rolls to compact packs, and back to the complete product family through the homepage. That link structure mirrors how people actually browse: sometimes by name, sometimes by series, and sometimes by the physical format they already know they want.",
      ],
    },
    {
      id: "six-series",
      heading: "The six series",
      imageCount: 3,
      paragraphs: [
        "Silver is the Flavor Series: seven vivid, fruit-forward identities named Blue Raspberry, Grape, Peach Mango, Pineapple, Strawberry, Tropical, and Watermelon. Color and fruit language make the set immediate. Each name has its own official product record, and the Silver page presents the complete seven-product roster together.",
        "Gold is the Strain Series and the deepest grouping in the catalog, with nineteen official products. Its naming is cannabis-first, ranging from 24K and Blue Dream through Presidential OG, Rainbow Belts, Skywalker, Waui, XJ-13, and XXX. Illustrated identities keep that breadth expressive while gold series language binds it into one shelf family.",
        "Rose Gold is the five-product Connoisseur Series: Cereal Milk, Cosmic Cookies, God’s Gift, Wedding Cake, and White Walker. Its position is refined, intentional, and centered on solventless craftsmanship. The Oklahoma page names the full set without trying to explain which extract sits behind which series; that separate technical subject is not the purpose of this property.",
        "The Presidential Line gives ten individual product identities a home outside the three color groupings: Apricotti, Daniel Larusso, Garlic Cookies, Ghost Haze Train, Guava Haze, Head Cheese, Iced Lemon, Laura Charles, Nino Brown, and Whoa Si Whoa. The names and artwork lead while the Presidential crest keeps the line connected.",
        "The Presidential House Line states the core formats plainly through Moon Rocks, pre-rolls, and blunts. It is the brand-first anchor of the catalog: recognizable construction, direct format names, and the house visual system without needing a flavor or strain identity to do the work.",
        "Presidential x THC Design is the collaboration grouping across those key formats. Estate-grown flower cultivated by THC Design gives the partnership a clear source relationship, while the co-branded package makes collaboration visible at shelf level. Together, the six series create range without dissolving into a loose list: fruit-forward Silver, strain-led Gold, refined Rose Gold, character-rich Presidential Line, core House Line, and a focused THC Design collaboration.",
      ],
    },
    {
      id: "buying-in-oklahoma",
      heading: "Buying in Oklahoma",
      imageCount: 1,
      paragraphs: [
        "Oklahoma remains a medical cannabis state. A lawful retail purchase starts with the appropriate active OMMA patient or visitor license and takes place through an OMMA-licensed dispensary. An out-of-state medical card by itself is not accepted as the purchase credential inside an Oklahoma dispensary; eligible visitors use Oklahoma’s 30-day visitor license route.",
        "Patients should treat a product page and a retailer shelf as two connected but different sources. The official product record identifies the item. The dispensary controls current local inventory, ordering, and restocking. Calling ahead about a specific format or product can save a trip when an assortment changes between wholesale orders.",
        "The consolidated Cannabis in Oklahoma page covers the program, license timing and fees, visitor route, possession and cultivation allowances, commercial market, tracking, excise tax, and the state’s current medical status. Keeping that material on one page lets the rest of this site stay focused on products without scattering legal summaries across every format and series.",
      ],
    },
    {
      id: "find-it",
      heading: "Find it",
      imageCount: 1,
      paragraphs: [
        "Presidential is available through close to two hundred licensed Oklahoma retail doors, written as a statewide footprint rather than a frozen address list. Retail participation and store inventory can change, so this site does not copy the protected retailer table into static HTML or claim that every product is present at every location.",
        [
          { text: "Use the " },
          { text: "official Oklahoma store locator", href: `${MAIN}/find-us/ok` },
          { text: " to begin with the current participating network, then confirm the desired product with the licensed dispensary. The state path is the dependable route; there is no ZIP query to preserve, expose, or accidentally drop." },
        ],
      ],
    },
    {
      id: "for-dispensaries",
      heading: "For dispensaries",
      imageCount: 1,
      paragraphs: [
        "Oklahoma dispensary owners and buyers have their own page because a wholesale shelf decision is different from a patient search. The retailer proposition covers recognizable formats, six coordinated groupings, consistent raw goods, package presence, and brand support through activations, promotions, and samples—without publishing unverified pricing, margins, or commercial terms.",
        "In a moratorium market, existing shops compete hard for the same patients. A product family that reads clearly across a shelf can help a buyer build distinction without assembling an incoherent mix. The retailer page explains how Presidential can work as a block, a focused format set, or a selected series assortment inside licensed Oklahoma retail.",
      ],
    },
  ],
  childLinks: [
    ...formatLinks,
    ...seriesLinks,
    { href: "/find", label: "Finding Presidential", description: "Use the official Oklahoma locator without exposing retailer addresses." },
    { href: "/retailers", label: "For Oklahoma retailers", description: "The wholesale shelf proposition for dispensary owners and buyers." },
    { href: "/oklahoma", label: "Cannabis in Oklahoma", description: "The complete medical program and market picture on one page." },
    { href: "/about", label: "About Presidential", description: "The original brand, founded in Los Angeles in 2012." },
  ],
  sources: [
    { label: "Official Presidential product catalog", href: `${MAIN}/moon-rocks` },
    { label: "Official Presidential story", href: `${MAIN}/our-story` },
    { label: "Oklahoma Medical Marijuana Authority", href: OMMA },
  ],
};

const moonRocksPage: PageContent = {
  path: "/moon-rocks",
  kind: "article",
  h1: "Presidential Moon Rocks in Oklahoma",
  title: "Presidential Moon Rocks in Oklahoma | Official Product Guide",
  description: "Explore the flagship three-layer Presidential Moon Rocks format, official product identities, packaging, and licensed Oklahoma availability.",
  intro: [
    "Presidential Moon Rocks are the flagship format: flower carried through with cannabis concentrate and finished in kief. That three-layer sequence established the brand’s product language and remains the clearest way to understand why a Presidential package looks and reads differently from a standard flower product.",
    "For Oklahoma, the format arrives inside a much larger official catalog. Flavor-led Silver products, strain-led Gold products, the Rose Gold Connoisseur Series, the Presidential Line, House Line, and THC Design collaboration all use the Moon Rocks category as a shared point of reference while preserving their own names and artwork.",
  ],
  sections: [
    {
      id: "the-flagship",
      heading: "The flagship Presidential format",
      imageCount: 2,
      paragraphs: [
        "Moon Rocks sit at the beginning of the Presidential story because the construction is both visible and memorable. Flower supplies the foundation. Cannabis concentrate carries across that foundation. Kief completes the outer layer. The name describes the finished form, while the package identifies the exact product, series, and official brand source.",
        "The layers matter more than any dramatic promise around them. This site does not use medical language, guarantee an effect, or reduce a product to a single unsupported potency line. It explains what can be responsibly described: the components, the order of construction, the identity on the package, and the licensed Oklahoma channel where the product is sold.",
        "That material clarity gives the flagship unusual visual weight. A Moon Rock package can lead a shelf block, anchor a broader collection, or introduce a patient to the logic behind the rolled formats. Even when the product name changes, the Presidential crest and format language keep the family recognizable.",
        [
          { text: "The " },
          { text: "official Presidential Moon Rocks hub", href: `${MAIN}/moon-rocks/presidential-moon-rocks` },
          { text: " is the canonical destination for the flagship format. Product art on this page goes deeper still, linking each image to the exact named product rather than forcing every visitor back through one generic doorway." },
        ],
      ],
    },
    {
      id: "three-layer-construction",
      heading: "Three layers, one construction",
      imageCount: 2,
      paragraphs: [
        "Construction starts with flower selected as the physical core. Concentrate is applied so the second component stays with that core, and kief provides the final exterior. The result is not a loose kit or a group of separate ingredients. It is a finished product whose layers are meant to be understood together.",
        "Presidential carries that logic consistently across names and series. Silver communicates fruit-forward identity. Gold organizes a large cannabis-first strain collection. Rose Gold introduces a smaller connoisseur grouping centered on solventless craftsmanship. The Line, House Line, and THC Design collaboration create three more ways for the same brand architecture to appear.",
        "The series should not be confused with a public extract chart. This Oklahoma property does not explain which extract sits behind each collection, because another official property owns that technical subject. Here the useful questions are simpler: Which product is this? Which series does its official record place it in? Which package should an Oklahoma patient recognize at licensed retail?",
        "Keeping the explanation at that level also keeps the page honest. Materials and package identity can be stated directly. Effects vary by person and are not promised. Product details belong to the official record, current local availability belongs to the retailer, and Oklahoma medical-program rules belong together on the dedicated state page.",
      ],
    },
    {
      id: "moon-rock-names",
      heading: "Which names come as Moon Rocks",
      imageCount: 1,
      paragraphs: [
        "The official catalog gives Moon Rocks a broad field of names. Silver includes Blue Raspberry, Grape, Peach Mango, Pineapple, Strawberry, Tropical, and Watermelon. Gold reaches from 24K, Blue Dream, and Cap Junky through Presidential OG, Rainbow Belts, Skywalker, Waui, XJ-13, and XXX, with many more strain identities between them.",
        "Rose Gold contributes Cereal Milk, Cosmic Cookies, God’s Gift, Wedding Cake, and White Walker. The Presidential Line adds character-led names including Apricotti, Daniel Larusso, Garlic Cookies, Ghost Haze Train, Guava Haze, Head Cheese, Iced Lemon, Laura Charles, Nino Brown, and Whoa Si Whoa.",
        "House Line Moon Rocks state the core product directly, while Presidential x THC Design makes the collaboration visible. That breadth does not mean every name is guaranteed at every Oklahoma dispensary. It means the canonical catalog has enough range for licensed retailers to shape different assortments while patients retain a consistent visual system for recognizing the brand.",
      ],
    },
    {
      id: "package-recognition",
      heading: "What the package communicates",
      imageCount: 2,
      paragraphs: [
        "A Presidential Moon Rocks package has several jobs at once. It must identify Presidential, distinguish the named product, signal its series or collaboration, and make the Moon Rocks format legible. The crest creates the first point of recognition. Color, illustration, typography, and product naming do the finer sorting.",
        "Silver packages lean into vibrant fruit identity. Gold gives strain names strong illustrated worlds within a coordinated series. Rose Gold uses a more restrained connoisseur position. The Presidential Line makes individual character art prominent, while House Line and THC Design use direct brand and collaboration cues. Those differences help a retailer build variety without making the shelf look unrelated.",
        "On this page, the artwork is functional navigation. Every product image opens the matching official product record in the same tab. Alt text describes the package in frame without becoming a visible caption, and the ornamental gold frame keeps the gallery consistent while allowing each package to remain the visual subject.",
        [
          { text: "Browse the broader " },
          { text: "official Moon Rocks collection", href: `${MAIN}/moon-rocks` },
          { text: " when you want to move across series and individual names. The Oklahoma site provides the format story; the main catalog remains the definitive product destination." },
        ],
      ],
    },
    {
      id: "moon-rocks-in-oklahoma",
      heading: "Finding Moon Rocks in Oklahoma",
      imageCount: 1,
      paragraphs: [
        "Presidential sells wholesale through licensed retailers. Close to two hundred Oklahoma doors carry the brand, but each dispensary chooses its own product mix and reorder timing. A store with Presidential on the shelf may carry selected Moon Rocks rather than the complete catalog, and the assortment may change between visits.",
        "Start with the official Oklahoma locator, identify licensed participating retailers in the relevant region, and confirm the exact product before traveling. Use the package name and series when asking. ‘Presidential Moon Rocks’ identifies the format; ‘Blue Raspberry Silver Moon Rocks’ or ‘24K Gold Moon Rocks’ gives the retailer the fuller identity needed to check inventory.",
        "A current OMMA patient or visitor license is part of the purchase path. An out-of-state medical card alone is not the credential used at an Oklahoma dispensary. The Cannabis in Oklahoma page keeps those licensing and possession details in one place so this format page can stay centered on product recognition and licensed availability.",
      ],
    },
  ],
  relatedLinks: [
    upLink,
    ...formatLinks.filter((link) => link.href !== "/moon-rocks"),
    { href: "/find", label: "Find Presidential", description: "Move from product recognition to the official Oklahoma locator." },
  ],
  sources: [
    { label: "Official Presidential Moon Rocks hub", href: `${MAIN}/moon-rocks/presidential-moon-rocks` },
    { label: "Official Presidential product catalog", href: `${MAIN}/moon-rocks` },
    { label: "Official Presidential Oklahoma locator", href: `${MAIN}/find-us/ok` },
  ],
};

const bluntsPage: PageContent = {
  path: "/blunts",
  kind: "article",
  h1: "Presidential Blunts in Oklahoma",
  title: "Presidential Blunts in Oklahoma | Official Product Guide",
  description: "Explore Presidential tobacco-free hemp-wrap blunts, full-size and mini formats, official names, packaging, and Oklahoma retail availability.",
  intro: [
    "Presidential Blunts carry infused Presidential material inside a tobacco-free hemp wrap. The wrap gives the format its profile, provides a distinct surface around the roll, and separates the blunt family clearly from paper pre-rolls. Full-size and mini options let Oklahoma retailers present that identity at more than one scale.",
    "The format is part of a coordinated catalog rather than a one-off package. Silver flavors, Gold strains, individual Presidential Line names, the House Line, and THC Design collaboration can all give a blunt shelf breadth while the crest, format language, and wrap construction preserve one recognizable family.",
  ],
  sections: [
    {
      id: "hemp-wrap-format",
      heading: "The tobacco-free hemp-wrap format",
      imageCount: 2,
      paragraphs: [
        "The defining exterior of a Presidential Blunt is a tobacco-free hemp wrap. That fact is concrete and useful: it tells a patient what surrounds the rolled material, gives a buyer a clear format distinction, and lets the package speak accurately without leaning on effects, medical claims, or assumptions about why any individual chooses one format over another.",
        "Inside, the blunt carries the Presidential infused-product idea into a rolled form. The product name and official record identify the specific item. The package tells the rest of the shelf story through series color, illustration, count or size information, and the Presidential crest. Those cues work together; none has to carry the whole explanation alone.",
        "Hemp wrap also creates a different physical presence from paper. It gives the blunt a larger, more substantial silhouette and makes the full-size package easy to distinguish from a pre-roll pack. The mini version retains the format identity while changing scale and package organization.",
        [
          { text: "The " },
          { text: "official Presidential Blunts collection", href: `${MAIN}/moon-rocks/presidential-blunts` },
          { text: " holds the canonical blunt records. Every package image on this Oklahoma page follows through to a specific product page, so the artwork is a working catalog path rather than background decoration." },
        ],
      ],
    },
    {
      id: "full-size-and-mini",
      heading: "Full-size and mini blunts",
      imageCount: 2,
      paragraphs: [
        "Full-size blunts give the hemp-wrap format its broadest single-roll presentation. The package can foreground one product identity, make the blunt silhouette legible, and occupy a clear place beside Moon Rocks and pre-rolls. For a retailer, that format can stand alone or sit inside a larger Presidential block.",
        "That larger profile also gives the format a clear visual role in a mixed display, even before a patient reads the individual product name.",
        "Mini blunts translate the same tobacco-free wrap idea into a compact scale. Multiple pieces may be organized as a pack, giving the package a different rhythm and shelf footprint from one full-size blunt. The product remains a blunt because the wrap and construction category remain visible; ‘mini’ describes the size architecture.",
        "This distinction keeps the catalog understandable. A mini is not automatically a separate flavor or strain, and it is not a claim about effects. It is a smaller physical expression that can appear under official product identities already familiar elsewhere in the Presidential range.",
        "The Minis page brings mini blunts and mini pre-rolls together for visitors who want to compare compact formats. This page stays focused on the complete blunt family, showing how full-size and smaller options can share visual language while serving different shelf spaces.",
      ],
    },
    {
      id: "blunt-product-names",
      heading: "Blunt names across the catalog",
      imageCount: 1,
      paragraphs: [
        "Presidential Blunts appear through several official catalog groupings. Silver fruit identities give the format bright package color. Gold strain identities bring cannabis-first names and illustrated worlds. Selected Presidential Line products introduce character-led artwork, while the House Line states the core blunt directly and THC Design packaging makes the collaboration unmistakable.",
        "The range visible in approved Presidential artwork includes names such as Blue Raspberry, Grape, Peach Mango, Pineapple, Strawberry, Tropical, Watermelon, 24K, Blue Dream, Cherry Gelato, King Louis, Presidential OG, Rainbow Belts, Skywalker, and other official product identities. The exact linked record—not a guessed filename—is the authority for each image on this page.",
        "A name appearing in the wider product catalog is not treated as a promise that every size and format is currently present at every Oklahoma retailer. This site matches the approved blunt artwork it has to official product destinations and lets each licensed dispensary answer the real-time inventory question.",
      ],
    },
    {
      id: "wrap-and-package",
      heading: "What the wrap and package do",
      imageCount: 2,
      paragraphs: [
        "The hemp wrap defines the blunt physically; the package defines it at the shelf. Before opening anything, a patient needs to recognize the brand, exact name, format, and relevant series. Presidential packaging handles those layers with a strong crest, black structural ground, vivid product art, and clear naming rather than a wall of undifferentiated copy.",
        "Full-size packages can emphasize the single format and product art. Mini packages must also communicate multiplicity and compact scale. Both benefit from a consistent brand frame because a dispensary may place them together, separate them by size, or merchandise them beside matching names from other formats.",
        "That consistency helps a buyer build a deliberate block. A Silver run can create a vivid fruit-led section. A Gold selection can prioritize recognized strain identities. House Line can anchor the blunt category in the core brand, while THC Design adds a visible collaboration point. The store controls the assortment; the brand architecture keeps it coherent.",
        [
          { text: "See how blunt construction sits inside the wider " },
          { text: "Presidential blunt format story", href: `${MAIN}/presidential-blunts` },
          { text: ". The Oklahoma presentation stays original in its writing while using the official product pages as the destination for exact names and current catalog context." },
        ],
      ],
    },
    {
      id: "blunts-in-oklahoma",
      heading: "Finding blunts in Oklahoma",
      imageCount: 1,
      paragraphs: [
        "Presidential reaches Oklahoma through licensed dispensaries only. Close to two hundred retail doors carry the brand statewide, but wholesale distribution gives each store control of its own mix. Some doors may carry both full-size and mini blunts; others may focus on one size, selected series, or a small number of recognizable names.",
        "Use the official Oklahoma locator for the current participating field, then ask the retailer about the exact product. Naming the format, size, series, and product is more useful than asking only whether the store carries Presidential. The package art on this page can help confirm that identity before the call or visit.",
        "A purchase also requires the proper active Oklahoma medical credential. Eligible out-of-state patients use the 30-day OMMA visitor-license route; their home-state card by itself does not work as the dispensary credential in Oklahoma. The dedicated Oklahoma page explains the complete route and the state’s possession framework together.",
      ],
    },
  ],
  relatedLinks: [
    upLink,
    ...formatLinks.filter((link) => link.href !== "/blunts"),
    { href: "/find", label: "Find Presidential", description: "Use the official Oklahoma locator and confirm current inventory." },
  ],
  sources: [
    { label: "Official Presidential Blunts collection", href: `${MAIN}/moon-rocks/presidential-blunts` },
    { label: "Official Presidential blunt format page", href: `${MAIN}/presidential-blunts` },
    { label: "Official Presidential Oklahoma locator", href: `${MAIN}/find-us/ok` },
  ],
};

const preRollsPage: PageContent = {
  path: "/pre-rolls",
  kind: "article",
  h1: "Presidential Pre-Rolls in Oklahoma",
  title: "Presidential Pre-Rolls in Oklahoma | Official Product Guide",
  description: "Explore Presidential infused pre-rolls, sizes and packs, official product identities, packaging, and licensed Oklahoma availability.",
  intro: [
    "Presidential Pre-Rolls take infused Presidential material into a familiar paper-rolled format. The construction becomes portable and package-led: the exact product name, series, count, and size organize the choice while the Presidential crest connects a wide range of artwork back to one official family.",
    "Singles, packs, and mini expressions give Oklahoma retailers several ways to merchandise pre-rolls without turning the category into a collection of unrelated items. Silver, Gold, the Presidential Line, House Line, and THC Design each contribute a distinct visual reason to stop at the shelf.",
  ],
  sections: [
    {
      id: "infused-pre-rolls",
      heading: "The infused pre-roll format",
      imageCount: 2,
      paragraphs: [
        "A Presidential Pre-Roll brings the brand’s flower, concentrate, and kief language into a rolled paper format. The package and canonical product record identify how that material appears in a specific item. This Oklahoma site stays with what can be responsibly seen and sourced rather than adding effects, medical, or universal potency claims.",
        "Paper is the clearest physical distinction from a blunt’s tobacco-free hemp wrap. That difference shapes the roll, package silhouette, and merchandising category. It also gives a visitor an easy first filter: choose the paper pre-roll family here, or move to the blunt page when the hemp-wrapped format is the intended destination.",
        "The infused construction connects pre-rolls to the flagship Moon Rocks idea without pretending the physical formats are identical. Moon Rocks present the layers in their original form. Pre-rolls organize material into a ready rolled format. Shared product identities and brand artwork create continuity between them.",
        [
          { text: "The " },
          { text: "official Presidential Pre-Rolls collection", href: `${MAIN}/moon-rocks/presidential-prerolls` },
          { text: " carries the canonical records for this format. Every product image here opens its specific official page in the same tab, making the package itself the deepest and most useful link." },
        ],
      ],
    },
    {
      id: "sizes-and-packs",
      heading: "Sizes, singles, and packs",
      imageCount: 2,
      paragraphs: [
        "Pre-roll architecture can change by size and count. A single emphasizes one roll and one product identity. A multipack organizes several pieces under the same name. A mini pack reduces the physical scale while preserving the paper format and the visual signals needed to recognize the product at licensed retail.",
        "Those choices are package facts, not promises about how any person will experience a product. They help patients compare physical presentation and help buyers shape a shelf. One store may favor strong single-package art; another may use packs to build a coordinated Presidential block across several names.",
        "The package has to carry that information without losing personality. Count and size need to be legible, but a Silver fruit identity should still feel vivid, a Gold strain should retain its illustrated character, and a House Line package should remain unmistakably brand-first. Structure and artwork work as partners.",
        "Minis receive their own site page because compact pre-rolls share useful comparisons with mini blunts. The current page keeps the complete pre-roll family together, from larger single presentations through smaller multipacks, so paper-rolled options remain easy to understand as one format.",
        "That breadth also gives stores a way to build progression within one recognizable category. A focused order might begin with a small number of strong names in one pack style, then expand into additional sizes or series as local demand becomes clear. The catalog offers room to grow without demanding that every shelf begin at maximum depth.",
      ],
    },
    {
      id: "pre-roll-names",
      heading: "Which product names appear",
      imageCount: 1,
      paragraphs: [
        "The approved Presidential pre-roll artwork spans fruit-forward Silver names, strain-led Gold names, individual Presidential Line identities, the direct House Line, and the THC Design collaboration. That spread lets the same physical format move through several visual moods without losing the brand system around it.",
        "Silver names such as Blue Raspberry, Grape, Peach Mango, Pineapple, Strawberry, Tropical, and Watermelon make color a central package cue. Gold products use strain names including 24K, Blue Dream, Cherry Gelato, King Louis, Presidential OG, Rainbow Belts, Skywalker, and other official identities in a deeper collection.",
        "The Presidential Line adds names with their own character worlds, while House Line pre-rolls state the core category directly. THC Design packaging identifies the cultivation collaboration. This site displays only approved local artwork and matches each filename to an exact `/moon-rocks/` product slug from the official sitemap before it becomes a linked image.",
      ],
    },
    {
      id: "pre-roll-package-system",
      heading: "A package system built for the shelf",
      imageCount: 2,
      paragraphs: [
        "Pre-roll packages tend to be tall, which gives illustration and typography a different canvas from square Moon Rocks art or wider mini packs. Presidential uses that surface to make the product identity visible while keeping the crest and format cues stable enough for a patient to recognize the family from several feet away.",
        "Series architecture creates order across that variety. A run of Silver packages can read as a bright flavor set. Gold can create a broader strain wall with consistent hierarchy. The Line can introduce strong one-off character art. House Line gives the shelf a simple core, and THC Design creates a collaboration marker without asking the retailer to explain it from scratch.",
        "For buyers, that consistency supports several strategies. A store can select only a few proven names, merchandise one series deeply, or build a format-first block that moves across groupings. No pricing or margin assumption is needed to see the proposition: recognizable packaging and a catalog with enough structure to curate.",
        [
          { text: "The broader " },
          { text: "Presidential pre-roll format page", href: `${MAIN}/presidential-prerolls` },
          { text: " provides another official route into the category. The Oklahoma site remains focused on what local patients and retailers need most: format recognition, honest availability language, and direct paths to exact product records." },
        ],
      ],
    },
    {
      id: "pre-rolls-in-oklahoma",
      heading: "Finding pre-rolls in Oklahoma",
      imageCount: 1,
      paragraphs: [
        "Presidential products reach Oklahoma through licensed dispensaries, not direct online sale. Close to two hundred licensed doors carry the brand, but no store is assumed to stock every pre-roll, size, pack, or series. Wholesale ordering creates local variation, and current inventory belongs to the retailer.",
        "Begin with the official Oklahoma locator and then confirm the precise item. A complete request includes Presidential, the product name, and the pre-roll format; adding the pack or size shown on the official record can narrow the check further. Package art on this page gives a visual reference when names are close.",
        "Purchasing requires an active OMMA patient or visitor license. Out-of-state cardholders do not simply present their home-state card at an Oklahoma dispensary; eligible visitors apply for Oklahoma’s 30-day visitor license. The consolidated Oklahoma page explains that route along with possession limits and the medical market framework.",
      ],
    },
  ],
  relatedLinks: [
    upLink,
    ...formatLinks.filter((link) => link.href !== "/pre-rolls"),
    { href: "/find", label: "Find Presidential", description: "Check the official locator, then confirm the exact pre-roll." },
  ],
  sources: [
    { label: "Official Presidential Pre-Rolls collection", href: `${MAIN}/moon-rocks/presidential-prerolls` },
    { label: "Official Presidential pre-roll format page", href: `${MAIN}/presidential-prerolls` },
    { label: "Official Presidential Oklahoma locator", href: `${MAIN}/find-us/ok` },
  ],
};

const minisPage: PageContent = {
  path: "/minis",
  kind: "article",
  h1: "Presidential Minis in Oklahoma",
  title: "Presidential Minis in Oklahoma | Official Product Guide",
  description: "Explore compact Presidential mini blunts and mini pre-rolls, official product identities, package systems, and Oklahoma retail availability.",
  intro: [
    "Presidential Minis bring two rolled formats into a compact scale: tobacco-free hemp-wrap mini blunts and paper mini pre-rolls. Size is the organizing idea. The products remain tied to their official names, series, and wrap categories while smaller pieces and multipack structures create a distinct shelf proposition.",
    "The format works because it stays easy to read. A mini blunt is still identified by its hemp wrap; a mini pre-roll remains a paper format. Presidential artwork, count information, and package shape then help an Oklahoma patient or dispensary buyer tell the two compact families apart.",
  ],
  sections: [
    {
      id: "why-mini-size-works",
      heading: "Why the mini size works",
      imageCount: 2,
      paragraphs: [
        "Mini describes physical scale, not a new series and not an effects claim. The smaller format lets several pieces be organized into a compact package, gives retailers another shelf footprint, and gives existing product identities a way to appear beyond a full-size blunt or larger pre-roll presentation.",
        "Clarity matters because ‘mini’ can otherwise become vague. Presidential separates the formats through wrap language and package cues. Hemp-wrapped mini blunts belong to the blunt family. Paper mini pre-rolls belong to the pre-roll family. The crest and artwork connect them, while the physical construction keeps them distinct.",
        "That structure gives a buyer flexibility. Minis can occupy a dedicated compact-format block, sit beside their full-size relatives, or extend a strong product name across another package type. The catalog does not require one merchandising answer; it provides a visual system capable of supporting several.",
        "For a patient, the benefit is legibility before purchase. The official record shows the exact product. The package identifies name, format, and count or size. The licensed retailer confirms current inventory. No unsupported promise is needed to explain why a smaller package can be a purposeful part of the line.",
        "Compact scale also puts more pressure on design discipline. Product name, series, format, and count must stay readable even when the package has less surface area. Presidential minis use strong color and a stable crest hierarchy to retain identity, proving that the smaller format can remain visually complete rather than becoming a reduced afterthought.",
      ],
    },
    {
      id: "mini-blunts",
      heading: "Mini blunts",
      imageCount: 2,
      paragraphs: [
        "Mini blunts use a tobacco-free hemp wrap at a smaller scale than the full-size blunt. The wrap is the category-defining exterior, while the multipiece package gives the mini presentation its own visual rhythm. Approved Presidential art makes that construction recognizable without rendering alt text as a caption or covering the product with editorial labels.",
        "Silver fruit identities are particularly visible in mini blunt artwork because bold color and direct names can organize a set quickly. Gold strain identities add another layer of variety. House Line and individual Presidential identities keep the mini blunt category connected to the wider brand rather than isolating it as a novelty.",
        [
          { text: "The " },
          { text: "official Presidential Blunts collection", href: `${MAIN}/moon-rocks/presidential-blunts` },
          { text: " provides the canonical format context for both full-size and compact hemp-wrapped products. Each mini-blunt image on this page links to the matching named product record, keeping visual discovery precise." },
        ],
        "A mini package should not be read as proof that the same name is available in every size at a particular Oklahoma store. Product range and retailer inventory are different questions. The catalog defines what exists; the licensed dispensary confirms what is on its shelf now.",
        "For staff, the full-size and mini distinction creates a useful educational moment without requiring a complicated script. The wrap identifies the blunt family, the package identifies the exact product, and the size language identifies the presentation. Three clear facts do more work than a vague superlative and keep the conversation grounded in what the customer can verify.",
        "The result is a blunt category that stays understandable even as product names, series colors, and package counts expand around it.",
      ],
    },
    {
      id: "mini-pre-rolls",
      heading: "Mini pre-rolls",
      imageCount: 1,
      paragraphs: [
        "Mini pre-rolls use paper rather than a hemp wrap. That simple material distinction separates them from mini blunts even when both appear as compact multipacks. Tall or structured package artwork makes product identity visible while count and format details complete the practical comparison.",
        "The same series logic applies here. Silver can build a vibrant fruit-led mini collection. Gold can bring strain-first names into a compact pre-roll package. Presidential Line art can give individual products their own characters, and House Line can keep the category anchored in the core brand.",
        "Because mini pre-rolls and mini blunts share the size idea, this page places them together. Because they do not share the same wrap, it never collapses them into one construction. Visitors can compare compact formats here and then move to the complete pre-roll or blunt page for the larger family story.",
      ],
    },
    {
      id: "mini-packaging",
      heading: "Compact packaging with full identity",
      imageCount: 2,
      paragraphs: [
        "Smaller products do not require smaller branding. Presidential mini packages still need room for the crest, exact product name, format, series cues, and package facts. The strongest designs keep that hierarchy legible while allowing vivid illustration and color to do the attention work.",
        "Multipack organization also becomes part of the shelf signal. A buyer can recognize a compact group without opening the package, and a patient can distinguish it from a single full-size presentation. That makes the exterior more than decoration: it is the practical interface between catalog, shelf, and official product record.",
        "On this site, every mini image sits in the same champagne ornamental frame used across the product guide. The frame belongs to the Oklahoma design system; the art inside remains unique to one page. No image source is reused elsewhere, and each linked image is matched to its official product destination.",
        [
          { text: "For the paper-rolled side of the range, continue through the " },
          { text: "official Presidential Pre-Rolls collection", href: `${MAIN}/moon-rocks/presidential-prerolls` },
          { text: ". The main catalog remains the definitive destination while this page makes the compact comparison easy to see in one place." },
        ],
      ],
    },
    {
      id: "minis-in-oklahoma",
      heading: "Finding minis in Oklahoma",
      imageCount: 1,
      paragraphs: [
        "Close to two hundred licensed Oklahoma retail doors carry Presidential, but mini inventory varies by store. A dispensary may favor mini blunts, mini pre-rolls, selected Silver names, selected Gold names, or a compact mix. A static list cannot reliably describe those local purchasing decisions.",
        "Use the official Oklahoma locator to identify participating licensed retailers, then confirm the exact product and format. Say whether you are asking for a mini blunt or mini pre-roll and include the official product name. That specificity gives the store a useful inventory question instead of a broad brand query.",
        "Purchases remain inside Oklahoma’s medical program and require the appropriate active OMMA patient or visitor license. The Cannabis in Oklahoma page consolidates the credential, possession, cultivation, and market details. This page can therefore do one job well: present Presidential’s compact formats as real product architecture, not filler between larger packages.",
      ],
    },
  ],
  relatedLinks: [
    upLink,
    ...formatLinks.filter((link) => link.href !== "/minis"),
    { href: "/find", label: "Find Presidential", description: "Use the official Oklahoma locator for current licensed retail." },
  ],
  sources: [
    { label: "Official Presidential Blunts collection", href: `${MAIN}/moon-rocks/presidential-blunts` },
    { label: "Official Presidential Pre-Rolls collection", href: `${MAIN}/moon-rocks/presidential-prerolls` },
    { label: "Official Presidential Oklahoma locator", href: `${MAIN}/find-us/ok` },
  ],
};

const silverPage: PageContent = {
  path: "/silver",
  kind: "article",
  h1: "The Presidential Silver Flavor Series in Oklahoma",
  title: "Presidential Silver Flavor Series in Oklahoma | Official Guide",
  description: "Meet all seven vibrant, fruit-forward Presidential Silver Flavor Series products and follow each one to its official product record.",
  intro: [
    "The Presidential Silver Flavor Series is a complete seven-product set built around direct fruit identity: Blue Raspberry, Grape, Peach Mango, Pineapple, Strawberry, Tropical, and Watermelon. Bright names and vivid packaging make the series easy to read as one family, even when the products appear across different Presidential formats.",
    "Silver is flavor-first in position and bold in presentation. That describes the product identity and package language; it is not an effects or medical promise. Every official name appears below with a direct link to its exact product page, while eight unique approved artworks show how the series carries color into the Oklahoma shelf.",
  ],
  sections: [
    {
      id: "silver-identity",
      heading: "Flavor-first by design",
      imageCount: 2,
      paragraphs: [
        "Silver begins with names people can recognize immediately. No decoding is required to understand the visual territory of Blue Raspberry, Grape, Peach Mango, Pineapple, Strawberry, Tropical, or Watermelon. Each identity creates its own palette and illustration opportunities while the Silver label and Presidential crest keep the group connected.",
        "That balance is what makes the series stronger than seven unrelated packages. Fruit identity gives every product a distinct face. Shared hierarchy tells a patient or buyer that the faces belong together. On a shelf, the result can read as a vibrant block from a distance and as seven individual choices at closer range.",
        "The series position should remain concrete. ‘Flavor-first’ and ‘fruit-forward’ describe naming, artwork, and catalog organization. They do not promise a particular experience or replace the official package record. This site avoids medical language and lets the product page carry the exact identity.",
        "Silver’s direct naming also helps across formats. A patient who first notices Watermelon on Moon Rocks can recognize the same identity when approved artwork appears on a pre-roll or mini package. The fruit name becomes the stable thread, while the format page explains what physically changes around it. That is practical brand continuity, not a claim that every presentation is interchangeable.",
        [
          { text: "The " },
          { text: "official Silver Flavor Series hub", href: `${MAIN}/moon-rocks/silver` },
          { text: " is the canonical collection source. The roster on this page mirrors its seven names and exact slugs, while each approved artwork links to the matching product rather than a generic catalog page." },
        ],
      ],
    },
    {
      id: "seven-products",
      heading: "Seven official product identities",
      imageCount: 2,
      paragraphs: [
        "Blue Raspberry opens the set with a name that naturally supports cool blue package language. Grape moves into a deep purple world. Peach Mango combines two fruit cues in one identity, creating a warmer visual bridge between the single-fruit products and the wider Tropical name.",
        "Pineapple brings a sharp golden fruit signal. Strawberry provides an unmistakable red identity. Tropical gives the artwork room to communicate a blended, expansive fruit world without inventing a product beyond the official name. Watermelon completes the roster with strong green and pink cues.",
        "Those are all seven names shown by the current official sitemap under the Silver series. Nothing is added, renamed, or pulled from a filename guess. The visible complete-series roster below links Blue Raspberry, Grape, Peach Mango, Pineapple, Strawberry, Tropical, and Watermelon to their exact `/moon-rocks/` records.",
        "The page uses eight images because the brief calls for a product-heavy eight-to-ten-image series presentation. Seven products receive a representative place in the art set, and one official Silver identity appears in a second unique format treatment. The second image is a different source file, not a reused duplicate.",
      ],
    },
    {
      id: "silver-across-formats",
      heading: "Silver across Presidential formats",
      imageCount: 1,
      paragraphs: [
        "Silver identity can travel across Moon Rocks, infused pre-rolls, tobacco-free hemp-wrap blunts, and compact minis. The physical package changes with the format, but the fruit name, Silver series cue, and core artwork preserve recognition. That makes it possible to compare formats without losing track of the product family.",
        "Moon Rocks give the identity a square or portrait product-art moment around the flagship construction. Pre-roll packaging uses a taller surface for the same name. Blunts emphasize the hemp-wrapped format, while mini packs organize smaller pieces. Each page on this site separates those format stories so the Silver page can concentrate on the complete series.",
        "Availability by format is still a product-specific and retailer-specific question. A name in the Silver roster should not be treated as a guarantee that every possible size or format is currently at every Oklahoma dispensary. The linked official page and current retailer inventory remain the two reliable sources.",
      ],
    },
    {
      id: "silver-on-the-shelf",
      heading: "How Silver works on the shelf",
      imageCount: 2,
      paragraphs: [
        "For a dispensary buyer, Silver offers a ready-made color story. A complete run creates a vivid brand block; a smaller selection can still read coherently because the crest and Silver structure remain consistent. The retailer can choose depth without needing to invent a merchandising language from scratch.",
        "For a patient, the package creates a quick recognition sequence: Presidential first, Silver next, fruit identity after that, and format or pack facts alongside it. The hierarchy helps separate a Grape mini blunt from a Grape pre-roll or Moon Rocks package while keeping all three visibly related.",
        "This page strengthens that shelf behavior by making every image a functional link. The gold ornamental frame belongs to the Oklahoma site, but the image inside belongs to one official product identity. Selecting it goes directly to that product in the main catalog, with no popup, nested link, or competing destination.",
        [
          { text: "Review the complete " },
          { text: "Silver collection on the main Presidential site", href: `${MAIN}/moon-rocks/silver` },
          { text: " whenever a canonical series check is needed. This Oklahoma guide supplies original product-focused context and sends authority back to the official collection generously." },
        ],
      ],
    },
    {
      id: "silver-in-oklahoma",
      heading: "Finding Silver in Oklahoma",
      imageCount: 1,
      paragraphs: [
        "Presidential sells Silver products wholesale through licensed Oklahoma dispensaries. Close to two hundred doors carry the brand statewide, but each store chooses its own mix of names, formats, sizes, and reorder timing. One retailer may carry the full flavor story; another may focus on two or three recognized identities.",
        "Use the official Oklahoma locator to identify participating retailers, then ask for the exact combination shown on the product record—for example, Presidential, Silver, Blue Raspberry, and the intended format. That level of detail is more useful than a general brand inquiry and helps the store check current inventory accurately.",
        "A lawful purchase requires the proper active OMMA patient or visitor license. The Oklahoma page explains that medical framework in one place. The Silver page remains what the series deserves: a bright, complete, official product guide with all seven names visible and linked.",
      ],
    },
  ],
  productRoster: silverRoster,
  relatedLinks: [
    upLink,
    ...seriesLinks.filter((link) => link.href !== "/silver"),
    { href: "/find", label: "Find Presidential", description: "Locate participating Oklahoma retailers and confirm Silver inventory." },
  ],
  sources: [
    { label: "Official Silver Flavor Series", href: `${MAIN}/moon-rocks/silver` },
    { label: "Official Presidential Oklahoma locator", href: `${MAIN}/find-us/ok` },
  ],
};

const goldPage: PageContent = {
  path: "/gold",
  kind: "article",
  h1: "The Presidential Gold Strain Series in Oklahoma",
  title: "Presidential Gold Strain Series in Oklahoma | Official Guide",
  description: "Meet all nineteen cannabis-first Presidential Gold Strain Series products and follow every name to its official product record.",
  intro: [
    "The Presidential Gold Strain Series is the largest named grouping in the current catalog: nineteen cannabis-first product identities organized under one balanced, authentic visual system. Familiar names, contemporary names, vivid illustration, and consistent gold series architecture give Oklahoma retailers a deep set that can still read as one family.",
    "Every official Gold name appears in the complete roster below with its exact product link. Eight unique approved artworks provide a representative product gallery within the requested image range; the linked roster ensures the full nineteen-product series remains visible without inventing names, slugs, or format availability.",
  ],
  sections: [
    {
      id: "gold-identity",
      heading: "Cannabis-first, balanced, and authentic",
      imageCount: 2,
      paragraphs: [
        "Gold leads with strain identity rather than fruit-series identity. That distinction gives the product name the first word and lets illustration build a visual world around it. ‘Cannabis-first’ describes how the catalog is organized; ‘balanced’ describes the relationship between individuality and shared series structure, not a promised personal outcome.",
        "Nineteen products could easily become visually noisy. Gold avoids that by repeating a clear hierarchy: Presidential crest, Gold series cue, exact product name, format information, and a strong illustration. The art changes enough to reward browsing while the frame around it tells a buyer that the products can merchandise together.",
        "The series can support both a small curated order and a deeper shelf. A retailer can choose recognized strain names, build around local demand, or create a broad Gold block. The site does not claim pricing, margins, or deal terms. The proposition is visible in the catalog depth and package consistency themselves.",
        "Depth also rewards return browsing. A Gold customer can recognize the shared series before learning every illustration, and a staff member can introduce another official name without leaving the visual system the patient already understands. The collection feels expansive because it contains real variety, yet orderly because each package still answers the same brand, series, product, and format questions.",
        [
          { text: "The " },
          { text: "official Gold Strain Series hub", href: `${MAIN}/moon-rocks/gold` },
          { text: " is the source for the complete collection. This page mirrors every name and slug from that official structure, and each image goes to its exact product record in the same tab." },
        ],
      ],
    },
    {
      id: "nineteen-products",
      heading: "Nineteen official product identities",
      imageCount: 2,
      paragraphs: [
        "The Gold roster begins with 24K, Blue Dream, Cap Junky, Cherry Gelato, Crescendo, and Galactic Gas. Gorilla Goo, King Louis, and NYC Diesel continue the set. Orange Push Pop, Papaya Punch, and Pink Cookies bring three more distinct official identities into the middle of the collection.",
        "Presidential OG gives the series an unmistakable brand-named anchor. Rainbow Belts, SFV OG, Skywalker, Waui, XJ-13, and XXX complete the nineteen-product official grouping. The names are reproduced exactly from the live main-site sitemap and collection structure, including capitalization and the hyphen in XJ-13.",
        "The complete roster below turns each name into a direct follow link. A visitor does not have to infer which illustrated package belongs to which URL, and a product without a representative gallery image is still present as a named official destination. That keeps the page complete while honoring the eight-to-ten-image brief.",
        "No product is assigned to Gold because a local asset happened to use a gold color. Series membership comes from the official main-site structure. That rule protects the catalog from creative guesswork and makes the Oklahoma page useful as a dependable brand guide rather than a decorative collage.",
      ],
    },
    {
      id: "gold-across-formats",
      heading: "Gold across the four formats",
      imageCount: 1,
      paragraphs: [
        "Gold identities can appear across flagship Moon Rocks, paper infused pre-rolls, tobacco-free hemp-wrap blunts, and compact minis. Package shape changes with each format, but the exact strain name and Gold architecture preserve continuity. A patient can recognize the family while still distinguishing the physical product.",
        "That format breadth creates useful shelf relationships. A retailer might place all Gold products together, build a blunt or pre-roll block that mixes series, or carry one identity across multiple formats when the current wholesale catalog and local demand support it. The brand system can handle all three approaches.",
        "The official product record is the authority for any exact item. A name in this series does not guarantee every format, size, or pack, and it does not guarantee that a specific Oklahoma dispensary has it today. This guide names the collection accurately and directs availability questions to the licensed store.",
      ],
    },
    {
      id: "gold-package-art",
      heading: "A deep illustrated shelf",
      imageCount: 2,
      paragraphs: [
        "Gold package art gives nineteen names room to be memorable. Some identities arrive with a long cultural history; others feel current and graphic. Illustration lets each one claim a visual territory while the gold structure prevents the collection from looking like nineteen separate brands sharing a shelf by accident.",
        "The eight artworks on this page are representatives, not a ranked list. Each comes from a unique approved source file and appears nowhere else on the Oklahoma site. Square or portrait output preserves a product-art proportion, explicit dimensions stabilize layout, and WebP delivery keeps the page practical despite the image-heavy design.",
        "The ornamental champagne frame never becomes a caption. It creates continuity with the Presidential Oklahoma design system while alt text remains available to assistive technology. The image itself is linked directly to its official product record, so a visual choice becomes an exact catalog action.",
        [
          { text: "Return to the " },
          { text: "complete Gold collection", href: `${MAIN}/moon-rocks/gold` },
          { text: " whenever you want the canonical series view. The Oklahoma property celebrates the artwork generously but never competes with the main site for product authority." },
        ],
      ],
    },
    {
      id: "gold-in-oklahoma",
      heading: "Finding Gold in Oklahoma",
      imageCount: 1,
      paragraphs: [
        "Gold reaches Oklahoma through licensed dispensaries as part of Presidential’s wholesale network. Close to two hundred doors carry the brand, but nineteen names and multiple formats create many possible local assortments. A participating retailer may carry a focused Gold selection rather than the complete series.",
        "Use the official Oklahoma locator to identify current participating doors, then confirm the product by its exact name and intended format. Asking for ‘Gold’ alone describes the series. Asking for ‘Presidential Gold Skywalker pre-rolls’ gives the retailer a specific inventory check tied to a recognizable package.",
        "The appropriate active OMMA patient or visitor license is required for purchase. Oklahoma’s dedicated page on this site holds the full medical-program explanation. Gold can therefore stay centered on what it is: a broad, cannabis-first official series with nineteen names, direct product links, and packaging designed to remain coherent at scale.",
      ],
    },
  ],
  productRoster: goldRoster,
  relatedLinks: [
    upLink,
    ...seriesLinks.filter((link) => link.href !== "/gold"),
    { href: "/find", label: "Find Presidential", description: "Locate participating retailers and confirm a specific Gold product." },
  ],
  sources: [
    { label: "Official Gold Strain Series", href: `${MAIN}/moon-rocks/gold` },
    { label: "Official Presidential Oklahoma locator", href: `${MAIN}/find-us/ok` },
  ],
};

const roseGoldPage: PageContent = {
  path: "/rose-gold",
  kind: "article",
  h1: "The Presidential Rose Gold Connoisseur Series in Oklahoma",
  title: "Presidential Rose Gold Connoisseur Series in Oklahoma | Official Guide",
  description: "Meet all five refined Presidential Rose Gold products and follow every official name to its canonical product record.",
  intro: [
    "The Presidential Rose Gold Connoisseur Series is a deliberately edited five-product collection: Cereal Milk, Cosmic Cookies, God’s Gift, Wedding Cake, and White Walker. Refined visual language, intentional scale, and a position centered on solventless craftsmanship distinguish it from fruit-forward Silver and the much larger strain-led Gold series.",
    "Every official Rose Gold product appears in the roster below with its exact main-site link. The official product pages currently state that photography is in production, so this Oklahoma property uses clearly labeled brand artwork placeholders rather than inventing packaging or presenting generated compositions as product photography.",
  ],
  sections: [
    {
      id: "rose-gold-identity",
      heading: "Refined and intentional",
      imageCount: 2,
      paragraphs: [
        "Rose Gold gains strength from focus. Five products create enough range to feel like a complete series while giving each identity more room than it would receive in a nineteen-name collection. The connoisseur position is communicated through editing, typography, color, and craft language—not through medical promises or guaranteed effects.",
        "‘Solventless craftsmanship’ is part of the series position. This page does not extend that phrase into an extract-by-series explainer, because another Presidential property owns that technical subject. The useful job here is to name the official collection accurately, show its place in the catalog, and send visitors to exact product records.",
        "Rose Gold also creates a third visual register beside Silver and Gold. Silver is vibrant and fruit-forward. Gold is broad and cannabis-first. Rose Gold is smaller, quieter, and more deliberately premium in tone. All three retain the Presidential crest and official catalog relationship.",
        "That contrast gives the complete color-series family a useful rhythm. A buyer can see three different reasons for a product to exist without presenting them as competing brands: immediacy in Silver, depth in Gold, and curation in Rose Gold. The distinctions come from official collection structure and visual position, not from invented rankings or unverifiable promises.",
        "Rose Gold therefore feels selective by design, not incomplete beside the two larger color series.",
        [
          { text: "The " },
          { text: "official Rose Gold Connoisseur Series hub", href: `${MAIN}/moon-rocks/rose-gold` },
          { text: " is the canonical collection source. Its five names and slugs govern the roster here, preventing local filenames or visual assumptions from inventing series membership." },
        ],
      ],
    },
    {
      id: "five-products",
      heading: "Five official product identities",
      imageCount: 2,
      paragraphs: [
        "Cereal Milk begins the official roster, followed by Cosmic Cookies and God’s Gift. Wedding Cake and White Walker complete the five-product set. The apostrophe in God’s Gift is preserved in the visible name, while the official URL uses the confirmed `gods-gift` slug from the live main-site sitemap.",
        "Each name receives a direct follow link in the complete roster below. That directness matters while photography is still being produced: a visitor can distinguish an honest placeholder from the canonical product record and move to the official destination without passing through an unrelated generic page.",
        "The eight artworks on this page cover five named portrait treatments and three square variations. Each file is unique, carries the product name, and visibly says that official photography is in production. None depicts a fictional jar, pouch, roll, label, or physical product that could be mistaken for released packaging.",
        "When official photography arrives, the manifest can replace each placeholder one-for-one without changing URLs, dimensions, alt-text responsibilities, page structure, or product destinations. The temporary art is a truthful bridge, not a substitute catalog invented by the Oklahoma site.",
      ],
    },
    {
      id: "craft-position",
      heading: "Craft without an invented promise",
      imageCount: 1,
      paragraphs: [
        "A connoisseur series can communicate care through product selection and presentation without predicting an outcome for the patient. Rose Gold uses a smaller roster, restrained design, exact naming, and solventless craft language. The copy stops there rather than making potency, health, or experience claims that the official record does not support.",
        "That discipline keeps the series premium and credible at the same time. A dispensary buyer can understand the shelf position. A patient can recognize the five-product family. The official product page remains available for exact item context, and the licensed retailer remains the source for current Oklahoma inventory.",
        "The result is a useful distinction from the other color series. Rose Gold does not need Silver’s fruit-led immediacy or Gold’s catalog depth. Its role is curation: five identities, one refined visual world, and a clear craft-centered position within the larger Presidential collection.",
      ],
    },
    {
      id: "rose-gold-presentation",
      heading: "A transparent visual presentation",
      imageCount: 2,
      paragraphs: [
        "Product sites should be generous with imagery, but they should also be honest about what the imagery is. The Rose Gold gallery meets both responsibilities. It gives the page eight strong, series-specific visuals while labeling every one as placeholder artwork and avoiding any claim that a generated scene is released product photography.",
        "The black, deep teal, champagne, and rose-metal palette fits the existing Oklahoma design system. Ornamental rings provide a craft motif, the official product name is the focal point, and ‘official photography in production’ stays visible inside the artwork. The page copy repeats that status so the visual cannot be mistaken for an accidental final package reveal.",
        "Every placeholder still functions as product navigation. Selecting Cereal Milk goes to Cereal Milk. Selecting Cosmic Cookies goes to Cosmic Cookies. The same one-to-one rule applies to God’s Gift, Wedding Cake, and White Walker, including the square variant images that repeat a product name using a different unique source artwork.",
        [
          { text: "Use the " },
          { text: "complete official Rose Gold collection", href: `${MAIN}/moon-rocks/rose-gold` },
          { text: " as the definitive visual source as photography comes online. The Oklahoma page will remain accurate because its destination and product roster already match that canonical structure." },
        ],
      ],
    },
    {
      id: "rose-gold-in-oklahoma",
      heading: "Finding Rose Gold in Oklahoma",
      imageCount: 1,
      paragraphs: [
        "Presidential distributes through licensed Oklahoma dispensaries only. Close to two hundred doors carry the brand, but a five-product connoisseur series may appear selectively within that wholesale field. No participating location is assumed to carry all five names or every available format.",
        "Use the official Oklahoma locator to identify current participating licensed retailers, then ask for Presidential Rose Gold and the exact product name. That complete phrasing gives a buyer or budtender a precise inventory question and avoids confusing the series color with an unrelated product description.",
        "The appropriate active OMMA patient or visitor license is required for purchase. Oklahoma’s consolidated program page explains that credential and the state framework. This page stays devoted to a smaller official series whose position is clear: five named products, refined presentation, honest imagery status, and direct canonical links.",
      ],
    },
  ],
  productRoster: roseGoldRoster,
  relatedLinks: [
    upLink,
    ...seriesLinks.filter((link) => link.href !== "/rose-gold"),
    { href: "/find", label: "Find Presidential", description: "Locate licensed retailers and ask for a specific Rose Gold name." },
  ],
  sources: [
    { label: "Official Rose Gold Connoisseur Series", href: `${MAIN}/moon-rocks/rose-gold` },
    { label: "Official Presidential Oklahoma locator", href: `${MAIN}/find-us/ok` },
  ],
};

const findPage: PageContent = {
  path: "/find",
  kind: "article",
  h1: "Finding Presidential in Oklahoma",
  title: "Finding Presidential in Oklahoma | Official Store Locator Route",
  description: "Use the official Oklahoma locator to find licensed retailers carrying Presidential, then confirm the exact product before visiting.",
  intro: [
    "Presidential reaches Oklahoma patients through licensed dispensaries only. Close to two hundred licensed doors carry the brand across the state, making Oklahoma the second-largest Presidential market by door count and creating meaningful coverage without turning any one store’s shelf into a statewide inventory promise.",
    "This page does not publish retailer addresses, rebuild a locator, or expose a copied table as static HTML. The complete retailer data on the main site is deliberately protected from enumeration. The right path is the live official Oklahoma locator, followed by a direct inventory check with the participating licensed store.",
  ],
  sections: [
    {
      id: "official-locator",
      heading: "Start with the official Oklahoma locator",
      imageCount: 2,
      paragraphs: [
        [
          { text: "Open the " },
          { text: "official Presidential Oklahoma locator", href: `${MAIN}/find-us/ok` },
          { text: " to see the current participating retail field. That exact state path is the dependable route. A `?zip=` query is not used because the main site drops it, and this guide does not publish a fragile shortcut that appears more precise than it really is." },
        ],
        "The locator is intentionally the main action. It keeps changing retailer participation in the system designed to hold it and avoids creating a stale duplicate directory on another domain. A static address list could remain online after a store stops carrying the brand, changes status, or moves through an inventory cycle.",
        "Once the locator identifies relevant doors, contact the licensed dispensary before traveling when a specific item matters. Ask for Presidential, the exact product name, the series when relevant, and the intended format. A store that carries the brand may not carry every product, size, pack, or format on the same day.",
        "That two-step route is more accurate than a scraped map: live participating network first, store-level inventory confirmation second. It also respects the wholesale model. Presidential provides the catalog and retailer relationships; each dispensary owns its current ordering and shelf decisions.",
        "The same route works whether someone begins with a format or a product name. A visitor might search after seeing Moon Rocks, a Silver flavor, a Gold strain, or a mini package. The locator answers which participating doors are relevant; the retailer answers whether that exact item is available. Keeping those answers separate prevents a marketing page from pretending to be live inventory software.",
        "It also protects store information from being duplicated into a public list that can be copied wholesale, indexed after it becomes stale, or separated from the live system that maintains it.",
      ],
    },
    {
      id: "statewide-footprint",
      heading: "A statewide wholesale footprint",
      imageCount: 1,
      paragraphs: [
        "Close to two hundred licensed Oklahoma retail doors carry Presidential. The count is written as prose because a wholesale network moves as stores order, pause, restock, or change status. The scale remains clear without presenting a bare number as a permanent guarantee.",
        "The footprint is densest around Oklahoma’s larger population centers, where more licensed dispensaries create more possible shelf combinations. Regional markets extend that reach beyond one metropolitan corridor. This page stops at regions and density by design; it does not hand over the protected retailer dataset in a second public format.",
        "Oklahoma’s position as the second-largest Presidential market by door count reflects that geographic spread. It also explains why this official state property carries a deep product gallery. Patients need a way to recognize package art before checking local availability, and retailers need a canonical brand destination to support those conversations.",
      ],
    },
    {
      id: "confirm-the-product",
      heading: "Confirm the exact product",
      imageCount: 1,
      paragraphs: [
        "A productive inventory check names more than the brand. Moon Rocks, blunts, pre-rolls, and minis are different formats. Silver, Gold, and Rose Gold are different series. Blue Raspberry, Presidential OG, Cereal Milk, and the other names are individual product identities. Combining those details gives the store something exact to verify.",
        "Every product image on this site helps with that step. It links to the matching official product record and uses unique alt text describing the artwork. The image does not open a competing store or an Oklahoma duplicate listing. It takes the visitor to the main Presidential site, where the product remains canonical.",
        "Availability can still change after a product has been identified. Licensed retailers choose their own wholesale mix and replenish on their own schedules. A quick call close to the visit is the practical final check, especially when a particular series, format, or pack is the goal.",
      ],
    },
    {
      id: "licensed-retail-only",
      heading: "Licensed retail only",
      imageCount: 1,
      paragraphs: [
        "Presidential does not sell directly through this site. Oklahoma purchases take place through OMMA-licensed dispensaries and require an active Oklahoma patient or visitor license. An out-of-state medical card by itself is not accepted as the dispensary credential; eligible visitors use OMMA’s 30-day visitor-license process.",
        [
          { text: "Return to the " },
          { text: "Oklahoma locator on the official Presidential site", href: `${MAIN}/find-us/ok` },
          { text: " whenever you are ready to move from product research to participating retail. The page is intentionally prominent, direct, and free of copied addresses." },
        ],
        "The Cannabis in Oklahoma guide covers the license, visitor route, possession and cultivation allowances, market history, tracking, and excise tax together. Here the operating rule stays simple: use the official locator, choose a licensed retailer, confirm the exact product, and purchase only with the proper active credential.",
      ],
    },
  ],
  relatedLinks: [
    upLink,
    { href: "/moon-rocks", label: "Presidential Moon Rocks", description: "Recognize the flagship products before checking local inventory." },
    { href: "/retailers", label: "For Oklahoma retailers", description: "The wholesale proposition for licensed dispensary owners and buyers." },
  ],
  sources: [
    { label: "Official Presidential Oklahoma locator", href: `${MAIN}/find-us/ok` },
    { label: "OMMA patient license information", href: PATIENTS },
    { label: "OMMA rules and legislation", href: OMMA_RULES },
  ],
};

const retailersPage: PageContent = {
  path: "/retailers",
  kind: "article",
  h1: "Carrying Presidential in Oklahoma",
  title: "Carrying Presidential in Oklahoma | For Licensed Retailers",
  description: "A product-first wholesale overview for Oklahoma dispensary owners and buyers considering Presidential formats, series, and in-store support.",
  intro: [
    "This page is for Oklahoma dispensary owners and buyers. Presidential is a wholesale brand sold through licensed retailers, and the proposition begins with a product family patients can recognize before they reach the counter: a flagship construction, four clear formats, six coordinated groupings, and package art built to hold attention across a shelf.",
    "No pricing, margin figure, term, or guaranteed sell-through claim appears here because those details have not been supplied or verified. The useful conversation is the brand proposition: what Presidential is, how the catalog can be merchandised, what in-store support can look like, and why consistent raw goods and clear packaging matter inside a competitive moratorium market.",
  ],
  sections: [
    {
      id: "what-presidential-is",
      heading: "A recognizable infused-product brand",
      imageCount: 1,
      paragraphs: [
        "Presidential began in Los Angeles in 2012 around a direct three-layer construction: flower carried through with cannabis concentrate and finished in kief. Moon Rocks remain the flagship expression of that idea. Blunts, pre-rolls, and minis extend it into rolled formats whose wrap, scale, count, and package profile give buyers additional ways to build the category.",
        "Recognition does not depend on one package. The crest, strong black ground, vivid illustration, and disciplined series architecture repeat across the family. A patient can encounter Presidential Moon Rocks in one case, a Silver mini pack in another, and a Gold pre-roll elsewhere without feeling as though three unrelated brands are competing for attention.",
        "That continuity is part of why the products can move as a shelf proposition. The catalog gives staff names and formats they can identify, gives the buyer multiple levels of assortment, and gives the patient a visual trail from previous recognition to a new product. It does not ask a retailer to manufacture the brand story at the point of sale.",
        [
          { text: "The " },
          { text: "official Presidential brand site", href: MAIN },
          { text: " is the canonical destination behind that recognition. Oklahoma product images link directly to exact records, allowing staff and patients to move from package art to the named item without a competing third-party catalog in between." },
        ],
      ],
    },
    {
      id: "four-format-shelf",
      heading: "Four formats create a real shelf",
      imageCount: 1,
      paragraphs: [
        "Moon Rocks provide the flagship and can anchor a Presidential block. Their flower, concentrate, and kief construction gives staff a simple factual starting point. The package carries the product identity while the format carries the brand’s origin story.",
        "Tobacco-free hemp-wrap blunts create a larger rolled profile in full-size and mini expressions. Paper pre-rolls offer singles, packs, and compact options depending on the product. Minis bring smaller hemp-wrapped and paper formats together as a size strategy while preserving the construction distinction between a blunt and a pre-roll.",
        "A buyer can merchandise by format, by series, or as a selected brand block. Format-first organization makes physical choices easy to compare. Series-first organization gives color and identity the lead. A mixed Presidential block can use the crest and black structural packaging to hold several choices together.",
        "The four-format architecture also supports disciplined depth. A store does not need every available name to make the brand legible. It can establish Moon Rocks as the anchor, add one rolled category, use minis as a compact extension, and expand as local demand and current wholesale availability justify it.",
      ],
    },
    {
      id: "six-series-shelf",
      heading: "Six groupings create range",
      imageCount: 1,
      paragraphs: [
        "Silver is a seven-product Flavor Series with direct fruit identities and strong color. Gold is a nineteen-product Strain Series whose depth supports a broad cannabis-first shelf. Rose Gold is a five-product Connoisseur Series with a smaller, refined, craft-centered position. Those three color families provide an immediate good-better-best-style visual rhythm without requiring this page to publish commercial terms.",
        "The Presidential Line adds ten character-led identities outside the color series. House Line states the core Moon Rocks, pre-roll, and blunt formats directly. Presidential x THC Design makes a focused cultivation collaboration visible through co-branded packaging. Together, the six groupings prevent the catalog from depending on one naming convention.",
        "For a buyer, that creates several curation paths. A vivid Silver run can make fruit identity the entrance. A deep Gold set can emphasize strain selection. Rose Gold can add a deliberately edited tier. House Line can ground the block in the core brand, while the Line and THC Design create individual and collaborative points of interest.",
        "The complete series pages on this Oklahoma property name every official Silver, Gold, and Rose Gold product from the current main-site sitemap. That gives staff a clean reference and protects ordering conversations from guessed series assignments or outdated third-party lists.",
      ],
    },
    {
      id: "in-store-support",
      heading: "Brand presence beyond the package",
      imageCount: 1,
      paragraphs: [
        "The package is the permanent in-store asset, but a wholesale brand can also support attention through activations, promotions, and compliant samples where allowed and properly managed. Those moments give staff a chance to connect the construction, format differences, and series architecture to the physical products already on the shelf.",
        "An activation works best when it reinforces recognition rather than creating a temporary identity that disappears afterward. Presidential’s crest, product art, and color structure give signage and conversation something consistent to point back to. The patient should still recognize the package after the event is over.",
        "Promotions can likewise be framed around product education, a selected format, or a coordinated series without making unsupported effects claims. Samples and other in-store support must remain inside applicable Oklahoma rules and the retailer’s own compliance process. This page describes the brand’s available modes of support, not a universal offer or legal instruction.",
        "Consistency of raw goods is the operating foundation beneath those visible moments. Reliable materials, recognizable construction, and disciplined package identity help staff speak about what is actually in front of them. The brand proposition weakens if the visual system is consistent but the supplied product story is not; both sides have to work together.",
      ],
    },
    {
      id: "moratorium-market",
      heading: "Why it matters in a moratorium market",
      imageCount: 1,
      paragraphs: [
        "Oklahoma’s moratorium on new grower, processor, and dispensary licenses changes the competitive context for existing shops. HB 2095 extended the moratorium in 2023, and HB 3143 extended its endpoint again in 2026. Current licensees can renew, while transfer activity requires OMMA approval and now carries additional restrictions.",
        "The practical retail result is a mature field in which existing licensed dispensaries compete hard for many of the same patients. A buyer cannot rely on a steady stream of new storefront novelty to create distinction. Assortment, staff familiarity, package visibility, responsible promotion, and dependable wholesale relationships carry more of the work.",
        "Presidential offers a catalog large enough to curate and structured enough to remain legible. Four formats create physical variety. Six groupings create visual and naming variety. Close to two hundred Oklahoma doors already carry the brand, giving it statewide recognition without implying that every retailer should hold the same assortment.",
        [
          { text: "Review the " },
          { text: "full official Presidential catalog", href: `${MAIN}/moon-rocks` },
          { text: " to see the current products behind the proposition. A commercial conversation can follow through the appropriate wholesale channel; this public page stays where it should—clear about the brand, honest about the market, and silent on unverified deal economics." },
        ],
      ],
    },
  ],
  relatedLinks: [
    upLink,
    { href: "/find", label: "Finding Presidential", description: "See how the public locator routes patients to licensed retail." },
    { href: "/oklahoma", label: "Cannabis in Oklahoma", description: "Review the medical program and current moratorium context." },
  ],
  sources: [
    { label: "Official Presidential product catalog", href: `${MAIN}/moon-rocks` },
    { label: "OMMA dispensary license information", href: DISPENSARY },
    { label: "Oklahoma Legislature HB 2095", href: HB2095 },
    { label: "Oklahoma Legislature HB 3143", href: HB3143 },
  ],
};

const oklahomaPage: PageContent = {
  path: "/oklahoma",
  kind: "article",
  h1: "Cannabis in Oklahoma",
  title: "Cannabis in Oklahoma | Medical Program and Market Guide",
  description: "Oklahoma’s medical cannabis program, patient and visitor licenses, possession limits, market structure, moratorium, tracking, tax, and current status.",
  intro: [
    "Oklahoma’s cannabis framework is medical. This page keeps the complete state picture together so product and series pages can remain product-first: the 2018 program, patient and visitor credentials, possession and cultivation allowances, the commercial market, and where the state stands after voters rejected adult-use State Question 820 in 2023.",
    "This is an official Presidential brand guide, not legal advice. OMMA rules, forms, fees, and procedures can change. Applicants, patients, and businesses should use the cited state sources for current requirements and consult qualified counsel when a legal interpretation matters.",
  ],
  sections: [
    {
      id: "the-programme",
      heading: "The program",
      imageCount: 1,
      paragraphs: [
        "Oklahoma voters approved State Question 788 at the June 26, 2018 primary election, establishing the state medical marijuana framework. The Oklahoma State Department of Health created the Oklahoma Medical Marijuana Authority to administer it; OMMA later became an independent state agency while continuing to license patients and businesses, issue rules, inspect licensees, and oversee the regulated market.",
        "The patient framework is physician-led and does not publish a statutory list of qualifying conditions that a patient must select from. An authorized physician evaluates the patient and signs the required recommendation form. The absence of a fixed conditions list does not remove the recommendation requirement, turn a physician visit into a formality, or authorize a brand to make medical claims.",
        "Licensed dispensaries are the retail channel. They may sell to the patient and other license holders permitted by the state framework, but a brand website is not a dispensary and does not complete an Oklahoma transaction. Presidential distributes wholesale, and its Oklahoma product pages direct licensed patients toward participating licensed retailers.",
        "OMMA’s current rules, application materials, guidance, and licensing data are the practical source of truth. This page summarizes the high-level framework as of August 2026 and links those official sources directly rather than copying forms or presenting a legal snapshot as permanent.",
      ],
    },
    {
      id: "patient-license",
      heading: "The patient license",
      imageCount: 1,
      paragraphs: [
        "An Oklahoma resident adult patient license is generally valid for two years. The application requires proof of identity and Oklahoma residency, an acceptable photo, and a signed Physician Recommendation Form from an authorized physician. OMMA says the adult recommendation form must be dated within 30 days of application submission.",
        "The standard nonrefundable state application fee is $100 plus the listed processing fee. With acceptable proof of Medicaid or Medicare enrollment, or status as a veteran with a 100% disability rating, the state application fee is reduced to $20 plus the listed processing fee. The applicant should check OMMA’s current fee table before submitting.",
        "The physician visit is separate from the OMMA fee. Provider pricing is not set by this site and can vary; prospective applicants may encounter recommendation appointments quoted in a broad range of roughly $100 to $300 and should confirm the provider’s charge, credentials, and required records before booking. That private fee is not paid to Presidential or to the dispensary.",
        "A physician recommendation is not the same thing as an active patient credential. Approval, license status, and expiration matter at retail. OMMA’s current guidance also describes forms of approved-status identification that may be used during its licensing-system transition, but patients should check the latest agency instructions rather than relying on an old screenshot or third-party summary.",
      ],
    },
    {
      id: "visitors",
      heading: "Visitors",
      imageCount: 1,
      paragraphs: [
        "An out-of-state medical marijuana card does not work by itself at an Oklahoma dispensary. This is the detail visitors most often get wrong. Eligible nonresidents apply for Oklahoma’s out-of-state patient license, and that Oklahoma credential is the route that authorizes purchase, possession, use, and cultivation within the state framework.",
        "Eligibility depends on holding a medical marijuana patient license issued by another state government. OMMA specifically distinguishes a state-issued patient license from a prescription or document issued only by an out-of-state medical provider. Applicants submit the required proof of the state-issued license, identification, and photo through OMMA.",
        "The out-of-state license is valid for 30 days. OMMA lists a $100 nonrefundable application fee plus its processing fee, with no reduced temporary-patient rate. Timing matters because approval is not instantaneous and the Oklahoma license must be active for the dispensary purchase.",
        [
          { text: "After the proper Oklahoma credential is active, the " },
          { text: "official Presidential Oklahoma locator", href: `${MAIN}/find-us/ok` },
          { text: " can identify participating licensed retailers. The locator is not a substitute for the license, and a home-state card is not a shortcut around OMMA’s visitor process." },
        ],
      ],
    },
    {
      id: "what-oklahoma-permits",
      heading: "What Oklahoma permits",
      imageCount: 1,
      paragraphs: [
        "OMMA’s current Patient Rights and Responsibilities guide says a licensed patient may possess, at one time, up to three ounces of marijuana on their person, up to eight ounces of marijuana in their residence, and up to one ounce of concentrated marijuana. Those allowances operate at the same time; the home amount is not a replacement for the on-person amount.",
        "The same guide lists six mature marijuana plants and the harvested marijuana, plus six seedling plants. Home cultivation carries additional requirements: the grow must be on property owned by the patient or used with the property owner’s written permission, and plants cannot be visible with normal vision from an adjacent street.",
        "The original SQ 788 framework was codified beginning in Title 63, and older materials often refer to 63 O.S. § 420A et seq. OMMA’s current rights page cites 63 O.S. § 420 and OAC 442:10-2-8 for the possession limits. The current agency citation should govern a legal check rather than a legacy section label standing alone.",
        "Other restrictions still apply. Patients may not share legally purchased products with another person, even if that person is also licensed, and they may not carry medical marijuana across state lines. Safe storage, child-resistant packaging, and rules around public smoking or vaping remain separate responsibilities from the quantity limits.",
      ],
    },
    {
      id: "the-market",
      heading: "The market",
      imageCount: 1,
      paragraphs: [
        "Oklahoma’s program grew with exceptional speed. In 2021, OMMA described itself as one of the country’s fastest-growing medical marijuana authorities and reported serving more than 375,000 patients and 12,000 businesses. The 12,000-plus peak-era license environment helped create a dense field of growers, processors, and dispensaries before later enforcement, renewal changes, and market contraction reduced active totals.",
        "The state began a moratorium on new grower, processor, and dispensary licenses in August 2022. HB 2095 extended the endpoint in 2023. HB 3143, approved in May 2026, extended it again to August 1, 2028 unless OMMA’s executive director determines the named licensing-review, inspection, and investigation conditions are complete earlier.",
        "The moratorium does not erase existing licensees. Current businesses can renew, and ownership transfer remains possible only through the required OMMA process. HB 3143 added restrictions around transfer applications and requires written approval; pending administrative actions or appeals can affect whether and when an application may be submitted.",
        "Oklahoma uses Metrc as its seed-to-sale tracking system. Licensed businesses record regulated inventory movement through that system, creating a traceability layer from commercial production into the licensed channel. Tracking does not make a public brand site the inventory authority; the retailer still controls what is actually available on its shelf.",
        "SQ 788 also authorized a 7% excise tax on retail medical marijuana and medical marijuana products sold by dispensaries to patients. OMMA publishes recurring tax reports alongside archived license data, which is why this page avoids freezing a current patient or dispensary count into marketing copy when the agency maintains dated totals directly.",
      ],
    },
    {
      id: "where-it-stands",
      heading: "Where it stands",
      imageCount: 0,
      paragraphs: [
        "Oklahoma remains a medical cannabis state. On March 7, 2023, voters rejected State Question 820, the adult-use proposal. The official election record and subsequent statewide audit confirm the result. The rejection did not repeal SQ 788 or end the existing medical framework; patients and businesses continued under OMMA licensing and regulation.",
        "That status shapes every product page on this site. Presidential products are promoted for licensed retail, not direct sale. The appropriate active patient or visitor license comes first, a participating licensed dispensary completes the lawful transaction, and current OMMA rules control the program details.",
        [
          { text: "The " },
          { text: "official Presidential product catalog", href: `${MAIN}/moon-rocks` },
          { text: " remains the destination for exact product records, while this Oklahoma guide keeps state requirements consolidated. Product discovery and legal eligibility are connected steps, but neither should be mistaken for the other." },
        ],
        "The best final check is always current and specific. Use OMMA for license status, rules, fees, and market requirements; use the official product page for the item; and use the licensed retailer for local inventory. That three-source approach is more durable than a scattered set of legal footnotes across twelve product pages.",
      ],
    },
  ],
  relatedLinks: [
    upLink,
    { href: "/find", label: "Finding Presidential", description: "Move from the medical framework to the official Oklahoma locator." },
  ],
  sources: [
    { label: "Oklahoma Medical Marijuana Authority", href: OMMA },
    { label: "OMMA patient license information", href: PATIENTS },
    { label: "OMMA Patient Rights and Responsibilities", href: RIGHTS },
    { label: "OMMA Rules and Legislation", href: OMMA_RULES },
    { label: "OMMA licensing, tracking, and tax data", href: OMMA_DATA },
    { label: "OMMA program growth and 2021 business totals", href: OMMA_HISTORY },
    { label: "Oklahoma Legislature HB 2095", href: HB2095 },
    { label: "Oklahoma Legislature HB 3143", href: HB3143 },
    { label: "Official June 26, 2018 election results", href: ELECTION_2018 },
    { label: "Official March 7, 2023 election results", href: ELECTION_2023 },
  ],
};

const aboutPage: PageContent = {
  path: "/about",
  kind: "about",
  h1: "About Presidential",
  title: "About Presidential | The Official Oklahoma Brand Site",
  description: "The original Presidential brand, founded in Los Angeles in 2012 and carried through licensed Oklahoma dispensaries.",
  intro: [
    "Presidential THC Oklahoma is the official state property for the original Presidential brand. It presents the products, explains the four formats and six catalog groupings, and connects Oklahoma patients and retailers to the main Presidential catalog and licensed retail network.",
  ],
  sections: [
    {
      id: "los-angeles-2012",
      heading: "Los Angeles, 2012",
      imageCount: 1,
      paragraphs: [
        "Presidential began in Los Angeles in 2012 around a memorable three-layer product construction: flower carried through with cannabis concentrate and finished in kief. Moon Rocks became the flagship, and the same product language expanded into infused pre-rolls, tobacco-free hemp-wrap blunts, and compact minis.",
        "From the beginning, the package had to carry more than a logo. It needed to make the product recognizable, give individual names their own character, and hold several formats inside one identity. That combination of construction and visual presence is the thread the Oklahoma property preserves today.",
        [
          { text: "The " },
          { text: "official Presidential story", href: `${MAIN}/our-story` },
          { text: " carries the broader company history. This site narrows the view to Oklahoma while keeping the crest, product art, and canonical main-site relationship unmistakably official." },
        ],
      ],
    },
    {
      id: "the-catalog",
      heading: "Forty-seven products, one system",
      imageCount: 1,
      paragraphs: [
        "The current catalog contains 47 products across six groupings and four formats. Silver has seven fruit-forward identities, Gold has nineteen strain-led identities, and Rose Gold has five connoisseur identities. The Presidential Line adds ten products, House Line adds three core-format products, and Presidential x THC Design adds three collaboration products.",
        "Moon Rocks, blunts, pre-rolls, and minis give those identities different physical and package expressions. Series and format pages on this property keep the system easy to navigate, while unique linked artwork sends every featured package to its matching official product record.",
        "The catalog is broad without becoming anonymous. Fruit names, strain names, character-led products, core house formats, and a cultivation collaboration all have a defined place. That architecture lets Presidential add range while keeping one crest and one official source visible across every choice.",
      ],
    },
    {
      id: "oklahoma-wholesale",
      heading: "Wholesale through licensed Oklahoma retail",
      imageCount: 1,
      paragraphs: [
        "Presidential sells wholesale through licensed retailers. Close to two hundred Oklahoma dispensary doors carry the brand, making the state its second-largest market by door count. Individual stores choose their own assortment, so current availability is confirmed through the official Oklahoma locator and the licensed retailer.",
        "This site does not sell product, publish a copied retailer address table, or impersonate a neutral review outlet. It gives the brand an Oklahoma home, makes the product family understandable, and routes each next step to the source that actually owns it.",
        [
          { text: "Explore the " },
          { text: "complete official Presidential catalog", href: `${MAIN}/moon-rocks` },
          { text: " for the canonical product collection. This Oklahoma property remains focused: original in its writing, official in its identity, product-first in its design, and connected to lawful licensed retail rather than direct online sale." },
        ],
      ],
    },
  ],
  relatedLinks: [
    upLink,
    { href: "/moon-rocks", label: "Presidential Moon Rocks", description: "Begin with the original flagship format." },
    { href: "/retailers", label: "For Oklahoma retailers", description: "Read the wholesale shelf proposition for licensed buyers." },
  ],
  sources: [
    { label: "Official Presidential story", href: `${MAIN}/our-story` },
    { label: "Official Presidential product catalog", href: `${MAIN}/moon-rocks` },
    { label: "Official Presidential Oklahoma locator", href: `${MAIN}/find-us/ok` },
  ],
};

export const pages: PageContent[] = [
  homePage,
  moonRocksPage,
  bluntsPage,
  preRollsPage,
  minisPage,
  silverPage,
  goldPage,
  roseGoldPage,
  findPage,
  retailersPage,
  oklahomaPage,
  aboutPage,
];
export const pagesByPath = new Map(pages.map((page) => [page.path, page]));
