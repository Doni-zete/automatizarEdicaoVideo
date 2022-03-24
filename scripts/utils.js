let idChangeAnimation = null;
let allImagesToUpdate = null;

const getImage = (value, id) => {
  console.log(value.files);
  const [file] = value.files;
  const imgToInsert = document.getElementById(id);

  // Clear text after a image is selected.
  const textSelecionaImg = document.getElementById(`text-select-img-${id}`);

  imgToInsert.src = URL.createObjectURL(file);

  const titleTxt = textSelecionaImg.parentElement.parentElement.querySelector('.name-title-image').innerText;
  
  allImagesToUpdate[titleTxt].forEach(elementImg => {
    elementImg['img'].src = URL.createObjectURL(file);;
    elementImg['img'].height = '250';
    elementImg['img'].width = '250';
  
    // Change the background color to identify wich field still not have a image. 
    
    elementImg['title'].parentElement.classList.add('with-img');
    elementImg['title'].parentElement.querySelector(`#text-select-img-${elementImg['img'].id}`).innerHTML = "";
  });
};


const generateTag = (value, tag, id = '') => {
  if (tag === 'input') {
    return `<div>
      <input 
        onchange='getImage(this, "${value}");' 
        type='file' 
        name="input-${value}" 
        id="input-${value}" 
        accept='image/*'
        class="input-select-image"
      />
    </div>`
  }

  if (tag === 'img') {
    return `<img id='id-${value}' src='#''>`;
  }

  if (tag === 'label') {
    return `<${tag} for="${id}" class="label-select-image">${value}</${tag}>`;
  }

  if(tag === 'td') {
    return `<${tag} class='not-img'>${value}</${tag}>`;
  }

  return `<${tag}>${value}</${tag}>`;
};

const createTableSecond = (selectFields = []) => {
  const table = document.getElementById('table-first');
  const tr = table.getElementsByTagName('tr');

  let trBuild = '';
  let thInsert = '';

  const theadtable = table.getElementsByTagName('thead');
  const theadTr = theadtable[0].getElementsByTagName('tr');
  const theadTh = theadTr[1].getElementsByTagName('th');

  // Used to get the Title of the selected column
  if (selectFields.length > 0) {
    for (let i = 0; i < selectFields.length; i++) {
      thInsert += generateTag(theadTh[selectFields[i]].innerText, 'th');
    }

    trBuild += generateTag(generateTag(thInsert, 'tr'), 'thead');
  }


  let countId = 1;

  for (let i = 0; i < tr.length; i++) {
    const td = tr[i].getElementsByTagName('td');

    let trInset = '';
    let tdInsert = '';
    // console.log(`Vencedor: ${td[1].innerText} | Vice: ${td[3].innerText}`);

    const lengtTd = selectFields.length > 0 ? selectFields.length : tr[i].getElementsByTagName('td').length;
    console.log('lengtTd', lengtTd);
    for (let j = 0; j < lengtTd; j++, countId++) {
      const inputInsert = generateTag(`id-${countId}`, 'input');
      const imgInsert = generateTag(countId, 'img');
      const textSelectImage = `<span class="text-seleciona-image-span" id="text-select-img-id-${countId}">Selecione imagem</span>`;
      if (selectFields.length > 0 && td[selectFields[j]]) {
        const nameTitleImage = `<div class="name-title-image">${td[selectFields[j]].innerText}</div>`;
        const continerInsideElements = `<div class="container-inside-elements">${textSelectImage} ${imgInsert} ${inputInsert}</div>`;
        const mergeTagsIntoDiv =
          `<div class="td-select-image">${`${nameTitleImage} ${continerInsideElements}`}</div>`;

        const tagsinpdivimglabel = generateTag(mergeTagsIntoDiv, 'label', `input-id-${countId}`);

        tdInsert += generateTag(tagsinpdivimglabel, 'td');
        trInset = generateTag(tdInsert, 'tr').replace('<tr', '<tr class="tr-image"');
      }

    }

    trBuild += trInset;

  }

  const tableSecond = document.getElementById('table-second');
  tableSecond.innerHTML = trBuild;
}


const insertCheckbox = () => {
  const table = document.getElementById('table-first');
  const tr = table.getElementsByTagName('tr');
  const firstTrTd = tr[0].getElementsByTagName('th').length > 0 ? tr[0].getElementsByTagName('th') : tr[0]
    .getElementsByTagName('td');


  const trc = document.createElement('tr');
  trc.setAttribute('id', 'id-row-checkbox');

  for (let i = 0; i < firstTrTd.length; i++) {
    const chk = document.createElement('input');
    chk.setAttribute("type", "checkbox");
    chk.setAttribute("name", `idck-${i}`);
    chk.setAttribute("id", `idck-${i}`);
    chk.setAttribute("class", "inp-chck");

    const tdchk = document.createElement('th');

    tdchk.append(chk);
    trc.append(tdchk);
  }

  const theadtable = table.getElementsByTagName('thead');
  theadtable[0].prepend(trc);
}

const selectColumn = () => {
  const trch = document.getElementById('id-row-checkbox');
  const thtr = trch.getElementsByTagName('th');
  const selectedCheckbox = [];

  for (let i = 0; i < thtr.length; i++) {
    const inth = thtr[i].getElementsByTagName('input');

    if (inth[0] && inth[0].checked) {
      selectedCheckbox.push(i);
    }

  }
  createTableSecond(selectedCheckbox);
  allImagesToUpdate = getImagesToUpdateImage();
}


const createFirstTable = () => {
  const areaTxt = document.getElementById('txtarea-first-table');


  if (areaTxt && areaTxt.value && areaTxt.value.trim()) {
    const newAreaTxt = areaTxt.value.replace('<table', '<table id="table-first" ');
    const containerFirstTable = document.getElementById('container-first-table');
    containerFirstTable.innerHTML = newAreaTxt;

    insertCheckbox();
  }
};

const animateImage = () => {
  if (idChangeAnimation) {
    clearInterval(idChangeAnimation);
  }
  changeAnimation();
}

const getNextImageRow = (index, rowsImage) => {
  if (rowsImage[index]) {
    const im = rowsImage[index].querySelectorAll('img');
    const nti = rowsImage[index].querySelectorAll('.name-title-image');
    console.log('nti', nti[0].innerText, nti[1].innerText);
    return [...im, ...nti];
  }

  return [];
}

const changeAnimation = () => {
  const champion = document.getElementById('id-img-anim-champion');
  const vice = document.getElementById('id-img-anim-vice');
  const rowsImage = document.querySelectorAll('.tr-image');
  const championName = document.getElementById('id-champion-name');
  const viceName = document.getElementById('id-vice-name');

  let id = null;
  let indexImg = 0;

  let imgs = getNextImageRow(indexImg, rowsImage);

  if (imgs.length > 0) {
    champion.src = imgs[0].src;
    championName.innerHTML = imgs[2].innerText;
    vice.src = imgs[1].src;
    viceName.innerHTML = imgs[3].innerText;

    console.log('imgs', imgs);
    indexImg++;


    idChangeAnimation = setInterval(() => {
      imgs = getNextImageRow(indexImg, rowsImage);
      console.log('imgsimgs', imgs.length);
      if (indexImg < rowsImage.length && imgs.length > 0) {
        champion.src = imgs[0].src;
        championName.innerHTML = imgs[2].innerText;
        vice.src = imgs[1].src;
        viceName.innerHTML = imgs[3].innerText;

        console.log('imgs', imgs);

        indexImg++;
      } else {
        clearInterval(idChangeAnimation);
        console.log("Finished Animation Change images");
      }

    }, 5000);
  }
};


const getImagesToUpdateImage = () => {
  const tdWithImage = document.querySelectorAll('.td-select-image');

  const allImagesAndTitle = {};
  tdWithImage.forEach(elementTd => {
    let titleTxt = elementTd.querySelector('.name-title-image').innerText
    
    if (allImagesAndTitle[titleTxt]) {
      allImagesAndTitle[titleTxt].push({
        title: elementTd.querySelector('.name-title-image'),
        img: elementTd.querySelector('img'),
      });
    } else {
      allImagesAndTitle[titleTxt] = [{
        title: elementTd.querySelector('.name-title-image'),
        img: elementTd.querySelector('img'),
      }];
    }
  })

  return allImagesAndTitle;
}