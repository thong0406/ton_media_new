export const FormatStringToCamelCase = str => {
    const splitted = str.split("-");
    if (splitted.length === 1) return splitted[0];
    return (
      splitted[0] +
      splitted
        .slice(1)
        .map(word => word[0].toUpperCase() + word.slice(1))
        .join("")
    );
};

export const GetStyleObjectFromString = str => {
    const style = {};
    str.split(";").forEach(el => {
      const [property, value] = el.split(":");
      if (!property) return;
      const formattedProperty = FormatStringToCamelCase(property.trim());
      style[formattedProperty] = value.trim();
    });
  
    return style;
};

export const InsertAt = (arr, ind, val) => {
    if (ind >= arr.length) {
      return [
        ...arr,
        val,
      ];
    }
    return [
      ...arr.slice(0, ind),
      val,
      ...arr.slice(ind)
    ];
  }