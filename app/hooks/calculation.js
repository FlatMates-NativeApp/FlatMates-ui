// Two functions that use data from the expenses array in the Group model to split costs between relevant group members, either evenly or 'fairly' (based on income of each user involved)


export const expenseCalculationByIncome = (users, expenses) => {
  // create the data structure for each user
  const roundToTwoDecimals = (number) => {
    return +number.toFixed(2);
  }

  const prepareDataStructure = users.map(user=>{

    let flatmates = users.filter(flatmate=>{
      return user._id !== flatmate._id
    })

    flatmates = flatmates.map(mate=>{
      return { ...mate, amount:0}
    })

    const object = {
      ...user,
      overallAmount:0,
      individualBalances: flatmates
    }

    return object;
  })

  // 1.
  const calculateBalances = prepareDataStructure.map(user=>{
    // 2.
    expenses.forEach(expense=>{

      let assigneesIncome = expense.assignedUsers.reduce((state, item) => {
        return state += item.income;
      }, 0);
      
      // 4.
      if(user._id === expense.whoPaid){
        // 3.
        const amountOwed = expense.totalCost * (1-(user.income / assigneesIncome));
        // 5.
        user.overallAmount = roundToTwoDecimals(user.overallAmount + amountOwed);
        
        // 6. 
        expense.assignedUsers.forEach(assignedUser=>{
          const assigneeSplit = expense.totalCost * (assignedUser.income / assigneesIncome);
          // 7.
          user.individualBalances.forEach(individualBalance=>{
            // 8.
            if(assignedUser._id === individualBalance._id){
              // 9.
              individualBalance.amount = roundToTwoDecimals(individualBalance.amount + assigneeSplit);
            }
          })
          // 10.
          prepareDataStructure.forEach(user2=>{

            // 11.
            if(assignedUser._id === user2._id && user._id !== user2._id){
              // 12.
              user2.overallAmount = roundToTwoDecimals(user2.overallAmount - assigneeSplit);
              
              // 13.
              user2.individualBalances.forEach(individualBalance2=>{
                // 14. 
                if(individualBalance2._id === user._id){
                  // 15.
                  individualBalance2.amount = roundToTwoDecimals(individualBalance2.amount - assigneeSplit);
                }
              })
            }
          })
        })
      }
    })
    return user;
  })
  return calculateBalances;
};

// const result = expenseCalculationByIncome();

// result.forEach(i=>{
//   console.log(i);
// });


 // * ******************************************** * //


  // 1. first we iterate over the array of user objects
  // 2. inside, we iterate of the expenses array to take the amounts and assign them in the appropriate fields
  // 3. find the average of the expense based on who is sharing the cost
  // 4. 'find' the user who paid
  // 5. update 'user who paid's' overallAmount
  // 6. iterate over the users who are involved in the expense
  // 7. iterate over the individualBalances array inside the 'user who paid'
  // 8. 'find' the users from assignedUser in individualBalances
  // 9. update their amount with the average cost
  // 10. we are still 'in' assigned users, now we iterate over the array of user objects
  // 11. 'match' the users involved in the expense with their _id
  // 12. update their overallAmount with the splitAmount which they owe to the 'user who paid'
  // 13. iterate over the assignedUser's individualBalance array
  // 14. 'find' the object of the 'user who paid'
  // 15. update their amount with the splitAmount


export const expenseCalculationEvenly = (users, expenses) => {
  // create the data structure for each user
  const prepareDataStructure = users.map(user=>{

    let flatmates = users.filter(flatmate=>{
      return user._id !== flatmate._id
    })

    flatmates = flatmates.map(mate=>{
      return { ...mate, amount:0}
    })

    const object = {
      ...user,
      overallAmount:0,
      individualBalances: flatmates
    }

    return object;
  })

  // 1.
  const calculateBalances = prepareDataStructure.map(user=>{
    // 2.
    expenses.forEach(expense=>{
      // 3.
      const splitAmount = expense.totalCost / expense.assignedUsers.length;

      // 4.
      if(user._id === expense.whoPaid){
        // 5.
        user.overallAmount += expense.totalCost;
        
        // 6. 
        expense.assignedUsers.forEach(assignedUser=>{
          // 7.
          user.individualBalances.forEach(individualBalance=>{
            // 8.
            if(assignedUser === individualBalance._id){
              // 9.
              individualBalance.amount += splitAmount;
            }
          })
          // 10.
          prepareDataStructure.forEach(user2=>{
            // 11.
            if(assignedUser === user2._id){
              // 12.
              user2.overallAmount -= splitAmount;
              // 13.
              user2.individualBalances.forEach(individualBalance2=>{
                // 14. 
                if(individualBalance2._id === user._id){
                  // 15.
                  individualBalance2.amount -= splitAmount;
                }
              })
            }
          })
        })
      }
    })
    return user;
  })
  return calculateBalances;
};

