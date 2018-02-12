var opciones = {
			enableHighAccuracy:true,
			masimunAge:30000,
			timeout:30000
		}

var posicionAparcamiento = {
	latitud:'',
	longitud:''
}

var posicionActual = {
	latitud:'',
	longitu:''
}

var alturaPantalla = parseInt(window.innerHeight)-20;
console.log(alturaPantalla);
var anchuraPantalla ;
console.log(anchuraPantalla);

window.onload = function() {



	if (!navigator.geolocation) {
		alert('Este dispositivo no soporta geolocalizacion');
	} else {
		
		var divContenedor = document.querySelector('#contenedor');
		anchuraPantalla= parseInt(getStyle(divContenedor,'width'))-20;
	
		divContenedor.style.height=alturaPantalla + 'px';
		divContenedor.style.width = anchuraPantalla + 'px';

		var divEnvolturaMapa = document.querySelector('#envolturaMapa');
		divEnvolturaMapa.style.width=anchuraPantalla + 'px';
		divEnvolturaMapa.style.height=(alturaPantalla-140) + 'px';

		var divContenidoMapa = document.querySelector('#contenidoMapa');
		divContenidoMapa.style.width=(anchuraPantalla-10) + 'px';
		divContenidoMapa.style.height=(alturaPantalla-200) + 'px';

		var divMenu = document.querySelector('#menu');
		divMenu.style.height=(alturaPantalla-135) + 'px';
		divMenu.style.width=anchuraPantalla + 'px';
		divMenu.style.right='-' + (anchuraPantalla + 20)+ 'px';

		var opcion1Menu = document.querySelector('#menu li:first-of-type').addEventListener('click', aparcar, false);

		var opcion2Menu = document.querySelector('#menu li:nth-of-type(2)').addEventListener('click', mostrar, false);

		var opcion3Menu = document.querySelector('#menu li:nth-of-type(3)').addEventListener('click', encontrar, false);

		var submenu1 =document.querySelector('#submenu1');
		submenu1.style.display='none';

		var opcion4Menu = document.querySelector('#menu li:nth-of-type(4)').addEventListener('click', function() {
				
				
				if (submenu1.style.display =='none') {
					submenu1.style.display = 'block';
				} else{
					submenu1.style.display = 'none';
				}
			}, false);
		

		var botonHamburguesa = document.querySelector('#hamburguesa').addEventListener('click', function(){
				if (divMenu.style.right!='0px'){
					divMenu.style.right='0px';
					document.querySelector('#submenu1').style.display='none';
					document.querySelector('#submenu2').style.display='none';
					
				} else {
					divMenu.style.right='-' + (anchuraPantalla + 20)+ 'px';
					document.querySelector('#submenu1').style.display='none';
					document.querySelector('#submenu2').style.display='none';
					
				}
		},false);		

		var botonAparcar = document.querySelector('#contenedor>button:first-of-type').addEventListener('click', aparcar,false);

		var botonMostrar = document.querySelector('#contenedor>button:nth-of-type(2)').addEventListener('click', mostrar, false);

		var botonEncontrar = document.querySelector('#contenedor>button:last-of-type').addEventListener('click', encontrar, false);

		var botonMostrarPosicion = document.querySelector('#mensaje button:first-of-type').addEventListener('click',mostrar,false);

		var botonCerrarMensaje=document.querySelector('#mensaje button:last-of-type').addEventListener('click',cerrarMensaje,false);

		var botonCerrar = document.querySelector('#envolturaMapa button');
		botonCerrar.addEventListener('click', cerrar,false);

		var botonAceptarMarcador = document.querySelector('#ponerMarcador button:first-child').addEventListener('click', grabarMarcador,false);

		var botonCancelarMarcador = document.querySelector('#ponerMarcador button:last-child').addEventListener('click', cerrarMarcador,false);

		
		var arraySitios;



	}  // Fin de else 
}

function aparcar() {

		

	navigator.geolocation.getCurrentPosition(faparcar, ferror, opciones);


}

function encontrar() {

	 

	navigator.geolocation.getCurrentPosition(fencontrar, ferror, opciones);

	
}

function cerrar() {

	var divEnvolturaMapa = document.querySelector('#envolturaMapa');

	divEnvolturaMapa.style.display='none';

}

function cerrarMensaje() {
	document.querySelector('#mensaje').style.display='none';
}

function mostrar() {

	var divMenu = document.querySelector('#menu');
	if (divMenu.style.right=='0px'){
		divMenu.style.right='-' + (anchuraPantalla + 20)+ 'px';
		console.log(divMenu.style.right);		
	} 

	document.querySelector('#mensaje').style.display='none';

	var puntoAmostrar = JSON.parse(localStorage.aparcamiento);

	console.log(puntoAmostrar.latitud);
	console.log(puntoAmostrar.longitud);

	var divEnvolturaMapa = document.querySelector('#envolturaMapa');

	divEnvolturaMapa.style.display='flex';

	var mapa = new GMaps({
			el:'#contenidoMapa',
			lat:puntoAmostrar.latitud,
			lng:puntoAmostrar.longitud,
			zoom:15,
			click:function(e) {
				
				localStorage.puntoAgrabar = JSON.stringify(e);
				console.log('Punto a grabar: ' + localStorage.puntoAgrabar);
				console.log(e);
				abrirVentanaGrabar(e);
							
			}

		});

		mapa.addMarker({
			lat:puntoAmostrar.latitud,
			lng:puntoAmostrar.longitud,
			title:"Coche aparcado",			
			infoWindow :{
				content:'<span>Mi aparcamiento</span>'
			},
			
			
		});

		mapa.drawOverlay({
			lat:puntoAmostrar.latitud, 
			lng:puntoAmostrar.longitud,
			content:"<div class='iconito'>Mi aparcamiento</div>",
			verticalAlign:'bottom',
			horizontalAlign:'right'
		})

	


}

function faparcar(sitio) {


	
	posicionAparcamiento.latitud = sitio.coords.latitude+0.025;
	posicionAparcamiento.longitud= sitio.coords.longitude-0.03;

	var cocheAparcado = JSON.stringify(posicionAparcamiento);

	var divMenu = document.querySelector('#menu');
	if (divMenu.style.right=='0px'){
		divMenu.style.right='-' + (anchuraPantalla + 20)+ 'px';
		console.log(divMenu.style.right);		
	} 

	var divEnvolturaMapa = document.querySelector('#envolturaMapa');

	if (divEnvolturaMapa.style.display=='flex') {

		divEnvolturaMapa.style.display='none';
	}

	if (localStorage.aparcamiento = cocheAparcado) {
		
		document.querySelector('#mensaje').style.display='flex';
	};
	
}

function fencontrar(sitio) {

	var divMenu = document.querySelector('#menu');
	if (divMenu.style.right=='0px'){
		divMenu.style.right='-' + (anchuraPantalla + 20)+ 'px';
		console.log(divMenu.style.right);		
	} 

	posicionActual.latitud = sitio.coords.latitude;
	posicionActual.longitud= sitio.coords.longitude;

	posicionAparcamiento = JSON.parse(localStorage.aparcamiento);

	var divEnvolturaMapa = document.querySelector('#envolturaMapa');

	divEnvolturaMapa.style.display='flex';

	var mapa = new GMaps({
			el:'#contenidoMapa',
			lat:posicionActual.latitud,
			lng:posicionActual.longitud,
			zoom:15,
			

		});

		mapa.addMarker({
			lat:posicionActual.latitud,
			lng:posicionActual.longitud,
			title:"Mi posición",
			infoWindow :{
				content:'<span>Estoy aquí</span>'
			},
			
		});

		mapa.drawOverlay({
			lat:posicionActual.latitud, 
			lng:posicionActual.longitud,
			content:"<div class='iconito'>Estoy aquí</div>",
			verticalAlign:'bottom',
			horizontalAlign:'right'
		});

		mapa.addMarker({
			lat:posicionAparcamiento.latitud,
			lng:posicionAparcamiento.longitud,
			title:"Coche aparcado",
			infoWindow :{
				content:'<span>Mi aparcamiento</span>'
			},
			
		});

		mapa.drawOverlay({
			lat:posicionAparcamiento.latitud, 
			lng:posicionAparcamiento.longitud,
			content:"<div class='iconito'>Mi aparcamiento</div>",
			verticalAlign:'bottom',
			horizontalAlign:'right'
		})

		mapa.drawRoute({
			origin:[posicionActual.latitud, posicionActual.longitud],
			destination:[posicionAparcamiento.latitud,posicionAparcamiento.longitud],
			travelMode:'walking',
			strokeColor: '#030C63',
			strokeOpacity: 0.6,
			strokeWeight: 4		
			 
			
		})



}

function ponerMarcador(punto) {
	
	



}

function cerrarMarcador() {
	var ventanaNuevoMarcador = document.querySelector('#ponerMarcador');
	ventanaNuevoMarcador.style.display='none';
}

function abrirVentanaGrabar(objeto) {
	var ventanaNuevoMarcador = document.querySelector('#ponerMarcador');
	ventanaNuevoMarcador.style.display='flex';

	localStorage.puntoAgrabar = JSON.stringify(objeto);
}

function grabarMarcador(objeto) {
	
	var texto = document.querySelector('#ponerMarcador input').value;
	
	var submenu1 = document.querySelector('#submenu1');
	submenu1.innerHTML = submenu1.innerHTML + '<li><span>'+texto+'</span></li>';

	var nuevoPunto = JSON.parse(localStorage.puntoAgrabar);

	var mapa = new GMaps({
			el:'#contenidoMapa',
			lat:nuevoPunto.latLng.lat,
			lng:nuevoPunto.latLng.lng,
			zoom:15
		});
				
		mapa.addMarker({
			lat:nuevoPunto.latLng.lat,
			lng:nuevoPunto.latLng.lng,
			infoWindow :{
				content: texto 
			}
		})

		var textoOverlay = "<div class='iconito'>" + texto + "</div>";

		mapa.drawOverlay({
			lat:nuevoPunto.latLng.lat,
			lng:nuevoPunto.latLng.lng,
			content: textoOverlay,
			verticalAlign:'bottom',
			horizontalAlign:'right'
		})

	localStorage.setItem(texto,JSON.stringify(nuevoPunto));

	arraySitios = document.querySelectorAll('#submenu1>li>span');
	for (i=0; i<arraySitios.length; i++) {
		arraySitios[i].addEventListener('click', function() {
			var elementoPulsado = this.innerHTML;			
			mostrarPunto(elementoPulsado,localStorage.getItem(elementoPulsado));
		},false);
	}

	var ventanaNuevoMarcador = document.querySelector('#ponerMarcador');
	ventanaNuevoMarcador.style.display='none';




}


function mostrarPunto(titulo,punto) {
var divMenu = document.querySelector('#menu');
	if (divMenu.style.right=='0px'){
		divMenu.style.right='-' + (anchuraPantalla + 20)+ 'px';
			
	} 

	document.querySelector('#mensaje').style.display='none';

	var puntoAmostrar = JSON.parse(punto);
	console.log(puntoAmostrar);
	var divEnvolturaMapa = document.querySelector('#envolturaMapa');

	divEnvolturaMapa.style.display='flex';

	var mapa = new GMaps({
			el:'#contenidoMapa',
			lat:puntoAmostrar.latLng.lat,
			lng:puntoAmostrar.latLng.lng,
			zoom:15
			

		});

		mapa.addMarker({
			lat:puntoAmostrar.latLng.lat,
			lng:puntoAmostrar.latLng.lng,
			title:titulo,			
			infoWindow :{
				content:titulo
			},
			
			
		});

		var contenido = "<div class='iconito'>" + titulo + "</div>" ;

		mapa.drawOverlay({
			lat:puntoAmostrar.latLng.lat,
			lng:puntoAmostrar.latLng.lng,
			content:contenido,
			verticalAlign:'bottom',
			horizontalAlign:'right'
		})

	


}



function ferror(error) {

		switch (error.code) {
			case error.PERMISSION_DENIED: 
				 alert('Se ha denegado el acceso al dispositivo');
				 break;
			case error.POSITION_UNAVAILABLE:
				 alert('Problema obteniendo la posición');
				 break;
			case error.TIMEOUT:
				 alert('Se ha superado el tiempo de espera');
				 break;
			case error.UNKNOWN_ERROR:
				 alert('Error desconocido');
				 break;
		}
}