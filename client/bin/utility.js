/**
 * safeLog
 * Will turn logging off based on enviornment
 */
// eslint-disable-next-line no-console
const logFunc = process.env.NODE_ENV === 'development' ? console.log : () => {};
export const safeLog = (...args) => {
  args = args.map(arg => typeof arg === 'object' ? JSON.stringify(arg, null, 2) : arg.toString());
  logFunc.apply(console, args);
};
