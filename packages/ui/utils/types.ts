export type PortData = {
  code: string;
  name: string;
};

export type RouteData = {
  origin: PortData;
  destination: PortData;
};

export type MarketRate = {
  [x: string]: string | number | null;
  day: string;
  mean: number | null;
  low: number | null;
  high: number | null;
};

export type ObjectType = {
  [key: string]: string;
};
