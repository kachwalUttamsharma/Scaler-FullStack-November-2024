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
const ironman = {
  name: "Tony Strac",
  team: "Iron Man",
};

// // call
// cap.petersTeam.call(ironman, "Nayak", "Adil");

Function.prototype.mycall = function (
  objOnWhichReqFnNeedToBeInvoked,
  ...params
) {
  // this -> point to something
  console.log("this", this); // petersTeam
  // petermsTeam => requireFn
  // ironman => {
  //   requiredFn: pertersTeam,
  //   name: "Tony Strac",
  //   team: "Iron Man",
  // }
  objOnWhichReqFnNeedToBeInvoked.requiredFn = this;
  objOnWhichReqFnNeedToBeInvoked.requiredFn(...params);
  delete objOnWhichReqFnNeedToBeInvoked.requiredFn;
};

// cap.petersTeam.mycall(ironman, "Nayak", "Adil");

// apply
cap.petersTeam.apply(ironman, ["Nayak", "Adil"]);

Function.prototype.myapply = function (objOnWhichReqFnNeedToBeInvoked, params) {
  objOnWhichReqFnNeedToBeInvoked.requiredFn = this;
  objOnWhichReqFnNeedToBeInvoked.requiredFn(...params);
  delete objOnWhichReqFnNeedToBeInvoked.requiredFn;
};

Function.prototype.mybind = function (
  objOnWhichReqFnNeedToBeInvoked,
  ...params
) {
  const requredFunc = this;
  return function (...params1) {
    requredFunc.mycall(objOnWhichReqFnNeedToBeInvoked, ...params, ...params1);
  };
};

const bindedFunc = cap.petersTeam.mybind(ironman);
bindedFunc("Nayak", "Adil");

cap.petersTeam.myapply(ironman, ["Nayak", "Adil"]);
// ------------------------------------------------------------------------
Function.prototype.mycall = function (
  objOnWhichReqFnNeedToBeInvoked,
  ...params
) {
  objOnWhichReqFnNeedToBeInvoked.requiredFn = this;
  objOnWhichReqFnNeedToBeInvoked.requiredFn(...params);
  delete objOnWhichReqFnNeedToBeInvoked.requiredFn;
};

Function.prototype.myapply = function (objOnWhichReqFnNeedToBeInvoked, params) {
  objOnWhichReqFnNeedToBeInvoked.requiredFn = this;
  objOnWhichReqFnNeedToBeInvoked.requiredFn(...params);
  delete objOnWhichReqFnNeedToBeInvoked.requiredFn;
};

Function.prototype.mybind = function (objOnWhichReqFnNeedToBeInvoked) {
  return (...params1) => {
    this.mycall(objOnWhichReqFnNeedToBeInvoked, ...params1);
  };
};
