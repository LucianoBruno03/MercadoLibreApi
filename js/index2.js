let accessToken_ML = ""
let refreshToken_ML = "";
let code_ML = "";
let clientID_ML = "5857222033625799";
let clientSecret_ML = "NjZZW9LFnJ0H4qZdVO6IwOwO1F1qGRU3";
let redirectUrl_ML = "https://solesmuebles.ar/";
// varialbes globales
  var tabla = document.getElementById("TablaProductos");

document.addEventListener("DOMContentLoaded", function() {
  if(localStorage.getItem("MercadoLibre")){
    var estado = localStorage.getItem('MercadoLibre');
    if(estado == "PedirCode"){
      console.warn("VerificarCode")
      VerificarCode()
    }else if(estado == "GenerarToken"){
      console.warn("GenerarAccessToken")
      GenerarAccessToken()
    }else if(estado == "Listo"){
      refreshToken_ML = localStorage.getItem("RefreshToken");
      accessToken_ML = localStorage.getItem("AccessToken");
      console.warn("Ya pudes publicar refreshToken_ML " +refreshToken_ML + " y accessToken_ML "+ accessToken_ML)
    }
  }else{
    GetGrillaMercadoLibre();

  }
  GetGrillaMercadoLibre()

});


function InvetirEstado (valor){
  var myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + accessToken_ML);
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Accept", "application/json");
  var raw = JSON.stringify({
    "status": "active"
  });
  var requestOptions = {
    method: 'PUT',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };
  fetch(`https://api.mercadolibre.com/items/${valor}`, requestOptions)
    .then(response => response.text())
    .then(result => {
      var Respuesta = JSON.parse(result);
      console.log(Respuesta) 
      GetGrillaMercadoLibre();

    })
    .catch(error => console.log('error', error));
}

const GetGrillaMercadoLibre = async () => {
  try {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${accessToken_ML}`);

    var requestOptions = {
      method: "GET",
      timeout: 0,
      headers: myHeaders,
      redirect: "follow",
    };

    const response = await fetch(
      "https://api.mercadolibre.com/sites/MLA/search?seller_id=530529180",
      requestOptions
    );
    const Datos = await response.json();

    console.log(Datos);

    let activo = "--";
    let content = ``;

    for (let i = 0; i < Datos.results.length; i++) {
      const datos = Datos.results[i];
      content += `
			<tbody>
				<tr>
					<th scope="row">${datos.id}</th>
					<td>${datos.title}</td>
					<td><div class="input-group input-group-sm mb-3">
  <button onclick="ModificacionPrecio('${datos.id}')" class="input-group-text" id="inputGroup-sizing-sm"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-currency-dollar" viewBox="0 0 16 16">
  <path d="M4 10.781c.148 1.667 1.513 2.85 3.591 3.003V15h1.043v-1.216c2.27-.179 3.678-1.438 3.678-3.3 0-1.59-.947-2.51-2.956-3.028l-.722-.187V3.467c1.122.11 1.879.714 2.07 1.616h1.47c-.166-1.6-1.54-2.748-3.54-2.875V1H7.591v1.233c-1.939.23-3.27 1.472-3.27 3.156 0 1.454.966 2.483 2.661 2.917l.61.162v4.031c-1.149-.17-1.94-.8-2.131-1.718H4zm3.391-3.836c-1.043-.263-1.6-.825-1.6-1.616 0-.944.704-1.641 1.8-1.828v3.495l-.2-.05zm1.591 1.872c1.287.323 1.852.859 1.852 1.769 0 1.097-.826 1.828-2.2 1.939V8.73l.348.086z"/>
</svg></button>
<input type="number" id="txt_Precio_${datos.id}" autocapitalize="off" value="${datos.price}" onchange="ModificacionPrecio('${datos.id}')" onclick="SeleccionPrecio('${datos.id}')" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm">
</div></td>
<td><div class="input-group input-group-sm mb-3">
  <button onclick="ModificacionCantidad('${datos.id}')" class="input-group-text" id="inputGroup-sizing-sm"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box-seam" viewBox="0 0 16 16">
  <path d="M8.186 1.113a.5.5 0 0 0-.372 0L1.846 3.5l2.404.961L10.404 2l-2.218-.887zm3.564 1.426L5.596 5 8 5.961 14.154 3.5l-2.404-.961zm3.25 1.7-6.5 2.6v7.922l6.5-2.6V4.24zM7.5 14.762V6.838L1 4.239v7.923l6.5 2.6zM7.443.184a1.5 1.5 0 0 1 1.114 0l7.129 2.852A.5.5 0 0 1 16 3.5v8.662a1 1 0 0 1-.629.928l-7.185 2.874a.5.5 0 0 1-.372 0L.63 13.09a1 1 0 0 1-.63-.928V3.5a.5.5 0 0 1 .314-.464L7.443.184z"/>
</svg></button>
  <input type="number" id="txt_Cantidad_${datos.id}" value="${datos.available_quantity}" onchange="ModificacionCantidad('${datos.id}')"  onclick="SeleccionCantidad('${datos.id}')" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm">
</div></td>
          <td>Activo</td>
          <td><button id="btnModificar" class="btn" data-bs-toggle="modal" onclick="AbrirModal('${datos.id}')"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
  <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
</svg></button></td>
          <td><button id="btnInvertirEstado" class="btn" onclick="InvetirEstado('${datos.id}')"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-down-up" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M11.5 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L11 2.707V14.5a.5.5 0 0 0 .5.5zm-7-14a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L4 13.293V1.5a.5.5 0 0 1 .5-.5z"/>
</svg></button></td>
					</td>
				</tr> 
			<tbody>`;
    }
// ,'${datos.title}','${datos.category_id}','${datos.attributes[0].value_name}','${datos.attributes[1].value_name}','${datos.available_quantity}','${datos.price}','${datos.sale_terms[1].value_name}','${datos.condition}','${datos.listing_type_id}','${datos.pictures[0].source}'
    tabla.innerHTML = content;
  } catch (ex) {}
};


function SeleccionCantidad(valor) {
  console.log(`Esta queriendo modificar la cantidad ${valor}`);
}

function SeleccionPrecio(valor) {
  console.log(`Esta queriendo modificar el precio ${valor}`);
}

function ModificacionPrecio(valor) {
  let valorNuevo = document.getElementById(`txt_Precio_${valor}`).value;
  var myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + accessToken_ML);
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Accept", "application/json");
  var raw = JSON.stringify({
    "price": valorNuevo
  });
  var requestOptions = {
    method: 'PUT',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };
  fetch(`https://api.mercadolibre.com/items/${valor}`, requestOptions)
    .then(response => response.text())
    .then(result => {
      var Respuesta = JSON.parse(result);
      console.log(Respuesta) 
      GetGrillaMercadoLibre();

    })
    .catch(error => console.log('error', error));
}

function ModificacionCantidad(valor) {
  let valorNuevo = document.getElementById(`txt_Cantidad_${valor}`).value;
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${accessToken_ML}`);
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Accept", "application/json");
  var raw = JSON.stringify({
    "available_quantity": valorNuevo
  });
  var requestOptions = {
    method: 'PUT',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };
  fetch(`https://api.mercadolibre.com/items/${valor}`, requestOptions)
    .then(response => response.text())
    .then(result => {
      var Respuesta = JSON.parse(result);
      console.log(Respuesta) 
      GetGrillaMercadoLibre();
    })
    .catch(error => console.log('error', error));
  
}

var TipoProducto = document.getElementById("txt_Producto")
var Categorias = document.getElementById("cbo_Categorias")
var IDCategoria = document.getElementById("txt_CategoriaID")
var Titulo = document.getElementById("txt_Titulo")
var Cantidad = document.getElementById("txt_Cantidad")
var Precio = document.getElementById("txt_Precio")
var Condicion = document.getElementById("txt_Condicion")
var Marca = document.getElementById("txt_Marca")
var Modelo = document.getElementById("txt_Modelo")
var Entrega = document.getElementById("cbo_Entrega")
var Garantia = document.getElementById("cbo_Garantia")
var TiempoGarantia = document.getElementById("txt_TiempoGarantia")
var MedidaGarantia = document.getElementById("cbo_MedidaGarantia")
var Descripcion = document.getElementById("txt_Descripcion")
var divAtributos = document.getElementById("SeccionAtributos");


function SubirProductos(){
  var myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + accessToken_ML);
  myHeaders.append("Content-Type", "application/json");
if(TipoProducto.value != "" && IDCategoria.value != "" && Titulo.value != "" && Cantidad.value != "" && Precio.value != "" && Condicion.value != "" && Marca.value != "" && Modelo.value != ""){
  var valorGarantia
  Garantia.value != "Sin garantía" ? valorGarantia = `${TiempoGarantia.value} ${MedidaGarantia.value}`: valorGarantia = null;


  var raw = JSON.stringify({
    "title": Titulo.value,
    "category_id": IDCategoria.value,
    "price": Precio.value,
    "currency_id": "ARS",
    "available_quantity": Cantidad.value,
    "buying_mode": "buy_it_now",
    "condition": Condicion.value,
    "listing_type_id": "gold_special",
    "sale_terms": [
      {
        "id":"WARRANTY_TYPE",
        "value_name": Garantia.value
      },
      {
        "id":"WARRANTY_TIME",
        "value_name": valorGarantia
      },
      {
        "id": "MANUFACTURING_TIME",
        "value_name": Entrega.value
      }
    ],
    "pictures": [
      {
        "source": "https://http2.mlstatic.com/D_NQ_NP_636742-MLA54938552946_042023-O.webp"
      }
    ],
    "attributes": [
      {
        "id": "BRAND",
        "value_name": Marca.value
      },
      {
        "id": "MODEL",
        "value_name": Modelo.value
      },
      {
        "id": "PRODUCT_TYPE",
        "name": "Tipo de producto",
        "value_name": TipoProducto.value
      },
      {
        "id": "MANUFACTURER",
        "value_name": Marca.value
      },
      {
        "id": "LINE", // traer del endpoint
        "value_name": "Bergamo"
      },
      {
        "id": "COLOR", // traer del endpoint
        "value_name": "Lavanda"
      },
      //Diseño tela
      // {
      //   "id": "FABRIC_DESIGN", // traer del endpoint
      //   "value_name": "null"
      // },
      //MATERIAL DE TAPIZADO
      {
        "id": "UPHOLSTERY_MATERIAL", // traer del endpoint
        "value_name": "Pana"
      },
      //CANTIDAD DE CUERPOS
      {
        "id": "SEATERS_NUMBER", // traer del endpoint
        "value_name": "3"
      },
      {
        "id": "IS_RECLINABLE", // traer del endpoint
        "value_name": "No"
      },
      {
        "id": "SOFA_ORIENTATION", // traer del endpoint
        "value_name": "Derecho"
      },
      {
        "id": "LEGS_MATERIAL", // traer del endpoint
        "value_name": "Madera"
      },
      {
        "id": "LEGS_COLOR", // traer del endpoint
        "value_name": "Verde oscuro"
      },
      {
        "id": "MAIN_COLOR", // traer del endpoint
        "value_name": "Verde oscuro"
      },
      {
        "id": "WIDTH", // traer del endpoint
        "value_name": "1.3"
      },
      {
        "id": "DEPTH", // traer del endpoint
        "value_name": "1.3"
      },
      {
        "id": "WEIGHT", // traer del endpoint
        "value_name": "25"
      },
      {
        "id": "HEIGHT", // traer del endpoint
        "value_name": "1.3"
      },
      {
        "id": "SOFA_FORMAT", // traer del endpoint
        "value_name": "En L"
      },
      {
        "id": "STYLE", // traer del endpoint
        "value_name": "Francés"
      },
      {
        "id": "STRUCTURE_MATERIALS", // traer del endpoint
        "value_name": "Aluminio"
      },
      {
        "id": "BACK_FILL_MATERIAL", // traer del endpoint
        "value_name": "Espuma"
      },
      {
        "id": "SEAT_FOAM_DENSITY", // traer del endpoint
        "value_name": "Alta"
      }
    ]
  });
  console.log(JSON.parse(raw))
  console.log(raw)
  
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  fetch("https://api.mercadolibre.com/items", requestOptions)
    .then(response => response.text())
    .then(result => {
      var Respuesta = JSON.parse(result);
      console.log(Respuesta)
      if(Descripcion != ""){
        // CargaraDescripcion(Respuesta)
      }
      LimpiarCampos();
    })
    .catch(error => console.log('error', error));
  }
}

function LimpiarCampos(){
  TipoProducto.value = "";
  Titulo.value = "";
  Cantidad.value = "";
  Precio.value = "";
  Marca.value = "";
  Modelo.value = "";
  IDCategoria.value = "";
  Categorias.innerHTML = "";
}

function BuscarCategorias(){
  Categorias.innerHTML = "";
  Categorias.innerHTML += `<option value="">Seleccione una categoría</option>`;
  IDCategoria.value = "" 

  if(TipoProducto.value != "" && TipoProducto.value != null){
    fetch("https://api.mercadolibre.com/sites/MLA/domain_discovery/search?limit=8&q=" + TipoProducto.value)
      .then(response => response.text())
      .then(result => {
        var Respuesta = JSON.parse(result);
        console.log(Respuesta) 
        Respuesta.forEach(element => {
          Categorias.innerHTML += `<option value="${element.category_id}">${element.category_name} - ${element.domain_name}</option>`;
        }
        );
      })
      .catch(error => console.log('error', error));
  }
}

function CargarIdCategoria(){
  IDCategoria.value  = Categorias.value 
  CargaCombosAtributos(Categorias.value)
}


function HabilitaTiempoGarantia(){
  if(Garantia.value != "Sin garantía"){
    MedidaGarantia.disabled = false;
    TiempoGarantia.disabled = false;
  }else{
    MedidaGarantia.disabled = true;
    TiempoGarantia.disabled = true;
    TiempoGarantia.value = "";
  }
}

function CargaraDescripcion(MercadoLibreId){
  var myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer "+accessToken_ML);
  myHeaders.append("Content-Type", "application/json");
  
  var raw = JSON.stringify({
    "plain_text": "Cargando descripcion con api de mercado libre en Postman"
  });
  
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };
  
  fetch(`https://api.mercadolibre.com/items/${MercadoLibreId}/description`, requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
}


var atributosCategoria
function CargaCombosAtributos(IDCategoria){
  var myHeaders = new Headers();
myHeaders.append("Authorization", "Bearer " + accessToken_ML);

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

fetch(`https://api.mercadolibre.com/categories/${IDCategoria}/attributes`, requestOptions)
  .then(response => response.text())
  .then(result => {
    var Respuesta = JSON.parse(result);
    console.log(Respuesta)
    atributosCategoria = Respuesta
    var Linea = document.getElementById("cbo_Linea")
    Linea.innerHTML += "<option value='-1'>Seleccione una línea</option><option value='-1'>No aplica</option>"
    Respuesta[2].values.forEach(element => {
      Linea.innerHTML += `<option value=''>${element.name}</option>`
    })
    var Color = document.getElementById("cbo_Color")
    Color.innerHTML += "<option value='-1'>Seleccione un color</option><option value='-1'>No aplica</option>"
    Respuesta[5].values.forEach(element => {
      Color.innerHTML += `<option value=''>${element.name}</option>`
    })
    var Material = document.getElementById("cbo_Material")
    Material.innerHTML += "<option value='-1'>Seleccione un material</option><option value='-1'>No aplica</option>"
    Respuesta[7].values.forEach(element => {
      Material.innerHTML += `<option value=''>${element.name}</option>`
    })
    var Reclinable = document.getElementById("cbo_Reclinable")
    Respuesta[10].values.forEach(element => {
      Reclinable.innerHTML += `<option value=''>${element.name}</option>`
    })
    var Linea = document.getElementById("cbo_Linea")
    Linea.innerHTML += "<option value='-1'>Seleccione una línea</option><option value='-1'>No aplica</option>"
    Respuesta[2].values.forEach(element => {
      Linea.innerHTML += `<option value=''>${element.name}</option>`
    })
    var Linea = document.getElementById("cbo_Linea")
    Linea.innerHTML += "<option value='-1'>Seleccione una línea</option><option value='-1'>No aplica</option>"
    Respuesta[2].values.forEach(element => {
      Linea.innerHTML += `<option value=''>${element.name}</option>`
    })
  })
  .catch(error => console.log('error', error));
}