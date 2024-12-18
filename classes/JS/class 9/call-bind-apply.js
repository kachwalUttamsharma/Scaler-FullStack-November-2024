const cap = {
  name: "Steve",
  team: "cap",
  petersTeam: function (mem1, mem2) {
    console.log(
      `Hey ${this.name} am your neighborhood spiderman and I belong to ${this.team}'s team`
    );
    console.log(`I am working with ${mem1} & ${mem2} `);
  },
};

cap.petersTeam("Nayak", "Adil");
// DRY - do not repeat yourself
const ironman = {
  name: "Tony Strac",
  team: "Iron Man",
};

// this - ironman while using cap.petersteam

// call, apply, bind
// function borrowing from the object and help us with chaning this object

cap.petersTeam.call(ironman, "Nayak", "Adil");
cap.petersTeam.apply(ironman, ["Nayak", "Adil"]);

// bind  = store a function which is binded with this context( what ever context you prefer)
// When we want to use the method multiple times.

const ironManStoleCapTeamFunc = cap.petersTeam.bind(ironman);

console.log(ironManStoleCapTeamFunc);

ironManStoleCapTeamFunc("Deen", "Dayal");
ironManStoleCapTeamFunc("Deen", "Dayal");
ironManStoleCapTeamFunc("Deen", "Dayal");
ironManStoleCapTeamFunc("Deen", "Dayal");
