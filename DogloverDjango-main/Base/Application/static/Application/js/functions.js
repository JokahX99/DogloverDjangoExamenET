// -----------------------------------------[CALENDARIO]----------------------------------------- //
var monthName = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio",
                 "Agosto","Septiembre","Octubre","Noviembre","Diciembre"];

var now = new Date();
var day = now.getDate();
var month = now.getMonth();
var currentMonth = month;
var year = now.getFullYear();


initCalender();
console.log(startDay());

function initCalender() {
    $("#text_month").text(monthName[currentMonth]);
    $("#text_month_02").text(monthName[month]);
    $("#text_year").text(year);
    $(".item_day").remove();

    for (let i = startDay(); i > 0; i--) {
        $(".container_days").append(`<span class="week_days_item item_day prev_days">${getTotalDays(month - 1) - (i - 1)}</span>`);
    }

    for (let i = 1; i <= getTotalDays(month); i++) {
        if (i == day && month == currentMonth) {
            $(".container_days").append(`<span class="week_days_item item_day today">${i}</span>`);
        } else {
            $(".container_days").append(`<span class="week_days_item item_day">${i}</span>`);
        }
    }

       // Agregar evento de clic al contenedor de días del calendario
       $(".container_days").on("click", ".item_day", function() {
        // Remover la clase de resaltado de todos los días
        $(".item_day").removeClass("highlight").removeClass("today");
        // Resaltar el día seleccionado
        $(this).addClass("highlight").addClass("today");
        // Obtener el día y el mes seleccionados
        let clickedDay = $(this).text();
        let clickedMonth = monthName.indexOf($("#text_month_02").text()) + 1;
        // Actualizar el número y el mes en el encabezado del calendario
        $("#text_day").text(clickedDay);
        $("#text_month").text(monthName[clickedMonth - 1]);
    });
}

function getNextMonth(){
    if(month !== 11){
        month++;
    }else{
        year++;
        month = 0;
    }
    initCalender();
}
function getPrevMonth(){
    if(month !== 0){
        month--;
    }else{
        year--;
        month = 11;
    }
    initCalender();
}
function startDay(){
    var start = new Date(year, month, 1);
    return((start.getDate()-1)===-1) ? 6 : start.getDay();
}

function leapMonth(){
    return((year % 400 === 0) || (year % 4 === 0) && (year % 100 !== 0));
}

function getTotalDays(){
    if(month === -1) month = 11;

    var numMonthReal = month +1;

    if(numMonthReal == 3 || numMonthReal == 5 || numMonthReal == 8 || numMonthReal == 10){
        return 31;
    }else if(numMonthReal == 0 || numMonthReal == 2 || numMonthReal == 4 || numMonthReal == 6 
             || numMonthReal == 7 || numMonthReal == 9 || numMonthReal == 10){
        return 30;
    }else{
        return leapMonth() ? 29:28;
    }
}

$("#next_month").click(function(){
    getNextMonth();
});
$("#last_month").click(function(){
    getPrevMonth();
})

$(document).ready(function() {
    // Lógica del calendario y manejo de eventos aquí
    // ...
    
    // Agregar evento de clic al contenedor de días del calendario
    $(".container_days").on("click", ".item_day", function() {
        // Remover la clase de resaltado de todos los días
        $(".item_day").removeClass("highlight").removeClass("today");
        // Resaltar el día seleccionado
        $(this).addClass("highlight").addClass("today");
        // Obtener el día y el mes seleccionados
        let clickedDay = $(this).text();
        let clickedMonth = monthName.indexOf($("#text_month_02").text()) + 1;
        // Actualizar el número y el mes en el encabezado del calendario
        $("#text_day").text(clickedDay);
        $("#text_month").text(monthName[clickedMonth - 1]);
        
        // Actualizar el párrafo con la fecha seleccionada
        $("#selected_date").text("La fecha que ha escogido es: " + clickedDay + "/" + clickedMonth + "/" + year);
    });

    // Mostrar la fecha actual por defecto
    let currentDate = new Date();
    let currentDay = currentDate.getDate();
    let currentMonth = currentDate.getMonth() + 1;
    $("#text_day").text(currentDay);
    $("#text_month").text(monthName[currentMonth - 1]);
    $("#selected_date").text("La fecha que ha escogido es: " + currentDay + "/" + currentMonth + "/" + year);
});

// -------------------------------------------------API FICHAS-------------------------------------------------------------//

function ProcessEnd() {
    alert("Su servicio ha sido agendado con éxito. ¡Prepárese para disfrutar de un servicio excepcional y atención de primera clase!");
    setTimeout(function() {
        window.location.href = "servicios.html"; 
    }, 500); // Redirigir después de 0.5 segundos (opcional)

}

// --------------------------------------------------------------------//
    // Consulta para obtener datos de usuario
    $(document).ready(function() {
    var petNames = ["Max", "Buddy", "Charlie", "Jack", "Rocky", "Cooper", "Riley", "Toby", "Bear", "Bailey", "Duke", "Jax", "Finn", "Louie", "Oliver"];

    function getRandomPetName() {
        return petNames[Math.floor(Math.random() * petNames.length)]; // Selecciona un nombre aleatorio de la lista
    }

    function getRandomAge() {
        return Math.floor(Math.random() * 21) + 1; // Genera un número aleatorio entre 1 y 21
    }

    function fetchRandomUserData() {
        $.ajax({
            url: 'https://randomuser.me/api/',
            dataType: 'json',
            success: function(data) {
                var user = data.results[0];
                $('#nombre').text(user.name.first + ' ' + user.name.last);
                $('#correo').text(user.email);
                $('#Direccion').text(user.location.street.name + ', ' + user.location.city + ', ' + user.location.country);
                $('#celular').text(user.cell);
                $('#telefono').text(user.phone);
                $('#edad').text(user.dob.age);
                $('#nombre-mascota').text(getRandomPetName());
                $('#edad-mascota').text(getRandomAge());
            }
        });
    }

    function fetchRandomDogImage() {
        $.ajax({
            url: 'https://dog.ceo/api/breeds/image/random',
            dataType: 'json',
            success: function(data) {
                var imageUrl = data.message;
                $('#dog-image').attr('src', imageUrl);
            }
        });
    }

    $('#fetch-new-data').click(function() {
        fetchRandomUserData();
        fetchRandomDogImage();
    });

    // Fetch random user data and dog image when the page loads
    fetchRandomUserData();
    fetchRandomDogImage();
});
// ---------------------------------------------------------------------------------------------------------------

// --------------------------------------------[CALORIAS]---------------------------------------------------------
function calcularCalorias() {
    var peso = parseFloat(document.getElementById('peso').value);
    var nivelActividad = parseFloat(document.getElementById('nivel-actividad').value);
    
    if (isNaN(peso) || isNaN(nivelActividad)) {
        document.getElementById('resultado').innerText = "Por favor, introduzca números válidos.";
        return;
    }
    
    var calorias = peso * 30 * nivelActividad; // 30 es una estimación promedio de las necesidades diarias de calorías por kg de peso corporal
    
    document.getElementById('resultado').innerText = "El requerimiento diario de calorías es aproximadamente: " + calorias.toFixed(2) + " kcal";
}

// ------------------------------------------------------------------------------------------------------------------------------- //

// --------------------------------------------[LOGIN, CREAR, AGENDAR]------------------------------------------------------------ //

function validateLogin() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    var uerl = document.getElementById("urlData").getAttribute("data-url");


    // Validar si usuario y contraseña coinciden con los valores predefinidos
    if (username === "usuario" && password === "contraseña") {
        alert("¡Inicio de sesión exitoso!");
        setTimeout(function() {
            window.location.href = uerl;
        }, 500); // Redirigir después de 0.5 segundos (opcional)
        
    } else {
        document.getElementById("error").innerText = "Contraseña o Usuario Incorrecto, inténtelo de nuevo.";
    }

    // Verificador de campos login
    if (username === "" || password === "") {
        document.getElementById("error").innerText = "Por favor, completa todos los campos.";
        return; // Detener la ejecución si los campos están vacíos
    }
}

function validateCreate() {
    var username = document.getElementById("username").value;
    var nickname = document.getElementById("nickname").value;
    var password = document.getElementById("password").value;
    var cpassword = document.getElementById("cpassword").value;

    var name_chk = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+$/;

    document.getElementById("error_N").innerText ="";
    document.getElementById("error_U").innerText ="";
    document.getElementById("error_C").innerText ="";
    document.getElementById("error_CC").innerText ="";
    document.getElementById("error").innerText ="";

    var create_correct = true;

    if (username === "" || nickname === "" || password === "" || cpassword === "") {
        document.getElementById("error").innerText = "Por favor, completa todos los campos.";
        create_correct = false 
    }

    if (username === ""){
        // Se muestra el error al usuario
        document.getElementById("error_N").innerText = "Rellena este campo."
        // Previene la redireccion 
        create_correct = false; 
        // Si el campo contiene informacion, entonces aqui se verifica que dicha informacion sea correcta
    }else if(!name_chk.test(username)){
        // Se muestra el error al usuario
        document.getElementById("error_N").innerText = "El nombre no puede contener numeros ni caracteres especiales"
        // Previene la redireccion 
        create_correct = false;
    }
    
    if (nickname === ""){
        document.getElementById("error_U").innerText = "Rellena este campo."
        create_correct = false; 
    }

    if (password === ""){
        document.getElementById("error_C").innerText = "Rellena este campo."
        create_correct = false; 
    }

    if (cpassword === ""){
        document.getElementById("error_CC").innerText = "Rellena este campo."
        create_correct = false; 
    }
    
    if (password !== cpassword) {
        document.getElementById("error").innerText = "Las contraseñas no coinciden.";
        create_correct = false
    }
    
    // Si todas las validaciones son exitosas, mostrar mensaje de éxito y redireccionar
if (create_correct){
    alert("Se ha creado al usuario exitosamente. Por favor, presione OK para continuar.");
    setTimeout(function() {
        window.location.href = "/login"; 
    }, 500); // Redirigir después de 0.5 segundos (opcional)
}
}

// Validar pago
function validatePayment() {
    var forename = document.getElementById("forename").value;
    var surname = document.getElementById("surname").value;
    var zip = document.getElementById("zip").value;
    var email = document.getElementById("email").value;
    var phone = document.getElementById("phone").value;
    var emailRadio = document.getElementById("rbemail").checked;
    var cellRadio = document.getElementById("rbcell").checked;
    // Regular que nombre no tenga caracteres especiales
    var name_chk = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+$/;
    // Regular que telefono solo sean numeros y este dentro del rango "{1,9}"= maximo 9 digitos "{9}"= exactamente 9 digitos
    var phone_chk = /^[0-9]{9}$/;

    var zip_chk = /^[0-9]{7}$/;
    // Regular que el correo tenga un formato de correo
    var email_chk = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    // verificacion de que todo se haya cumplido

    var form_correct = true;

    document.getElementById("error_N").innerText ="";
    document.getElementById("error_A").innerText ="";
    document.getElementById("error_P").innerText ="";
    document.getElementById("error_Z").innerText ="";
    document.getElementById("error_EM").innerText ="";

    // Ver si estan todos los campos llenos
    if (forename === "" || surname === "" || zip === "" || email === "" || phone === "") {
        document.getElementById("error").innerText = "Por favor, completa todos los campos.";
        form_correct = false; 
    }

    // Verificar que los campos contengan informacion
    if (forename === ""){
        // Se muestra el error al usuario
        document.getElementById("error_N").innerText = "Rellena este campo."
        // Previene la redireccion 
        form_correct = false; 
        // Si el campo contiene informacion, entonces aqui se verifica que dicha informacion sea correcta
    }else if(!name_chk.test(forename)){
        // Se muestra el error al usuario
        document.getElementById("error_N").innerText = "El nombre no puede contener numeros ni caracteres especiales"
        // Previene la redireccion 
        form_correct = false;
    } 
    
    if (surname === ""){
        document.getElementById("error_A").innerText = "Rellena este campo."
        form_correct = false; 
    }else if(!name_chk.test(surname)){
        document.getElementById("error_A").innerText = "El apellido no puede contener numeros ni caracteres especiales"
        form_correct = false;
    } 
    
    if (phone === ""){
        document.getElementById("error_P").innerText = "Rellena este campo."
        form_correct = false; 
    }else if(!phone_chk.test(phone)){
        document.getElementById("error_P").innerText = "Tu telefono solamente debe contener numeros, y 9 digitos"
        form_correct = false;     
    } 
    
    if (zip === ""){
        document.getElementById("error_Z").innerText = "Rellena este campo."
        form_correct = false; 
    }else if(!zip_chk.test(zip)){
        document.getElementById("error_Z").innerText = "Tu zip debe solamente contener numeros, y 7 digitos"
        form_correct = false;
    } 
    
    if (email === ""){
        document.getElementById("error_EM").innerText = "Rellena este campo."
        form_correct = false; 
    }else if(!email_chk.test(email)){
        document.getElementById("error_EM").innerText = "El formato de tu correo es invalido"
        form_correct = false;
    } 

    if (!emailRadio && !cellRadio) {
        document.getElementById("error").innerText = "Por favor, seleccione un método de comunicación preferido.";
        form_correct = false;
    }

 // Si todas las validaciones son exitosas, redireccionar
 if (form_correct) {
    setTimeout(function() {
        window.location.href = "fecha.html"; 
    }, 500); // Redirigir después de 0.5 segundos (opcional)
   }
 }
 

function ProcessEnd() {
    alert("Su servicio ha sido agendado con éxito. ¡Prepárese para disfrutar de un servicio excepcional y atención de primera clase!");
    setTimeout(function() {
        window.location.href = "servicios.html"; 
    }, 500); // Redirigir después de 0.5 segundos (opcional)

}
// ---------------------------------------------------------------------------------------------------------------

// ---------------------------------------[REPRODUCTOR YOUTUBE]---------------------------------------------------

var tag = document.createElement('script');
tag.src = 'https://www.youtube.com/iframe_api';
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;

function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '360',
        width: '640',
        videoId: 'J4HYF_DFKPU', // AquÃ se coloca la ID del video //
        events: {
            'onReady': onPlayerReady
        }
    });
}

function onPlayerReady(event) {
    var playButton = document.getElementById('playButton');
    playButton.addEventListener('click', function() {
        player.playVideo();
    });
}
// ---------------------------------------------------------------------------------------------------------------

// ------------------------------------------[POPUP'S]------------------------------------------------------------

let preveiwContainer = document.querySelector('.products-preview');
let previewBox = preveiwContainer.querySelectorAll('.preview');

//Selector de ID
document.querySelectorAll('.products-container .product').forEach(product =>{
  product.onclick = () =>{
    preveiwContainer.style.display = 'flex';
    let name = product.getAttribute('data-name');
    previewBox.forEach(preview =>{
      let target = preview.getAttribute('data-target');
      if(name == target){
        preview.classList.add('active');
      }
    });
  };
});

//Boton de cierre
previewBox.forEach(close =>{
  close.querySelector('.fa-times').onclick = () =>{
    close.classList.remove('active');
    preveiwContainer.style.display = 'none';
  };
});
