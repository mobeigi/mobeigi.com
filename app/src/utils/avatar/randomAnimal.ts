import BearSvg from '@/assets/icons/animals/Bear.svg?url';
import BeaverSvg from '@/assets/icons/animals/Beaver.svg?url';
import CamelSvg from '@/assets/icons/animals/Camel.svg?url';
import CatSvg from '@/assets/icons/animals/Cat.svg?url';
import CheetahSvg from '@/assets/icons/animals/Cheetah.svg?url';
import DeerSvg from '@/assets/icons/animals/Deer.svg?url';
import DogSvg from '@/assets/icons/animals/Dog.svg?url';
import DuckSvg from '@/assets/icons/animals/Duck.svg?url';
import ElephantSvg from '@/assets/icons/animals/Elephant.svg?url';
import FrogSvg from '@/assets/icons/animals/Frog.svg?url';
import GiraffeSvg from '@/assets/icons/animals/Giraffe.svg?url';
import GorillaSvg from '@/assets/icons/animals/Gorilla.svg?url';
import HenSvg from '@/assets/icons/animals/Hen.svg?url';
import HippopotamusSvg from '@/assets/icons/animals/Hippopotamus.svg?url';
import HorseSvg from '@/assets/icons/animals/Horse.svg?url';
import KangarooSvg from '@/assets/icons/animals/Kangaroo.svg?url';
import KoalaSvg from '@/assets/icons/animals/Koala.svg?url';
import LionSvg from '@/assets/icons/animals/Lion.svg?url';
import LlamaSvg from '@/assets/icons/animals/Llama.svg?url';
import MonkeySvg from '@/assets/icons/animals/Monkey.svg?url';
import OwlSvg from '@/assets/icons/animals/Owl.svg?url';
import PandaBearSvg from '@/assets/icons/animals/Panda Bear.svg?url';
import PenguinSvg from '@/assets/icons/animals/Penguin.svg?url';
import PolarBearSvg from '@/assets/icons/animals/Polar Bear.svg?url';
import RabbitSvg from '@/assets/icons/animals/Rabbit.svg?url';
import RhinocerosSvg from '@/assets/icons/animals/Rhinoceros.svg?url';
import SharkSvg from '@/assets/icons/animals/Shark.svg?url';
import SheepSvg from '@/assets/icons/animals/Sheep.svg?url';
import SnakeSvg from '@/assets/icons/animals/Snake.svg?url';
import TigerSvg from '@/assets/icons/animals/Tiger.svg?url';
import TurtleSvg from '@/assets/icons/animals/Turtle.svg?url';
import WalrusSvg from '@/assets/icons/animals/Walrus.svg?url';
import WolfSvg from '@/assets/icons/animals/Wolf.svg?url';
import ZebraSvg from '@/assets/icons/animals/Zebra.svg?url';

import crypto from 'crypto';

const animalSvgUrlList = [
  BearSvg,
  BeaverSvg,
  CamelSvg,
  CatSvg,
  CheetahSvg,
  DeerSvg,
  DogSvg,
  DuckSvg,
  ElephantSvg,
  FrogSvg,
  GiraffeSvg,
  GorillaSvg,
  HenSvg,
  HippopotamusSvg,
  HorseSvg,
  KangarooSvg,
  KoalaSvg,
  LionSvg,
  LlamaSvg,
  MonkeySvg,
  OwlSvg,
  PandaBearSvg,
  PenguinSvg,
  PolarBearSvg,
  RabbitSvg,
  RhinocerosSvg,
  SharkSvg,
  SheepSvg,
  SnakeSvg,
  TigerSvg,
  TurtleSvg,
  WalrusSvg,
  WolfSvg,
  ZebraSvg,
];
/**
 * Returns a random animal SVG url for the provided seed.
 * This function is deterministic in that it will return the same output for the same input seed.
 *
 * @param seed The string to use as the seed.
 * @returns A url pointing to the animal SVG.
 */
export const getRandomAnimalSvgUrl = (seed: string): string => {
  // Use md5 for speed as security is not a concern here
  const hash = crypto.createHash('md5').update(seed).digest();

  // Use the first 4 bytes of the hash as an integer (32 bits) and map it to the animal array length
  const index = hash.readUInt32BE(0) % animalSvgUrlList.length;

  return animalSvgUrlList[index];
};
