export type PortData = {
  code: string;
  name: string;
};

export type RouteData = {
  origin: {
    code: string;
    name: string;
  };
  destination: {
    code: string;
    name: string;
  };
};

export type MarketRate = {
  day: string;
  mean: number;
  low: number;
  high: number;
};
