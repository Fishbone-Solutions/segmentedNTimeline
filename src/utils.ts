export function calculateDateRange(finsldates: (Date | never)[]): { min: Date | undefined, max: Date | undefined } {
    const filteredDates = finsldates.filter(date => date instanceof Date) as Date[];
    return filteredDates.reduce(
      (acc, date) => {
        const min = acc.min ? (date < acc.min ? date : acc.min) : date;
        const max = acc.max ? (date > acc.max ? date : acc.max) : date || new Date("2026-01-01");
        return { min, max };
      },
      { min: undefined, max: undefined }
    );
  }