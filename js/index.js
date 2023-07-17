// BUSCAR CATEGORIA DEL PRODUCTO
function buscarCategorias(product) {
  var settings = {
    url: `https://api.mercadolibre.com/sites/MLA/domain_discovery/search?limit=1&q=${product}`,
    method: "GET",
    timeout: 0,
    headers: {
      Authorization: "Bearer ",
    },
  };

  $.ajax(settings).done(function (response) {
    console.log(response);
  });
}
let buscarCategoria = document.getElementById("btnBuscarCategoria");
buscarCategoria.addEventListener("click", () => {
  // let valor = txtProductos.value;
  // buscarAtributos(valor);
  // alert(`${valor}`);
  buscarCategorias(txtProducto.value);
});

// BUSCAR  ATRIBUTOS
function buscarAtributos(categorie) {
  var settings = {
    url: `https://api.mercadolibre.com/categories/${categorie}/attributes`,
    method: "GET",
    timeout: 0,
    headers: {
      Authorization: "Bearer ",
    },
  };

  $.ajax(settings).done(function (response) {
    console.log(response);
  });
}
let buscarAtributo = document.getElementById("btnBuscarAtributos");
buscarAtributo.addEventListener("click", () => {
  buscarAtributos(txtCategoria.value);
});

// var idProductoML;
// var idProductoTN;
// CARGAR PRODUCTOS


function cargarProductosTN() {
  var nombreProducto = $("#txtNombreProducto").val();
  var categoriaProducto = $("#txtCategoria2").val();
  var marcaProducto = $("#txtMarca").val();
  var modeloProducto = $("#txtModelo").val();
  var stockProducto = $("#txtStock").val();
  var precioProducto = $("#txtPrecio").val();
  var garantiaProducto = $("#txtGarantia").val();
  var condicionProducto = $("#txtCondicion").val();
  var posicionamientoProducto = $("#txtPosicionamiento").val();
  var urlProducto = $("#txtUrlProducto").val();

  var settings = {
    url: "https://api.nuvemshop.com.br/v1/2696805/products",
    method: "POST",
    timeout: 0,
    headers: {
      Authentication: "bearer fd5821d4f265d5d3c5fb5d390ccdb0d471735361",
      "User-Agent": "Your App Name (5880)",
      "Content-Type": "application/json",
    },
    data: JSON.stringify({
      images: [
        {
          src: urlProducto,
        },
      ],
      name: {
        // "en": "Ultra Ball",
        es: nombreProducto,
        // "pt": "Ultra Ball"
      },
      variants: [
        {
          price: precioProducto,
          stock_management: true,
          stock: stockProducto,
        },
      ],
    }),
  };

  $.ajax(settings).done(function (response) {
    console.log(response);
    idProductoTN = response.id;
  });
}

let cargarProducto = document.getElementById("btnCargarProducto");
cargarProducto.addEventListener("click", () => {
  cargarProductosML();
  // cargarProductosTN();
});

//TODO LO RELACIONADO A LAS IMAGENES
$(document).ready(function () {
  // Abrir el inspector de archivos
  $(document).on("click", "#add-photo", function () {
    $("#add-new-photo").click();
  });
  // -> Abrir el inspector de archivos

  // Cachamos el evento change
  $(document).on("change", "#add-new-photo", function () {
    console.log(this.files);
    var files = this.files;
    var element;
    var supportedImages = ["image/jpeg", "image/png", "image/gif"];
    var seEncontraronElementoNoValidos = false;

    for (var i = 0; i < files.length; i++) {
      element = files[i];

      if (supportedImages.indexOf(element.type) != -1) {
        createPreview(element);
      } else {
        seEncontraronElementoNoValidos = true;
      }
    }

    if (seEncontraronElementoNoValidos) {
      //showMessage("Se encontraron archivos no validos.");
      alert("Se encontraron archivos no validos.");
    } else {
      alert("Todos los archivos se subieron correctamente.");
    }
  });
  // -> Cachamos el evento change

  // Eliminar previsualizaciones
  $(document).on("click", "#Images .image-container", function (e) {
    $(this).parent().remove();
  });
  // -> Eliminar previsualizaciones
});

//Genera las previsualizaciones
function createPreview(file) {
  var imgCodified = URL.createObjectURL(file);
  var img = $(
    '<div class="col-xl-2 col-lg-2 col-md-3 col-sm-4 col-xs-12"><div class="image-container"> <figure> <img src="' +
      imgCodified +
      '" alt="Foto del usuario"> <figcaption> <i class="icon-cross"></i> </figcaption> </figure> </div></div>'
  );
  $(img).insertBefore("#add-photo-container");
  console.log(imgCodified);
  crearUrlImagen(imgCodified);
}

// SE CARGA LAS DIFERENTES IMAGENES
// var imagenes = this.urls;
// var imagenesId = this.id;
// var imgBase64;

// function ValidarImagenPrincipal() {
//     var archivoInput = document.getElementById("ingresarImagen");

//     if (archivoInput.files && archivoInput.files[0]) {
//         var visor = new FileReader();
//         visor.onload = function (e) {
//             $("#imgML").attr("src", e.target.result);
//             imgBase64 = e.target.result;
//             console.log(e.target.result);
//         };
//         visor.readAsDataURL(archivoInput.files[0]);
//         console.log(imgBase64);
//     }
//   }
// // "C:Users' + \ + 'Usuario' + \ + 'Documents' + \ + 'Software' + \ + 'Parques.jpg"



function reemplazarImagenes() {
  var settings = {
    url: `https://api.mercadolibre.com/items/${idProducto}`,
    method: "PUT",
    timeout: 0,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    data: JSON.stringify({
      pictures: [
        {
          source:
            "http://www.apertura.com/export/sites/revistaap/img/Tecnologia/Logo_ML_NUEVO.jpg_33442984.jpg",
        },
      ],
    }),
  };

  $.ajax(settings).done(function (response) {
    console.log(response);
  });
}
