var contador = 1;

function adicionarProduto(event) {
  event.preventDefault()
  const divInputProduct = event.target.nextSibling.parentElement.className;
  const idProduct = event.target.nextSibling.parentElement.id;
  const inputProduct = document.getElementsByClassName(`${divInputProduct}`);

  console.dir(
    event.target.parentElement.lastElementChild.previousElementSibling.id,
  );
  console.dir(event.target.nextSibling);
  console.dir(
    event.target.nextSibling.parentElement.lastElementChild
      .previousElementSibling.id,
  );

  function createInput() {
    let cod = document.createElement("input");
    cod.setAttribute("type", "text");
    cod.setAttribute("name", `produto[codigo]`);
    cod.setAttribute("list", "codigos");
    cod.setAttribute("id", `produto[${idProduct}.${contador}]`);
    cod.setAttribute("class", "form-control");
    cod.setAttribute("placeholder", "Nome/Codigo do Produto no BLING");
    cod.setAttribute("autocomplete", "off");
    cod.setAttribute("required", "true");

    let quantity = document.createElement("input");
    quantity.setAttribute("type", "number");
    quantity.setAttribute("class", "form-control");
    quantity.setAttribute("placeholder", "Quantidade em UNIDADES");
    quantity.setAttribute("name", `produto[quantidade]`);
    quantity.setAttribute("id", `quantidade[${idProduct}.${contador}]`);

    let val = document.createElement("input");
    val.setAttribute("type", "text");
    val.setAttribute("name", `produto[valor]`);
    val.setAttribute("id", `valor[${idProduct}.${contador}]`);
    val.setAttribute("class", "form-control mb-5");
    val.setAttribute(
      "placeholder",
      "Valor do produto no referente ao CONTRATO",
    );
    val.setAttribute("autocomplete", "off");

    inputProduct[inputProduct.length - 1].appendChild(cod);
    inputProduct[inputProduct.length - 1].appendChild(quantity);
    inputProduct[inputProduct.length - 1].appendChild(val);

    contador++;
  }
  createInput();
}

function removerProduto(event) {
  event.preventDefault()
  const divInputProduct = event.target.nextSibling.parentElement.className;

  const inputProduct = document.getElementsByClassName(`${divInputProduct}`);

  console.dir(inputProduct);

  if (event.target.nextSibling.parentElement === null) {
    return;
  } else {
    for (let i = 0; i < 3; i++) {
      inputProduct[inputProduct.length - 1].lastElementChild.remove();
    }
  }
}
