(function() {

  if ('serviceWorker' in navigator) {
      navigator.serviceWorker
               .register('./service-worker.js')
               .then(function() { 
                   console.log('Service Worker Registered'); 
              });
  }
})( );

(function() {
var displayDogs = function (){
    var urljson = 'http://127.0.0.1:8000/apilistaperros/?format=json'
fetch(urljson)
.then(data => data.json())
.then(data => {
  console.log(data[0].imagen_mascota)

    var contenedor = document.getElementById("container-img");
    contenedor.innerHTML = '';
    for  (let valor of data){
        console.log(valor.nombre_mascota)
        contenedor.innerHTML += `
        <div class="item-list">
        <div class="item-list-img">
            <a href="#">
                <img src="${valor.imagen_mascota}" alt="${valor.nombre_mascota}">
            </a>
        </div>
        <div class="item-list-name">
            <p id="name">${valor.nombre_mascota}</p>
        </div>
        <div class="item-list-info">
            <div class="item-list-data">Estado:</div>
            <div class="item-list-data">
                <p id="height"> ${valor.estado_mascota}</p>
            </div>
        </div>
      </div>
        `;
 

}



 
})
}
displayDogs();    




})( );
