
// Not an elegant solution. This array has to be manually updated if new categories / sub categories gets added to Wordpress. Temporary workaround
export function categoryIdCheck(category) {
    console.log("Category recieved in id check is: " + category);
    // GUITAR
    if (category === 'guitar/') {
        return 2;} 

    else if (category === 'guitar/pickups/') {
        return 15;} 
    else if (category === 'guitar/strings/') {
        return 14;} 
    else if (category === 'guitar/techniques/') {
        return 19;} 
    else if (category === 'guitar/theory/') {
        return 18;}


    // AMPLIFIER
    else if (category === 'amplifiers/') {
        return 13;}


    // GADGETS    
    else if (category === 'gadgets/') {
        return 11;}

    else if (category === 'gadgets/pedals/') {
        return 12;}
    else if (category === 'gadgets/picks/') {
        return 17;}
    

    else {
        console.log("Issues fetching category. Check if added in validation/categoryIdCheck.js");
      }

  }

// Reverse check with variable check as well
  export function reverseCategoryIdCheck(id) {
    console.log("id recieved in check is: " + id);

    let newId;

    if(typeof id === "string"){
        let idString = id;
        let convertIdToNum = parseInt(idString);
        newId = convertIdToNum;
    }
    else if(typeof id === "number"){
        newId = id;
    }
    else{
        console.log("Id is not of the correct variable type")
        return; // id is not correct, and function returns nothing
    }


    // GUITAR
    if (newId === 2) {
        return 'Guitar';} 

    else if (newId === 15) {
        return 'Pickups';} 
    else if (newId === 14) {
        return 'Strings';} 
    else if (newId === 19) {
        return 'Techniques';} 
    else if (newId === 18) {
        return 'Theory';}


    // AMPLIFIER
    else if (newId === 13) {
        return 'Amplifiers';}


    // GADGETS    
    else if (newId === 11) {
        return 'Gadgets';}

    else if (newId === 12) {
        return 'Pedals';}
    else if (newId === 17) {
        return 'Picks';}
    
        else {
            console.log("Issues fetching id for category. Check if added in validation/categoryIdCheck.js");
        }
  

  }