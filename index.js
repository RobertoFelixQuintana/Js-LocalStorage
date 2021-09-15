function resetFields(){
    document.getElementById("Input1").value='';
    document.getElementById("Input2").value='';
    document.getElementById("Input3").value='Selecciona';
    document.getElementById("Input4").value='Selecciona';
    document.getElementById("Input5").value='Selecciona';
}

function createR() {
    
    //Guardo los datos capturados usando el id de cada control
    var id = document.getElementById("Input1").value;
    var nombre = document.getElementById("Input2").value;
    var elemento = document.getElementById("Input3").value;
    var zona = document.getElementById("Input4").value;
    var tipo = document.getElementById("Input5").value;


    //validaciones
    if (id.length > 0) {
        //creo un objeto que guarda los datos
        var personaje = {
            id, //matricula:id    id:id
            nombre,//nombre:nombre
            elemento,
            zona,
            tipo,
        }

        var lista_personajes=JSON.parse(localStorage.getItem("Personajes"));

        if(lista_personajes==null)
        { 
            var lista_personajes = [];
        }
        
        const existe = lista_personajes.some(element=>element.id==id); 

        if(!existe||document.getElementById("Input1").disabled==true)
        {
            
            if(document.getElementById("Input1").disabled==true)
            {
                var lista_personajes=lista_personajes.filter(personaje=>personaje.id!=id);

            }
                
            lista_personajes.push(personaje);
            var temporal = lista_personajes.sort((a,b) => a.id-b.id);
            localStorage.setItem("Personajes", JSON.stringify(temporal));
            
            read();
            resetFields();
            swal("Listo!", "Agregado correctamente", "success");

        }
        else
        {
            swal("Error", "Ya existe ese id de personaje","warning");
        }

    } 
    else 
    {
        swal("Error", "Llena todos los campos","warning");
    }

    document.getElementById("Input1").disabled = false;
    
}

function read(){
    document.getElementById("Table1").innerHTML='';
    

    const lista_personajes = JSON.parse(localStorage.getItem("Personajes"));
    
     
    if(lista_personajes)
    {
        lista_personajes.forEach((personaje)=>printRow(personaje));
    }
}


function printRow(personaje){
    
    if(personaje!=null){
        var table = document.getElementById("Table1"); 

        //creamos un nuevo elemento en la tabla en la ultima posicion
        var row = table.insertRow(-1);

        //Insertamos cada una de las celdas/columnas del registro
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        var cell5 = row.insertCell(4);
        var cell6 = row.insertCell(5);
        var cell7 = row.insertCell(6);
        
        //Agregamos la informacion a cada una de las columnas del registro
        cell1.innerHTML = personaje.id;
        cell2.innerHTML = personaje.nombre; 
        cell3.innerHTML = personaje.elemento;
        cell4.innerHTML = personaje.zona; 
        cell5.innerHTML = personaje.tipo; 
        cell6.innerHTML = `<button type="button" class="btn btn-danger" onClick="deleteR(${personaje.id})">Eliminar</button>`;
        cell7.innerHTML = '<button type="button" class="btn btn-success" onClick="seekR('+personaje.id+')">Modificar</button>';
    }
}

function deleteR(id){
    const lista_personajes = JSON.parse(localStorage.getItem("Personajes"));
    var temporal=lista_personajes.filter(personaje=>personaje.id!=id);
    localStorage.setItem("Personajes", JSON.stringify(temporal));

    if(temporal.length==0)
    { 
        localStorage.removeItem("Personajes");
    }
  
    read();
    
}

function seekR(id){

    const lista_personajes = JSON.parse(localStorage.getItem("Personajes"));
    var personaje=lista_personajes.filter(personaje=>personaje.id==id);
    console.log(personaje[0]);
    updateR(personaje[0]);
}

function updateR(personaje){
    if(personaje!=null)
    {
        document.getElementById("Input1").value=personaje.id;
        document.getElementById("Input1").disabled = true;
        document.getElementById("Input2").value=personaje.nombre;
        document.getElementById("Input3").value=personaje.elemento;
        document.getElementById("Input4").value=personaje.zona;
        document.getElementById("Input5").value=personaje.tipo;
    }
}


//Para consulta de carrera
function readQ(){
    document.getElementById("Table2").innerHTML='';
    var c = document.getElementById("Input5").value;
  
    const lista_personajes = JSON.parse(localStorage.getItem("Personajes"));
    var personajeC=lista_personajes.filter(personaje=>personaje.zona==c);
    if(personajeC)
    {
        personajeC.forEach((personaje)=>printRowQ(personaje));
    }
    console.log(personajeC)

}


function printRowQ(personaje){

    var table = document.getElementById("Table2"); 
    
    //creamos un nuevo elemento en la tabla en la ultima posicion
    var row = table.insertRow(-1);

    //Insertamos cada una de las celdas/columnas del registro
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var cell5 = row.insertCell(4)
    
    //Agregamos la informacion a cada una de las columnas del registro
    cell1.innerHTML = personaje.id;
    cell2.innerHTML = personaje.nombre; 
    cell3.innerHTML = personaje.elemento;
    cell4.innerHTML = personaje.zona; 
    cell5.innerHTML = personaje.tipo; 
   
}