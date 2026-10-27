// custom.d.ts or globals.d.ts
declare module "*.css" {
  // We can just export an empty object or any as a placeholder.
  // The actual CSS is handled by Next.js's build system.
  const content: any;
  export default content;
}
