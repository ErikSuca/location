window.addEventListener('load', async () => {
    
    const getLocation = async (position) =>{
        console.log(position);
        const cordenadas = position.coords
        const lat = cordenadas.latitude
        const lon = cordenadas.longitude
        console.log(lat,',',lon);
        const servidor = 'https://apis.datos.gob.ar/georef/api/'
        const endpoint = `${servidor}ubicacion?lat=${lat}&lon=${lon}`

        const request = await fetch(endpoint)
        const result = await request.json()

        let ubicacion = null
        if(result.ubicacion != undefined){
            if(result.ubicacion.provincia.id != '02'){
                ubicacion = result.ubicacion.municipio.nombre
            } else {
                ubicacion = result.ubicacion.provincia.nombre
            }
        }
        
        document.write(`<h3> Se conecto desde ${ubicacion} </h3>`)
        document.write(`<p>latitud: ${lat}</p>`)
        document.write(`<p>longitud: ${lon} </p>`)
        document.write(`<p>Sus cordenadas son ${lat},${lon} </p>`)
        
        document.write(`<button id = 'recargar'>Recargar</button>`)
        const btnReload = document.querySelector('#recargar')
        btnReload.addEventListener('click', e=>{
            e.preventDefault();
            location.reload();
        })
    }
    let algo = navigator.geolocation.getCurrentPosition(getLocation)

})