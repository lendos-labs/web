type AnyObject = Record<string, unknown>;

type Transformable = AnyObject | AnyObject[];

export const transformKeysToLowerCase = (data: Transformable): Transformable => {
  if (Array.isArray(data)) {
    return data.map(item => transformKeysToLowerCase(item) as AnyObject);
  }

  return Object.keys(data).reduce<AnyObject>((acc, key) => {
    acc[key.toLowerCase()] = data[key];
    return acc;
  }, {});
};
