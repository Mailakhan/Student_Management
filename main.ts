#! /usr/bin/env node

import chalk from "chalk";
import inquirer from "inquirer";

const randomNumber: number = Math.floor(10000 + Math.random() * 90000);

let myBalance: number = 0;

let answer = await inquirer.prompt([
  {
    name: "students",
    type: "input",
    message: chalk.bgGreen("Enter student name"),
    validate: function (value) {
      if (value.trim() !== "") {
        return true;
      }
      return chalk.bgBlue("Please enter a non-empty value.");
    }
  },

  {
    name: "courses",
    type: "list",
    message: chalk.bgMagenta("Select the course to enrolled"),
    choices: ["Html", "Css", "Javascript", "Typescript", "Python"]
  }
]);
const courseFee: { [key: string]: number } = {
  'Html': 2000,
  'Css': 2500,
  'Javascript': 5000,
  'Typescript': 6000,
 ' Python': 7000,
};
console.log(chalk.blue(`\nCourse Fees ${courseFee[answer.courses]}/-\n`));

console.log(chalk.yellow(`Balance: ${myBalance}\n`));

let paymentType = await inquirer.prompt([
  {
    type: "list",
    name: "payment",
    message: chalk.bgYellow("Select Payment Method"),
    choices: ["Bank Transfer", "Easypaisa", "Jazzcash"]
  },
  {
    type: "input",
    name: "amount",
    message: chalk.bgBlue("Transfer Money"),
    validate: function (value) {
      if (value.trim() !== "") {
        return true;
      }
      return chalk.bgBlue("Please enter a non-empty value.");
    },
  },
]);
console.log(chalk.yellow(`\nYou Select Payment Method ${paymentType.payment}\n`));

const courseFees = courseFee[answer.courses];

const paymentAmount = parseFloat(paymentType.amount);

if (courseFees === paymentAmount) {
  console.log(chalk.magenta(
    `Congratulations,You have successfully enrolled in ${answer.courses}.\n`
  ));
  let ans = await inquirer.prompt([
    {
      type: "list",
      name: "select",
      message: chalk.bgCyanBright("What would you like to do next?"),
      choices: ["View status", "Exit"]
    },
  ]);
  if (ans.select === "View status") {
    console.log(chalk.bgMagenta(chalk.red.bold.italic("\n***************Status***************\n")));
    console.log(chalk.red(`Student Name: ${answer.students}`));
    console.log(chalk.blue(`Student ID: ${randomNumber}`));
    console.log(chalk.green`Course: ${answer.courses}`);
    console.log(chalk.yellow`Course Fees Paid: ${paymentAmount}`);
    console.log(chalk.magenta(`Balance: ${(myBalance += paymentAmount)}`));
    console.log(chalk.magenta.bold.italic("\n***************Thank You***************\n"));
    
  } else {
    console.log(chalk.bgRed("\nExiting student managemet system\n"));
  }
} else {
  console.log(chalk.bgBlue(("Invalid amount due to course\n")));
}
