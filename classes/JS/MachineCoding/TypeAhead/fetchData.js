const getCountries = async (keywords) => {
  try {
    const response = await fetch(
      `https://restcountries.com/v3.1/name/${keywords}`
    );
    const result = await response.json();
    console.log(result);
    return result;
  } catch (error) {
    console.log("error while fetching countried data : ", error);
  }
};

export default getCountries;
