export type PortData = {
  code: string;
  name: string;
};

export type RouteData = {
  origin: PortData;
  destination: PortData;
};
