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

const getRandomIcon = () =>
  icons[Math.floor(Math.random() * (icons.length - 1))];

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
      name: generateName(),
    });
  }
  return res;
};

console.log(getIcon);

const generateIcons = (count: number) =>
  new Array(count).fill("").map(() => ({
    id: nanoid(),
    icon: getRandomIcon(),
    name: generateName(),
  }));

const getRandomStartCount = () =>
  Math.floor(Math.random() * (icons.length - 1));
export const cardsData = new Array(10).fill("").map(() => {
  const id = nanoid();
  const smallIcons = getIcon(getRandomStartCount(), 4);
  const smallIconIds = smallIcons.map((i) => i.id);
  return {
    id,
    label: generateName(14),
    largeIcons: generateIcons(3),
    modalIcons: shuffleArray(
      getIcon(getRandomStartCount(), Math.round(Math.random() * 15))
        .concat(smallIcons)
        .map((i) => ({ ...i, isSmall: smallIconIds.includes(i.id) }))
    ),
  };
});

function shuffleArray<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
