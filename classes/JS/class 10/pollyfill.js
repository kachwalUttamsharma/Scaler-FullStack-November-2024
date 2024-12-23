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
  if (typeof this !== "function") {
    throw new Error(this, "is not a function");
  }
  if (
    !objOnWhichReqFnNeedToBeInvoked ||
    typeof objOnWhichReqFnNeedToBeInvoked !== "object"
  ) {
    throw new Error(objOnWhichReqFnNeedToBeInvoked, "is not a object");
  }
  const fnSymbol = Symbol(objOnWhichReqFnNeedToBeInvoked.name);
  objOnWhichReqFnNeedToBeInvoked[fnSymbol] = this;
  objOnWhichReqFnNeedToBeInvoked[fnSymbol](...params);
  delete objOnWhichReqFnNeedToBeInvoked[fnSymbol];
};

// cap.petersTeam.mycall(ironman, "Nayak", "Adil");

// apply
cap.petersTeam.apply(ironman, ["Nayak", "Adil"]);

Function.prototype.myapply = function (objOnWhichReqFnNeedToBeInvoked, params) {
  if (typeof this !== "function") {
    throw new Error(this, "is not a function");
  }
  if (
    !objOnWhichReqFnNeedToBeInvoked ||
    typeof objOnWhichReqFnNeedToBeInvoked !== "object"
  ) {
    throw new Error(objOnWhichReqFnNeedToBeInvoked, "is not a object");
  }
  const fnSymbol = Symbol(objOnWhichReqFnNeedToBeInvoked.name);
  objOnWhichReqFnNeedToBeInvoked[fnSymbol] = this;
  objOnWhichReqFnNeedToBeInvoked[fnSymbol](...params);
  delete objOnWhichReqFnNeedToBeInvoked[fnSymbol];
};

Function.prototype.mybind = function (
  objOnWhichReqFnNeedToBeInvoked,
  ...params
) {
  if (typeof this !== "function") {
    throw new Error(this, "is not a function");
  }
  if (
    !objOnWhichReqFnNeedToBeInvoked ||
    typeof objOnWhichReqFnNeedToBeInvoked !== "object"
  ) {
    throw new Error(objOnWhichReqFnNeedToBeInvoked, "is not a object");
  }
  const requredFunc = this;
  return function (...params1) {
    requredFunc.mycall(objOnWhichReqFnNeedToBeInvoked, ...params, ...params1);
  };
};

const bindedFunc = cap.petersTeam.mybind(ironman);
bindedFunc("Nayak", "Adil");

cap.petersTeam.myapply(ironman, ["Nayak", "Adil"]);
