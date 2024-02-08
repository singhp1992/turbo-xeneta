export type PortData = {
  code: string;
  name: string;
};

export type RouteData = {
  origin: PortData;
  destination: PortData;
};

export type MarketRate = {
  day: string;
  mean: number;
  low: number;
  high: number;
};
