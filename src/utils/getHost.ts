type GetHost = () => string;

/**
 * @return host url
 */
export const getHost: GetHost = () => {
  return process.env.NEXT_PUBLIC_HOST;
};
