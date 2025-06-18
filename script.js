// console.log("script.js loaded");

// let myString = "a2b3c";
// console.log(myString);
// console.log(typeof myString);

// let myNumVar = 123;
// console.log(typeof myNumVar);

// // let randomVar = jfk ;

// console.log(10 + "eggs");
// console.log( 10 + 5 + " eggs");
// console.log("eggs " + 10 + 5);

// console.log(5<2)&&(5>3);
// console.log(10>3) || (5<2);
// console.log (!5>3);


// let EC = 1;
// if(EC > 1.8 ){
//     console.log("EC is greater than 1.8");
// } else{
//     console.log("the plant is healthy!")
// }

// let age = prompt("Enter your age")
// if (age<18){
//    alert("you are a minor");
// } else if (age<60){
//     alert("you are an adult");
// } else{
//     alert("you are old!");
// }


// function introduction(name, age){
//     console.log("Hello my name is " + name + " and I am " + age + " years old !");
// }
// introduction("karan", 19);

// function test(a, b, c){
//     console.log("My name is " + a + " and I go to " + b + " for school." + " I am a " + c + " major student.");
// }

// test("karan", "NYIT", "computer science");



// var str = "I love tech class";
// console.log(str.toUpperCase());
// console.log(str.slice(2, 5));
// console.log(strindexOf("c"));

// var classr = ["sebastian", "Karan", "bria", "Anjali", "Agona"];
// console.log(classr[0]);

// var heroes = ["batman", "superman", "spiderman", "ironman", "hulk", "thor", "captain America", "blackwidow", "black panther", "wonderwoman"];
// console.log(heroes[0].toUpperCase());
// console.log(heroes[1].slice(0, 3))
// console.log(heroes[7].length);
// console.log(heroes.array);

function grades(grade) 
{
    if (grade >= 90){
        console.log("A");
    }
    else if (grade >= 80){
        console.log("B");
    }
    else if (grade >= 70){
        console.log("C");
    }
    else if (grade >= 60){
        console.log("D");
    }
    else{
        console.log("F");
    }
}

grades(85);
grades(95);
grades(50);