/* eslint-disable @typescript-eslint/no-unused-vars */
// Types for compiled templates
declare module 'ember-functions-as-helper-polyfill/templates/*' {
  import type { TemplateFactory } from 'htmlbars-inline-precompile';
  const tmpl: TemplateFactory;
  export default tmpl;
}
