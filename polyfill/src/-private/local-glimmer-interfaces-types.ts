// Including @glimmer/interfaces in package.json breaks typescript... :(
//  (in ember apps)
//
export interface Arguments {
  positional: readonly unknown[];
  named: Record<string, unknown>;
}
