const isUuidInUrl = () => {
  const uuidRegex =
    /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i;
  const currentUrl = window.location.href;
  return uuidRegex.test(currentUrl);
};

export default isUuidInUrl;
