export default config;

/**
 * Type declarations for
 *    import config from 'my-app/config/environment'
 */
declare const config: {
  environment: string;
  modulePrefix: string;
  podModulePrefix: string;
  // Support ember types for v3 and v4
  locationType: any;
  rootURL: string;
  APP: Record<string, unknown>;
};
