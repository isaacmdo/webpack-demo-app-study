const { Readable } = require('stream');
const builder = require('xmlbuilder');
const csvReader = require('../src/app/utils/csv-Reader-Node');
module.exports.index = async (req, res) =>{
  res.render('home.ejs');
}

module.exports.autorizacao = async (req, res) =>{
  const products = req.body.produto;
  //const nameProduct = [ req.body.produto.nome ];
  const codProduct = [ req.body.produto.codigo ];
  const quantityProduct = [ req.body.produto.quantidade ];
  const valProduct =  [ req.body.produto.valor ];

  const address = req.body.address;

  const { file } = req;
  const { buffer } = file;

  const readableFile = new Readable();
  readableFile.push(buffer);
  readableFile.push(null);

  let resultJson = await csvReader(buffer.toString('utf-8'));
  
  resultJson.pedido.itens.item = [];
  resultJson.pedido.cliente.nome = resultJson.pedido.cliente.cpf_cnpj;
  resultJson.pedido.cliente.cidade = address.city;
  resultJson.pedido.transporte.dados_etiqueta.nome = '';
  resultJson.pedido.transporte.dados_etiqueta.bairro = address.district;
  resultJson.pedido.transporte.dados_etiqueta.cep = address.cep;
  resultJson.pedido.transporte.dados_etiqueta.endereco = address.street;
  resultJson.pedido.transporte.dados_etiqueta.municipio = address.city;
  resultJson.pedido.transporte.dados_etiqueta.numero = address.number;
  resultJson.pedido.transporte.dados_etiqueta.uf = address.state;
  
    for(let i = 0; i < valProduct[0][0].length; i++){
      if(valProduct[0][0].length === 1){
        resultJson.pedido.itens.item.push({
          codigo: codProduct[0],
          //descricao: nameProduct[0],
          qtde: quantityProduct[0],
          vlr_unit: valProduct[0]
      })
      } else {
        resultJson.pedido.itens.item.push({
          codigo: codProduct[0][i],
          //descricao: nameProduct[0][i],
          qtde: quantityProduct[0][i],
          vlr_unit: valProduct[0][i]
        })
      }
    }
    
  console.log(resultJson.pedido)


  const resultXml = builder.create(resultJson).end({ prettyPrint: true });
  
   console.log(resultXml);
   console.log(req.body);
   return res.send(resultXml);
}



