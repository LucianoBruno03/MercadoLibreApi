var mi_Url = `
TG-64b685112673da0001aa1417-530529180
`
function ComenzarPublicar() { 
    localStorage.setItem('MercadoLibre', "PedirCode");
    window.location.href = `http://127.0.0.1:5500/Index.html?code=` + mi_Url;
    // window.location.href = 'https://auth.mercadolibre.com.ar/authorization?response_type=code&client_id=5857222033625799&redirect_uri=https://solesmuebles.ar';

}

function GenerarCode() {
    // window.location.href = `http://127.0.0.1:5500/Index.html?code=` + mi_Url;
    window.location.href = 'https://auth.mercadolibre.com.ar/authorization?response_type=code&client_id=5857222033625799&redirect_uri=https://solesmuebles.ar';
}

function VerificarCode() {
    url = window.location.href;
    // Buscar el parámetro "code" en la URL
    var codeIndex = url.indexOf("?code=");
    if (codeIndex !== -1) {
        // Extraer el valor del parámetro "code"
        var code = url.substr(codeIndex + 6);
        console.log(code);
        console.warn(`code_ML : ${code_ML}`)
        localStorage.setItem('MercadoLibre', "GenerarToken");
        localStorage.setItem('Code', code);
        
        // Utilizar el valor del parámetro "code" como desees
        setTimeout(function() {
            window.location.href = 'http://127.0.0.1:5500/Index.html';  
            // window.location.href = 'https://solesmuebles.ar';           
        }, 1500);
    }
}

function GenerarAccessToken(){
    code_ML = localStorage.getItem('Code');
    var myHeaders = new Headers();
    myHeaders.append("accept", "application/json");
    myHeaders.append("content-type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    urlencoded.append("grant_type", "authorization_code");
    urlencoded.append("client_id", clientID_ML);
    urlencoded.append("client_secret", clientSecret_ML);
    urlencoded.append("code", code_ML);
    urlencoded.append("redirect_uri", "https://solesmuebles.ar");

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow'
    };

    fetch("https://api.mercadolibre.com/oauth/token", requestOptions)
        .then(response => response.text())
        .then(result => {
            console.log(result)
            var Respuesta = JSON.parse(result)
            localStorage.setItem('RefreshToken', Respuesta.refresh_token);
            localStorage.setItem('AccessToken', Respuesta.access_token);

            console.warn(`refreshToken_ML : ${Respuesta.refresh_token} \n access_token_ML : ${Respuesta.access_token}`)
            localStorage.setItem('MercadoLibre', "Listo");
            GetGrillaMercadoLibre()
        })
        .catch(error => console.log('error', error));
}

function RefreshToken(){
    refreshToken_ML = localStorage.getItem('RefreshToken');
    var myHeaders = new Headers();
    myHeaders.append("accept", "application/json");
    myHeaders.append("content-type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    urlencoded.append("grant_type", "refresh_token");
    urlencoded.append("client_id", clientID_ML);
    urlencoded.append("client_secret", clientSecret_ML);
    urlencoded.append("refresh_token", refreshToken_ML);

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow'
    };

    fetch("https://api.mercadolibre.com/oauth/token", requestOptions)
        .then(response => response.text())
        .then(result => {
            var Respuesta = JSON.parse(result)
            console.log(Respuesta)
            localStorage.setItem('RefreshToken', Respuesta.refresh_token);
            localStorage.setItem('AccessToken', Respuesta.access_token);

        })
        .catch(error => console.log('error', error));
}