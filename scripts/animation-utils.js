const MAX_ANIMATIONS = 4; // When adding or removing new animations, update the value.

const timeCountdowns = () => {
  const timedown = document.getElementById('countdown-id');
  const box1 = document.getElementById('box1-id');
  const box2 = document.getElementById('box2-id');
  
  const currentClassnameBox1 = document.getElementById('current-classname-box1-id');
  const currentClassnameBox2 = document.getElementById('current-classname-box2-id');
  
  const containerHorizontal = document.getElementById('container-horizontal-id');

  let count = 1;
  const id = setInterval(() => {
    timedown.innerHTML = `${count} - ${count % 6}`;
    
    currentClassnameBox1.innerHTML = `Box1 Animation: ${boxClassnameCount(box1, null).split(' ')[0]}`;
    currentClassnameBox2.innerHTML = `Box2 Animation: ${boxClassnameCount(box2, null).split(' ')[0]}`;

    if (count % 6 === 0) {
      // containerHorizontal.innerHTML = containerHorizontal.innerHTML;
    }

    count++
  }, 1000);
};

const insertNextAnimation = () => {
  const currentAnimation = `
  <div id="box1-id">
    <div class="box1 box-size">
      <div class="box1-anima box-anima-size">
        <img src="imgs/cat-2191178__340.webp">
      </div>
    </div>
  </div>

  <div id="box2-id">
    <div class="box2 box-size">
      <div class="box2-anima box-anima-size">
        <img src="imgs/tiger-528890__340.webp">
      </div>
    </div>
  </div>
  `;

  return currentAnimation;
}

timeCountdowns();


let box1Count = 1;
let box2Count = 1;
let initBox1 = false;
let initBox2 = false;

const boxClassnameCount = (box, boxCount) => {
  const classeSplit = box.className.split(' ');
  classeSplit[0] = boxCount ? `${classeSplit[0].substring(0, 10)}${boxCount}` : classeSplit[0];
  return classeSplit.join(' ');
};

const boxNextAnimation = (value) => {
  const box1 = document.getElementById('box1-id');
  const box2 = document.getElementById('box2-id');

  switch (value) {
    case 'box1':
      if (!initBox1) {
        initBox1 = true;
        box1Count++;
      }

      box1.className = boxClassnameCount(box1, box1Count);
      console.log(box1.className);
      if (box1Count % MAX_ANIMATIONS === 0) {
        box1Count = 1;
      } else {
        box1Count++;
      }
      break;

    case 'box2':
      if (!initBox2) {
        initBox2 = true;
        box2Count++;
      }

      box2.className = boxClassnameCount(box2, box2Count);
      console.log(box2.className);
      if (box2Count % MAX_ANIMATIONS === 0) {
        box2Count = 1;
      } else {
        box2Count++;
      }
      break;

    default:
      console.log('Value do not exists!');
  }
};
