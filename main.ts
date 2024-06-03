#! /usr/bin/env node
//SHABANG


import inquirer from "inquirer";
import chalk from "chalk"

let todolist : string [] = []
let condition = true;

console.log (chalk.bgMagentaBright.bold.underline.overline.italic("\n \t======>  WELCOME TO TODO LIST <======\t \n"))

let main = async () => {
    while (condition){
        let options = await inquirer.prompt ([
            {
                name : "option",
                type : "list",
                message :chalk.greenBright("Select an option you want to do" ),
                choices : ["Add task", "Delete task", "View task", "update task", "Exit"]
            }
        ]);
        if (options.option == "Add task"){
            await addtask ()
        }
        else if (options.option == "Delete task" ){
            await deletetask ()
        }
        else if (options.option == "View task"){
            await viewtask ()
        }
        else if (options.option ==  "update task" ){
            await updateTask ()
        }
        else if (options.option == "Exit" ){
            condition = false;
        }
    }
}

//------Function to add task in todo list :
let addtask = async () => {
    let newTask = await inquirer.prompt ([
        {
            name : "task",
            type : "input",
            message :chalk.yellowBright ("Enter a new task"),
        }
    ]);
    todolist.push (newTask.task)
    console.log (chalk.blueBright(`\n ${newTask.task} added in your list successfully \n`))
}

//------Function to view todo list :
let viewtask = ()=>{
    console.log(chalk.cyanBright("\n Your todo list \n"))
    todolist.forEach((task,index ) => {
        console.log ( `${index + 1} : ${task} \n`)
    })
}

//-----Function to delete task :
let deletetask = async () => {
    await viewtask ()
    let taskindex = await inquirer.prompt ([
        {
            name : "index",
            type : "number",
            message :chalk.yellowBright ("Enter the 'index no' of the task you want to delete")
        }
    ]);
    let deletedtask = todolist.splice(taskindex.index -1, 1)
    console.log (chalk.red(`'${deletedtask}' This task has been deleted successfully from your todo list.`))
}

//--------Function to update todo list
let updateTask = async () => {
    await viewtask ()
    let updateIndex = await inquirer.prompt ([
        {
            name : "index",
            type : "number",
            message :chalk.yellowBright ("Enter the 'index no' of the task you want to update")
        },
        {
            name : "newtask",
            type : "input",
            message :chalk.yellowBright ("Enter new task")
        }
    ]);
        todolist [updateIndex.index -1] = (updateIndex.newtask)
        console.log (chalk.cyanBright (`\n Task at index no. '${updateIndex.index -1 }' is updated successfully \n`));

}

main ();