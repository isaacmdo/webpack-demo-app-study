const csv = require('csvtojson');

module.exports = async (data) => {

  const result = await csv({
    trim: true,
    ignoreEmpty: true,
    delimiter: ",",
    headers: [
      'nomeDoRoberto',
      'numeroDaAutorizacao',
      'header3',
      'header4',
      'header5',
      'DataDeEnvioAutorizacao',
      'header7',
      'header8',
      'header9',
      'header10',
      'header11',
      'municipio',
      'header13',
      'cnpjCliente',
      'header15',
      'endereco',
      'header17',
      'telefone',
      'header19',
      'cidade',
      'header21',
      'email',
      'header23',
      'header24',
      'header25',
      'header26',
      'fornecedor',
      'header28',
      'header29',
      'header30',
      'header31',
      'header32',
      'header33',
      'header34',
      'header35',
      'header36',
      'header37',
      'header38',
      'header39',
      'header40',
      'header41',
      'header42',
      'header43',
      'header44',
      'header45',
      'header46',
      'header47',
      'header48',
      'header49',
      'header50',
      'header51',
      'orgaoParticipante',
      'processoAdmLicitatorio',
      'AtaRegistro',
      'dataSolicitacaoFornecimento',
      'header56',
      'header57',
      'header58',
      'header59',
      'header60',
      'tipoItem',
      'header62',
      'header63',
      'codigoProdutoCim',
      'header65',
      'header66',
      'header67',
      'precoUnitario',
      'header69',
      'precoTotal',
      'header71',
      'header72',
      'header73',
      'header74',
      'header75',
      'header76',
      'header77',
      'header78',
      'localEntrega',
      'header80',
      'telefoneEntrega',
      'header82',
      'enderecoEntrega',
      'header84',
      'cidadeEntrega',
      'header86',
      'header87',
      'header88',
      'header89',
      'header90',
      'header91',
      'header92',
      'header93',
      'header94',
      'header95',
      'header96',
      'header97',
      'tipoObjeto',
      'header99',
      'header100',
      'header101',
      'header102',
      'header103',
      'header104',
      'header105',
      'header106',
      'header107',
      'header108',
      'header109',
      'header110'
    ]
  }).fromString(data).then(json => {
    const obj = JSON.parse(JSON.stringify(json));
    const items = obj.filter(el => el.codigoProdutoCim !== undefined);
    console.log(items)
    function filteredListItems(obj) {

      let listItems = [{
        cliente: {
          nome: obj[0].municipio,
          tipoPessoa: 'J',
          endereco: obj[0].endereco,
          cpf_cnpj: obj[0].cnpjCliente,
          cidade: obj[0].cidade,
          fone: obj[0].telefone,
          email: obj[0].email,
          valorTotal: obj[0].header76
        },
        enderecoEntrega: {
          nome: obj[0].localEntrega,
          endereco: obj[0].enderecoEntrega,
          cidade: obj[0].cidadeEntrega,
          telefone: obj[0].telefoneEntrega,
          tipo: obj[0].tipoObjeto,
          obs: obj[0].header105
        }
      }]


      for (let i = 0; i < items.length; i++) {
        listItems.push([{
          items: {
            produto: obj[i].codigoProdutoCim,
            quantidade: obj[i].header60,
            tipo: obj[i].header62,
            valorUnitario: obj[i].precoUnitario,
            valorTotal: obj[i].header76
          }
        }])

      }
      return listItems;
    }

    const listItems = filteredListItems(items);

    const endereco = listItems[0].enderecoEntrega.endereco;
    const bairroIndex = endereco.indexOf('-')
    const bairro = endereco.slice(bairroIndex + 2, endereco.length)

    const cidade = listItems[0].enderecoEntrega.cidade;
    const cepIndex = cidade.indexOf(':');
    const cep = cidade.slice(cepIndex + 2, cidade.length);

    const municipio = cidade.slice(0, cepIndex - 3);

    const numeroIndex = endereco.indexOf('-') - 7;
    const numero = endereco.slice(numeroIndex, numeroIndex + 6)

    const rua = endereco.slice(0, numeroIndex);

    function itemsBlingTest(obj) {
      const items = {
        item: []
      }
      for (let i = 0; i < obj.length; i++) {
        items.item.push({
          codigo: obj[i].header58,
          descricao: obj[i].codigoProdutoCim,
          qtdeUnit: obj[i].header60,
          qtdeKit: obj[i].header62,
          vlr_unit: obj[i].precoUnitario,
          precoUnitarioKit: obj[i].precoTotal,
          descricaoKit: obj[i].header66,
          valorTotalDoItem: obj[i].header72,
        }
        )
      }
      return items;
    }

    const itemsBlig = itemsBlingTest(items);

    const pedido = {
      pedido: {
        cliente: {
          nome: listItems[0].cliente.nome,
          tipoPessoa: 'J',
          endereco: listItems[0].cliente.endereco,
          cpf_cnpj: listItems[0].cliente.cpf_cnpj,
          cidade: listItems[0].cliente.cidade,
          fone: listItems[0].cliente.fone,
          email: listItems[0].cliente.email
        },
        transporte: {
          dados_etiqueta: {
            nome: listItems[0].enderecoEntrega.nome,
            endereco: rua,
            numero: numero,
            municipio: municipio,
            uf: 'SC',
            cep: cep,
            bairro: bairro
          },
          volumes: {
            volume: [
              {
                servico: "BAUEREXPRESS - CONTRATO",
              },
              {
                servico: "PAC - CONTRATO",
              }
            ]
          }
        },
        itens: itemsBlig,
        parcelas: {
          parcela: [
            {
              vlr: listItems[0].valorTotal,
            }
          ]
        },
        obs: listItems[0].enderecoEntrega.obs
      }  
    }

    return pedido;

  })

  return result;
}