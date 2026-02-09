import fs from "fs";

// Calculate and return legislator's ages based on current day
function calculateAge(birthdayStr) {
  if (!birthdayStr) return null;
  const birthDate = new Date(birthdayStr);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  length;
  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }
  return age;
}

// Function to process legislators-current.json data
async function parseCongressData(filepath) {
  try {
    const data = await fs.promises.readFile(filepath, "utf8");
    const legislators = JSON.parse(data);

    const processed = legislators
      .map((person) => {
        const currentTerm = person.terms[person.terms.length - 1];
        return {
          fullName:
            person.name.official_full ||
            `${person.name.first} ${person.name.last}`,
          age: calculateAge(person.bio.birthday),
          party: currentTerm.party,
          type: currentTerm.type,
          gender: person.bio.gender,
          state: currentTerm.state,
        };
      })
      .filter((p) => p.age !== null);

    // Filter by senate/house
    const senate = processed.filter((p) => p.type === "sen");
    const house = processed.filter((p) => p.type === "rep");

    // Filter by Oldest/Youngest congressman
    const sortByAge = (a, b) => a.age - b.age;

    const sortedSenate = [...senate].sort(sortByAge);
    const sortedHouse = [...house].sort(sortByAge);

    console.log("Senate: Oldest & Youngest");
    console.log(
      `Oldest: ${sortedSenate[sortedSenate.length - 1].fullName} (${sortedSenate[sortedSenate.length - 1].age}), Party: ${sortedSenate[sortedSenate.length - 1].party}`,
    );
    console.log(
      `Youngest: ${sortedSenate[0].fullName} (${sortedSenate[0].age}), Party: ${sortedSenate[0].party}`,
    );

    console.log("\nHouse: Oldest & Youngest");
    console.log(
      `Oldest: ${sortedHouse[sortedHouse.length - 1].fullName} (${sortedHouse[sortedHouse.length - 1].age}), Party: ${sortedHouse[sortedHouse.length - 1].party}`,
    );
    console.log(
      `Youngest: ${sortedHouse[0].fullName} (${sortedHouse[0].age}), Party: ${sortedHouse[0].party}`,
    );

    // Calculate average age for every party
    const partyData = {};
    processed.forEach((p) => {
      if (!partyData[p.party]) partyData[p.party] = { totalAge: 0, count: 0 };
      partyData[p.party].totalAge += p.age;
      partyData[p.party].count += 1;
    });

    console.log("\nAverage age per Party");
    for (const party in partyData) {
      const avg = (partyData[party].totalAge / partyData[party].count).toFixed(
        2,
      );
      console.log(`${party}: ${avg} years old`);
    }

    // Gender Breakdown
    const genderData = { M: 0, F: 0 };
    processed.forEach((p) => genderData[p.gender]++);

    console.log("\nGender Breakdown ");
    console.log(`Male: ${genderData.M}`);
    console.log(`Female: ${genderData.F}`);
  } catch (err) {
    console.error("Error reading/parsing file:", err);
  }
}

parseCongressData("legislators-current.json");
