(  function() {
    var app = {
        DogsList: [],
    }

    var loadData = function() {
        var xhttp = new XMLHttpRequest();
        var url = "https://misperris.pythonanywhere.com/apilistaperros/?format=json";

        xhttp.onreadystatechange = function() {
            if( this.readyState == 4 && this.status == 200 ){
                // console.log( this.responseText );
                var data = JSON.parse( this.responseText );
                displayDogss( data );
                app.DogsList = data.results;
                console.log(data.nombre_mascota)
                
            }
        }
        xhttp.open( 'GET', url, true );
        xhttp.send();
    }
 
    

    var displayDogss = function( Perro ) {
        var contenedor = document.getElementById( "container-img");
        contenedor.innerHTML = "";

        for( let Dogs of Perro ) {
            contenedor.innerHTML += `
            <div class="item-list">
            <div class="item-list-img">
                <a href="#">
                    <img src="${Dogs.imagen_mascota}" alt="${Dogs.nombre_mascota}">
                </a>
            </div>
            <div class="item-list-name">
                <p id="name">${Dogs.nombre_mascota}</p>
            </div>
            <div class="item-list-info">
                <div class="item-list-data">Estado:</div>
                <div class="item-list-data">
                    <p id="height"> ${Dogs.estado_mascota}</p>
                </div>
            </div>
          </div>
            `;
        }
    }
    loadData();
    // app.DogsColorFilter.addEventListener( "change", function( e ) {
    //     var filteredDogss = app.DogsList.filter( function( Dogs ) {
    //         if( Dogs.color == app.DogsColorFilter.value ) {
    //             return Dogs;
    //         }
    //     } );
    //     displayDogss( filteredDogss );
    // } );
   
} ) ( );