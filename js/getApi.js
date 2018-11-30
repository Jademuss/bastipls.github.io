(  function() {
    var app = {
        DogsList: {},
        perroFiltro: document.getElementById('txtfiltro'),
        contenedor: document.getElementById('container-img'),
        todos: document.getElementById('mostrar')
    }
    
    if( localStorage.getItem( "losperros" ) ) {
        app.contenedor.innerHTML = "";
        // document.getElementById('container-img').innerHTML
       app.contenedor.innerHTML = JSON.parse( localStorage.getItem( "losperros" ) );
       app.perroFiltro.addEventListener( "change", function( e ) {
         JSON.parse( localStorage.getItem( "filtraperro" ) );
       });
    }
    var loadData = function() {
        var xhttp = new XMLHttpRequest();
        var url = "https://misperris.pythonanywhere.com/apilistaperros/?format=json";

        xhttp.onreadystatechange = function() {
            if( this.readyState == 4 && this.status == 200 ){
                // console.log( this.responseText );
                var data = JSON.parse( this.responseText );
                displayDogss( data );
              
                app.DogsList = data;
                app.todos.addEventListener("click", function (){
                    displayDogss(data);
                    console.log("el boton funca")
                    })
                
            }
        }
        xhttp.open( 'GET', url, true );
        xhttp.send();
    }
 
    

    var displayDogss = function( Perro ) {
        
        app.contenedor.innerHTML = "";

        for( let Dogs of Perro ) {
            saveData ("losperros",

                app.contenedor.innerHTML += `
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
                `
            );
         
        }
    }

app.perroFiltro.addEventListener( "change", function( e ) {
        var filteredDogss = app.DogsList.filter( function( Perro ) {
            if( Perro.estado_mascota == app.perroFiltro.value ) {
                return Perro;
            }
        } );
       console.log(filteredDogss);
        saveData("filtraperro",displayDogss( filteredDogss ));
     
    } );
    loadData();
    var saveData = function( key, data ) {
        var toSave = JSON.stringify( data );
        localStorage.setItem( key, toSave );
    }
} ) ( );
