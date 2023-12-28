const getUuidFromUrl = () => {
  const uuidRegex =
    /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  const currentUrl = window.location.href;
  const match = currentUrl.match(uuidRegex);
  return match ? match[0] : "";
};

export default getUuidFromUrl;
