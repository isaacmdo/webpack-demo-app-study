import "./utils/create-product-input";
import { productsArray } from "./utils/products-bling";
import { csvReader } from "./utils/csv-reader";


const csvFileInput = document.querySelector('#csv');

    csvFileInput.addEventListener("change", function (e) {
      let divProducts = document.createElement("div");
      const input = csvFileInput.files[0];
      const reader = new FileReader();
      const productsList = document.querySelector("#productsList");
      const addressList = document.querySelector("#addressList");
      addressList.removeAttribute("style");
      productsList.innerHTML = "";

      reader.onload = function (e) {
        const text = e.target.result;
        csvReader(text).then((data) => {
          const productsCsv = data.pedido.itens;
          const pedido = data.pedido;
          const cliente = data.pedido.cliente;

          productsList.insertAdjacentElement("afterbegin", divProducts);

          let listProducts = [];
          let listCods = [];

          for (let i = 0; i < productsCsv.item.length; i++) {
            divProducts.innerHTML += `<label class="form-label mt-3" for="numero-produtos"><strong>${productsCsv.item[i].descricao}</strong> ${productsCsv.item[i].descricaoKit} </br> QUANTIDADE KIT: <strong>${productsCsv.item[i].qtdeKit}</strong> </br> QUANTIDADE UNIDADE: <strong>${productsCsv.item[i].qtdeUnit}</strong> </br> Valor Unitario: <strong>${productsCsv.item[i].vlr_unit}</strong> </br> Valor Unitario do KIT: <strong>${productsCsv.item[i].precoUnitarioKit}</strong> </br> Valor Total:  <strong>${productsCsv.item[i].valorTotalDoItem} </strong></label>
            <div id="${i}" class="input-product[${i}] mb-3">
            <span class="btn-success mb-3"  onclick="adicionarProduto(event);">Adicionar Produto</span>
            <span class="btn-danger mb-3" onclick="removerProduto(event);">Remover Produto</span>
            <datalist id="services">
            <div id="options"></div>
            </datalist>
            <datalist id="codigos">
            <div id"codigos"></div>
            </datalist>
            </div>`;
          }

          var option = "";
          let codigos = "";

          for (let j = 0; j < productsArray[0].length; j++) {
            for (
              let i = 0;
              i < productsArray[0][j].retorno.produtos.length;
              i++
            ) {
              listProducts.push(
                productsArray[0][j].retorno.produtos[i].produto.descricao,
              );
              listCods.push(
                productsArray[0][j].retorno.produtos[i].produto.codigo,
              );
            }
          }

          for (let i = 0; i < listProducts.length; i++) {
            option +=
              '<option value="' +
              listProducts[i] +
              '">' +
              listCods[i] +
              "</options>";
          }

          for (let i = 0; i < listProducts.length; i++) {
            codigos +=
              '<option value="' +
              listCods[i] +
              '">' +
              listProducts[i] +
              "</options>";
          }

          document.getElementById("options").innerHTML = option;
          document.getElementById("codigos").innerHTML = codigos;

          function populateAddress() {
            const street = document.querySelector("#street");
            const complement = document.querySelector("#complement");
            const number = document.querySelector("#number");
            const district = document.querySelector("#district");
            const city = document.querySelector("#city");
            const cep = document.querySelector("#cep");
            const state = document.querySelector("#state");

            console.log(cliente.endereco);
            const bairroIndex = cliente.endereco.indexOf("-");
            district.value = cliente.endereco.slice(
              bairroIndex + 2,
              cliente.endereco.length,
            );

            const cidade = cliente.cidade;
            const cepIndex = cidade.indexOf(":");
            cep.value = cidade.slice(cepIndex + 2, cidade.length);

            city.value = cidade.slice(0, cepIndex - 3);

            state.value = "SC";

            const numeroIndex = cliente.endereco.indexOf("-") - 5;
            number.value = cliente.endereco.slice(numeroIndex, numeroIndex + 6);

            street.value = cliente.endereco.slice(0, numeroIndex);

            console.log(pedido.obs);
            complement.value = pedido.obs;
          }

          populateAddress();
        });
      };

      reader.readAsText(input);
});
