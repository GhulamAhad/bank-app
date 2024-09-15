"use strict";

// Bank Application start

const loginHide = document.querySelector(".all_login_materil_holder");
const showMain = document.querySelector(".app");
const showFoter = document.querySelector(".summary_cona");
const contanerMovements = document.querySelector(".movements_inner");
const userNamefromuser = document.querySelector("#text_id");
const userPincode = document.querySelector("#user_pin");
const toEnterBtn = document.querySelector(".arrow");
const balanceShow = document.querySelector(".balance__value");
const inBalance = document.querySelector(".summary__value");
const outBalance = document.querySelector(".summary__value--out");
const interstShow = document.querySelector(".summary__value--interest");
const transferIDGater = document.querySelector(".t_id");
const transferPINGater = document.querySelector(".pin_code");
const transferPamentBtn = document.querySelector(".transfer_btn");
const showOwner = document.querySelector(".toShowname");
const closeAcountId = document.querySelector(".close_user_id");
const closeAcountPin = document.querySelector(".close_user_pin_code");
const closeAcountBtn = document.querySelector(".arrow_close_btn");
const loneAmount=document.querySelector('.lone_value');
const loneBtn=document.querySelector('.arrow_lone_btn');

const acount1 = {
  ownr: "Jonas Schmedtman",
  movements: [200, 450, -440, 3000, -650, -130, 70, 1300],
  intrestRate: 1.2,
  pin: 1111,
};
const acount2 = {
  ownr: "Ghulam Ahad",
  movements: [5000, 3400, -150, -3210, -790, -1000, 8500, -30],
  intrestRate: 1.5,
  pin: 2222,
};
const acount3 = {
  ownr: "Steven Thomus Willams",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  intrestRate: 1.2,
  pin: 3333,
};
const allData = [acount1, acount2, acount3];

const disPlayMovements = function (acc) {
  contanerMovements.innerHTML = "";
  acc.movements.forEach(function (mov, i) {
    const type = mov > 0 ? "deposit" : "withdrawal";
    // console.log(type);
    const html = `
    <div class="movements__row">
    <div class="movements__type movements__type--">${
      i + 1
    }  ${type}  ${" "}</div>
    <div class="movements__date">3 days ago</div>
    <div class="movements__value">${mov}€</div>
</div>`;
    contanerMovements.insertAdjacentHTML("afterbegin", html);
  });
};
// disPlayMovements(acount1.movements);

const namefirstLater = function (accs) {
  accs.forEach(function (acc) {
    acc.userName = acc.ownr
      .toLowerCase()
      .split(" ")
      .map(function (name) {
        return name[0];
      })

      .join("");
  });
};

namefirstLater(allData);

const calcPrinBalance = function (acc) {
  acc.balance = acc.movements.reduce((accamu, val) => accamu + val, 0);
  balanceShow.textContent = `${acc.balance}€`;
};
// calcPrinBalance(acount1.movements);

const calcDispalySumry = function (acc) {
  const incomes = acc.movements
    .filter((val) => val > 0)
    .reduce((accamu, val) => accamu + val, 0);
  inBalance.textContent = `${incomes}€`;
  const out = acc.movements
    .filter((val) => val < 0)
    .reduce((accamu, val) => accamu + val, 0);
  outBalance.textContent = `${Math.abs(out)}€`;
  const interest = acc.movements
    .filter((val) => val > 0)
    .map((deposi) => (deposi * 1.2) / 100)
    .filter((val) => val > 1)
    .reduce((accamu, val) => accamu + val, 0);
  interstShow.textContent = `${interest}€`;
};

// calcDispalySumry(acount1.movements);
const updateUI = function (acc) {
  disPlayMovements(acc);
  calcPrinBalance(acc);
  calcDispalySumry(acc);
};

let currentAcaunt;

toEnterBtn.addEventListener("click", function (e) {
  e.preventDefault();

  const uNf = userNamefromuser.value;
  const pinget = Number(userPincode.value);

  currentAcaunt = allData.find((val) => val.userName === uNf);
  if (currentAcaunt?.pin === pinget) {
    showOwner.textContent = `Welcome Back,${currentAcaunt.ownr.split(""[0])}`;
  }
  // alert ('well come in bank app');
  showMain.style.display = "block";
  showFoter.style.display = "block";
  userNamefromuser.value = userPincode.value = "";
  updateUI(currentAcaunt);
});

loneBtn.addEventListener('click',function(e){
  e.preventDefault();
  const lone=Number(loneAmount.value);
  if(lone>0&&currentAcaunt.movements.some((val)=>val>=lone*0.1)){
    currentAcaunt.movements.push(lone);
    updateUI(currentAcaunt);
  }
  loneAmount.value='';
})

transferPamentBtn.addEventListener("click", function (e) {
  e.preventDefault();
  const amountT = Number(transferPINGater.value);
  // const tId = transferIDGater.value;
  const receverAcc = allData.find(
    (acc) => acc.userName === transferIDGater.value
  );
  transferIDGater.value = transferPINGater.value = "";
  if (
    amountT > 0 &&
    receverAcc &&
    currentAcaunt.balance >= amountT &&
    receverAcc?.userName !== currentAcaunt.userName
  ) {
    currentAcaunt.movements.push(-amountT);
    receverAcc.movements.push(amountT);
    updateUI(currentAcaunt);
  }
});

closeAcountBtn.addEventListener("click", function (e) {
  e.preventDefault();
  const uNf = closeAcountId.value;
  const pinget = Number(closeAcountPin.value);
  if (uNf === currentAcaunt.userName && pinget === currentAcaunt.pin) {
    const index = allData.findIndex(
      (acc) => acc.userName === currentAcaunt.userName
    );

    allData.splice(index, 1);
    showMain.style.display = "none";
    showFoter.style.display = "none";
  }
  closeAcountId.value = closeAcountPin.value = "";
});

// Bank Aplication End//

// const allData = [acount1, acount2, acount3];

// const namefirstLater = function (catchName) {
//   catchName.forEach(function (ca) {
//     ca.userName = ca.ownr
//       .toLowerCase()
//       .split(" ")
//       .map((name) => name[0])
//       .join("");
//   });
// };

// const resultFunction = function (main, inV, out,intrV) {
//   // allData=main,inV,out,intrV;
//   for(const a of allData){
//     a.currentBalance=main;
//     a.inBalance=inV;
//   }
//   console.log(allData)
// balanceShow.textContent = `${main}€`;
// inBalance.textContent = `${inV}€`;
//   outBalance.textContent = `${Math.abs(out)}€`;
// interstShow.textContent=`${intrV}€`;
// };

// namefirstLater(allData);

// const disPlayMovements = function (movement) {
//   contanerMovements.innerHTML = "";
//   movement.forEach(function (mov, i) {
//     const type = mov > 0 ? "deposit" : "withdrawal";
//     // console.log(type);
//     const html = `
//     <div class="movements__row">
//     <div class="movements__type movements__type--">${
//       i + 1
//     }  ${type}  ${" "}</div>
//     <div class="movements__date">3 days ago</div>
//     <div class="movements__value">${mov}€</div>
// </div>`;
//     contanerMovements.insertAdjacentHTML("afterbegin", html);
//   });
// };
// disPlayMovements(acount1.movements);
// let sum = 0;
// let p = 0;
// let sb = 0;
// let interst=0;
// const addFun = function (catchTrans,interstGeter) {

//   for (const s of catchTrans) {
//     sum = sum + s;
//     if (s > 0) {
//       p = p + s;
//       interst=((p*interstGeter)/100);
//     }
//     if (s < 0) {
//       sb = sb + s;
//     }
//   }
//   resultFunction(sum, p, sb,interst);
// };

// // const onlyReci=function(cat)

// toEnterBtn.addEventListener("click", function () {
// const uNf = userNamefromuser.value;
// const pinget = Number(userPincode.value);
//   let found = false;
//   for (const n of allData) {
//     if (uNf === n.userName && pinget === n.pin) {
//       // loginHide.style.opacity= 0;
// loginHide.style.display= 'none';

// showMain.style.display='block';
// showFoter.style.display='block';

// disPlayMovements(n.movements);
// addFun(n.movements,n.intrestRate);
// alert ('well come in bank app');
//       found = true;
//     }
//   }
//   if (!found) {
//     alert("wrong pasword");
//   }
// });

// transferPamentBtn.addEventListener('click',function(e){

//   e.preventDefault();
//   const tId=transferIDGater.value;
//   const amountT=Number(transferPINGater.value);
//   const receverAcc=allData.find(acc=>acc.userName);
//   console.log(tId,amountT,receverAcc.userName,sum
//   );
//   if(amountT > 0 && amountT <=sum && tId === receverAcc.userName){
//      sum=sum-amountT;
// sum=s;
//   balanceShow.textContent = `${s}€`;

// const tAmount=allData.find(t=>t.movements.push(amountT));
// }
// })

// console.log(allData.acount1)
// let a = 0;
// const withdrawalf = [];
// for (const w of acount2.movements) {
//   if (w < 0) {
//     a = w + a;
//   }
// }
// withdrawalf.push(a);
// console.log(allData);
// const movement=allData.map()
// const movement = [200, 450, -440, 3000, -650, -130, 70, 1300];

// const euro = 1.1;
// const movementToUSD=movement.map(function(mav){
//   return mav*euro;
// })
// const movementToUSD=movement.map((mav)=> mav*euro)
// console.log(movement)
// console.log(movementToUSD)
// const takein=[];
// for(const m of movement){
// takein.push(m*euro);
// }
// console.log(takein)

// const deposit=movement.filter(mov>0)
// console.log(deposit)
// const arr1 = [5, 2, 4, 1, 15, 8, 3];
// const ageFinder = function (arr) {
//   const age = arr.filter((val) => val >= 2).map((val) => 16 + val * 4);
//   console.log(age);
// };
// ageFinder(arr1);

// const acount1 = {
//   ownr: "Jonas Schmedtman",
//   movements: [200, 450, -440, 3000, -650, -130, 70, 1300],
//   intrestRate: 1.2,
//   pin: 1111,
// };
// const acount2 = {
//   ownr: "Ghulam Ahad",
//   movements: [5000, 3400, -150, -3210, -790, -1000, 8500, -30],
//   intrestRate: 1.5,
//   pin: 2222,
// };
// const acount3 = {
//   ownr: "Steven Thomus Willams",
//   movements: [200, -200, 340, -300, -20, 50, 400, -460],
//   intrestRate: 1.2,
//   pin: 3333,
// };
// const acounts = [acount1, acount2, acount3];
// const totalIncome = acounts
//   .map((acc) => acc.movements)
//   .flat()
//   .reduce((accamu, val) => accamu + val, 0);
// console.log(totalIncome);
// const totalIncome2 = acounts
//   .flatMap((acc) => acc.movements)
//   .filter((valPostive) => valPostive > 0)
//   .reduce((accamu, val) => accamu + val, 0);
// console.log(totalIncome2);

// const movementGrater = acounts
//   .flatMap((acc) => acc.movements)
//   .filter((val) => val > 1000).length;
// // const nameOwner=acounts.flatMap((acc)=>acc.ownr)
// console.log(movementGrater);

// const { wid, dep } = acounts
//   .flatMap((acc) => acc.movements)
//   .reduce(
//     (sums, curs) => {
//       // curs > 0 ? (sums.dep += curs) : (sums.wid += curs);
//       sums[curs > 0 ? "wid" : "dep"] += curs;
//       return sums;
//     },
//     { wid: 0, dep: 0 }
//   );
// console.log(dep, wid);

// const toBeautifulHeading = function (getTital) {
//   const resrict = [
//     "a",
//     "an",
//     "the",
//     "but",
//     "or",
//     "an",
//     "is",
//     "in",
//     "on",
//     "which",
//   ];
//   const tital = getTital
//     .toLowerCase()
//     .split(" ")
//     .map((acc) =>
//       resrict.includes(acc) ? acc : acc[0].toUpperCase() + acc.slice(1)
//     )
//     .join(" ");
//   return tital;
// };
// console.log(
//   toBeautifulHeading(
//     "this is a very brave person and you also a great and hensome guy"
//   )
// );

// const dogs = [
//   { weight: 22, curFood: 250, owner: ["Alica", "Bob"] },
//   { weight: 8, curFood: 200, owner: ["Matilda"] },
//   { weight: 13, curFood: 275, owner: ["Sara", "Jon"] },
//   { weight: 32, curFood: 340, owner: ["Machal"] },
// ];

// dogs.forEach((d) => (d.recfood = Math.trunc(d.weight ** 0.75 * 28)));
// console.log(dogs);

// const n = dogs.find((s) => s.owner.includes("Sara"));

// console.log(`sara dog eating to ${n.curFood > n.recfood ? "much" : "less"}`);
// console.log(n);

// const ownerName=dogs.filter((g)=>g.curFood>g.recfood)
// .map((ownerget)=>ownerget.owner)
// .flat()
// console.log(ownerName)
// const ownerName2=dogs.filter((g)=>g.curFood<g.recfood)
// .map((ownerget)=>ownerget.owner)
// .flat()
// console.log(ownerName2)

// let proper=`Your ${ownerName.join(' and ')} Dog eat more than recomended `;
// console.log(proper);

// const sort=dogs.slice().sort((a,b)=>a.recfood-b.recfood)
// console.log(sort)