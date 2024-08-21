type Holding = {
  value: Number;
  name: String; // symbol
  description: String;
  weight: Number;
};

export type Props = {
  data: Holding[];
};
