//global variables

//defines size of the feild
const width = 1200;
const height = 600;

//defines final position of the ball
let finalX = 600;
let finalY = 65;

//defines the initial position of the ball
let initialX = width / 2;
let initialY = height / 4 * 3;

//this is the x position of the arrow
let h = 600;
// this is how fast the ball will move once shot
let power = 3000;
// accumulator for number of shots
let score = 0;
//accumulator for shots that were made
let shots = 0;

// sets up canvas
let c = d3.select("body").append("svg")
.attr("width", width)
.attr("height", height);


// this is the grass
let grass = c.append("rect")
    .attr("class", "bg")
    .attr("width", width)
    .attr("height", height)
    .attr("x", 0)
    .attr("y", 0)
    .attr("fill", "green")
    .attr("rx", 30)
    .attr("ry", 30);


    // this is the net and feild illustration
    let net = c.append("rect")
    .attr("class", "net")
    .attr("width", 400)
    .attr("height", 80)
    .attr("x", width / 2 - 200)
    .attr("y", 10)
    .attr("fill", "white");

    let netIn = c.append("rect")
    .attr("class", "net")
    .attr("width", 383)
    .attr("height", 80)
    .attr("x", width / 2 - 200 + 8)
    .attr("y", 17)
    .attr("fill", "green");

    let box = c.append("rect")
    .attr("class", "net")
    .attr("width", 1100)
    .attr("height", 500)
    .attr("x", 50)
    .attr("y", 90)
    .attr("stroke", "white")
    .attr("stroke-width", 8)
    .attr("fill", "none");

    let arch = c.append("ellipse")
    .attr("class", "net")
    .attr("rx", 200)
    .attr("ry", 200)
    .attr("cx", 600)
    .attr("cy", 350)
    .attr("stroke", "white")
    .attr("stroke-width", 8)
    .attr("fill", "none");
    
    let penBox = c.append("rect")
    .attr("class", "net")
    .attr("width", 800)
    .attr("height", 400)
    .attr("x", 200)
    .attr("y", 90)
    .attr("stroke", "white")
    .attr("stroke-width", 8)
    .attr("fill", "green");

    //this is the goalie
    let goalieArms = c.append("ellipse")
    .attr("class", "goalie")
    .attr("rx", 50)
    .attr("ry", 7)
    .attr("cx", initialX)
    .attr("cy", finalY + 11)
    .attr("fill", "#DCCA98")
    .attr("opacity", 0);

    let goalieBod = c.append("ellipse")
    .attr("class", "goalie")
    .attr("rx", 30)
    .attr("ry", 30)
    .attr("cx", initialX)
    .attr("cy", finalY + 10)
    .attr("fill", "red")
    .attr("opacity", 0);

    let goalieHead = c.append("ellipse")
    .attr("id", "head")
    .attr("class", "goalie")
    .attr("rx", 20)
    .attr("ry", 20)
    .attr("cx", initialX)
    .attr("cy", finalY - 10)
    .attr("fill", "#DCCA98")
    .attr("opacity", 0);

    

    // This is the ball
    let ball = c.append("ellipse")
    .attr("class", "ball")
    .attr("rx", 20)
    .attr("ry", 20)
    .attr("cx", initialX)
    .attr("cy", initialY)
    .attr("fill", "black")
    .attr("opacity", 0);

    // this is the scoreboard
    let score1 = c.append("ellipse")
    .attr("class", "score")
    .attr("id", "score1")
    .attr("rx", 20)
    .attr("ry", 20)
    .attr("cx", width / 5 - 150)
    .attr("cy", height - 550)
    .attr("fill", "#464655");

    let score2 = c.append("ellipse")
    .attr("class", "score")
    .attr("id", "score2")
    .attr("rx", 20)
    .attr("ry", 20)
    .attr("cx", width / 5 - 100)
    .attr("cy", height - 550)
    .attr("fill", "#464655");

    let score3 = c.append("ellipse")
    .attr("class", "score")
    .attr("id", "score3")
    .attr("rx", 20)
    .attr("ry", 20)
    .attr("cx", width / 5 - 50)
    .attr("cy", height - 550)
    .attr("fill", "#464655");

    let score4 = c.append("ellipse")
    .attr("class", "score")
    .attr("id", "score4")
    .attr("rx", 20)
    .attr("ry", 20)
    .attr("cx", width / 5)
    .attr("cy", height - 550)
    .attr("fill", "#464655");

    let score5 = c.append("ellipse")
    .attr("class", "score")
    .attr("id", "score5")
    .attr("rx", 20)
    .attr("ry", 20)
    .attr("cx", width / 5 + 50)
    .attr("cy", height - 550)
    .attr("fill", "#464655");

    // this is the arrow that indicates the direction of the ball
    let arrow = d3.symbol().type(d3.symbolTriangle).size(400);
    let arrowHead = c.append("path")
    .attr("class", "arrow")
    .attr("d", arrow)
    .attr("transform", "translate(600 , 400)");


// this is the interactivity

// moves the destination of the ball to the left when clicked
d3.select("#left").on("click", function() {
    if (h > 300) {
    finalX = finalX - 10;
    h = h - 10;
    d3.select(`.arrow`).attr("transform", "translate(" + h + ", 400)");
    }
});

// moves the destination of the ball to the right when clicked
d3.select("#right").on("click", function() {
    if (h < 900) {
    finalX = finalX + 10;
    h = h + 10;
    d3.select(`.arrow`).attr("transform", "translate(" + h + ", 400)");
    }
});

// shoots the ball
d3.select("#shoot").on("click", function() {
    let goaliePos = Math.random() * 350 + 400;

    //animates ball and goalie
    d3.select(".ball").transition()
    .duration(power)
    .attr("cx", finalX)
    .attr("cy", finalY);
    d3.selectAll(".goalie").transition()
    .duration(power)
    .attr("cx", goaliePos);
    //hides buttons
    d3.select("#shoot").transition()
    .duration(1000).style("opacity", 0);
    d3.selectAll(".b").transition()
    .duration(1000).style("opacity", 0);
    
    //determines whether or not a goal was scored
    if (Number(goaliePos) > Number(finalX - 50) && Number(goaliePos) < Number(finalX + 50)) { 
        score = score + 1;
        d3.select("#score" + score).transition().delay(power - 200).attr("fill", "red"); 
        d3.select(".ball").transition().delay(power).duration(1000)
            .attr("cx", initialX)
            .attr("cy", initialY); 
    }
    else if (finalX < 400 || finalX > 800) { 
        score = score + 1;
        d3.select("#score" + score).transition().delay(power - 200).attr("fill", "red");  
    }
    else {
        score = score + 1;
        d3.select("#score" + score).transition().delay(power - 200).attr("fill", "#a0da7b"); 
        shots = shots + 1;
    }
    //determines whether or not the game is over
    if (score === 5) {
        d3.select("#text").html("game over: score " + shots + "/5");
        d3.select("#nextShot").transition()
            .delay(2000).style("opacity", 0);
    }
    if (score < 5) {
        d3.select("#nextShot").transition()
        .delay(2000).style("opacity", 1);
    }
    
});

// sets up for the next shot when button is clicked after a shot is taken
d3.select("#nextShot").on("click", function() {
    //sets up the visuals and buttons for the next shot
    d3.select(".ball")
    .attr("cx", initialX)
    .attr("cy", initialY);

    d3.selectAll(".goalie")
    .attr("cx", initialX)
    .attr("cy", finalY + 10);

    d3.select("#head")
    .attr("cy", finalY - 10);

    d3.select("#shoot").transition()
    .duration(1000).style("opacity", 1);
    d3.select("#nextShot").transition()
    .duration(1000).style("opacity", 0);
    d3.selectAll(".b").transition()
    .duration(1000).style("opacity", 1);
    d3.select(".arrow")
    .attr("transform", "translate(600 , 400)");

    // resets the position of arrow/starting final position of ball
    h = 600;
    finalX = 600;
});

// sets up the initial state of the game
d3.select("#start").on("click", function() {
    //reveals buttons for shooting
    d3.select(".ball").attr("opacity", 1);
    d3.selectAll(".goalie").attr("opacity", 1);
    d3.selectAll(".b").transition()
    .duration(1000).style("opacity", 1);
    d3.select("#shoot").transition()
    .duration(1000).style("opacity", 1);
    d3.select("#restart").transition()
    .duration(1000).style("opacity", 1);
    d3.select("#start").transition()
    .duration(1000).style("opacity", 0);
    //changes text instructions
    d3.select("#text").html("shoot and score");
});

// sets the game back to its initial state
d3.select("#restart").on("click", function() {
    //resets D3 elements to their starting positions
    d3.select(".ball")
    .attr("cx", initialX)
    .attr("cy", initialY);

    d3.selectAll(".goalie")
    .attr("cx", initialX)
    .attr("cy", finalY + 10);

    d3.select("#head")
    .attr("cy", finalY - 10);

    //resets score bubbles, arrow position, and reveals buttons
    d3.select("#shoot").transition()
    .duration(1000).style("opacity", 1);
    d3.select("#nextShot").transition()
    .duration(1000).style("opacity", 0);
    d3.selectAll(".b").transition()
    .duration(1000).style("opacity", 1);
    d3.select(".arrow")
    .attr("transform", "translate(600 , 400)");
    d3.selectAll(".score").attr("fill", "gray");
    //changes text instructions
    d3.select("#text").html("shoot and score");
    //resets global variables to their initial values
    h = 600;
    finalX = 600;
    score = 0;
    shots = 0;

});

// adjusts the power of the shot according to the slider
d3.select("#slider").on("input", function(){
        power = 6200 - d3.select("#slider").property("value");
});




