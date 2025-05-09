export type CollectionName = "blog" | "projects" | "talks" | "links";

export type GlobalSite = {
  title: string;
  description: string;
  author: string;
  authorPhotoSrc: string;
  logo?: {
    darkThemeSrc?: string;
    lightThemeSrc?: string;
  };
};

export const GLOBAL: GlobalSite = {
  title: "alp1n3",
  description: "a collection of cybersecurity-related notes & projects.",
  author: "alp1n3",
  authorPhotoSrc: "/johndoe.jpeg",
  logo: {
    darkThemeSrc: "/logo/logo_dark.png",
    lightThemeSrc: "/logo/logo_light.png",
  },
};

type CollectionSite = {
  pageSize: number;
};

type HomeSite = {
  blogEntries?: number;
  projectEntries?: number;
  talkEntries?: number;
  linksEntries?: number;
};

export const HOME: HomeSite = {
  blogEntries: 5,
  projectEntries: 3,
  talkEntries: 3,
  linksEntries: 1,
};

type BlogSite = CollectionSite & {
  license: {
    name: string;
    href: string;
  };
};

export const BLOG: BlogSite = {
  pageSize: 10,
  license: {
    name: "CC BY-NC-ND 4.0",
    href: "https://creativecommons.org/licenses/by-nc-nd/4.0",
  },
};

export const PROJECTS: CollectionSite = {
  pageSize: 10,
};

export const TALKS: CollectionSite = {
  pageSize: 10,
};

export const TAGS: CollectionSite = {
  pageSize: 10,
};

export const LINKS: CollectionSite = {
  pageSize: 5,
};

type ContactInfo = {
  type: string;
  href?: string; // Altered to make it optional instead of required.
  displayAs?: string;
};

type ContactSite = ContactInfo[];

export const CONTACT: ContactSite = [
  {
    type: "Signal", // Previously "Email"
    //href: "mailto:email@example.com",
    displayAs: "Signal: alp1n3.01",
  },
  {
    type: "Contact Form", // Previously "X"
    //href: "https://x.com/BillGates",
    href: "https://letterbird.co/alp1n3",
    displayAs: "Email Me",
  },
  {
    type: "GitHub",
    href: "https://github.com/alp1n3-dev",
  },
  //{ // Leaving out LinkedIn for now.
  //type: "LinkedIn",
  //href: "https://www.linkedin.com/in/williamhgates/",
  //},
];
