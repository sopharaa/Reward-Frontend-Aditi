const DEFAULT_OPTIONS: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "short",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
};

export const formatBangkokDateTime = (
  input: string | number | Date,
  options?: Intl.DateTimeFormatOptions,
): string => {
  const date = input instanceof Date ? input : new Date(input);

  if (Number.isNaN(date.getTime())) {
    return "-";
  }

  const formatOptions: Intl.DateTimeFormatOptions = {
    timeZone: "Asia/Bangkok",
    hour12: true,
    ...(options ?? DEFAULT_OPTIONS),
  };

  return new Intl.DateTimeFormat("en-US", formatOptions).format(date);
};

