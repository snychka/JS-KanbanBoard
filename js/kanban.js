let order = 1;
let adding = false;

const error = document.querySelector('.error');
const message = 'Please add a description.';

const add_btn = document.querySelector('.add');
add_btn.addEventListener('click', () => {
  const target = document.querySelector('#requested');
  console.log(target);
  if (adding == false) {
    adding = true;
    target.appendChild(create_item());
  } else {
    error.innerHTML = message;
  }
});

const create_item = () => {
  const item = document.createElement('div');
  item.classList.add('item');
  item.id = 'item-' + order;
  item.draggable = true;
  // https://developer.mozilla.org/en-US/docs/Web/API/DataTransfer/setData
  /*item.addEventListener('dragstart', (e) => {
      return e.dataTransfer.setData('text', e.target.id);
  });*/
  //item.addEventListener('dragstart', (e) => e.dataTransfer.setData('text', e.target.id) );
  item.addEventListener('dragstart', (event) => event.dataTransfer.setData('text', event.target.id) );
  item.addEventListener('dragend', (event) => event.dataTransfer.clearData() );
  const input = document.createElement('input');
  //item.append(input);
  item.appendChild(input);

  const save_btn = document.createElement('button');
  //save_btn.textContent = 'Save';
  save_btn.innerHTML = 'Save';
  save_btn.addEventListener('click', () => {
    error.innerHTML = '';
    if (input.value != '') {
      order += 1;
      item.innerHTML = input.value;
      adding = false;
    } else {
      error.innerHTML = message;
    }
  });
  item.appendChild(save_btn);

  return item; // Stef, added for now to get to "compile"
};

document.querySelectorAll('.drop').forEach(element => {
  element.addEventListener('drop', (event) => {
    event.preventDefault();
    const id = event.dataTransfer.getData('text');
    event.target.appendChild(document.getElementById(id));
  })
  element.addEventListener('dragover', (event) => event.preventDefault());
});
