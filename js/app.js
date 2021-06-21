'use strict';

let imagesSection = document.getElementById('imagesSection');
let left = document.getElementById('left');
let mid = document.getElementById('mid');
let right = document.getElementById('right');

let imges = [
  'bag.jpg',
  'banana.jpg',
  'bathroom.jpg',
  'boots.jpg',
  'breakfast.jpg',
  'bubblegum.jpg',
  'chair.jpg',
  'cthulhu.jpg',
  'dog-duck.jpg',
  'dragon.jpg',
  'pen.jpg',
  'pet-sweep.jpg',
  'scissors.jpg',
  'shark.jpg',
  'sweep.png',
  'tauntaun.jpg',
  'unicorn.jpg',
  'usb.gif',
  'water-can.jpg',
  'wine-glass.jpg',
];
// console.log(mid);
function randomNumber(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}

let counter = 0;
function Vote(name, path) {
  this.name = name;
  this.path = `./img/${path}`;
  this.votes = 0;
  this.views = 0;
  Vote.all.push(this);
}
Vote.all = [];

for (let i = 0; i < imges.length; i++) {
  new Vote(imges[i].split('.')[0], imges[i]);
//   console.log(imges[i].split('.')[0],Vote.all[i].name);
}

let leftIndex;
let midIndex;
let rightIndex;
let allDierection = [];
function render() {

  do {
    leftIndex = randomNumber(0, imges.length - 1);
    midIndex = randomNumber(0, imges.length - 1);
    rightIndex = randomNumber(0, imges.length - 1);
  } while (leftIndex === midIndex || leftIndex === rightIndex || rightIndex === midIndex || allDierection.includes(leftIndex) || allDierection.includes(midIndex) || allDierection.includes(rightIndex));
  console.log(allDierection.includes(rightIndex));
  // console.log(allDierection);
  Vote.all[leftIndex].views++;
  Vote.all[midIndex].views++;
  Vote.all[rightIndex].views++;


  left.src = Vote.all[leftIndex].path;
  mid.src = Vote.all[midIndex].path;
  right.src = Vote.all[rightIndex].path;
  allDierection = [];
  allDierection.push(leftIndex,midIndex,rightIndex);
}


let button = document.getElementById('button');
function display() {
  let container = document.getElementById('result');
  let unOreder = document.createElement('ul');
  container.appendChild(unOreder);
  for (let i = 0; i < imges.length; i++) {
    let listItem = document.createElement('li');
    unOreder.appendChild(listItem);
    listItem.textContent = `${imges[i].split('.')[0]} had ${Vote.all[i].votes}votes and was seen ${Vote.all[i].views} times`;
  }
  button.removeEventListener('click',display);
}
function stopEvent(event) {
  if (counter < 25) {
    if (event.target.id === 'left') {
      Vote.all[leftIndex].votes++;
    //   console.log( Vote.all[leftIndex]);
    }else if (event.target.id === 'mid'){
      Vote.all[midIndex].votes++;
    }else if (event.target.id === 'right'){
      Vote.all[rightIndex].votes++;
    }
    render();
    counter++;
  } else if (counter === 25) {
    chart();
    document.getElementById('button').disabled=false;
    imagesSection.removeEventListener('click',stopEvent);
  }
}


button.addEventListener('click',display);

imagesSection.addEventListener('click', stopEvent);
render();

function chart(){
  let nameArr = [];
  let voteArr = [];
  let viewArr = [];
  for(let i=0; i< Vote.all.length; i++){
    nameArr.push(Vote.all[i].name);
    voteArr.push(Vote.all[i].votes);
    viewArr.push(Vote.all[i].views);
  }
  let ctx = document.getElementById('myChart').getContext('2d');
  let myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: nameArr,
      datasets: [
        {
          label: '# of Votes',
          data: voteArr,
          backgroundColor: '#EE0000',
        },
        {
          label: '# of Votes',
          data: viewArr,
          backgroundColor:  '#000000',
        },
      ]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}
