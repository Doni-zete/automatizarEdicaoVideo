const MAX_ANIMA_CLASSNAME = 6; // When adding or removing new animations, update the value.
let idChangeAnimation = null;
let idBtenShowHide = null;

const getImage = (value, id) => {
  console.log(value, id);
  if (value.files && value.files.length > 0) {
    // Everytime a new image is selected it will read all the images again
    const allImagesToUpdate = getImagesToUpdateImage();

    console.log(value);
    const [file] = value.files;
    const imgToInsert = document.getElementById(id);

    const textSelecionaImg = document.getElementById(`text-select-img-${id}`);

    const imagePath = `/imgs/paths/${file.name}`;

    imgToInsert.src = imagePath;

    const titleTxt = textSelecionaImg.parentElement.parentElement.querySelector('.name-title-image').innerText;

    allImagesToUpdate[titleTxt].forEach(elementImg => {
      elementImg['img'].src = imagePath;
      elementImg['img'].height = '250';
      elementImg['img'].width = '250';
      elementImg['img'].removeAttribute("style");

      // Change the background color to identify which field still not have a image. 
      elementImg['title'].parentElement.classList.add('with-img');

      // Clear text after a image is selected.
      elementImg['title'].parentElement.querySelector(`#text-select-img-${elementImg['img'].id}`).innerHTML = "";
    });
  }
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
    return `<img id='id-${value}' src='imgs/imagnotfound.png' style="display:block;width: 26px; height: 26px;">`;
  }

  if (tag === 'label') {
    return `<${tag} for="${id}" class="label-select-image">${value}</${tag}>`;
  }

  if (tag === 'td') {
    return `<${tag} class='not-img'>${value}</${tag}>`;
  }

  return `<${tag} ${id}>${value}</${tag}>`;
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
      const chkAnim = `<input type="checkbox" id="chk-anim-id-${i}">`;
      const containerChkTitle = `
      <label for="chk-anim-id-${i}">
      <div class="chk-anim-selec">${chkAnim} ${theadTh[selectFields[i]].innerText}</div>
      </label>
      `;
      thInsert += generateTag(containerChkTitle, 'th');
    }

    trBuild += generateTag(generateTag(thInsert, 'tr', 'id="id-tr-chk-anim-thead"'), 'thead');
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
        const nameTitleImage = `<div class="name-title-image container-center-pencil-icon">
        <div id="id-title-select-${countId}" class="title-select-edit-change">${td[selectFields[j]].innerText}</div>
        <input onkeypress="confirmWithEnter(event, this)" id="id-title-edit-${countId}" style="font-size: 32px; display: none;" class="input-edit-pencil" type="text" value="${td[selectFields[j]].innerText}" />

        <button class="pencil-icon" onclick="onEditTitle(this, ${countId})" id="id-btn-edit-${countId}">
        <i id="id-pencil-edit-${countId}" class="fa fa-pencil"></i>
        <i style="display: none;" id="id-confirm-thumbs-edit-${countId}" class="fa fa-thumbs-up"></i>
        </button>
        </div>`;
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
    const labelChk = document.createElement('label');
    const divLabel = document.createElement('div');

    chk.setAttribute("type", "checkbox");
    chk.setAttribute("name", `idck-${i}`);
    chk.setAttribute("id", `idck-${i}`);
    chk.setAttribute("class", "inp-chck");

    const thchk = document.createElement('th');
    labelChk.setAttribute("for", `idck-${i}`);

    divLabel.setAttribute("class", "chk-anim-selec");

    divLabel.append(chk)
    labelChk.append(divLabel)
    thchk.append(labelChk);
    trc.append(thchk);
  }

  const theadtable = table.getElementsByTagName('thead');
  theadtable[0].prepend(trc);
}

const selectColumn = () => {
  const trch = document.getElementById('id-row-checkbox');
  if (trch) {
    const thtr = trch.getElementsByTagName('th');
    const selectedCheckbox = [];

    for (let i = 0; i < thtr.length; i++) {
      const inth = thtr[i].getElementsByTagName('input');

      if (inth[0] && inth[0].checked) {
        selectedCheckbox.push(i);
      }

    }
    createTableSecond(selectedCheckbox);

    // Used to show the button to save or load a table
    const saveTableButton = document.getElementById('save-table-id-btn');

    saveTableButton.style.display = "inline-flex";
  }
}


const createFirstTable = () => {
  const areaTxt = document.getElementById('txtarea-first-table');


  if (areaTxt && areaTxt.value && areaTxt.value.trim()) {
    const btnHideShowFirstTable = document.getElementById('hide-table-first-id-btn');
    btnHideShowFirstTable.style.display = 'inline-flex';
    const newAreaTxt = areaTxt.value.replace('<table', '<table id="table-first" ');
    const containerFirstTable = document.getElementById('container-first-table');
    containerFirstTable.innerHTML = newAreaTxt;

    // Used to show the button to reverse the rows when there is a table
    const showReverseButton = document.getElementById('reverse-rows-table-first-id-btn');

    showReverseButton.style.display = "inline-flex";

    insertCheckbox();
  }
};


const hideShowButton = (isToHide = true) => {
  const btnRunAnimation = document.querySelector('.btn-run-animate');
  const contentAnimaId = document.getElementById('id-content-anima');
  let countHide = 3;

  if (isToHide) {
    idBtenShowHide = setInterval(() => {
      btnRunAnimation.innerHTML = `Wait: ${countHide}`;
      contentAnimaId.innerHTML = `<div class="display-flex center">${countHide}</div>`;
      if (countHide === 0) {
        contentAnimaId.classList.remove('content-anima');
        contentAnimaId.classList.add('border-none', 'content-anima');
        clearInterval(idBtenShowHide);
        changeAnimation();
        btnRunAnimation.innerHTML = "Animate Image";
        console.log('countHide', countHide);
      } else if (countHide < 0) {
        clearInterval(idBtenShowHide);
      } else {
        countHide--;
      }
    }, 3000);
  } else {
    btnRunAnimation.innerHTML = "Animate Image";
  }
};

const resetToInitialValues = () => {
  const contentAnimaId = document.getElementById('id-content-anima');

  if (idChangeAnimation) {
    clearInterval(idChangeAnimation);
  }
  if (idBtenShowHide) {
    clearInterval(idBtenShowHide);
  }

  contentAnimaId.classList.remove('border-none');
}

const animateImage = () => {
  resetToInitialValues();

  hideShowButton();
}

const genarateBoxClassnameAnimation = () => {
  let box1Number = 0;
  let box2Number = 0;

  while (box1Number === 0 || box2Number === 0) {
    const randNumber = Math.floor(Math.random() * 6) + 1;
    if (box1Number === 0) {
      box1Number = randNumber;
    } else if (box1Number !== randNumber) {
      box2Number = randNumber;
    }
  }

  return { classChampion: `box-anima-${box1Number}`, classVice: `box-anima-${box2Number}` }
}

const buildTagsToAnimate = (rowImage, firstIndice, secondIndice) => {
  const im = rowImage.querySelectorAll('img');
  const nti = rowImage.querySelectorAll('.name-title-image');

  const championImageSrc = im[firstIndice].src;
  const viceImageSrc = im[secondIndice].src;

  const championName = nti[firstIndice].innerText;
  const viceName = nti[secondIndice].innerText;

  const boxesClassname = genarateBoxClassnameAnimation();

  console.log('boxesClassname', boxesClassname);

  const buildingTags = `
  <div class="box-primary">

  <div class="container-chanpion space-container-anima">
    <div class="title-anim">
      Campeão
    </div>

    <div class="box1 box-size">
      <div id="box1-id" class="${boxesClassname.classChampion} box-anima-size">
        <img src="${championImageSrc}" id="id-img-anim-champion">
      </div>
    </div>


    <div id="id-champion-name" class="title-anim team-name-margin-top">
      ${championName}
    </div>
  </div>

  <div class="container-vice space-container-anima">
    <div class="title-anim">
      Vice
    </div>

    <div class="box2 box-size">
      <div id="box2-id" class="${boxesClassname.classVice} box-anima-size">
        <img src="${viceImageSrc}" id="id-img-anim-vice">
      </div>
    </div>

    <div id="id-vice-name" class="title-anim team-name-margin-top">
      ${viceName}
    </div>
  </div>

</div>  
  `;

  return buildingTags;
}

const getImagesRowWithAnimation = () => {
  const buildSectionChampionVice = [];

  try {
    // Get all the rows from the table with images
    const rowsImage = document.querySelectorAll('.tr-image');


    // The selected checkbox columns to animate
    const trChkAnim = document.getElementById('id-tr-chk-anim-thead');
    const chkInps = trChkAnim.querySelectorAll('input');

    let firstIndice = 0;
    let secondIndice = 1;

    if (chkInps && chkInps.length > 1) {
      let isMaxIndices = 0;
      for (let i = 0; i < chkInps.length; i++) {
        if (chkInps[i].checked) {
          if (isMaxIndices === 0) {
            firstIndice = i
          } else {
            secondIndice = i;
            break;
          }
          isMaxIndices++;
        }
      }
    }


    for (let i = 0; i < rowsImage.length; i++) {
      if (rowsImage[i]) {
        const championVice = buildTagsToAnimate(rowsImage[i], firstIndice, secondIndice);
        buildSectionChampionVice.push({ championVice });
      }
    }
  } catch (err) {
    console.log(err);
    alert("Make sure the TABLE data is populated.")
  }

  return buildSectionChampionVice;
}

const changeAnimation = () => {
  const contentAnima = document.getElementById('id-content-anima');

  let indexImg = 0;

  let rowsTagsWithAnimation = getImagesRowWithAnimation();
  console.log('rowsTagsWithAnimation', rowsTagsWithAnimation);

  if (rowsTagsWithAnimation.length > 0) {
    contentAnima.innerHTML = rowsTagsWithAnimation[indexImg].championVice;
    indexImg++;

    idChangeAnimation = setInterval(() => {
      if (indexImg < rowsTagsWithAnimation.length) {
        contentAnima.innerHTML = rowsTagsWithAnimation[indexImg].championVice;
        indexImg++;
      } else {
        clearInterval(idChangeAnimation);
        console.log("Finished Animation Change images");
        contentAnima.classList.remove('border-none');
        contentAnima.innerHTML = `<div class="display-flex center">Finished Animation</div>`;
        hideShowButton(false);
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

const selectColumnToAnimate = () => {

};

const hideFirstTable = () => {
  const tblFirst = document.getElementById('table-first');
  const btn = document.getElementById('hide-table-first-id-btn');
  if (tblFirst.style.display === 'none') {
    tblFirst.style.display = 'block';
    btn.innerHTML = "Hide Original Table";
  } else {
    tblFirst.style.display = 'none';
    btn.innerHTML = "Show Original Table";
  }
  console.log(tblFirst.style.display)
};

const onEditTitle = (element, currentCount) => {
  if (element) {
    const selectTitleEdit = document.getElementById(`id-title-select-${currentCount}`);
    const inputTitleEdit = document.getElementById(`id-title-edit-${currentCount}`);

    const isEditing = (element.getAttribute("isediting") === 'true' ? true : false);

    const icons = element.querySelectorAll('i');
    const iconPencil = icons[0];
    const iconConfirm = icons[1];

    // Close edit mode
    if (isEditing) {
      handleConfirmChangeAllTitlesText(inputTitleEdit, selectTitleEdit);

      element.setAttribute("isediting", false);

      inputTitleEdit.style.display = "none";
      selectTitleEdit.style.display = "block";

      iconPencil.style.display = "block";
      iconConfirm.style.display = "none";

      // Open edit mode
    } else {
      element.setAttribute("isediting", true);

      inputTitleEdit.style.display = "block";
      selectTitleEdit.style.display = "none";

      iconPencil.style.display = "none";
      iconConfirm.style.display = "block";
    }
  }

};

const handleConfirmChangeAllTitlesText = (inputField, selectTitleEdit) => {
  const titleSelectEditChange = document.getElementsByClassName('title-select-edit-change');

  const inputFieldStr = inputField.value;
  const selectTitleEditStr = selectTitleEdit.innerText;

  for (let i = 0; i < titleSelectEditChange.length; i++) {
    const strTitle = titleSelectEditChange[i].innerText;
    if (strTitle.trim().toLowerCase() === selectTitleEditStr.trim().toLowerCase()) {
      titleSelectEditChange[i].innerText = inputFieldStr;
      const inputUpdateValue = titleSelectEditChange[i].parentElement.querySelector('input');
      inputUpdateValue.setAttribute('value', inputFieldStr);
    }
  }
};

const reverRowsTable = () => {
  const t = document.getElementById("table-first");

  const tb = t.querySelector('tbody');
  const tr = tb.getElementsByTagName('tr');
  const arrtr = [];
  for (i = 0; i < tr.length; i++) {
    arrtr.push(`<tr>${tr[i].innerHTML}</tr>`);
  }

  const revertArrtr = arrtr.reverse();

  tb.innerHTML = revertArrtr.join(" ");
}

const confirmWithEnter = (keypressed, element) => {
  console.log(keypressed, element);
  if (keypressed.key === "Enter") {
    console.log("Enter Pressed!");
    element.parentElement.querySelector("button").click();
  }
};

const handleShowHideMessage = (message = "", error = false) => {
  const messageId = document.getElementById('messages-id');

  let showSuccess = `<span class='success-message'>${message}</span>`;

  if (error) {
    showSuccess = `<span class='error-message'>${message}</span>`;
  }


  messageId.innerHTML = showSuccess;
  setTimeout(() => {
    messageId.innerHTML = "";
  }, 1100);
}

const saveTableToLocalStorage = () => {
  const tableSecond = document.getElementById('table-second');

  if (tableSecond) {
    const textTableSecond = tableSecond.innerHTML;
    localStorage.setItem("TableSecond", textTableSecond);

    const textToShow = "Salvo com sucesso!";
    handleShowHideMessage(textToShow);
  } else {
    console.log("'table-second' Not Found");
  }
};

const loadTableFromLocalStorage = () => {
  const tableSecond = document.getElementById('table-second');

  if (tableSecond) {
    const textTableSecond = localStorage.getItem("TableSecond");
    if (textTableSecond) {
      tableSecond.innerHTML = textTableSecond;

      const textToShow = "Carregado com sucesso!";
      handleShowHideMessage(textToShow);

      const containerFirstTable = document.getElementById('container-first-table');
      containerFirstTable.innerHTML = "";

      // Used to show the button to save or load a table
      const saveTableButton = document.getElementById('save-table-id-btn');

      saveTableButton.style.display = "inline-flex";
    } else {
      console.log("TableSecond not Found in localstorage")
    }
  } else {
    console.log("'table-second' Not Found");
  }
};

const goToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

const goToBottom = () => {
  window.scrollTo(0, document.body.scrollHeight);
}