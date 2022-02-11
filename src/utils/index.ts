const PATTERNS = {
  IPV4: /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/gi,
};

const getDestinationType = (destination: string) => {
  if (PATTERNS.IPV4.test(destination)) {
    return { destinationType: 'IPV4', destination };
  }

  try {
    const { hostname = '' } = new URL(destination);

    const domain = hostname.toLowerCase().replace('www.', '');

    if (Boolean(domain.localeCompare(destination.toLowerCase().replace('www.', '')) === 0)) {
      return { destinationType: 'DOMAIN', destination: domain };
    } else {
      return { destinationType: 'URL', destination };
    }
  } catch (err) {
    return { destinationType: 'URL', destination };
  }
};

export { PATTERNS, getDestinationType };
