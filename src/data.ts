import { nanoid } from "nanoid";
import RandExp from "randexp";

const generateName = (max: number = 8) => {
  // Define the regular expression for your app name pattern
  const regex = `([A-Z][a-z]{2,${max}})`;
  const appNamePattern = new RandExp(regex);

  // Generate the app name
  return appNamePattern.gen();
};
const icons = [
  "skill-icons:linkedin",
  "skill-icons:twitter",
  "skill-icons:nginx",
  "unjs:ipx",
  "unjs:unbuild",
  "unjs:knitwork",
  "unjs:destr",
  "devicon:typescript",
  "logos:airbnb-icon",
  "logos:blender",
  "logos:discord-icon",
  "logos:facebook",
  "logos:github-octocat",
  "logos:google-gemini",
  "logos:microsoft-icon",
  "logos:octopus-deploy",
  "logos:reddit-icon",
  "logos:redis",
  "logos:visual-studio",
  "logos:visual-studio-code",
  "logos:weebly",
  "logos:winglang-icon",
  "logos:wearos",
  "logos:webplatform",
  "logos:webpack",
];

const getIcon = (start: number, count: number) => {
  const res: {
    id: string;
    icon: string;
    name: string;
  }[] = [];
  for (let index = 0; index < count; index++) {
    const i = start + index;
    const f = i > icons.length - 1;
    const icon = icons[f ? i - icons.length : i];
    res.push({
      id: nanoid(),
      icon,
      name: generateName(5),
    });
  }
  return res;
};

const getRandomStartCount = () =>
  Math.floor(Math.random() * (icons.length - 1));
export const cardsData = new Array(10).fill("").map(() => {
  const id = nanoid();
  const icons = getIcon(
    getRandomStartCount(),
    12 + Math.round(Math.random() * 5)
  );
  const largeIcons = icons.slice(0, 3);
  const modalIcons = icons.slice(4);

  return {
    id,
    label: generateName(8),
    largeIcons,
    modalIcons: modalIcons.concat(modalIcons.slice(0, 4)),
    shuffledModalIcons: shuffleArray(modalIcons),
  };
});

function shuffleArray<T>(arr: T[]): T[] {
  const array = [...arr];
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
